"use client";

import { MapPin, X } from "lucide-react";

import type { Umkm } from "@/data/umkm";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { FoodImage } from "@/components/food-image";
import { KawungMark } from "@/components/ornament-divider";

type FoodDetailDialogProps = {
  item: Umkm;
};

/** Body of the detail dialog. Open/close animation comes from shadcn's DialogContent. */
export function FoodDetailDialog({ item }: FoodDetailDialogProps) {
  return (
    <DialogContent
      showCloseButton={false}
      className="flex max-h-[90dvh] flex-col gap-0 overflow-hidden rounded-lg border border-gold/40 bg-card p-0 shadow-warm-lg ring-0 sm:max-w-2xl"
    >
      {/* Outside the scroll area so it is always reachable. */}
      <DialogClose asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label="Tutup"
          className="absolute top-3 right-3 z-10 size-10 rounded-full border-border bg-card/90 text-foreground shadow-warm backdrop-blur-sm hover:bg-card focus-visible:ring-4 focus-visible:ring-ring/60"
        >
          <X aria-hidden="true" className="size-5" />
        </Button>
      </DialogClose>

      <div className="overflow-y-auto overscroll-contain">
        <AspectRatio ratio={16 / 10} className="bg-muted">
          <FoodImage
            src={item.url_gambar}
            alt={item.alt_gambar}
            name={item.nama_makanan}
            sizes="(min-width: 640px) 672px, 100vw"
            eager
          />
        </AspectRatio>

        <div className="space-y-6 px-5 pt-6 pb-7 sm:px-8 sm:pb-8">
          <DialogHeader className="gap-2 text-left">
            <Badge className="rounded-md bg-olive px-2 text-xs text-primary-foreground">
              Data demo
            </Badge>
            <DialogTitle className="text-2xl leading-tight font-semibold tracking-tight text-primary sm:text-3xl">
              {item.nama_makanan}
            </DialogTitle>
            <p className="text-base font-medium text-foreground">{item.nama_umkm}</p>
            <DialogDescription className="text-base leading-relaxed text-muted-foreground">
              {item.deskripsi_singkat}
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center gap-3 text-gold" aria-hidden="true">
            <Separator className="flex-1 bg-gold/40" />
            <KawungMark className="size-5" />
            <Separator className="flex-1 bg-gold/40" />
          </div>

          <section aria-labelledby={`kisah-${item.id}`} className="space-y-3">
            <h3 id={`kisah-${item.id}`} className="text-xl font-semibold text-primary">
              Kisah &amp; Cita Rasa
            </h3>
            <p className="max-w-prose text-base leading-relaxed text-foreground">
              {item.deskripsi_lengkap}
            </p>
          </section>

          <div className="flex items-start gap-3 rounded-md border border-border bg-background/60 p-4">
            <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-gold" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Alamat fiktif (data demo)</p>
              <p className="text-base text-foreground">{item.alamat}</p>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
