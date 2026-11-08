import { experiences } from '../data/experiences.js'

const base = import.meta.env.BASE_URL

export function renderExperience(root) {
  root.innerHTML = experiences.map(({ company, role, period, logo, url, bullets, gallery }) => `
    <article class="card card--static p-6 md:p-8">
      <div class="flex flex-col gap-6 md:flex-row">
        <img class="size-24 shrink-0 rounded-xl border-2 border-ink bg-white object-contain p-3"
             src="${base}assets/logos/${logo}" alt="Logo de ${company}" loading="lazy" />
        <div class="flex-1">
          <h3 class="font-display text-2xl font-extrabold tracking-tight md:text-4xl">${role}</h3>
          <p class="mt-1 font-mono text-sm">${company} · ${period}</p>
          ${url ? `<a class="btn btn--sm mt-3" href="${url}" target="_blank" rel="noopener">Visitar sitio ↗</a>` : ''}
          <ul class="bullets mt-5 grid gap-2 text-sm font-medium md:text-base">
            ${bullets.map((b) => `<li>${b}</li>`).join('')}
          </ul>
        </div>
      </div>
      <div class="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        ${gallery.map((g, i) => `
          <img class="shot" src="${base}assets/proyectos/${g}" alt="${company} ${i + 1}" loading="lazy" decoding="async" />`).join('')}
      </div>
    </article>`).join('')
}
