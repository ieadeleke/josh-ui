"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";


interface Testimonial {
  id: number;
  quote: string;
  boldPart: string;
  name: string;
  title: string;
  cardColor: string;
  stackColors: [string, string, string];
  textColor: string;
  subtitleColor: string;
  imgSrc: string;
}


const testimonials: Testimonial[] = [
  {
    id: 1,
    cardColor: "#FFDC57",
    stackColors: ["#143323", "#57F6A3", "#835EB4"],
    textColor: "#0A0A0A",
    subtitleColor: "#525252",
    quote:
      "\u201cWe used to lose 6 \u2013 8% every time we converted client payments to pay our team in India. With Yolat, we\u2019re keeping more of every invoice.",
    boldPart: "The speed is unreal.\u201d",
    name: "Ebubechi L.",
    title: "CEO Blueprintzz",
    imgSrc: "/images/ebube.svg",
  },
  {
    id: 2,
    cardColor: "#143323",
    stackColors: ["#57F6A3", "#835EB4", "#FFDC57"],
    textColor: "#ffffff",
    subtitleColor: "#F5F5F5",
    quote:
      "\u201cWe used to lose 6 \u2013 8% every time we converted client payments to pay our team in India. With Yolat, we\u2019re keeping more of every invoice.",
    boldPart: "The speed is unreal.\u201d",
    name: "Ebubechi L.",
    title: "CEO Blueprintzz",
    imgSrc: "/images/ebube-2.svg",
  },
  {
    id: 3,
    cardColor: "#57F6A3",
    stackColors: ["#835EB4", "#FFDC57", "#143323"],
    textColor: "#0A0A0A",
    subtitleColor: "#525252",
    quote:
      "\u201cBefore Yolat, paying our international suppliers was slow and unpredictable.",
    boldPart:
      "Now we move funds across the US, UK, and Asia with speed and total clarity.\u201d",
    name: "Kofi D.",
    title: "Manager Pharmaceutical company",
    imgSrc: "/images/koffi.svg",
  },
  {
    id: 4,
    cardColor: "#835EB4",
    stackColors: ["#FFDC57", "#143323", "#57F6A3"],
    textColor: "#ffffff",
    subtitleColor: "#E8DDF6",
    quote:
      "\u201cWe used to lose 6 \u2013 8% every time we converted client payments to pay our team in India. With Yolat, we\u2019re keeping more of every invoice.",
    boldPart: "The speed is unreal.\u201d",
    name: "Kofi D.",
    title: "Founder Hustle Market, Accra",
    imgSrc: "/images/koffi-2.svg",
  },
];

const FAN_ANGLES = [-11, -4, 4, 11];
const FAN_Y = [12, 8, 8, 12];
const FAN_X = [-18, -8, 8, 18];


function AvatarInitials({
  name,
  textColor,
}: {
  name: string;
  textColor: string;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
  return (
    <div
      className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold border-2"
      style={{
        background: "rgba(0,0,0,0.2)",
        borderColor: "rgba(255,255,255,0.25)",
        color: textColor,
      }}
    >
      {initials}
    </div>
  );
}

function ArrowLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <line x1="15.5" y1="10" x2="7.5" y2="10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M11 5.5L6.5 10L11 14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      {/* Stem: left edge → chevron tip */}
      <line
        x1="4.5"
        y1="10"
        x2="12.5"
        y2="10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Chevron head */}
      <path
        d="M9 5.5L13.5 10L9 14.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


const STACK_LAYERS = [
  // [0] closest to top card
  { y: 12, scaleX: 0.96, zIndex: 3 },
  // [1] middle
  { y: 24, scaleX: 0.92, zIndex: 2 },
  // [2] deepest
  { y: 36, scaleX: 0.88, zIndex: 1 },
] as const;


const FAN_PHASE_MS = 360;
const SETTLE_PHASE_MS = 760;


export default function TestimonialsSection() {
  const [cards, setCards] = useState<Testimonial[]>([
    ...testimonials.slice(1),
    testimonials[0],
  ]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [phase, setPhase] = useState<"idle" | "fan" | "shuffle">("idle");
  const [liftingId, setLiftingId] = useState<number | null>(null);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const runShuffle = useCallback((dir: "next" | "prev") => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(dir);
    const topCard = cards[cards.length - 1];
    setLiftingId(topCard.id);
    setPhase("fan");

    setTimeout(() => {
      setPhase("shuffle");
      setCards((prev) => {
        const next = [...prev];
        if (dir === "next") {
          const popped = next.pop();
          if (popped) next.unshift(popped);
        } else {
          const shifted = next.shift();
          if (shifted) next.push(shifted);
        }
        return next;
      });
    }, FAN_PHASE_MS);

    setTimeout(() => {
      setLiftingId(null);
      setPhase("idle");
      setIsAnimating(false);
    }, SETTLE_PHASE_MS);
  }, [cards, isAnimating]);

  const shuffleNext = useCallback(() => runShuffle("next"), [runShuffle]);
  const shufflePrev = useCallback(() => runShuffle("prev"), [runShuffle]);

  // Auto-play effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        shuffleNext();
      }
    }, 5000); // Shuffle every 5 seconds

    return () => clearInterval(interval);
  }, [shuffleNext, isAnimating]);

  const current = cards[cards.length - 1];
  const isFanning = phase === "fan" || phase === "shuffle";

  return (
    <div className="w-full">
      <div className="relative max-w-3xl mx-auto flex flex-col items-center gap-10">
        {/* Badge */}
  
        {/* ── Card Stack ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full max-w-[670px] mx-auto h-[297px] md:h-[357px]"
        >
          {cards.map((card, i) => {
            const fromTop = cards.length - 1 - i;
            const isTop = fromTop === 0;
            const isLifting = card.id === liftingId && isTop;
            const layer = STACK_LAYERS[Math.min(Math.max(fromTop - 1, 0), STACK_LAYERS.length - 1)];
            const dirSign = direction === "next" ? 1 : -1;

            const fanAngle = isFanning ? (FAN_ANGLES[i] ?? 0) * dirSign : 0;
            const fanX = isFanning ? (FAN_X[i] ?? 0) * dirSign : 0;
            
            // Enhanced throw-away animation for the top card
            const throwX = isLifting && phase === "fan" ? 200 * dirSign : 0;
            const throwRotate = isLifting && phase === "fan" ? 15 * dirSign : 0;
            const throwOpacity = isLifting && phase === "fan" ? 0 : 1;

            const targetY = isTop ? 0 : layer.y;
            const targetScale = isTop ? 1 : layer.scaleX;

            return (
              <motion.div
                key={card.id}
                layout
                className="absolute inset-x-0 top-0 rounded-[16px] md:rounded-[22px] md:p-8 p-5 flex flex-col justify-between h-[297px] md:h-[357px]"
                style={{
                  zIndex: i + 1,
                  transformOrigin: "bottom center",
                  willChange: "transform",
                  background: isTop ? card.cardColor : current.stackColors[Math.min(fromTop - 1, current.stackColors.length - 1)],
                }}
                animate={
                  isLifting && phase === "fan"
                    ? {
                        x: throwX,
                        y: 60,
                        rotate: throwRotate,
                        scale: 1.05,
                        opacity: throwOpacity,
                      }
                    : {
                        x: isFanning ? fanX : 0,
                        y: targetY,
                        rotate: isFanning ? fanAngle : 0,
                        scale: targetScale,
                        opacity: 1,
                      }
                }
                transition={{
                  type: "spring",
                  stiffness: isFanning ? 250 : 300,
                  damping: isFanning ? 25 : 30,
                  mass: 0.8,
                  opacity: { duration: 0.4 },
                }}
              >
                {isTop && (
                  <>
                    <p
                      className="md:text-[22px] text-base font-satoshi font-normal text-[#0A0A0A] md:leading-[33px] leading-[25px]"
                      style={{ color: card.textColor }}
                    >
                      {card.quote}{" "}
                      <em>
                        <strong>{card.boldPart}</strong>
                      </em>
                    </p>

                    <div className="flex items-center gap-3 mt-6">
                      <Image src={card.imgSrc} alt={card.name} width={63} height={63} className="w-[45px] h-[45px] md:w-16 md:h-16 " />

                      <div>
                        <p
                          className="font-bold md:text-[22px] text-base font-satoshi md:leading-tight leading-[25px]"
                          style={{ color: card.textColor }}
                        >
                          {card.name}
                        </p>
                        <p
                          className="md:text-base text-xs mt-0.5 font-satoshi"
                          style={{ color: card.subtitleColor }}
                        >
                          {card.title}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center gap-3 mt-8">
          <motion.button
            onClick={shufflePrev}
            whileTap={{ scale: 0.91 }}
            whileHover={{ scale: 1.07 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="w-12 h-12 rounded-full flex items-center justify-center border"
            style={{
              background: "#1a1a1a",
              borderColor: "#1a1a1a",
              color: "#fff",
              cursor: "pointer",
            }}
            aria-label="Previous testimonial"
          >
            <ArrowLeft />
          </motion.button>

          <motion.button
            onClick={shuffleNext}
            whileTap={{ scale: 0.91 }}
            whileHover={{ scale: 1.07 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="w-12 h-12 rounded-full flex items-center justify-center border"
            style={{
              background: "#1a1a1a",
              borderColor: "#1a1a1a",
              color: "#fff",
              cursor: "pointer",
            }}
            aria-label="Next testimonial"
          >
            <ArrowRight />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
