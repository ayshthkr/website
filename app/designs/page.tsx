"use client";

import { useSearchParams } from "next/navigation";
import First from "./components/1";
import { JSX, Suspense, useEffect, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import BlockGrid from "@/components/ui/block-grid";
import ImageGallery from "./components/ImageGallery";
import StackedCards from "./components/3";
import SecondStackedCards from "./components/SecondStackedCards";
import SvgMask from "./components/SvgMask";

const components: { [key: string]: JSX.Element } = {
  "1": <ImageGallery />,
  "2": <First />,
  "3": <StackedCards />,
  "4": <SecondStackedCards />,
  "5": <SvgMask />,
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <MainPage />
    </Suspense>
  );
}

function MainPage() {
  const searchParams = useSearchParams();
  let id = searchParams.get("id") || "1";

  const [showControls, setShowControls] = useState(false);
  const [animateGrid, setAnimateGrid] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX } = e;
      const screenWidth = window.innerWidth;
      const isLeft = clientX < screenWidth * 0.1;
      const isRight = clientX > screenWidth * 0.9;
      setShowControls(isLeft || isRight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        toast("Go to the left or right edge of screen to show controls", {
          style: {
            display: "flex",
            justifyContent: "center",
          },
        });
      }
    });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const increaseComponent = () => {
    const currentId = parseInt(id);
    const nextId =
      currentId + 1 > Object.keys(components).length ? 1 : currentId + 1;
    id = nextId.toString();
    window.history.pushState({}, "", `?id=${id}`);
    setAnimateGrid(true);

    // Reset animation state after a delay
    setTimeout(() => {
      setAnimateGrid(false);
    }, 1500);

    toast(
      "Now showing component " + id + " of " + Object.keys(components).length,
      {
        style: {
          display: "flex",
          justifyContent: "center",
        },
      }
    );
  };
  const decrementComponent = () => {
    setAnimateGrid(true);
    const currentId = parseInt(id);
    const nextId =
      currentId - 1 < 1 ? Object.keys(components).length : currentId - 1;
    id = nextId.toString();
    window.history.pushState({}, "", `?id=${id}`);

    // Reset animation state after a delay
    setTimeout(() => {
      setAnimateGrid(false);
    }, 1500);

    toast(
      "Now showing component " + id + " of " + Object.keys(components).length,
      {
        style: {
          display: "flex",
          justifyContent: "center",
        },
      }
    );
  };
  return (
    <AnimatePresence>
      <div className="w-full h-full overflow-x-clip relative bg-[#f0f0f0]">
        {showControls && (
          <>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              onClick={decrementComponent}
              className="absolute z-10 left-0 top-0 -translate-y-1/2 hover:bg-black/5 bottom-0 h-screen  flex items-center p-4 transition cursor-pointer"
            >
              <ArrowLeftIcon />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              onClick={increaseComponent}
              className="absolute z-10 right-0 top-0 -translate-y-1/2 hover:bg-black/5 bottom-0 h-screen  flex items-center p-4 transition cursor-pointer"
            >
              <ArrowRightIcon />
            </motion.div>
          </>
        )}
        {animateGrid && (
          <div className="absolute inset-0 z-100">
            <BlockGrid direction="topToBottom" animate={animateGrid} />
          </div>
        )}
        {components[id || "1"]}
      </div>
    </AnimatePresence>
  );
}
