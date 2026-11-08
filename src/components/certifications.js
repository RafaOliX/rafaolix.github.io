import { certifications } from '../data/certifications.js'

const base = import.meta.env.BASE_URL
const accentFor = (issuer) => (issuer === 'Platzi' ? 'var(--color-violet)' : 'var(--color-vermilion)')

export function renderCertifications(root) {
  root.innerHTML = certifications.map(({ title, issuer, file }) => `
    <a class="card" style="--accent:${accentFor(issuer)}"
       href="${base}assets/certificados/${encodeURI(file)}" target="_blank" rel="noopener">
      <span class="tag">${issuer}</span>
      <span class="font-display text-xl font-bold leading-tight tracking-tight">${title}</span>
      <span class="mt-auto font-mono text-xs font-medium uppercase">Ver PDF ↗</span>
    </a>`).join('')
}
