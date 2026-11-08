import { socials } from '../data/socials.js'

const base = import.meta.env.BASE_URL

export function renderSocials(root) {
  root.innerHTML = socials.map(({ name, href, icon, bg, external = true }) => `
    <a class="social ${bg}" href="${href}" aria-label="${name}" title="${name}"
       ${external ? 'target="_blank" rel="noopener noreferrer"' : ''}>
      <svg width="28" height="28" aria-hidden="true"><use href="${base}assets/sprite.svg#${icon}" /></svg>
    </a>`).join('')
}
