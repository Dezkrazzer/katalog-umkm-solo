"use client";

import { ArrowUpRight } from "lucide-react";

import type { Umkm } from "@/data/umkm";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { FoodImage } from "@/components/food-image";
import { FoodDetailDialog } from "@/components/food-detail-dialog";

type FoodCardProps = {
  item: Umkm;
};

/**
 * One Dialog per card, so Radix returns focus to this card's trigger on close.
 * The trigger is a real <button> stretched over the whole card; the heading
 * stays outside the button so the markup remains valid.
 */
export function FoodCard({ item }: FoodCardProps) {
  return (
    <Dialog>
      <Card
        className={[
          "group/food relative h-full gap-0 rounded-lg border border-border bg-card py-0 shadow-warm ring-0",
          "transition-all duration-300 ease-out",
          // hover (pointer devices)
          "hover:-translate-y-1 hover:border-gold hover:shadow-warm-lg",
          // press (works on touch)
          "active:translate-y-0 active:scale-[0.99] active:border-gold active:shadow-warm",
          // keyboard focus
          "has-[button:focus-visible]:-translate-y-1 has-[button:focus-visible]:border-gold has-[button:focus-visible]:ring-4 has-[button:focus-visible]:ring-ring/60",
          "motion-reduce:transition-colors motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100 motion-reduce:has-[button:focus-visible]:translate-y-0",
        ].join(" ")}
      >
        <div className="overflow-hidden rounded-t-lg">
          <AspectRatio ratio={4 / 3} className="bg-muted">
            <FoodImage
              src={item.url_gambar}
              alt={item.alt_gambar}
              name={item.nama_makanan}
              sizes="(min-width: 1280px) 296px, (min-width: 1024px) 31vw, (min-width: 640px) 47vw, 100vw"
              className="group-hover/food:scale-105 motion-reduce:group-hover/food:scale-100"
            />
          </AspectRatio>
        </div>

        <CardHeader className="gap-1 px-5 pt-5">
          <h3 className="text-xl leading-snug font-semibold text-primary">{item.nama_makanan}</h3>
          <p className="text-sm font-medium text-olive">{item.nama_umkm}</p>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col justify-between gap-4 px-5 pt-3 pb-5">
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {item.deskripsi_singkat}
          </p>
          <span
            aria-hidden="true"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary"
          >
            Lihat kisahnya
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/food:translate-x-0.5 group-hover/food:-translate-y-0.5 motion-reduce:transition-none" />
          </span>
        </CardContent>

        <DialogTrigger asChild>
          <button
            type="button"
            aria-label={`Lihat detail ${item.nama_makanan}`}
            className="absolute inset-0 z-10 rounded-lg outline-none"
          />
        </DialogTrigger>
      </Card>

      <FoodDetailDialog item={item} />
    </Dialog>
  );
}
