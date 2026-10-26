"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useId, useRef, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { CONTACT_NAME_ID, useInquiry } from "@/components/site/InquiryProvider";
import { agent } from "@/lib/content";
import { cn } from "@/lib/utils";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const labelClass = "text-[0.7rem] font-semibold tracking-[0.3em] text-ink/55 uppercase";
const fieldClass =
  "mt-2 w-full rounded-none border-b border-ink/30 bg-transparent text-xl font-light text-ink transition-colors placeholder:text-ink/35 hover:border-ink focus-visible:border-rose-light focus-visible:outline-none aria-[invalid=true]:border-destructive";

export function ContactForm() {
  const id = useId();
  const { message, setMessage, sentBy, setSentBy } = useInquiry();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const emailErrorId = `${id}-email-error`;

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();
    const problem = !value ? "Please enter your email address." : !EMAIL.test(value) ? "Please enter a valid email address." : null;
    setEmailError(problem);
    if (problem) {
      emailRef.current?.focus();
      return;
    }
    setSentBy(name.trim());
    setName("");
    setEmail("");
    setMessage("");
  }

  if (sentBy !== null) {
    return (
      <div role="status" className="flex min-h-[30rem] flex-col items-start justify-center">
        <CheckCircle2 aria-hidden className="size-10 text-rose" strokeWidth={1.25} />
        <h3 className="mt-6 text-4xl leading-tight font-extralight tracking-[-0.03em] text-ink uppercase md:text-5xl">
          Thanks{sentBy ? `, ${sentBy}` : ""}!
        </h3>
        <p className="mt-4 text-lg text-ink/75">Your message is ready for Marci.</p>
        <p className="mt-8 max-w-md border-l-2 border-rose-light pl-5 text-sm leading-relaxed text-ink/70">
          Heads up: this is a concept site, so messages aren&apos;t actually sent. To reach Marci today, call{" "}
          <a href={agent.phone.href} className="font-semibold text-ink underline underline-offset-4">
            {agent.phone.display}
          </a>
          .
        </p>
        <button type="button" onClick={() => setSentBy(null)} className={cn(buttonVariants({ variant: "outline" }), "mt-10")}>
          Write another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <h3 className="text-[0.7rem] font-semibold tracking-[0.3em] text-rose uppercase">Send Message</h3>
      <div className="mt-10 grid gap-10 sm:grid-cols-2">
        <div>
          <label htmlFor={CONTACT_NAME_ID} className={labelClass}>
            Name
          </label>
          <input
            id={CONTACT_NAME_ID}
            type="text"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
            className={cn(fieldClass, "h-14")}
          />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className={labelClass}>
            Email<span aria-hidden className="text-rose">*</span>
            <span className="sr-only"> (required)</span>
          </label>
          <input
            ref={emailRef}
            id={`${id}-email`}
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (emailError) setEmailError(null);
            }}
            placeholder="you@example.com"
            aria-invalid={emailError ? true : undefined}
            aria-describedby={emailError ? emailErrorId : undefined}
            className={cn(fieldClass, "h-14")}
          />
          {emailError && (
            <p id={emailErrorId} className="mt-2 text-sm font-medium text-destructive">
              {emailError}
            </p>
          )}
        </div>
      </div>
      <div className="mt-10">
        <label htmlFor={`${id}-message`} className={labelClass}>
          Message
        </label>
        <textarea
          id={`${id}-message`}
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Tell Marci what you're looking for, or when to call you back."
          className={cn(fieldClass, "resize-y py-3 text-lg leading-relaxed")}
        />
      </div>
      <button type="submit" className={cn(buttonVariants({ size: "lg" }), "mt-10 w-full sm:w-auto")}>
        Send
        <ArrowRight aria-hidden className="transition-transform duration-300 group-hover/button:translate-x-1" />
      </button>
    </form>
  );
}
