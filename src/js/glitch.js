import { gsap } from 'gsap'

// Cada rectángulo hace "saltos" glitch en intervalos aleatorios
function jitter(el) {
  const r = gsap.utils.random
  gsap
    .timeline({
      delay: r(0.8, 3),
      onComplete: () => jitter(el),
    })
    .to(el, { x: r(-30, 30), skewX: r(-25, 25), scaleX: r(0.7, 1.4), duration: 0.05 })
    .to(el, { x: r(-30, 30), opacity: 0.3, duration: 0.05 })
    .to(el, { x: 0, skewX: 0, scaleX: 1, opacity: 0.85, duration: 0.08 })
}

export function initGlitch() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  gsap.utils.toArray('[data-glitch-rect]').forEach(jitter)
}
