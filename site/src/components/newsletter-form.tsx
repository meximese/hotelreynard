"use client";

import { useState } from "react";
import { BuiButton } from "@/components/ui/actions";
import { BuiText } from "@/components/ui/typography";

type StatusTone = "success" | "error";

function safeParseJson(value: string) {
  try {
    return JSON.parse(value) as { error?: string };
  } catch {
    return {};
  }
}

export function NewsletterForm() {
  const [status, setStatus] = useState<{
    message: string;
    tone: StatusTone;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setIsSubmitting(true);

    const form = event.currentTarget;

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: new FormData(form),
      });
      const responseText = await response.text();
      const payload = responseText ? safeParseJson(responseText) : {};

      if (!response.ok) {
        throw new Error(payload.error || "Something went wrong.");
      }

      setStatus({
        message: "Thanks! We'll keep you updated.",
        tone: "success",
      });
      form.reset();
    } catch (error) {
      setStatus({
        message: error instanceof Error ? error.message : "Unable to subscribe.",
        tone: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="newsletter-form" onSubmit={onSubmit}>
      {status ? (
        <BuiText
          as="div"
          className={`newsletter-form__status newsletter-form__status--${status.tone}`}
          role="status"
          aria-live="polite"
        >
          {status.message}
        </BuiText>
      ) : (
        <BuiText as="label" variant="eyebrow" className="eyebrow" htmlFor="newsletter-email">
          Keep in Touch
        </BuiText>
      )}

      <div className="newsletter-form__row">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
        />
        <BuiButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Sign Up"}
        </BuiButton>
      </div>
    </form>
  );
}
