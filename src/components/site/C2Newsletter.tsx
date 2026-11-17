"use client";

import { useState } from "react";

/** Prototype only: nothing is sent anywhere. */
export function C2Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "done" : "error");
  }

  if (status === "done") {
    return (
      <p className="c2-h3 italic" role="status">
        Thank you. We will write to {email}.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mx-auto w-full max-w-xl text-left">
      <label htmlFor="c2-newsletter" className="sr-only">
        Email address
      </label>
      <div className="flex items-end gap-6 border-b border-ink">
        <input
          id="c2-newsletter"
          type="email"
          autoComplete="email"
          placeholder="Email address"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "error") setStatus("idle");
          }}
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? "c2-newsletter-error" : undefined}
          className="min-w-0 flex-1 bg-transparent py-4 text-lg placeholder:text-faint focus:outline-none"
        />
        <button type="submit" className="c2-caps shrink-0 py-4 transition-colors hover:text-maroon">
          Subscribe
        </button>
      </div>
      {status === "error" && (
        <p id="c2-newsletter-error" role="alert" className="mt-3 text-sm text-maroon">
          Enter a full email address, such as name@example.com.
        </p>
      )}
    </form>
  );
}
