import React, { useEffect, useState } from 'react';
import { motion, useScroll, useMotionValue, useTransform, useAnimationFrame } from 'framer-motion';

const NUM_BUBBLES = 40;

type Bubble = {
  id: number;
  baseSize: number;
  x: number;
  y: number;
  colorGradient: string;
  layer: number;
  driftSpeed: number;
  floatSpeed: number;
  scaleFactor: number;
};

const InteractiveBubbleBackground: React.FC = () => {
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [time, setTime] = useState(0);
  const { scrollYProgress } = useScroll();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxX = useTransform(mouseX, [0, dimensions.width], [-80, 80]);
  const parallaxY = useTransform(mouseY, [0, dimensions.height], [-50, 50]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    let lastY = window.scrollY;
    let lastTime = Date.now();
    let velocity = 0;
    let raf: number;

    const update = () => {
      setScrollVelocity((prev) => prev * 0.9 + velocity * 0.1);
      velocity *= 0.9;
      raf = requestAnimationFrame(update);
    };

    const onScroll = () => {
      const now = Date.now();
      const dy = window.scrollY - lastY;
      const dt = now - lastTime || 1;
      velocity = Math.min(Math.abs(dy / dt) * 200, 100);
      lastY = window.scrollY;
      lastTime = now;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const bubbleColors = [
      ['#ffffff', '#e2e8f0', '#cbd5e1'],
      ['#f8fafc', '#e2e8f0', '#cbd5e1'],
      ['#f4f1ff', '#e3defe', '#d1c4ff'],
    ];
    setBubbles(
      Array.from({ length: NUM_BUBBLES }).map((_, i) => {
        const layer = i % 3;
        const color = bubbleColors[layer];
        return {
          id: i,
          baseSize: 50 + Math.random() * 70 * (1 - layer * 0.2),
          x: Math.random() * dimensions.width,
          y: Math.random() * dimensions.height,
          colorGradient: `radial-gradient(circle at center, ${color[0]} 0%, ${color[1]} 50%, ${color[2]} 100%)`,
          layer,
          driftSpeed: 0.2 + Math.random() * 0.4,
          floatSpeed: 0.2 + Math.random() * 0.4,
          scaleFactor: 0.5 + Math.random(),
        };
      })
    );
  }, [dimensions]);

  useAnimationFrame((t) => setTime(t / 1000));

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.8]);
  const backgroundBlur = useTransform(scrollYProgress, [0, 1], [0, 6]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.02]);
  const backgroundFilter = useTransform(backgroundBlur, (v) => `blur(${v}px)`);

  return (
    <motion.div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      style={{
        opacity: backgroundOpacity,
        scale: backgroundScale,
        filter: backgroundFilter,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0] opacity-90" />

      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,...')]" />

      {bubbles.map((bubble) => {
        const speedFactor = 1 + scrollVelocity / 230;
        const driftX = Math.sin(time * bubble.driftSpeed * speedFactor + bubble.id) * 50;
        const driftY = Math.cos(time * bubble.floatSpeed * speedFactor + bubble.id) * 40;
        const scale = 1 + (scrollVelocity / 1000) * bubble.scaleFactor;

        return (
          <motion.div
            key={bubble.id}
            className="absolute rounded-full"
            style={{
              width: bubble.baseSize,
              height: bubble.baseSize,
              background: bubble.colorGradient,
              left: bubble.x + driftX + parallaxX.get() * (0.2 + bubble.layer * 0.3),
              top: bubble.y + driftY + parallaxY.get() * (0.2 + bubble.layer * 0.3),
              opacity: 0.8 - bubble.layer * 0.1,
              filter: `blur(${(3 - bubble.layer) * 1.5}px)`,
              mixBlendMode: 'screen',
            }}
            animate={{ scale: [1, scale, 1] }}
            transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
          />
        );
      })}
    </motion.div>
  );
};

export default InteractiveBubbleBackground;
