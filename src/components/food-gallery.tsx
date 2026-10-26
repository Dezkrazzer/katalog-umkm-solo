"use client";

import { MotionConfig, motion, useReducedMotion, type Variants } from "motion/react";

import { daftarKuliner } from "@/data/foodData";
import { FoodCard } from "@/components/food-card";
import { DemoNotice } from "@/components/demo-notice";
import { OrnamentDivider } from "@/components/ornament-divider";
import { GALLERY_HEADING_ID, GALLERY_ID } from "@/components/hero-section";

export function FoodGallery() {
  const reduceMotion = useReducedMotion();

  const list: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.07 } },
  };
  const card: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.45, ease: "easeOut" },
    },
  };

  return (
    <MotionConfig reducedMotion="user">
      <section
        id={GALLERY_ID}
        aria-labelledby={GALLERY_HEADING_ID}
        className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center text-center">
          <OrnamentDivider className="mb-6" />
          <h2
            id={GALLERY_HEADING_ID}
            tabIndex={-1}
            className="scroll-mt-24 text-3xl font-semibold tracking-tight text-primary outline-none sm:text-4xl"
          >
            Daftar Kuliner
          </h2>
          <p className="mt-3 max-w-prose text-base text-muted-foreground">
            Pilih hidangan untuk membaca kisah, cita rasa, dan alamat warungnya.
          </p>
          <DemoNotice className="mt-6 text-left" />
        </div>

        <motion.ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          variants={list}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {daftarKuliner.map((item) => (
            <motion.li key={item.slug} variants={card} className="h-full">
              <FoodCard item={item} />
            </motion.li>
          ))}
        </motion.ul>
      </section>
    </MotionConfig>
  );
}
