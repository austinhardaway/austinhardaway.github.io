# Austin Hardaway's Personal Website

A minimal, fast personal website built with native web components and vanilla JavaScript. No build step, no frameworks - just plain HTML, CSS, and JavaScript that deploys directly to GitHub Pages.

## 🚀 Features

- **Framework-free**: Built with native web components (Custom Elements API)
- **Zero build step**: Deploys directly from source to GitHub Pages
- **Responsive design**: Works on mobile and desktop
- **Dark theme**: Tech-inspired dark mode with accent colors
- **Accessible**: Proper ARIA attributes and keyboard navigation
- **Fast**: Minimal CSS, no JavaScript bundle to download

## 🧩 Architecture

The site uses a simple component-based architecture with:

- **Custom Elements**: `site-nav`, `site-card`, `app-button`, `home-page`
- **ES Modules**: Native JavaScript imports (`import './components/button/button.js'`)
- **Hash-based Router**: Tiny router in `/src/router.js` for client-side navigation
- **Shadow DOM**: Encapsulated styling and markup for each component
- **CSS Variables**: Centralized theming in `/global.css`

## 📁 Project Structure

```
/ (root)
├── index.html              # Entry point - mounts the <my-app> component
├── global.css              # Root styles and CSS variables
├── /assets                 # Static assets (favicon, resume PDF)
├── /src
│   ├── App.js              # Main app component and bootstrap
│   ├── router.js           # Hash-based navigation
│   ├── /components         # Reusable web components
│   │   ├── nav/            # Site navigation
│   │   ├── card/           # Card container
│   │   └── button/         # Button component
│   └── /pages              # Page components
│       └── home/           # Homepage content
├── master-resume.md        # Resume in markdown format
└── README.md               # This file
```

## 🛠️ Development

Since there's no build step, development is straightforward:

1. Clone the repository
2. Open `index.html` in your browser (or serve with any static server)
3. Edit the JavaScript, CSS, or HTML directly
4. Changes appear immediately - no rebuild needed

```bash
# Clone and view locally
git clone https://github.com/austinhardaway/austinhardaway.github.io.git
cd austinhardaway.github.io
# Open index.html in browser, or use:
python -m http.server 8000  # or any static server
```

## 🌐 Deployment

This site is configured to automatically deploy to GitHub Pages from the `main` branch. Push to `main` and GitHub Actions will publish to https://austinhardaway.github.io

## 🎨 Customization

- **Colors**: Edit CSS variables in `:root` section of `global.css`
- **Content**: Update text in the various component files (`home.js`, `App.js`, etc.)
- **Navigation**: Modify links in `App.js` render method
- **Styling**: Component-specific CSS files in each component directory

## 💡 Why This Approach?

- **Learning**: Demonstrates modern web platform capabilities
- **Performance**: No JavaScript framework overhead
- **Simplicity**: Easy to understand and maintain
- **Standards-based**: Uses only web standards that work in all modern browsers
- **Portable**: Can be hosted anywhere static files are served

## 📄 License

MIT - feel free to use as a template for your own site!

---

*Built with ❤️ using native web technologies*