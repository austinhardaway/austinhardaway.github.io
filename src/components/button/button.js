// `app-button` - lightweight web component wrapping the project's `.btn-primary` styles
// Features:
// - Uses an internal shadow DOM but imports the project's button CSS from the global stylesheet via a <link> so the visual rules apply.
// - Supports a `href` attribute to behave like a link (dispatches navigation event) and a `disabled` attribute.
// - Accepts content via default slot.

class AppButton extends HTMLElement {
  static get observedAttributes() {
    return ['href', 'disabled', 'download'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._onClick = this._onClick.bind(this);
  }

  connectedCallback() {
    this.render();
    this._upgradeProperty('href');
    this._upgradeProperty('disabled');
    this.shadowRoot.addEventListener('click', this._onClick);
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener('click', this._onClick);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    if (name === 'disabled') this._updateDisabled();
    if (name === 'href') this._updateHref();
    if (name === 'download') this._updateDownload();
  }

  get download() {
    return this.getAttribute('download');
  }
  set download(val) {
    if (val === null || val === undefined) this.removeAttribute('download');
    else this.setAttribute('download', val);
  }

  _upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  get href() {
    return this.getAttribute('href');
  }
  set href(val) {
    if (val === null || val === undefined) this.removeAttribute('href');
    else this.setAttribute('href', val);
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }
  set disabled(val) {
    if (val) this.setAttribute('disabled', '');
    else this.removeAttribute('disabled');
  }

  _onClick(e) {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    const href = this.href;
    // Only intercept and handle hash navigation internally; leave mailto/external/download links to the browser
    if (href && href.startsWith('#')) {
      e.preventDefault();
      // Use location.hash navigation, consistent with the small router in App
      location.hash = href.replace(/^#/, '#');
    }
    // emit a simple event to let parent apps know it was activated
    this.dispatchEvent(new CustomEvent('app-button-activated', { bubbles: true, composed: true }));
  }

  _updateDisabled() {
    const btn = this.shadowRoot.querySelector('button');
    if (!btn) return;
    btn.disabled = this.disabled;
    if (this.disabled) btn.classList.add('disabled');
    else btn.classList.remove('disabled');
  }

  _updateHref() {
    const a = this.shadowRoot.querySelector('a');
    if (!a) return;
    const href = this.href || '';
    a.setAttribute('href', href);
  }

  _updateDownload() {
    const a = this.shadowRoot.querySelector('a');
    if (!a) return;
    if (this.hasAttribute('download')) {
      const val = this.getAttribute('download');
      if (val) a.setAttribute('download', val);
      else a.setAttribute('download', '');
    } else {
      a.removeAttribute('download');
    }
  }

  render() {
    // We reference the project's CSS by creating a <link rel="stylesheet"> that points to the same path used in index.html (/global.css)
    // That file already imports or contains the button styles in `src/components/button/button.css`. To be resilient, we also include inline fallback styles scoped to the component.
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="/global.css">
      <style>
        :host { display: inline-block; }
        .btn-primary { all: initial; box-sizing: border-box; display: inline-block; }
        /* minimal fallback styles in case global CSS doesn't include the class */
        .btn-primary { background: transparent; color: #58a6ff; border: 1px solid #58a6ff; padding: 0.5rem 1rem; border-radius: 6px; font-family: monospace; font-weight:500; cursor:pointer; text-transform:uppercase; letter-spacing:0.04em; transition:all .2s ease; }
        .btn-primary:hover { background: rgba(88,166,255,0.08); box-shadow: 0 0 12px rgba(88,166,255,0.12); }
        .btn-primary.disabled, .btn-primary:disabled { opacity: 0.5; cursor: default; pointer-events: none; }
        a { text-decoration: none; color: inherit; }
      </style>
      <a part="link" href="${this.href || ''}">
        <button part="button" class="btn-primary" type="button">
          <slot>Button</slot>
        </button>
      </a>
    `;
    this._updateDisabled();
    this._updateDownload();
  }
}

customElements.define('app-button', AppButton);

export default AppButton;
