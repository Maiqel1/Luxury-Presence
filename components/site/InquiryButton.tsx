"use client";

import { useInquiry } from "@/components/site/InquiryProvider";

export function InquiryButton({
  message,
  className,
  children,
}: {
  message?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { startInquiry } = useInquiry();
  return (
    <button type="button" onClick={() => startInquiry(message)} className={className}>
      {children}
    </button>
  );
}
