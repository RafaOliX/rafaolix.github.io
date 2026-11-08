import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap.js'

/** Cinta infinita que se acelera (y cambia de dirección) con la velocidad del scroll. */
export function initMarquee() {
  const track = document.querySelector('.marquee-track')
  if (!track || prefersReducedMotion()) return

  const tween = gsap.to(track, { xPercent: -50, duration: 30, ease: 'none', repeat: -1 })

  ScrollTrigger.create({
    onUpdate: (self) => {
      const dir = self.direction
      gsap.timeline({ defaults: { overwrite: true } })
        .to(tween, { timeScale: dir * (1 + Math.abs(self.getVelocity()) / 250), duration: 0.1 })
        .to(tween, { timeScale: dir, duration: 0.8 })
    },
  })
}
