import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap.js'

const COLORS = ['#c6ff00', '#ff2bd6', '#00f0ff', '#7a5cff']
const rnd = gsap.utils.random

/** Rectángulos flotantes de fondo con movimiento "stepped" + parallax al scroll */
export function initRects(count = 14) {
  const wrap = document.querySelector('#bg-rects')
  if (!wrap) return

  for (let i = 0; i < count; i++) {
    const r = document.createElement('div')
    r.className = 'bg-rect'
    Object.assign(r.style, {
      width: `${rnd(60, 280)}px`, height: `${rnd(40, 200)}px`,
      left: `${rnd(0, 95)}%`, top: `${rnd(0, 95)}%`,
      color: gsap.utils.random(COLORS),
    })
    wrap.appendChild(r)

    if (prefersReducedMotion()) continue

    gsap.to(r, {
      x: rnd(-90, 90), y: rnd(-90, 90), rotation: rnd(-18, 18),
      duration: rnd(3, 6), repeat: -1, yoyo: true, ease: 'steps(6)',
    })
    gsap.to(r, {
      yPercent: rnd(-120, 120), ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: true },
    })
  }
}
