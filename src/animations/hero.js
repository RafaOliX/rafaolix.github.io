import { gsap, prefersReducedMotion } from './gsap.js'

export function playHero() {
  if (prefersReducedMotion()) return
  gsap.timeline({ defaults: { ease: 'power4.out' } })
    .from('.hero-photo', { clipPath: 'inset(100% 0 0 0)', duration: 1 })
    .from('[data-hero]', { y: 40, opacity: 0, stagger: 0.1, duration: 0.8 }, '-=0.6')
}
