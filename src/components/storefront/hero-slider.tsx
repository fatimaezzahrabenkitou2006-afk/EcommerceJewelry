"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useShopping } from "./shopping-provider";

const slides = [
  {
    image: "hero",
    alt: "Une femme portant une parure de diamants Éclat Joaillerie",
    title: (
      <>
        La joaillerie qui
        <br />
        sublime{" "}
        <em>
          chaque
          <br />
          instant
        </em>
      </>
    ),
    description: (
      <>
        Des créations d’exception, où l’élégance
        <br />
        intemporelle rencontre l’éclat de la modernité.
      </>
    ),
    cta: "Découvrir la collection",
    href: "/collections",
    layout: "signature",
  },
  {
    image: "seasonal",
    alt: "Collier et boucles d’oreilles Lumière Éternelle sur une pierre naturelle",
    title: (
      <>
        Lumière
        <br />
        <em>Éternelle</em>
      </>
    ),
    description: (
      <>
        Une collection lumineuse et sophistiquée,
        <br />
        inspirée par la beauté des instants précieux.
      </>
    ),
    cta: "Explorer Lumière Éternelle",
    href: "/lumiere-eternelle",
    layout: "editorial",
  },
];
export function HeroSlider() {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const motionPreference = useReducedMotion();
  const { ready } = useShopping();
  const reducedMotion = ready && motionPreference;
  const region = useRef<HTMLElement>(null);
  useEffect(() => {
    if (paused || interacting || reducedMotion) return;
    const interval = window.setInterval(() => {
      if (
        !document.hidden &&
        region.current &&
        region.current.getBoundingClientRect().bottom > 0
      )
        setSlide((current) => (current + 1) % slides.length);
    }, 10_000);
    return () => window.clearInterval(interval);
  }, [paused, interacting, reducedMotion, slide]);
  const current = slides[slide];
  const duration = reducedMotion ? 0 : 1.8;
  return (
    <section
      ref={region}
      className={`hero animated-hero hero-layout-${current.layout}`}
      aria-label="Collections Éclat Joaillerie"
      aria-roledescription="carrousel"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setInteracting(false);
      }}
    >
      <div className="hero-texture" />
      <AnimatePresence initial={false}>
        <motion.div
          key={`image-${slide}`}
          className={`hero-photo slide-image slide-image-${current.layout}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="hero-image-inner"
            initial={{ scale: 1 }}
            animate={{
              scale: reducedMotion ? 1 : 1.035,
              x: reducedMotion || slide === 0 ? 0 : "-1%",
            }}
            transition={{ duration: reducedMotion ? 0 : 12, ease: "linear" }}
          >
            <Image
              src={`/images/eclat/${current.image}.webp`}
              alt={current.alt}
              fill
              sizes="(max-width: 600px) 100vw, 65vw"
              quality={95}
              priority
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={`copy-${slide}`}
          className={`hero-copy slide-copy slide-copy-${current.layout}`}
          initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reducedMotion ? 0 : -10 }}
          transition={{
            duration: reducedMotion ? 0 : 1.2,
            delay: reducedMotion ? 0 : 0.28,
            ease: [0.22, 1, 0.36, 1],
          }}
          aria-live={paused || interacting || reducedMotion ? "polite" : "off"}
        >
          {slide === 1 && (
            <motion.span
              className="hero-eyebrow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reducedMotion ? 0 : 0.5, duration }}
            >
              Collection Signature
            </motion.span>
          )}
          <h1>{current.title}</h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration, delay: reducedMotion ? 0 : 0.35 }}
          >
            {current.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration, delay: reducedMotion ? 0 : 0.55 }}
          >
            <Button
              className="outline-cta dark-cta"
              nativeButton={false}
              role="link"
              render={<Link href={current.href} />}
            >
              {current.cta}
              <ArrowRight aria-hidden="true" />
            </Button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
      <div className="hero-slider-controls">
        <div className="slide-dots" aria-label="Diapositives">
          {slides.map((item, index) => (
            <Button
              key={item.image}
              variant="ghost"
              className={slide === index ? "selected" : ""}
              onClick={() => setSlide(index)}
              aria-label={`Afficher la diapositive ${index + 1}`}
              aria-pressed={slide === index}
            />
          ))}
        </div>
        <Button
          className="slider-pause"
          variant="ghost"
          size="icon"
          onClick={() => setPaused((value) => !value)}
          aria-label={
            paused ? "Reprendre le défilement" : "Mettre le défilement en pause"
          }
        >
          {paused || reducedMotion ? (
            <Play aria-hidden="true" />
          ) : (
            <Pause aria-hidden="true" />
          )}
        </Button>
      </div>
    </section>
  );
}
