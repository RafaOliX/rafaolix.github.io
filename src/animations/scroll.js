import { gsap, ScrollTrigger, SplitText } from './gsap.js'

export function initScroll() {
  const mm = gsap.matchMedia()

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    // Títulos: letras que suben desde una máscara
    gsap.utils.toArray('[data-split]').forEach((el) => {
      const split = SplitText.create(el, { type: 'chars' })
      gsap.from(split.chars, {
        yPercent: 110, rotate: () => gsap.utils.random(-12, 12), duration: 0.9, ease: 'expo.out', stagger: 0.035,
        scrollTrigger: { trigger: el, start: 'top 88%' },
      })
    })

    gsap.utils.toArray('[data-reveal]').forEach((el) => {
      gsap.from(el, {
        x: -30, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 92%' },
      })
    })

    // Números gigantes de contorno: derivan en horizontal
    gsap.utils.toArray('[data-drift]').forEach((el) => {
      gsap.fromTo(el, { xPercent: 25 }, {
        xPercent: -35, ease: 'none',
        scrollTrigger: { trigger: el.closest('.section'), start: 'top bottom', end: 'bottom top', scrub: true },
      })
    })

    // Hero: las dos líneas del nombre se separan en sentidos opuestos
    const heroST = { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
    gsap.to('.hero-title .line:nth-child(1)', { xPercent: -12, ease: 'none', scrollTrigger: heroST })
    gsap.to('.hero-title .line:nth-child(2)', { xPercent: 12, ease: 'none', scrollTrigger: heroST })
    gsap.to('.photo-wrap', { yPercent: -12, ease: 'none', scrollTrigger: heroST })

    // Tarjetas: entrada con perspectiva 3D
    gsap.set('.card', { opacity: 0, y: 70, rotateX: 24, transformPerspective: 900, transformOrigin: '50% 0%' })
    ScrollTrigger.batch('.card', {
      start: 'top 92%', once: true,
      onEnter: (batch) => gsap.to(batch, {
        opacity: 1, y: 0, rotateX: 0, duration: 0.9, ease: 'expo.out',
        stagger: 0.08, overwrite: true, clearProps: 'transform,opacity',
      }),
    })

    // Inclinación sutil según la velocidad del scroll
    const proxy = { skew: 0 }
    const setSkew = gsap.quickSetter('[data-skew]', 'skewY', 'deg')
    const clamp = gsap.utils.clamp(-2.5, 2.5)
    ScrollTrigger.create({
      onUpdate: (self) => {
        const s = clamp(self.getVelocity() / -400)
        if (Math.abs(s) > Math.abs(proxy.skew)) {
          proxy.skew = s
          gsap.to(proxy, {
            skew: 0, duration: 0.8, ease: 'power3', overwrite: true,
            onUpdate: () => setSkew(proxy.skew),
          })
        }
      },
    })
  })
}
