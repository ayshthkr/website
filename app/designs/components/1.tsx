import { motion } from "motion/react";
import Image from "next/image";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";

export default function First() {
  const [, setMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [, setShowCursorMask] = useState(false);
  const [isMaskOverlapping, setIsMaskOverlapping] = useState(false);
  const [maskDistance, setMaskDistance] = useState(0);
  const [overlapDirection, setOverlapDirection] = useState<'none' | 'top' | 'bottom' | 'left' | 'right'>('none');
  const [circleMaskPath, setCircleMaskPath] = useState("");

  // Base clip path points for trapezium - wrapped in useMemo
  const basePoints = useMemo(() => [
    { x: 35, y: 5 },   // top left
    { x: 60, y: 0 },   // top right
    { x: 65, y: 100 }, // bottom right
    { x: 35, y: 100 }, // bottom left
  ], []);

  // Function to check if a point is inside the trapezium polygon
  const isPointInsidePolygon = (
    point: { x: number; y: number },
    polygon: { x: number; y: number }[]
  ) => {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].x;
      const yi = polygon[i].y;
      const xj = polygon[j].x;
      const yj = polygon[j].y;

      const intersect =
        yi > point.y !== yj > point.y &&
        point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  };

  // Function to calculate distance to each edge and return the minimum distance and edge index
  const getDistanceAndEdge = (
    point: { x: number; y: number },
    polygon: { x: number; y: number }[]
  ): { distance: number; edgeIndex: number; closestPoint: { x: number; y: number } } => {
    let minDist = Number.MAX_VALUE;
    let closestEdgeIndex = 0;
    let closestPoint = { x: 0, y: 0 };

    for (let i = 0; i < polygon.length; i++) {
      // Create edge from current point and next point (wrapping around)
      const j = (i + 1) % polygon.length;
      const edge = {
        x1: polygon[i].x,
        y1: polygon[i].y,
        x2: polygon[j].x,
        y2: polygon[j].y,
      };

      // Vector from line start to point
      const v1x = point.x - edge.x1;
      const v1y = point.y - edge.y1;

      // Vector representing the line
      const v2x = edge.x2 - edge.x1;
      const v2y = edge.y2 - edge.y1;

      // Length of line squared
      const lenSq = v2x * v2x + v2y * v2y;

      // Project v1 onto v2
      const t = Math.max(0, Math.min(1, (v1x * v2x + v1y * v2y) / lenSq));

      // Closest point on line
      const projX = edge.x1 + t * v2x;
      const projY = edge.y1 + t * v2y;

      // Distance from point to closest point on line
      const dist = Math.sqrt(Math.pow(point.x - projX, 2) + Math.pow(point.y - projY, 2));

      if (dist < minDist) {
        minDist = dist;
        closestEdgeIndex = i;
        closestPoint = { x: projX, y: projY };
      }
    }

    return { distance: minDist, edgeIndex: closestEdgeIndex, closestPoint };
  };

  // Generate a merged mask path when overlapping
  const generateMergedMaskPath = useCallback(
    (
      cursorPosition: { x: number; y: number },
      baseRadius: number,
      polygon: { x: number; y: number }[],
      direction: 'top' | 'bottom' | 'left' | 'right' | 'none',
      distance: number
    ) => {
      // If not overlapping, just return a circle
      if (direction === 'none' || distance > baseRadius * 1.5) {
        return `circle(${baseRadius}px at ${cursorPosition.x}% ${cursorPosition.y}%)`;
      }

      // Get the closest point on the polygon edge
      const { closestPoint } = getDistanceAndEdge(cursorPosition, polygon);

      // Calculate blending factor based on distance
      // As distance approaches 0, blendFactor approaches 1
      const blendFactor = Math.max(0, Math.min(1, 1 - (distance / (baseRadius * 1.5))));

      // Enhanced radius that grows as we get closer to the edge
      const enhancedRadius = baseRadius * (1 + blendFactor * 1.5);

      // For very close distances, create a special path that "merges" with the trapezium
      if (blendFactor > 0.5) {
        // Calculate control points for the merging effect
        const midX = (cursorPosition.x + closestPoint.x) / 2;
        const midY = (cursorPosition.y + closestPoint.y) / 2;

        // Calculate perpendicular vector to the edge for bulging effect
        let perpX, perpY;
        switch (direction) {
          case 'top':
            perpX = 0;
            perpY = -1;
            break;
          case 'bottom':
            perpX = 0;
            perpY = 1;
            break;
          case 'left':
            perpX = -1;
            perpY = 0;
            break;
          case 'right':
            perpX = 1;
            perpY = 0;
            break;
          default:
            perpX = 0;
            perpY = 0;
        }

        // Calculate bulge amount based on proximity
        const bulgeAmount = baseRadius * blendFactor * 1.2;
        const bulgeX = midX + perpX * bulgeAmount;
        const bulgeY = midY + perpY * bulgeAmount;

        // Calculate angle from cursor to closest point
        const angle = Math.atan2(closestPoint.y - cursorPosition.y, closestPoint.x - cursorPosition.x);

        // Points for bezier curves to create merging effect
        const controlRadius = enhancedRadius * 1.2;
        const control1X = cursorPosition.x + Math.cos(angle + Math.PI/4) * controlRadius;
        const control1Y = cursorPosition.y + Math.sin(angle + Math.PI/4) * controlRadius;
        const control2X = cursorPosition.x + Math.cos(angle - Math.PI/4) * controlRadius;
        const control2Y = cursorPosition.y + Math.sin(angle - Math.PI/4) * controlRadius;

        // Create a path that morphs from circle to a shape that extends toward the polygon edge
        return `path('M ${cursorPosition.x + Math.cos(angle + Math.PI/2) * enhancedRadius}% ${cursorPosition.y + Math.sin(angle + Math.PI/2) * enhancedRadius}% ` +
          `A ${enhancedRadius} ${enhancedRadius} 0 0 1 ${cursorPosition.x + Math.cos(angle - Math.PI/2) * enhancedRadius}% ${cursorPosition.y + Math.sin(angle - Math.PI/2) * enhancedRadius}% ` +
          `Q ${control1X}% ${control1Y}% ${bulgeX}% ${bulgeY}% ` +
          `Q ${control2X}% ${control2Y}% ${cursorPosition.x + Math.cos(angle + Math.PI/2) * enhancedRadius}% ${cursorPosition.y + Math.sin(angle + Math.PI/2) * enhancedRadius}% Z')`;
      }

      // Otherwise just use an enlarged circle
      return `circle(${enhancedRadius}px at ${cursorPosition.x}% ${cursorPosition.y}%)`;
    },
    [getDistanceAndEdge]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();

        const relativeX = (e.clientX - rect.left) / rect.width;
        const relativeY = (e.clientY - rect.top) / rect.height;

        setMousePosition({ x: relativeX, y: relativeY });

        const cursorPosPercent = {
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        };

        setCursorPos(cursorPosPercent);

        // Calculate distance to polygon edges
        const { distance, edgeIndex } = getDistanceAndEdge(
          { x: cursorPosPercent.x, y: cursorPosPercent.y },
          basePoints
        );

        // Convert 40px circle radius to percentage of image dimensions
        const radiusInPercentX = (40 / rect.width) * 100;
        const radiusInPercentY = (40 / rect.height) * 100;

        // Use average of X and Y percentages as our threshold
        const radiusInPercent = (radiusInPercentX + radiusInPercentY) / 2;

        // Check if the cursor is inside or if the circle intersects the polygon
        const isInside = isPointInsidePolygon(
          { x: cursorPosPercent.x, y: cursorPosPercent.y },
          basePoints
        );

        // Get the direction of overlap based on the closest edge
        const edgeDirections = ['top', 'right', 'bottom', 'left'];
        const direction = edgeDirections[edgeIndex] as 'top' | 'right' | 'bottom' | 'left';

        // Circle overlaps when center is inside OR distance to edge is less than radius
        const isOverlapping = isInside || distance < radiusInPercent * 1.5;

        // Set the overlap direction only when overlapping, otherwise 'none'
        const currentDirection = isOverlapping ? direction : 'none';
        setOverlapDirection(currentDirection);

        setMaskDistance(distance);
        setIsMaskOverlapping(isOverlapping);

        // Generate the merged mask path
        const maskPath = generateMergedMaskPath(
          cursorPosPercent,
          40, // Base radius in pixels
          basePoints,
          currentDirection,
          distance
        );
        setCircleMaskPath(maskPath);

        const isOverImage =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        setShowCursorMask(isOverImage);

        if (isOverImage) {
          const centerX = 0.5;
          const centerY = 0.5;
          const distanceX = Math.abs(relativeX - centerX);
          const distanceY = Math.abs(relativeY - centerY);

          const maxRotation = 20;
          const rotateY = (relativeX - centerX) * maxRotation * (1 - distanceX);
          const rotateX =
            (relativeY - centerY) * -maxRotation * (1 - distanceY);

          setRotation({ x: rotateX, y: rotateY });
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [basePoints, generateMergedMaskPath]);

  // Get mask styles based on overlap state
  const getMaskStyles = () => {
    // Base values
    const opacity = isMaskOverlapping ? 1 : 0.85;
    let filter = isMaskOverlapping ? "none" : "grayscale(0.2)";

    // Modify based on direction
    if (isMaskOverlapping) {
      switch (overlapDirection) {
        case 'top':
          filter = "saturate(1.2)";
          break;
        case 'bottom':
          filter = "contrast(1.1)";
          break;
        case 'left':
          filter = "brightness(1.05)";
          break;
        case 'right':
          filter = "hue-rotate(5deg)";
          break;
        default:
          break;
      }
    }

    return { opacity, filter };
  };

  const maskStyles = getMaskStyles();

  // Generate the trapezium clip path
  const trapeziumClipPath = `polygon(${basePoints[0].x}% ${basePoints[0].y}%, ${basePoints[1].x}% ${basePoints[1].y}%, ${basePoints[2].x}% ${basePoints[2].y}%, ${basePoints[3].x}% ${basePoints[3].y}%)`;

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full px-20">
      <motion.div
        ref={imageRef}
        className="relative"
        initial={{ perspective: 1000 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transformStyle: "preserve-3d",
            transition: "transform 0.1s ease-out",
          }}
        >
          <Image
            src={"/batmans.jpg"}
            width={1140}
            height={570}
            alt="batmans"
            className="block w-full h-full object-cover"
            style={{
              clipPath: trapeziumClipPath,
              transition: "clip-path 0.1s ease-out",
            }}
          />

          <Image
            src={"/batmans.jpg"}
            width={1140}
            height={570}
            alt="batmans"
            className="block w-full h-full object-cover absolute top-0 left-0"
            style={{
              clipPath: `${circleMaskPath}`,
              transition: "filter 0.2s ease",
              opacity: maskStyles.opacity,
              filter: maskStyles.filter,
            }}
          />

          {/* Visual indicator for debugging with direction */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: `calc(${cursorPos.y}% - 5px)`,
              left: `calc(${cursorPos.x}% - 5px)`,
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: isMaskOverlapping
                ? overlapDirection === 'top' ? "rgba(0, 255, 0, 0.7)"
                : overlapDirection === 'bottom' ? "rgba(0, 0, 255, 0.7)"
                : overlapDirection === 'left' ? "rgba(255, 255, 0, 0.7)"
                : "rgba(255, 0, 255, 0.7)"
                : "rgba(255, 0, 0, 0.5)",
              zIndex: 10,
              transform: "translate(-50%, -50%)",
              boxShadow: isMaskOverlapping ? "0 0 5px white" : "none"
            }}
          />
        </motion.div>
      </motion.div>

      {/* Status indicator with direction */}
      <div className="mt-4 text-sm font-mono bg-black/80 text-white p-2 rounded flex gap-2">
        <span>Status: {isMaskOverlapping ? 'Overlap' : 'No overlap'}</span>
        <span>|</span>
        <span>Direction: {overlapDirection}</span>
        <span>|</span>
        <span>Distance: {maskDistance.toFixed(2)}</span>
      </div>
    </div>
  );
}
