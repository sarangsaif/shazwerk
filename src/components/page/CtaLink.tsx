import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function CtaLink({
  href,
  children,
  variant = "ink",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "ink" | "red" | "ghost" | "ghost-light";
}) {
  return (
    <Link href={href} className={`btn btn-${variant}`}>
      <span className="roll">
        <span>
          <span>{children}</span>
          <span aria-hidden="true">{children}</span>
        </span>
      </span>
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}
