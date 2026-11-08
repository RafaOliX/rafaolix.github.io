import { gsap, ScrollTrigger, SplitText } from './gsap.js'

export function initScroll() {
  const mm = gsap.matchMedia()

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    // Títulos: letras que rebotan al entrar
    gsap.utils.toArray('[data-split]').forEach((el) => {
      const split = SplitText.create(el, { type: 'chars' })
      gsap.from(split.chars, {
        yPercent: 120, rotate: () => gsap.utils.random(-25, 25), opacity: 0, scale: 0.4,
        duration: 0.8, ease: 'back.out(2.2)', stagger: 0.04,
        scrollTrigger: { trigger: el, start: 'top 85%' },
      })
    })

    gsap.utils.toArray('[data-reveal]').forEach((el) => {
      gsap.from(el, {
        x: -40, opacity: 0, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%' },
      })
    })

    // Tarjetas: entrada escalonada con rebote
    gsap.set('.card', { opacity: 0, y: 90, scale: 0.9, rotation: () => gsap.utils.random(-5, 5) })
    ScrollTrigger.batch('.card', {
      start: 'top 92%', once: true,
      onEnter: (batch) => gsap.to(batch, {
        opacity: 1, y: 0, scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.6)',
        stagger: 0.1, overwrite: true, clearProps: 'transform,opacity',
      }),
    })

    // Inclinación según la velocidad del scroll (sensación "kinetic")
    const proxy = { skew: 0 }
    const setSkew = gsap.quickSetter('[data-skew]', 'skewY', 'deg')
    const clamp = gsap.utils.clamp(-6, 6)
    ScrollTrigger.create({
      onUpdate: (self) => {
        const s = clamp(self.getVelocity() / -300)
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
