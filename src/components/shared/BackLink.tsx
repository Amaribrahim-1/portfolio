import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { cn, focusRingClassName } from "@/lib/utils";

type BackLinkProps = {
  href: string;
  label: string;
};

export function BackLink({ href, label }: BackLinkProps) {
  return (
    <Link
      href={href}
      scroll={false}
      className={cn(
        "group/back inline-flex items-center gap-1.5 text-sm font-medium text-cream/85 transition-colors duration-200 hover:text-mustard",
        focusRingClassName,
        "focus-visible:text-mustard",
      )}
    >
      <ArrowLeft
        aria-hidden
        className="size-4 transition-transform duration-200 group-hover/back:-translate-x-0.5"
      />
      {label}
    </Link>
  );
}
