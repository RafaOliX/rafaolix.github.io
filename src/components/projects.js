import { projects } from '../data/projects.js'
import { gsap, prefersReducedMotion } from '../animations/gsap.js'

const base = import.meta.env.BASE_URL
const path = (file) => `${base}assets/proyectos/${file}`
const isVideo = (file) => /\.(mp4|webm)$/i.test(file)
const pad = (n) => String(n).padStart(2, '0')
const ACCENTS = ['var(--color-vermilion)', 'var(--color-violet)', 'var(--color-pink)']

function swap(card, project, i) {
  const stage = card.querySelector('.stage')
  const img = stage.querySelector('img')
  const video = stage.querySelector('video')
  const file = project.media[i]
  const k = prefersReducedMotion() ? 0 : 1

  gsap.timeline()
    .to(stage, { autoAlpha: 0, scale: 0.94, duration: 0.18 * k })
    .add(() => {
      if (isVideo(file)) {
        img.classList.add('hidden')
        video.classList.remove('hidden')
        video.src = path(file)
        video.play().catch(() => {})
      } else {
        video.pause()
        video.removeAttribute('src')
        video.load()
        video.classList.add('hidden')
        img.src = path(file)
        img.classList.remove('hidden')
      }
      card.querySelector('[data-count]').textContent = `${pad(i + 1)}/${pad(project.media.length)}`
    })
    .to(stage, { autoAlpha: 1, scale: 1, duration: 0.5 * k, ease: 'back.out(2)' })
}

export function renderProjects(root) {
  root.innerHTML = projects.map((p, idx) => `
    <article class="card card--static gap-4 p-4" data-project="${p.id}" style="--accent:${ACCENTS[idx % ACCENTS.length]}">
      <div class="stage">
        <img src="${path(p.media[0])}" alt="${p.title}" loading="lazy" decoding="async" />
        <video class="hidden" muted loop playsinline preload="none"></video>
      </div>
      <div class="flex items-center justify-between">
        <button class="nav-btn" data-dir="-1" aria-label="Anterior">‹</button>
        <span class="tag" data-count>01/${pad(p.media.length)}</span>
        <button class="nav-btn" data-dir="1" aria-label="Siguiente">›</button>
      </div>
      <div>
        <h3 class="font-display text-xl font-extrabold leading-tight tracking-tight">${p.title}</h3>
        <p class="mt-1 text-sm font-medium">${p.desc}</p>
      </div>
    </article>`).join('')

  const state = new Map(projects.map((p) => [p.id, 0]))

  root.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-dir]')
    if (!btn) return
    const card = btn.closest('[data-project]')
    const project = projects.find((p) => p.id === card.dataset.project)
    const total = project.media.length
    const next = (state.get(project.id) + Number(btn.dataset.dir) + total) % total
    state.set(project.id, next)
    swap(card, project, next)
  })
}
