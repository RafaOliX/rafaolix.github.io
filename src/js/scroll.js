import { gsap } from 'gsap'

export function initScroll() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  // Reveal con clip-path estilo "corte"
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      clipPath: 'inset(0 100% 0 0)',
      x: -40,
      opacity: 0,
      duration: 0.9,
      ease: 'power4.out',
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
    })
  })

  // Parallax de rectángulos
  gsap.utils.toArray('[data-parallax]').forEach((el) => {
    gsap.to(el, {
      y: Number(el.dataset.parallax),
      ease: 'none',
      scrollTrigger: { trigger: el.closest('section'), start: 'top top', end: 'bottom top', scrub: true },
    })
  })
}
