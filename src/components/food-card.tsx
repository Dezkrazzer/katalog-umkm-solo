"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import type { Kuliner } from "@/data/foodData";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FoodImage } from "@/components/food-image";

type FoodCardProps = {
  item: Kuliner;
};

export function FoodCard({ item }: FoodCardProps) {
  return (
    <Link href={`/detail/${item.slug}`} className="block h-full">
      <Card
        className={[
          "group/food relative h-full gap-0 rounded-lg border border-border bg-card py-0 shadow-warm ring-0",
          "transition-all duration-300 ease-out",
          // hover (pointer devices)
          "hover:-translate-y-1 hover:border-gold hover:shadow-warm-lg",
          // press (works on touch)
          "active:translate-y-0 active:scale-[0.99] active:border-gold active:shadow-warm",
          // keyboard focus
          "has-[a:focus-visible]:-translate-y-1 has-[a:focus-visible]:border-gold has-[a:focus-visible]:ring-4 has-[a:focus-visible]:ring-ring/60",
          "motion-reduce:transition-colors motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100 motion-reduce:has-[a:focus-visible]:translate-y-0",
        ].join(" ")}
      >
        <div className="overflow-hidden rounded-t-lg">
          <AspectRatio ratio={4 / 3} className="bg-muted">
            <FoodImage
              src={item.gambar}
              alt={`Hidangan ${item.nama}`}
              name={item.nama}
              sizes="(min-width: 1280px) 296px, (min-width: 1024px) 31vw, (min-width: 640px) 47vw, 100vw"
              className="group-hover/food:scale-105 motion-reduce:group-hover/food:scale-100"
            />
          </AspectRatio>
        </div>

        <CardHeader className="gap-1 px-5 pt-5">
          <h3 className="text-xl leading-snug font-semibold text-primary">{item.nama}</h3>
          <p className="text-sm font-medium text-olive">Kuliner khas Surakarta</p>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col justify-between gap-4 px-5 pt-3 pb-5">
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {item.deskripsi}
          </p>
          <span
            aria-hidden="true"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary"
          >
            Lihat Detail
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/food:translate-x-0.5 group-hover/food:-translate-y-0.5 motion-reduce:transition-none" />
          </span>
        </CardContent>

      </Card>
    </Link>
  );
}
