import { gsap, prefersReducedMotion } from './gsap.js'

const rnd = gsap.utils.random

/** Ráfagas aleatorias de glitch sobre cualquier elemento .glitch */
export function initGlitch(selector = '.glitch') {
  if (prefersReducedMotion()) return

  document.querySelectorAll(selector).forEach((el) => {
    const burst = () => {
      const tl = gsap.timeline({ onComplete: () => gsap.delayedCall(rnd(2, 6), burst) })
      el.classList.add('is-glitching')

      for (let i = 0; i < 6; i++) {
        tl.set(el, {
          '--gx': `${rnd(-8, 8)}px`,
          '--t1': `${rnd(0, 70)}%`, '--b1': `${rnd(0, 70)}%`,
          '--t2': `${rnd(0, 70)}%`, '--b2': `${rnd(0, 70)}%`,
          skewX: rnd(-8, 8),
        }, i * 0.05)
      }
      tl.set(el, { skewX: 0, '--gx': '0px' }, 0.32)
        .call(() => el.classList.remove('is-glitching'))
    }
    gsap.delayedCall(rnd(1, 3), burst)
  })
}
