"use server";

import type { EarlyAccessState } from "@/lib/early-access/action-state";
import { earlyAccessSchema, readEarlyAccessFormData, type EarlyAccessValues } from "@/lib/early-access/validation";

export async function requestEarlyAccess(_previousState: EarlyAccessState, formData: FormData): Promise<EarlyAccessState> {
  const raw = readEarlyAccessFormData(formData);
  const values = publicValues(raw);
  const validation = earlyAccessSchema.safeParse(raw);

  if (!validation.success) {
    const flattened = validation.error.flatten().fieldErrors;
    return { errors: Object.fromEntries(Object.entries(flattened).map(([key, messages]) => [key, messages?.[0]])), status: "error", values };
  }
  if (validation.data.website) return { status: "success", values };

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !publishableKey) {
    logDevelopmentFailure("missing_configuration", {
      missing: [!url && "NEXT_PUBLIC_SUPABASE_URL", !publishableKey && "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"].filter(Boolean).join(", "),
    });
    return failure(values);
  }

  try {
    const response = await fetch(`${url}/rest/v1/rpc/request_early_access`, {
      method: "POST",
      headers: { apikey: publishableKey, Authorization: `Bearer ${publishableKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        p_email: validation.data.email,
        p_name: validation.data.name,
        p_organisation: validation.data.organisation || null,
        p_research_context: validation.data.researchContext || null,
        p_role: validation.data.role || null,
      }),
      cache: "no-store",
    });
    if (!response.ok) {
      const error = await readSafeSupabaseError(response);
      logDevelopmentFailure("supabase_response", { status: response.status, ...error });
      return failure(values);
    }
    const result: unknown = await response.json();
    if (result === "created" || result === "duplicate") return { status: "success", values };
    logDevelopmentFailure("unexpected_result", { result: safeText(result) });
    return failure(values);
  } catch (error) {
    logDevelopmentFailure("network_error", {
      error: error instanceof Error ? error.name : "UnknownError",
      message: error instanceof Error ? safeText(error.message) : undefined,
    });
    return failure(values);
  }
}

function publicValues(values: EarlyAccessValues): EarlyAccessState["values"] { return { email: values.email, name: values.name, organisation: values.organisation, researchContext: values.researchContext, role: values.role }; }
function failure(values: EarlyAccessState["values"]): EarlyAccessState { return { message: "We could not send your request. Your entries remain available, so please try again.", status: "error", values }; }

async function readSafeSupabaseError(response: Response): Promise<{ code?: string; message?: string }> {
  try {
    const payload: unknown = await response.json();
    if (!payload || typeof payload !== "object") return {};
    const error = payload as Record<string, unknown>;
    return { code: safeText(error.code), message: safeText(error.message) };
  } catch {
    return {};
  }
}

function safeText(value: unknown): string | undefined { return typeof value === "string" ? value.slice(0, 200) : undefined; }

function logDevelopmentFailure(reason: string, details: Record<string, number | string | undefined>): void {
  if (process.env.NODE_ENV !== "development") return;
  console.error("[early-access] Submission failed", { reason, ...details });
}
