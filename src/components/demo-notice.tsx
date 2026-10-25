import { Info } from "lucide-react";

import { cn } from "@/lib/utils";

export const DEMO_NOTICE_TEXT =
  "Data, nama usaha, dan alamat pada situs ini adalah contoh untuk keperluan demo. Kisah asal-usul makanan merupakan narasi populer.";

type DemoNoticeProps = {
  className?: string;
};

export function DemoNotice({ className }: DemoNoticeProps) {
  return (
    <p
      className={cn(
        "flex items-start gap-2.5 rounded-md border border-gold/40 bg-card/70 px-4 py-3 text-sm leading-relaxed text-muted-foreground",
        className,
      )}
    >
      <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold" />
      <span>{DEMO_NOTICE_TEXT}</span>
    </p>
  );
}
