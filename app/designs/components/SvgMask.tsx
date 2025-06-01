import { motion, useMotionTemplate, useScroll, useSpring, useTransform } from "motion/react";
const springVars = {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001
};
export default function SvgMask() {
  const { scrollYProgress } = useScroll();
  const maskSize = useSpring(
    useTransform(scrollYProgress, [0, 1], [400, 14000]),
    springVars
  );
  const maskPosition = useSpring(
    useTransform(scrollYProgress, [0, 1], [100, -1800]),
    springVars
  );
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);
  const outerImageOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const whiteFillOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
  return (
    <div className="h-[200vh] bg-black">
      {/* outer image */}
      <motion.div
        style={{
          scale: imageScale,
          opacity: outerImageOpacity,
        }}
        className="fixed inset-0 h-full w-full bg-[url(/batmans.jpg)] bg-fixed bg-cover"
      ></motion.div>
      {/* mask */}
      <motion.div
        className=" fixed flex m-auto w-full h-full inset-0 [mask-image:url(/name.svg)] [mask-repeat:no-repeat] "
        style={{
          maskSize: useMotionTemplate`${maskSize}px`,
          maskPosition: useMotionTemplate`center ${maskPosition}px`,
        }}
      >
        {/* inner image */}
        <motion.div
          style={{
            scale: imageScale,
          }}
          className="fixed inset-0 h-full w-full bg-[url(/batmans.jpg)] bg-fixed bg-cover"
        ></motion.div>
        <motion.div
          style={{
            opacity: whiteFillOpacity,
          }}
          className="fixed inset-0 h-full w-full bg-white"
        ></motion.div>
      </motion.div>
    </div>
  );
}
