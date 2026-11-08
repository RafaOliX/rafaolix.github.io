import { certifications } from '../data/certifications.js'

const base = import.meta.env.BASE_URL
const accentFor = (issuer) => (issuer === 'Platzi' ? 'var(--color-cyan)' : 'var(--color-acid)')

export function renderCertifications(root) {
  root.innerHTML = certifications.map(({ title, issuer, file }) => `
    <a class="card" style="--accent:${accentFor(issuer)}"
       href="${base}assets/certificados/${encodeURI(file)}" target="_blank" rel="noopener">
      <span class="text-xs uppercase opacity-70">${issuer}</span>
      <span class="font-display text-lg leading-tight">${title}</span>
      <span class="mt-auto text-xs" style="color:var(--accent)">VER PDF →</span>
    </a>`).join('')
}
