import { afterEach, describe, expect, it, vi } from "vitest";
import { requestEarlyAccess } from "@/app/early-access/actions";
import { initialEarlyAccessState } from "@/lib/early-access/action-state";

function validForm(overrides: Record<string, string> = {}) {
  const form = new FormData();
  const values = { email: "researcher@example.org", name: "Ada Researcher", organisation: "Example Lab", researchContext: "Participant interviews", role: "Researcher", website: "", ...overrides };
  Object.entries(values).forEach(([key, value]) => form.set(key, value));
  return form;
}

describe("early access action", () => {
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); delete process.env.NEXT_PUBLIC_SUPABASE_URL; delete process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY; });

  it("validates before calling the backend", async () => {
    const fetchMock = vi.fn(); vi.stubGlobal("fetch", fetchMock);
    const state = await requestEarlyAccess(initialEarlyAccessState, validForm({ email: "bad", name: "" }));
    expect(state.errors?.email).toBeTruthy(); expect(state.errors?.name).toBeTruthy(); expect(fetchMock).not.toHaveBeenCalled();
  });

  it("calls only the anonymous intake RPC", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = "public-key";
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => "created" }); vi.stubGlobal("fetch", fetchMock);
    expect((await requestEarlyAccess(initialEarlyAccessState, validForm())).status).toBe("success");
    expect(fetchMock).toHaveBeenCalledWith("https://example.supabase.co/rest/v1/rpc/request_early_access", expect.objectContaining({ method: "POST", cache: "no-store" }));
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).not.toEqual(expect.objectContaining({ source: expect.anything(), status: expect.anything() }));
  });

  it("treats a duplicate request as a successful submission", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = "public-key";
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => "duplicate" }));
    expect((await requestEarlyAccess(initialEarlyAccessState, validForm())).status).toBe("success");
  });

  it("keeps configuration and network failures generic", async () => {
    const fetchMock = vi.fn(); vi.stubGlobal("fetch", fetchMock);
    const missingConfig = await requestEarlyAccess(initialEarlyAccessState, validForm());
    expect(missingConfig).toMatchObject({ status: "error", message: expect.stringContaining("could not send") });
    expect(fetchMock).not.toHaveBeenCalled();

    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = "public-key";
    fetchMock.mockRejectedValueOnce(new Error("connection unavailable"));
    const networkFailure = await requestEarlyAccess(initialEarlyAccessState, validForm());
    expect(networkFailure).toMatchObject({ status: "error", message: missingConfig.message });
  });

  it("logs only safe Supabase error fields in development", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = "public-key";
    vi.stubEnv("NODE_ENV", "development");
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 404, json: async () => ({ code: "PGRST202", details: "database internals", message: "Function not found" }) }));

    expect((await requestEarlyAccess(initialEarlyAccessState, validForm())).status).toBe("error");
    expect(errorSpy).toHaveBeenCalledWith("[early-access] Submission failed", {
      code: "PGRST202", message: "Function not found", reason: "supabase_response", status: 404,
    });
    expect(JSON.stringify(errorSpy.mock.calls)).not.toContain("database internals");
    errorSpy.mockRestore();
  });

  it("accepts the honeypot without storing data", async () => {
    const fetchMock = vi.fn(); vi.stubGlobal("fetch", fetchMock);
    expect((await requestEarlyAccess(initialEarlyAccessState, validForm({ website: "spam" }))).status).toBe("success");
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
