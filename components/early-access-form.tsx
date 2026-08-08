"use client";

import Link from "next/link";
import { useActionState } from "react";
import { requestEarlyAccess } from "@/app/early-access/actions";
import { initialEarlyAccessState } from "@/lib/early-access/action-state";
import { EARLY_ACCESS_LIMITS } from "@/lib/early-access/validation";

export function EarlyAccessForm() {
  const [state, formAction, pending] = useActionState(requestEarlyAccess, initialEarlyAccessState);
  const currentValues = state.values;
  if (state.status === "success") return <div className="early-form-success" role="status"><span aria-hidden="true">✓</span><h2>Thanks for your interest.</h2><p>We&apos;ve received your request and will be in touch if the current testing group is a good fit.</p><Link className="marketing-button focus-ring" href="/">Return to Aethello</Link></div>;
  const describedBy = (field: keyof typeof currentValues) => state.errors?.[field] ? `${field}-error` : undefined;

  return (
    <form action={formAction} className="early-form" noValidate>
      {state.status === "error" && <div className="early-form__error" role="alert"><p>{state.message ?? "Check the highlighted fields and submit again."}</p>{state.errors && <ul>{Object.values(state.errors).filter(Boolean).map((error) => <li key={error}>{error}</li>)}</ul>}</div>}
      <FormField error={state.errors?.name} id="name" label="Name" required><input aria-describedby={describedBy("name")} aria-invalid={Boolean(state.errors?.name)} autoComplete="name" className="field-control" defaultValue={currentValues.name} disabled={pending} id="name" maxLength={EARLY_ACCESS_LIMITS.name} name="name" required /></FormField>
      <FormField error={state.errors?.email} id="email" label="Work email" required><input aria-describedby={describedBy("email")} aria-invalid={Boolean(state.errors?.email)} autoCapitalize="none" autoComplete="email" className="field-control" defaultValue={currentValues.email} disabled={pending} id="email" inputMode="email" maxLength={EARLY_ACCESS_LIMITS.email} name="email" required type="email" /></FormField>
      <div className="early-form__row">
        <FormField error={state.errors?.organisation} id="organisation" label="Organisation"><input aria-describedby={describedBy("organisation")} aria-invalid={Boolean(state.errors?.organisation)} autoComplete="organization" className="field-control" defaultValue={currentValues.organisation} disabled={pending} id="organisation" maxLength={EARLY_ACCESS_LIMITS.organisation} name="organisation" /></FormField>
        <FormField error={state.errors?.role} id="role" label="Role"><input aria-describedby={describedBy("role")} aria-invalid={Boolean(state.errors?.role)} autoComplete="organization-title" className="field-control" defaultValue={currentValues.role} disabled={pending} id="role" maxLength={EARLY_ACCESS_LIMITS.role} name="role" /></FormField>
      </div>
      <FormField error={state.errors?.researchContext} id="researchContext" label="What kind of research do you work on?"><textarea aria-describedby={describedBy("researchContext")} aria-invalid={Boolean(state.errors?.researchContext)} className="field-control" defaultValue={currentValues.researchContext} disabled={pending} id="researchContext" maxLength={EARLY_ACCESS_LIMITS.researchContext} name="researchContext" rows={4} /></FormField>
      <div className="early-form__honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input autoComplete="off" id="website" maxLength={EARLY_ACCESS_LIMITS.website} name="website" tabIndex={-1} /></div>
      <button className="marketing-button focus-ring" disabled={pending} type="submit">{pending ? "Sending request..." : "Request early access"}</button>
      <p className="early-form__privacy">We&apos;ll use your details only to assess your request and contact you about Aethello early access.</p>
    </form>
  );
}

function FormField({ children, error, id, label, required = false }: { children: React.ReactNode; error?: string; id: string; label: string; required?: boolean }) { return <div className="early-form__field"><label htmlFor={id}>{label}{required && <span aria-hidden="true"> *</span>}</label>{children}{error && <p id={`${id}-error`}>{error}</p>}</div>; }
