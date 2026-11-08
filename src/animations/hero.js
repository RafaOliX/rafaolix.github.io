import { gsap, prefersReducedMotion } from './gsap.js'

export function playHero() {
  if (prefersReducedMotion()) return

  gsap.timeline()
    .from('.orb-frame', { scale: 0, rotate: -120, duration: 1.1, ease: 'elastic.out(1, .6)' })
    .from('[data-hero]:not(.orb-frame)', {
      y: 60, opacity: 0, scale: 0.9, stagger: 0.09, duration: 0.7, ease: 'back.out(1.7)',
    }, '-=0.7')

  gsap.to('.orb-frame', { y: -14, duration: 2.4, ease: 'sine.inOut', repeat: -1, yoyo: true })
}
