"use client";
import { AnimatePresence, motion, Variants } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface HyperTextProps {
  text: string;
  duration?: number;
  framerProps?: Variants;
  className?: string;
}

const runes = "ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛟᛞ".split("");
const getRandomInt = (max: number) => Math.floor(Math.random() * max);

export function HyperText({
  text,
  duration = 800,
  framerProps = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 3 },
  },
  className,
}: HyperTextProps) {
  const [displayText, setDisplayText] = useState(text.split(""));
  const [trigger, setTrigger] = useState(false);
  const interations = useRef(0);
  const [distanceFromCenter, setDistanceFromCenter] = useState(0);

  const triggerAnimation = (distance: number) => {
    interations.current = 0;
    setTrigger(true);
    setDistanceFromCenter(distance);
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const distance = Math.sqrt(
        Math.pow(event.clientX - centerX, 2) + Math.pow(event.clientY - centerY, 2)
      );

      if (distance > 100) {
        triggerAnimation(distance);
      } else {
        setTrigger(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(
      () => {
        if (interations.current < text.length) {
          setDisplayText((t) =>
            t.map((l, i) => {
              if (l === " ") return l;

              // Calculate the number of letters to shuffle based on distance
              const maxDistance = Math.sqrt(
                Math.pow(window.innerWidth / 2, 2) + Math.pow(window.innerHeight / 2, 2)
              );
              const shuffleIntensity = Math.min(4, Math.floor((distanceFromCenter / maxDistance) * 4));

              // Only shuffle letters within the shuffleIntensity range
              if (i >= interations.current && i < interations.current + shuffleIntensity) {
                return runes[getRandomInt(runes.length)]; // Use runes instead of alphabets
              } else if (i <= interations.current) {
                return text[i];
              } else {
                return l;
              }
            }),
          );
          interations.current = interations.current + 0.1;
        } else {
          setTrigger(false);
          clearInterval(interval);
        }
      },
      duration / (text.length * 10),
    );

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [text, duration, trigger, distanceFromCenter]);

  return (
    <div className="flex scale-100 cursor-default overflow-hidden py-2">
      <AnimatePresence>
        {displayText.map((letter, i) => (
          <motion.span
            key={i}
            className={cn("font-mono", letter === " " ? "w-3" : "", className)}
            {...framerProps}
          >
            {letter.toUpperCase()}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
