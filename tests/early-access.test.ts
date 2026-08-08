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
  afterEach(() => { vi.unstubAllGlobals(); delete process.env.NEXT_PUBLIC_SUPABASE_URL; delete process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY; });

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

  it("accepts the honeypot without storing data", async () => {
    const fetchMock = vi.fn(); vi.stubGlobal("fetch", fetchMock);
    expect((await requestEarlyAccess(initialEarlyAccessState, validForm({ website: "spam" }))).status).toBe("success");
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
