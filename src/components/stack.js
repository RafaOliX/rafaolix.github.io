import { stack } from '../data/stack.js'

const base = import.meta.env.BASE_URL

const logo = ({ icon, logo }) => icon
  ? `<svg aria-hidden="true"><use href="${base}assets/sprite.svg#${icon}" /></svg>`
  : `<img src="${base}assets/logos/${logo}" alt="" loading="lazy" />`

export function renderStack(root) {
  root.innerHTML = stack.map((item) => `
    <div class="card" style="--accent:${item.color}">
      <span class="tag">${item.tag}</span>
      <span class="relative z-10 mt-auto font-display text-2xl font-extrabold tracking-tight">${item.name}</span>
      <span class="bubble">${logo(item)}</span>
    </div>`).join('')
}
