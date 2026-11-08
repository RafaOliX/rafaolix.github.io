import { gsap, ScrollTrigger } from './gsap.js'

export function initScroll() {
  const mm = gsap.matchMedia()

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    // Títulos de sección: wipe lateral
    gsap.utils.toArray('[data-reveal]').forEach((el) => {
      gsap.from(el, {
        clipPath: 'inset(0 100% 0 0)', x: -30, opacity: 0,
        duration: 0.8, ease: 'power4.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
      })
    })

    // Tarjetas: entrada escalonada por lotes
    gsap.set('.card', { opacity: 0, y: 60 })
    ScrollTrigger.batch('.card', {
      start: 'top 92%',
      onEnter: (batch) => gsap.to(batch, {
        opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out', overwrite: true,
      }),
    })
  })
}
