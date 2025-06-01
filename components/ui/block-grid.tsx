"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";

interface BlockGridProps {
  direction: "topToBottom" | "bottomToTop";
  animate: boolean; // Controls whether animation should play
}

export default function BlockGrid({
  direction,
  animate = true,
}: BlockGridProps) {
  // State to store grid dimensions and the generated grid
  const [grid, setGrid] = React.useState<
    Array<Array<{ id: string; color: string }>>
  >([]);
  // Animation control state
  const [animationState, setAnimationState] = React.useState<
    "hidden" | "visible" | "exiting"
  >("hidden");
  // State for gap between blocks
  const [blockGap, setBlockGap] = React.useState(2);
  // Block size state
  const [blockSize, setBlockSize] = React.useState(50);

  // Effect to update animation state when animate prop changes
  React.useEffect(() => {
    if (animate) {
      setAnimationState("visible");
    } else {
      setAnimationState("exiting");
    }
  }, [animate]);

  // Effect to calculate grid dimensions based on window size
  React.useEffect(() => {
    const calculateGrid = () => {
      if (typeof window !== "undefined") {
        // Get viewport dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Start with a base block size and minimum gap
        const baseBlockSize = 50;
        const minGap = 2;

        // Initial estimate of how many blocks would fit
        const initialCols = Math.floor(viewportWidth / (baseBlockSize + 2 * minGap));
        const initialRows = Math.floor(viewportHeight / (baseBlockSize + 2 * minGap));

        // Calculate the perfect gap to fill the screen completely
        // We need to solve for: n * blockSize + (n+1) * gap = totalSpace
        const idealGapX = (viewportWidth - initialCols * baseBlockSize) / (initialCols + 1);
        const idealGapY = (viewportHeight - initialRows * baseBlockSize) / (initialRows + 1);

        // Use the smaller gap for consistency, but ensure it's at least minGap
        const newGap = Math.max(minGap, Math.min(idealGapX, idealGapY));

        // Recalculate rows and columns with the new gap
        const cols = Math.floor((viewportWidth + newGap) / (baseBlockSize + newGap));
        const rows = Math.floor((viewportHeight + newGap) / (baseBlockSize + newGap));

        // Now we need to adjust either the block size or gap to perfectly fill the space
        // Option 1: Adjust block size
        const adjustedBlockSizeX = (viewportWidth - (cols + 1) * newGap) / cols;
        const adjustedBlockSizeY = (viewportHeight - (rows + 1) * newGap) / rows;
        const newBlockSize = Math.min(adjustedBlockSizeX, adjustedBlockSizeY);

        // Update states
        setBlockGap(newGap);
        setBlockSize(newBlockSize);

        // Create a new grid with updated dimensions
        const newGrid = Array.from({ length: rows }, (_, rowIndex) =>
          Array.from({ length: cols }, (_, colIndex) => ({
            id: `${rowIndex}-${colIndex}`,
            color: getRandomColor(),
          }))
        );

        setGrid(newGrid);
      }
    };

    // Calculate initial grid
    calculateGrid();

    // Add event listener for window resize
    window.addEventListener("resize", calculateGrid);

    // Cleanup
    return () => window.removeEventListener("resize", calculateGrid);
  }, []);

  // Container variants
  const containerVariants = {
    hidden: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: direction === "bottomToTop" ? -1 : 1,
      },
    },
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0,
        staggerDirection: direction === "bottomToTop" ? -1 : 1,
      },
    },
    exiting: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: direction === "bottomToTop" ? -1 : 1,
      },
    },
  };

  // Row variants
  const rowVariants = {
    hidden: {
      transition: {
        staggerChildren: 0.01,
        staggerDirection: 1,
      },
    },
    visible: {
      transition: {
        staggerChildren: 0.01,
        delayChildren: 0,
        staggerDirection: 1,
      },
    },
    exiting: {
      transition: {
        staggerChildren: 0.01,
        staggerDirection: 1,
      },
    },
  };

  // Block variants
  const blockVariants = {
    hidden: {
      opacity: 0,
      y: direction === "bottomToTop" ? 50 : -50,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.5,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.5,
      },
    },
    exiting: {
      opacity: 0,
      y: direction === "bottomToTop" ? -50 : 50,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.5,
      },
    },
  };

  // Calculate opacity for each row (5-100% based on row index)
  const getRowOpacity = (rowIndex: number) => {
    if (grid.length <= 1) return 1; // If there's only one row, full opacity

    // Calculate opacity from 0.05 to 1 based on row index
    const opacityStep = 0.95 / (grid.length - 1);
    return 0.35 + rowIndex * opacityStep;
  };

  return (
    <motion.div
      className="grid-container"
      variants={containerVariants}
      initial="hidden"
      animate={animationState}
      exit="exiting"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        padding: `${blockGap}px`,
        boxSizing: "border-box",
      }}
    >
      <AnimatePresence mode="wait">
        {grid.map((row, rowIndex) => (
          <motion.div
            key={rowIndex}
            className="flex"
            variants={rowVariants}
            style={{
              display: "flex",
              opacity: getRowOpacity(rowIndex),
              width: "100%",
            }}
          >
            {row.map((block) => (
              <motion.div
                key={block.id}
                className="block"
                style={{
                  width: `${blockSize}px`,
                  height: `${blockSize}px`,
                  margin: `${blockGap}px`,
                  backgroundColor: block.color,
                  borderRadius: "4px",
                }}
                variants={blockVariants}
              />
            ))}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

// Helper function to generate random colors
function getRandomColor() {
  // const colors = [
  //   "#FF6B6B",
  //   "#4ECDC4",
  //   "#45B7D1",
  //   "#FFA5A5",
  //   "#98D8C8",
  //   "#F9C784",
  //   "#A5DEF1",
  //   "#D3A5F1",
  //   "#5D5FEF",
  //   "#55D6BE",
  //   "#FF9770",
  //   "#FFD670",
  // ];
  // return colors[Math.floor(Math.random() * colors.length)];
  // For now
  return "#000000";
}
