import { renderEmoji, injectStyles } from './render.js';
import { getEmoji } from './index.js';

const Base = typeof HTMLElement !== 'undefined' ? HTMLElement : class {};
let n = 0;

/** <glee-emoji name="heart-eyes" size="32" variant="glossy" animate="hover"></glee-emoji> */
export class GleeEmoji extends Base {
  static get observedAttributes() { return ['name', 'size', 'variant', 'animate', 'label']; }
  connectedCallback() { injectStyles(); this._id = this._id || 'e' + (++n); this.render(); }
  attributeChangedCallback() { if (this.isConnected) this.render(); }
  render() {
    const data = getEmoji(this.getAttribute('name'));
    if (!data) { this.innerHTML = ''; return; }
    const s = this.getAttribute('size');
    this.style.display = 'inline-flex';
    this.style.lineHeight = '0';
    this.style.verticalAlign = 'middle';
    this.innerHTML = renderEmoji(data, {
      size: s == null ? 24 : isNaN(s) ? s : Number(s),
      variant: this.getAttribute('variant') || 'glossy',
      animate: this.getAttribute('animate') || 'hover',
      label: this.hasAttribute('label') ? this.getAttribute('label') : undefined,
      id: this._id,
    });
  }
}

if (typeof customElements !== 'undefined' && !customElements.get('glee-emoji')) {
  customElements.define('glee-emoji', GleeEmoji);
}
