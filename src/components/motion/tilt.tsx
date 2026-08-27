'use client';

import { useRef, useState, useEffect, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * True si l'utilisateur a demande moins d'animation dans son systeme.
 * Toute animation de deplacement doit passer par ce garde-fou.
 */
export function useCalm(): boolean {
  const [calm, setCalm] = useState(false);
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setCalm(m.matches);
    sync();
    m.addEventListener('change', sync);
    return () => m.removeEventListener('change', sync);
  }, []);
  return calm;
}

/**
 * Pointer-driven 3D tilt.
 * Purpose: delight on rare/first-view surfaces (hero, cards you browse, not act on).
 * Gated behind a fine pointer with hover, and off entirely under reduced motion.
 * Springs, never raw pointer binding — a value tied straight to the cursor has
 * no motion of its own and reads as artificial.
 */
export function Tilt({
  children,
  max = 9,
  scale = 1.02,
  className = '',
  glare = false,
}: {
  children: ReactNode;
  max?: number;
  scale?: number;
  className?: string;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setEnabled(fine.matches && !calm.matches);
    sync();
    fine.addEventListener('change', sync);
    calm.addEventListener('change', sync);
    return () => {
      fine.removeEventListener('change', sync);
      calm.removeEventListener('change', sync);
    };
  }, []);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 150, damping: 18, mass: 0.6 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);

  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max]);
  const glareX = useTransform(sx, [-0.5, 0.5], ['20%', '80%']);
  const glareY = useTransform(sy, [-0.5, 0.5], ['15%', '85%']);

  function onMove(e: React.PointerEvent) {
    if (!enabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={enabled ? { rotateX, rotateY, transformStyle: 'preserve-3d' } : undefined}
      whileHover={enabled ? { scale } : undefined}
      transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
      className={`relative ${className}`}
    >
      {children}
      {glare && enabled && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useTransform(
              [glareX, glareY] as never,
              ([x, y]: string[]) =>
                `radial-gradient(600px circle at ${x} ${y}, rgba(255,255,255,0.22), transparent 45%)`
            ),
          }}
        />
      )}
    </motion.div>
  );
}

/**
 * Scroll reveal: content rises once, in place. Content is visible by default
 * if the observer never fires, so a failed script cannot hide the page.
 */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, transform: `translate3d(0, ${y}px, 0)` }}
      whileInView={{ opacity: 1, transform: 'translate3d(0, 0px, 0)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.62, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}
