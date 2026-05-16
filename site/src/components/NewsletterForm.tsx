"use client";

import { useState } from "react";

type StatusTone = "success" | "error";

export default function NewsletterForm() {
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
        throw new Error(payload?.error || "Something went wrong.");
      }

      setStatus({
        message: "Thanks! We'll keep you updated.",
        tone: "success",
      });
      form.reset();
    } catch (error) {
      setStatus({
        message:
          error instanceof Error ? error.message : "Unable to subscribe.",
        tone: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <label htmlFor="email">Sign up to receive news and updates.</label>
      <div className="input-row">
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Sign Up"}
        </button>
      </div>
      {status ? (
        <div
          className={`status ${status.tone}`}
          role="status"
          aria-live="polite"
        >
          {status.message}
        </div>
      ) : null}
    </form>
  );
}

function safeParseJson(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
}
