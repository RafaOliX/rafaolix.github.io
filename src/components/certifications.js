import { certifications } from '../data/certifications.js'

const base = import.meta.env.BASE_URL
const accentFor = (issuer) => (issuer === 'Platzi' ? '#2ea8ff' : '#7bd63a')

export function renderCertifications(root) {
  root.innerHTML = certifications.map(({ title, issuer, file }) => `
    <a class="card" style="--accent:${accentFor(issuer)}"
       href="${base}assets/certificados/${encodeURI(file)}" target="_blank" rel="noopener">
      <span class="w-fit rounded-full bg-white/70 px-3 py-0.5 font-mono text-[11px] font-semibold uppercase">${issuer}</span>
      <span class="font-display text-lg font-extrabold leading-tight">${title}</span>
      <span class="mt-auto text-sm font-extrabold text-leaf">Ver PDF ↗</span>
    </a>`).join('')
}
