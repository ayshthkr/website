import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Download, Heart, Share2 } from "lucide-react";

export default function ImageGallery() {
  // Configuration constants
  /**
   * Base circle radius - will be adjusted based on viewport size
   * Smaller value for mobile, larger for desktop
   */
  const BASE_CIRCLE_RADIUS = 30;

  // Number of images
  const imageCount = 10;

  const [mainImage, setMainImage] = useState(-1);
  // Track viewport size to adjust circle radius
  const [viewportSize, setViewportSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1920,
    height: typeof window !== "undefined" ? window.innerHeight : 1080,
  });

  // Flag to track if component is mounted (client-side only)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set mounted flag to true after hydration
    setIsMounted(true);

    // Handle window resize events
    const handleResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Initial calculation
    handleResize();

    window.addEventListener("click", (e) => {
      // Check if the click is outside of the images
      const target = e.target as HTMLElement;
      if (!target.tagName.match(/IMG/i) && !target.classList.contains("overlay")) {
        setMainImage(-1); // Reset main image on outside click
      }
    });
    window.addEventListener("keydown", (e) => {
      setMainImage(-1); // Reset main image on Escape key press
    });

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", () => {
        setMainImage(-1);
      });
      window.removeEventListener("keydown", () => {
        setMainImage(-1);
      });
    };
  }, []);

  // Calculate responsive circle radius based on viewport dimensions
  const getResponsiveRadius = () => {
    // Use the smaller dimension (width or height) to calculate radius
    const smallerDimension = Math.min(viewportSize.width, viewportSize.height);

    // Base calculation
    let radius = BASE_CIRCLE_RADIUS;

    // Adjust for smaller screens
    if (smallerDimension < 600) {
      // Much smaller radius for mobile
      radius = 15;
    } else if (smallerDimension < 900) {
      // Medium radius for tablets
      radius = 20;
    }

    // Convert to vh units but cap at a reasonable maximum
    return Math.min(radius, 35);
  };

  // Calculated responsive radius
  const CIRCLE_RADIUS = getResponsiveRadius();

  return (
    <div className="w-full h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute left-8 top-8 text-5xl md:text-9xl font-black max-w-[10vw] emph !leading-[0.80] tracking-tight">Image Gallery
        <p className="text-3xl tracking-normal">(animated)</p>
      </div>
      {Array.from({ length: imageCount }, (_, i) => {
        // Calculate the angle for each image (in radians)
        const angle = (i / imageCount) * 2 * Math.PI;
        // Calculate x and y positions on the circle using vh units for consistent height constraints
        const x = Math.cos(angle) * CIRCLE_RADIUS;
        const y = Math.sin(angle) * CIRCLE_RADIUS;

        // Determine hover direction based on position in circle
        // Smaller hover offset for smaller screens
        const hoverOffset = viewportSize.width < 600 ? 2 : 5;

        // Calculate hover movement direction based on image's position on the circle
        const hoverX = Math.cos(angle) * hoverOffset;
        const hoverY = Math.sin(angle) * hoverOffset;

        return (
          <div key={i}>
          <motion.img
            id={mainImage === i ? "" : "notselected"}
            onClick={() => {
              setMainImage(i);
            }}
            src={getRandomImageUrl(i)}
            alt={`Image ${i}`}
            // Add responsive width classes instead of inline style width
            className={`peer aspect-[9/16] absolute object-cover rounded-md shadow-lg hover:cursor-pointer w-[20vw] md:w-[10vw]`}
            style={{
              // Use opacity 0 initially, and only show and position after hydration
              opacity: isMounted ? 1 : 0,
              // Only apply transform after hydration to avoid mismatch
              transform: isMounted ? `translate(-50%, -50%) translate(${x}vh, ${y}vh)` : 'translate(-50%, -50%)',
              top: "50%",
              left: "50%",
              zIndex: i,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              // Add transition for smooth appearance after hydration
              transition: 'opacity 0.3s ease-in-out'
            }}
            whileHover={
              mainImage != i && isMounted
                ? {
                    scale: 1.05,
                    transform: `translate(-50%, -50%) translate(${
                      x + hoverX
                    }vh, ${y + hoverY}vh)`,
                  }
                : {}
            }
            animate={
              isMounted ? (
                mainImage === i
                  ? {
                      transform: "translate(-50%, -50%)",
                      zIndex: 1000,
                      scale: 2,
                    }
                  : mainImage !== -1
                  ? {
                      scale: 1.05,
                      transform: `translate(-50%, -50%) translate(${
                        x + hoverX
                      }vh, ${y + hoverY}vh)`,
                      zIndex: i,
                    }
                  : {
                      transform: `translate(-50%, -50%) translate(${x}vh, ${y}vh)`,
                      zIndex: i,
                    }
              ) : {}
            }
          />

          {/* Image overlay with action icons - only shown when image is selected */}
          {mainImage === i && (
            <motion.div
              className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm p-2 rounded-full flex gap-3 z-[1001]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Heart className="w-5 h-5 text-white hover:text-red-500 cursor-pointer transition-colors overlay" />
              <Download className="w-5 h-5 text-white hover:text-blue-400 cursor-pointer transition-colors overlay" />
              <Share2 className="w-5 h-5 text-white hover:text-green-400 cursor-pointer transition-colors overlay" />
            </motion.div>
          )}
          </div>
        );
      })}
    </div>
  );
}

function getRandomImageUrl(index: number = 0) {
  // Using index as part of the seed ensures each image is different
  return `/lowres/${index + 1}.avif`;
}
