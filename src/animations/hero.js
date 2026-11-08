import { gsap, SplitText, prefersReducedMotion } from './gsap.js'

let split

/** Deja el hero oculto mientras corre el loader (evita parpadeos). */
export function prepHero() {
  if (prefersReducedMotion()) return
  gsap.set('[data-hero]', { autoAlpha: 0, y: 36 })
  gsap.set('.photo', { clipPath: 'inset(100% 0% 0% 0%)' })
  split = SplitText.create('.hero-title .line', { type: 'chars' })
  gsap.set(split.chars, { yPercent: 115, rotate: 10 })
}

export function playHero() {
  if (prefersReducedMotion() || !split) return

  gsap.timeline()
    .to(split.chars, { yPercent: 0, rotate: 0, duration: 1.1, ease: 'expo.out', stagger: 0.035 })
    .to('.photo', { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'expo.inOut', clearProps: 'clipPath' }, 0.15)
    .to('[data-hero]', { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08 }, 0.35)

  gsap.to('.photo-wrap', { y: -10, duration: 2.6, ease: 'sine.inOut', repeat: -1, yoyo: true })
  gsap.to('.photo-tag', { rotate: -2, duration: 1.8, ease: 'sine.inOut', repeat: -1, yoyo: true })
}
