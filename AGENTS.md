# Austin Hardaway's Website - Agent Guide

This document helps AI agents (like myself) understand and work effectively with this project. It explains the architecture, conventions, and how to make changes.

## 🔑 Key Characteristics

- **Zero build stack**: No Node.js tooling, Webpack, Vite, etc.
- **Native Web Components**: Uses Custom Elements API (v1) with Shadow DOM
- **ES Modules**: Native browser module support (no bundler needed)
- **Hash-based routing**: Client-side navigation via `window.location.hash`
- **GitHub Pages deploy**: Serves directly from `main` branch
- **CSS Variables**: Centralized theming in `global.css`

## 📂 Important Files & Conventions

### Entry Points
- `index.html`: Bootstrap - mounts `<my-app>` and loads `App.js` as ES module
- `src/App.js`: Main application component (`<my-app>`) and router initialization

### Component Structure
All components follow this pattern:
1. **Class definition** extending `HTMLElement`
2. **Constructor**: Calls `super()` and `this.attachShadow({ mode: 'open' })`
3. **connectedCallback()**: Calls `this.render()` and sets up event listeners
4. **render() method**: Sets `this.shadowRoot.innerHTML` with template literal
5. **customElements.define()**: Registers the element tag

### Styling Approach
- **Global variables**: Defined in `:root` of `global.css`
- **Component CSS**: Each component imports its own CSS file + `global.css`
- **Shadow DOM scoping**: Styles are encapsulated unless deliberately piercing
- **Fallbacks**: Components include minimal inline styles as backup

### Navigation
- Uses hash-based routes (`#/`, `#/about`, `#/contact`)
- Router in `src/router.js` with `startRouter()` and `navigate()` functions
- `AppButton` component intercepts hash links for SPA-like behavior
- `SiteNav` component handles active link states

## 🛠️ How to Make Changes

### Adding a New Page
1. Create new page component in `/src/pages/` (e.g., `projects.js`)
2. Import it in `src/App.js`
3. Add route case in `MyApp.renderRoute()` switch statement
4. Add navigation link in `MyApp.render()` site-nav section

### Creating a New Component
1. Create component file in appropriate directory:
   - `/src/components/[name]/[name].js` (JS)
   - `/src/components/[name]/[name].css` (styles)
2. Follow the standard component pattern (see existing components)
3. Import in `src/App.js` if it's app-wide, or in the specific page that uses it
4. Use the custom element in templates (e.g., `<my-new-component>`)

### Styling Changes
- **Global/theme changes**: Edit `:root` variables in `global.css`
- **Component-specific**: Edit the component's CSS file
- **Cross-component**: Consider promoting to global variables if used widely
- **Avoid**: Piercing shadow DOM with overly specific selectors

### Content Updates
- **Text content**: Edit the template literals in component `render()` methods
- **Links**: Update `href` attributes in templates or component properties
- **Images**: Place in `/assets/` and reference with absolute path (`/assets/filename`)

## ⚠️ Common Pitfalls & Gotchas

### 1. Shadow DOM Styling
- Styles don't leak out or in by default
- To style slotted content: use `::slotted()` selector in component's shadow CSS
- To pierce from outside: use `:part()` or `::part()` if component exposes parts
- Global styles in `global.css` DO affect shadow DOM if not overridden

### 2. Event Listeners
- Always remove event listeners in `disconnectedCallback()`
- Bind methods in constructor or use arrow functions to preserve `this`
- Use `this._onClick = this._onClick.bind(this)` pattern seen in components

### 3. Attribute Changes
- Use `observedAttributes` and `attributeChangedCallback()` for reactive props
- Remember to call `_upgradeProperty()` in `connectedCallback()` for initial values
- Boolean attributes: check presence with `hasAttribute()` not truthiness of value

### 4. CSS Imports in Shadow DOM
- Each component must re-import CSS it needs (`global.css` + component-specific)
- Relative paths must be from document root: `/src/components/button/button.css`
- Duplicate `<link>` tags are deduped by browser - safe to include in each component

### 5. Router Specifics
- Routes are hash-based: `#/about` not `/about`
- `navigate()` function adds leading slash if missing
- Initial route triggered on `hashchange` event listener setup

## 🧪 Testing Changes

Since there's no build step:
1. Edit files directly
2. Refresh browser to see changes
3. Check console for errors (modules fail silently if syntax errors)
4. Test navigation and interactive elements
5. Verify responsive behavior at different widths

## 📱 Responsive Behavior
- Uses `max-width: 900px` container in home page
- Fluid typography and spacing via relative units (rem, em)
- Mobile-first approach in global styles
- Tested down to 320px width

## 🔄 Update Process
1. Make changes to source files
2. Test locally (optional but recommended)
3. Commit and push to `main` branch
4. GitHub Pages automatically updates (usually within seconds)

## 🤖 Agent-Specific Tips

### When Asked to:
- **Add content**: Look for template literals in `render()` methods
- **Fix styling**: Check component CSS file first, then `global.css`
- **Add navigation**: Update `App.js` render method and route handler
- **Debug**: Check browser console for ES module loading errors
- **Optimize**: Look for duplicate CSS imports or unused components

### File Patterns to Remember:
- Component JS: `/src/components/*/*/*.js`
- Component CSS: `/src/components/*/*/*.css`  
- Page JS: `/src/pages/*/*.js`
- Page CSS: `/src/pages/*/*.css`
- Assets: `/assets/*`

### This site intentionally avoids:
- Build tools (webpack, vite, parcel)
- Frameworks (React, Vue, Svelte)
- Transpilers (Babel, TypeScript compiler)
- CSS processors (Sass, PostCSS, Tailwind)
- Package managers (npm, yarn) for runtime dependencies

The goal is maximal platform compatibility and minimal dependencies - if it runs in a browser from 2018+, it should work here.

---

*Last updated: $(date)*
*Agent instructions: Follow these conventions when modifying this site to maintain consistency and leverage the intentional simplicity of the stack.*