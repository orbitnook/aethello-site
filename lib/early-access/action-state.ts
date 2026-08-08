import type { EarlyAccessValues } from "@/lib/early-access/validation";

type PublicValues = Omit<EarlyAccessValues, "website">;
export type EarlyAccessState = { errors?: Partial<Record<keyof PublicValues, string>>; message?: string; status: "idle" | "error" | "success"; values: PublicValues };
export const initialEarlyAccessState: EarlyAccessState = { status: "idle", values: { email: "", name: "", organisation: "", researchContext: "", role: "" } };
