"use client";

import React, { useEffect, useRef, useState } from "react";
import { EMAIL, MAILTO } from "@/lib/contact";

type Status = "idle" | "sending" | "sent" | "error";

const FIELD =
  "w-full bg-transparent border-b border-gray-300 dark:border-gray-700 py-2 " +
  "font-mono text-sm text-black dark:text-white placeholder:text-gray-400 " +
  "dark:placeholder:text-gray-600 outline-none transition-colors duration-200 " +
  "focus:border-black dark:focus:border-white";

const LABEL =
  "block font-mono text-[11px] tracking-[0.15em] uppercase text-gray-500 dark:text-gray-500 mb-1";

export default function EnquiryModal({
  open,
  onClose,
  presetPackage,
  mode = "package",
}: {
  open: boolean;
  onClose: () => void;
  presetPackage?: string;
  mode?: "package" | "budget";
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const returnFocusTo = useRef<Element | null>(null);

  /* Reset whenever it reopens, so a previous success does not linger. */
  useEffect(() => {
    if (open) {
      setStatus("idle");
      setError("");
      returnFocusTo.current = document.activeElement;
      const t = setTimeout(() => firstFieldRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
    if (returnFocusTo.current instanceof HTMLElement) {
      returnFocusTo.current.focus();
    }
  }, [open]);

  /* Escape closes, Tab stays inside, and the page behind does not scroll. */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }, [open, onClose]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError("");

    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.error || "Could not send that.");
        setStatus("error");
        return;
      }
      setStatus("sent");
    } catch {
      setError("Network trouble. Your email app still works.");
      setStatus("error");
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9995] flex items-end sm:items-center justify-center p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-title"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px] motion-safe:animate-[fadeIn_180ms_ease-out]"
      />

      <div
        ref={dialogRef}
        className="relative w-full sm:max-w-lg max-h-[92vh] overflow-y-auto
          bg-white dark:bg-void border border-gray-200 dark:border-gray-800
          p-6 sm:p-8 motion-safe:animate-[modalIn_220ms_cubic-bezier(0.16,1,0.3,1)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-2 -m-2 font-mono text-xs tracking-[0.15em] uppercase
            text-gray-500 hover:text-black dark:hover:text-white transition-colors duration-200"
        >
          Close
        </button>

        {status === "sent" ? (
          <div className="py-6">
            <h2
              id="enquiry-title"
              className="text-3xl font-bold text-black dark:text-white"
              style={{ fontFamily: "var(--font-pixel)" }}
            >
              Got it
            </h2>
            <p className="mt-4 font-mono text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              That landed in my inbox. I read every one and reply within a day
              or two, including when the answer is that I am not the right
              person for it.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 font-mono text-sm text-black dark:text-white border-b border-current
                pb-0.5 hover:pb-1 transition-all duration-200 tracking-wider uppercase"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <h2
              id="enquiry-title"
              className="text-3xl font-bold text-black dark:text-white pr-16"
              style={{ fontFamily: "var(--font-pixel)" }}
            >
              {mode === "budget" ? "Tell me your number" : "Start a project"}
            </h2>
            <p className="mt-3 font-mono text-xs leading-relaxed text-gray-500 dark:text-gray-500">
              {mode === "budget"
                ? "Say what you have and what matters most, and I will tell you what fits inside it."
                : "A rough brief is enough. I will tell you straight whether I am the right fit."}
            </p>

            <form onSubmit={onSubmit} className="mt-7 space-y-5" noValidate>
              {presetPackage ? (
                <input type="hidden" name="package" value={presetPackage} />
              ) : null}

              {/* Honeypot. Hidden from people, irresistible to bots. */}
              <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label>
                  Website
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={LABEL} htmlFor="enq-name">
                    Your name
                  </label>
                  <input
                    ref={firstFieldRef}
                    id="enq-name"
                    name="name"
                    required
                    maxLength={120}
                    autoComplete="name"
                    className={FIELD}
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className={LABEL} htmlFor="enq-email">
                    Your email
                  </label>
                  <input
                    id="enq-email"
                    name="email"
                    type="email"
                    required
                    maxLength={200}
                    autoComplete="email"
                    className={FIELD}
                    placeholder="jane@company.com"
                  />
                </div>
              </div>

              <div>
                <label className={LABEL} htmlFor="enq-project">
                  What you are building
                </label>
                <textarea
                  id="enq-project"
                  name="project"
                  required
                  rows={4}
                  maxLength={4000}
                  className={`${FIELD} resize-none`}
                  placeholder="A landing page for our API product. The current one is a template and it shows."
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={LABEL} htmlFor="enq-budget">
                    Budget {mode === "budget" ? "" : "(optional)"}
                  </label>
                  <input
                    id="enq-budget"
                    name="budget"
                    maxLength={120}
                    className={FIELD}
                    placeholder="$2,500"
                  />
                </div>
                <div>
                  <label className={LABEL} htmlFor="enq-timeline">
                    Timeline (optional)
                  </label>
                  <input
                    id="enq-timeline"
                    name="timeline"
                    maxLength={120}
                    className={FIELD}
                    placeholder="Before Sept 10"
                  />
                </div>
              </div>

              {error ? (
                <p role="alert" className="font-mono text-xs text-red-600 dark:text-red-400">
                  {error}{" "}
                  <a href={MAILTO} className="underline underline-offset-2">
                    Email {EMAIL} instead
                  </a>
                  .
                </p>
              ) : null}

              <div className="flex items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="font-mono text-sm tracking-wider uppercase text-black dark:text-white
                    border-b border-current pb-0.5 hover:pb-1 transition-all duration-200
                    disabled:opacity-50 disabled:pointer-events-none"
                >
                  {status === "sending" ? "Sending" : "Send it"}
                </button>
                <a
                  href={MAILTO}
                  className="font-mono text-[11px] tracking-[0.15em] uppercase text-gray-500
                    hover:text-black dark:hover:text-white transition-colors duration-200"
                >
                  Or use email
                </a>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
