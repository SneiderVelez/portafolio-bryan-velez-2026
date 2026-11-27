"use client";

import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type ContactField = "name" | "email" | "message";
type ContactFieldErrors = Partial<Record<ContactField, string>>;
type SubmissionFeedback = {
  type: "success" | "error";
  message: string;
};

type ContactResponse = {
  message?: string;
  fieldErrors?: ContactFieldErrors;
};

const directEmail = "sneivega09@gmail.com";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, setPending] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [feedback, setFeedback] = useState<SubmissionFeedback | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    setPending(true);
    setFieldErrors({});
    setFeedback(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as ContactResponse;

      if (!response.ok) {
        const nextFieldErrors = result.fieldErrors ?? {};
        setFieldErrors(nextFieldErrors);
        setFeedback({
          type: "error",
          message:
            result.message ??
            "No se pudo enviar el mensaje. Inténtalo de nuevo en un momento.",
        });

        const firstInvalidField = Object.keys(nextFieldErrors)[0];
        if (firstInvalidField) {
          requestAnimationFrame(() => {
            form.querySelector<HTMLElement>(`[name="${firstInvalidField}"]`)?.focus();
          });
        }
        return;
      }

      form.reset();
      setFeedback({
        type: "success",
        message:
          result.message ?? "¡Gracias por escribirme! Tu mensaje ya fue enviado.",
      });
    } catch {
      setFeedback({
        type: "error",
        message:
          "No se pudo conectar con el formulario. Puedes escribirme directamente al correo que aparece abajo.",
      });
    } finally {
      setPending(false);
    }
  }

  function clearFieldError(field: ContactField) {
    setFieldErrors((current) => ({ ...current, [field]: undefined }));
    setFeedback((current) => (current?.type === "error" ? null : current));
  }

  return (
    <div className="contact-form-panel">
      <div className="contact-form-heading">
        <p className="eyebrow">Una conversación puede empezar aquí</p>
        <h2 className="font-display">Cuéntame un poco</h2>
        <p>Los campos marcados son necesarios para responderte.</p>
      </div>

      <form
        className="contact-form"
        noValidate
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <div aria-hidden="true" className="contact-honeypot">
          <label htmlFor="contact-website">Deja este campo vacío</label>
          <Input
            autoComplete="off"
            id="contact-website"
            name="website"
            tabIndex={-1}
          />
        </div>

        <div className="contact-form-fields">
          <div className="contact-field">
            <label className="contact-label" htmlFor="contact-name">
              Tu nombre <span aria-hidden="true">*</span>
            </label>
            <Input
              aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
              aria-invalid={Boolean(fieldErrors.name)}
              autoComplete="name"
              id="contact-name"
              maxLength={100}
              name="name"
              onChange={() => clearFieldError("name")}
              placeholder="¿Cómo te llamas?"
              required
            />
            {fieldErrors.name ? (
              <p className="contact-field-error" id="contact-name-error">
                {fieldErrors.name}
              </p>
            ) : null}
          </div>

          <div className="contact-field">
            <label className="contact-label" htmlFor="contact-email">
              Tu correo <span aria-hidden="true">*</span>
            </label>
            <Input
              aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
              aria-invalid={Boolean(fieldErrors.email)}
              autoComplete="email"
              id="contact-email"
              maxLength={254}
              name="email"
              onChange={() => clearFieldError("email")}
              placeholder="nombre@correo.com"
              required
              type="email"
            />
            {fieldErrors.email ? (
              <p className="contact-field-error" id="contact-email-error">
                {fieldErrors.email}
              </p>
            ) : null}
          </div>

          <div className="contact-field contact-field--message">
            <label className="contact-label" htmlFor="contact-message">
              ¿En qué estás pensando? <span aria-hidden="true">*</span>
            </label>
            <Textarea
              aria-describedby={
                fieldErrors.message ? "contact-message-error" : undefined
              }
              aria-invalid={Boolean(fieldErrors.message)}
              id="contact-message"
              maxLength={2000}
              name="message"
              onChange={() => clearFieldError("message")}
              placeholder="Cuéntame sobre tu idea, proyecto u oportunidad."
              required
              rows={5}
            />
            {fieldErrors.message ? (
              <p className="contact-field-error" id="contact-message-error">
                {fieldErrors.message}
              </p>
            ) : null}
          </div>
        </div>

        <div className="contact-form-actions">
          <Button
            className="contact-submit"
            data-background-reveal
            disabled={pending}
            size="lg"
            type="submit"
          >
            {pending ? (
              <>
                <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
                Enviando
              </>
            ) : (
              <>
                Enviar mensaje
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </>
            )}
          </Button>
          <p className="contact-form-note">
            Te responderé a la dirección de correo que compartas.
          </p>
        </div>

        <p
          aria-live="polite"
          aria-atomic="true"
          className={`contact-feedback${feedback ? ` contact-feedback--${feedback.type}` : ""}`}
          role={feedback?.type === "error" ? "alert" : "status"}
        >
          {feedback?.message ?? ""}
        </p>
      </form>

      <p className="contact-form-fallback">
        ¿Prefieres el correo directo?{" "}
        <a href={`mailto:${directEmail}`}>{directEmail}</a>
      </p>
    </div>
  );
}
