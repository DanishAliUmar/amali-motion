import React, { useEffect, useRef, useState } from 'react';
import { ReactLenis } from 'lenis/dist/lenis-react'
import { useScroll, motion, useTransform, useInView, useMotionValueEvent } from 'framer-motion';

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
      <ReactLenis root>
        <main className="overflow-hidden">
          <div className={`loading__overlay backdrop-blur w-full h-full fixed bg-white/10 left-0 top-0 z-10 duration-[3s] transition-all pointer-events-none ${isLoading ? "opacity-100" : "opacity-0"}`}></div>
          <HeroSection isLoading={isLoading} isHeadingLoading={isHeadingLoading} />
          <Architecture />
          <ArchitectureDistortion />
        </main>
      </ReactLenis>
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
  return (
    <motion.section ref={ref} className='HeroSection h-screen relative'>
      <img src="src/assets/Artboard-1-1.jpg" alt="Hero Image" className={`w-full h-[500%] object-cover scale-[2] duration-1000 transition-all ${isLoading ? "object-[0_0%] brightness-90" : "object-[0_128%] brightness-100"}`} />
      <motion.h1 style={{ opacity: H1Opacity }} className={`absolute left-1/2 -translate-x-1/2 text-center drop-shadow-2xl ease-in-out transition-all uppercase text-white font-light leading-[1.3] tracking-widest text-5xl whitespace-nowrap top-[30vh]`}>
        Discover an exclusive <br />island sanctuary on Dubai's<br />iconic archipelago
      </motion.h1>
    </motion.section>
  )
}
// Architecture Section
const Architecture = () => {
  const [sectionInview, setSectionInview] = useState(false)
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
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0, 0.2, 1, 1])
  const objectPosition = useTransform(
    scrollYProgress,
    [0, 1],
    ["0 0", "0 -120px"]
  );

  const isInView = useInView(ref)

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log(latest, 'latest');

    setSectionInview(isInView && scrollYProgress.get() === 1)
  })

  useEffect(() => {
    setSectionInview(isInView && scrollYProgress.get() === 1)
  }, [isInView])

  const fixedStyle = {
    position: "fixed",
    width: "100vw",
    height: "100vh",
    top: 0,
    left: 0,
    zIndex: 99,
    PointerEvent: "none",
    paddingRight: `17px`,
  };

  return (
    <motion.section ref={ref} className="architectureSection h-[180vh] relative overflow-hidden">
      <ArchitectureTrakingBox sectionInview={sectionInview} fixedStyle={fixedStyle} opacity={opacity} objectPosition={objectPosition} />
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

const ArchitectureTrakingBox = ({ sectionInview, fixedStyle, opacity, objectPosition }) => {
  const ref = useRef()
  const { scrollY, scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "end start"]
  })
  const opacityBox = useTransform(scrollYProgress, [0, 1], [1, 1])
  useMotionValueEvent(scrollYProgress, "change", (latest) => console.log(latest, 'TrakingBox'))
  console.log(scrollYProgress.get(), 'console.log(scrollYProgress.get())')
  return (
    <>
      <motion.div ref={ref} style={{ opacity: opacityBox }} className='z-999 absolute bottom-0 w-screen h-screen bg-black'></motion.div>
      <motion.div style={sectionInview ? fixedStyle : {}} className="">
        <motion.img src="src/assets/Grande-Home-2-1.jpg" style={{ opacity: opacity, objectPosition: sectionInview ? "0 -650px" : objectPosition }} alt="architecture Image" className={`w-full h-full object-cover object-[0_-240px] scale-150 uppercase`} />
        <div className="flex items-center px-24 gap-48 text-[250px] text-white absolute bottom-0 left-0">
          <p className="italic">Grande</p>
          <p className="italic">Minima</p>
        </div>
      </motion.div>
    </>
  )
}

// Architecture Distortion Section
const ArchitectureDistortion = () => {
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
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0, 0.2, 1, 1])
  const objectPosition = useTransform(
    scrollYProgress,
    [0, 1],
    ["0 0", "0 -240px"]
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => console.log(latest, 'section 2'))
  return (
    <motion.section ref={ref} className="architectureDistortionSection bg-red-50 0 h-[180vh] relative overflow-hidden">

    </motion.section>
  )
}