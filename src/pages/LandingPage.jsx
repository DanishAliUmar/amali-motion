import React, { useEffect, useRef, useState } from 'react';
import { useScroll, motion, useTransform, useMotionValueEvent } from 'framer-motion';

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const [isHeadingLoading, setIsHeadingLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsHeadingLoading(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  // const opacity = useTransform(scrollY, [0, windowHeight], [1, 0])


  return (
    <>
      <main className="overflow-hidden">
        <div className={`loading__overlay backdrop-blur w-full h-full fixed bg-white/10 left-0 top-0 z-10 duration-[3s] transition-all pointer-events-none ${isLoading ? "opacity-100" : "opacity-0"}`}></div>
        <HeroSection isLoading={isLoading} isHeadingLoading={isHeadingLoading} />
        <Architecture />
        <div className="h-[200vh]"></div>
      </main>
    </>
  );
}



{/* HeroSection */ }
const HeroSection = ({ isLoading, isHeadingLoading }) => {
  const ref = useRef()
  const { scrollY, scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const H1Opacity = useTransform(scrollYProgress, [0, 0.25, 1], [(isHeadingLoading ? 0 : 1), 0, 0])
  // const H2Opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 0, 1, 0])
  // const backdropColor = useTransform(
  //   scrollYProgress,
  //   [0, 0.6, 1],
  //   ["rgba(0, 0, 0, 0.5)", "rgba(0, 0, 0, 0.5)", "rgba(0, 0, 0, 0.1)"]
  // );
  // const backdropOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1])
  // const position = useTransform(scrollYProgress, [0, 0.9999, 1], ['fixed', 'fixed', 'absolute']);
  // useMotionValueEvent(scrollYProgress, "change", (latest) => console.log(latest))
  return (
    <motion.section ref={ref} className='HeroSection h-screen relative'>
      <img src="src/assets/Artboard-1-1.jpg" alt="Hero Image" className={`w-full h-[500%] object-cover scale-[2] duration-1000 transition-all ${isLoading ? "object-[0_0%] brightness-90" : "object-[0_128%] brightness-100"}`} />
      <motion.h1 style={{ opacity: H1Opacity }} className={`absolute left-1/2 -translate-x-1/2 text-center drop-shadow-2xl ease-in-out transition-all uppercase text-white font-light leading-[1.3] tracking-widest text-5xl whitespace-nowrap top-[30vh]`}>
        Discover an exclusive <br />island sanctuary on Dubai's<br />iconic archipelago
      </motion.h1>
      {/* <motion.div style={{
        opacity: backdropOpacity,
        backgroundColor: backdropColor,
        position: position
      }} className="fixed top-0 left-0 pointer-events-none w-screen h-screen z-10 backdrop-blur-[15px]">
        <motion.h2 style={{ opacity: H2Opacity }} className={`absolute left-1/2 -translate-x-1/2 text-center ease-in-out text-white font-light leading-[1.3] tracking-widest text-5xl top-[30vh]`}>
          A COLLECTION OF
          <br />DISTINGUISHED RESIDENCES IN
          <br />TWO ARCHITECTURAL STYLES
        </motion.h2>
      </motion.div> */}
    </motion.section>
  )
}
// Architecture Section
const Architecture = () => {
  const ref = useRef()
  const { scrollY, scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"]
  })
  const H2Opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 0, 1, 0])
  const backdropColor = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    ["rgba(0, 0, 0, 0.5)", "rgba(0, 0, 0, 0.5)", "rgba(0, 0, 0, 0.1)"]
  );
  const backdropOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.8], [0, 1, 1, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.50, 1], [0, 0.2, 1])
  useMotionValueEvent(scrollYProgress, "change", (latest) => console.log(latest))
  return (
    <motion.section ref={ref} className="architectureSection h-[180vh] relative overflow-hidden">
      <motion.img src="src/assets/Grande-Home-2-1.jpg" style={{ opacity: opacity }} alt="architecture Image" className={`w-full h-full object-cover transition-all uppercase`} />
      <motion.div style={{
        opacity: backdropOpacity,
        backgroundColor: backdropColor,
      }} className="fixed top-0 left-0 pointer-events-none w-screen h-screen z-10 backdrop-blur-[15px]">
        <motion.h2 style={{ opacity: H2Opacity }} className={`absolute left-1/2 -translate-x-1/2 text-center ease-in-out text-white font-light leading-[1.3] tracking-widest text-5xl top-[30vh]`}>
          A COLLECTION OF
          <br />DISTINGUISHED RESIDENCES IN
          <br />TWO ARCHITECTURAL STYLES
        </motion.h2>
      </motion.div>
    </motion.section>
  )
}