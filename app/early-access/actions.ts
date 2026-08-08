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
  if (!url || !publishableKey) return failure(values);

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
    if (!response.ok) return failure(values);
    const result: unknown = await response.json();
    return result === "created" || result === "duplicate" ? { status: "success", values } : failure(values);
  } catch {
    return failure(values);
  }
}

function publicValues(values: EarlyAccessValues): EarlyAccessState["values"] { return { email: values.email, name: values.name, organisation: values.organisation, researchContext: values.researchContext, role: values.role }; }
function failure(values: EarlyAccessState["values"]): EarlyAccessState { return { message: "We could not send your request. Your entries remain available, so please try again.", status: "error", values }; }
