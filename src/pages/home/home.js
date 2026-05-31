// `home-page` - encapsulated homepage content
class HomePage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="/global.css">
      <link rel="stylesheet" href="/src/pages/home/home.css">

      <style>
        :host { display:block; }
        .container { max-width:900px; margin: 0 auto; }
      </style>
      <div class="container">
        <site-card title="">
          <h1 style="margin:0 0 .25rem 0">Austin Hardaway — Lead Software Engineer</h1>
          <p style="margin:0 0 .5rem 0">
          I'm a Lead Software Engineer with 8 years of experience building and leading the development of large-scale applications. Currently at AT&T, I lead a team delivering internal tooling that serves ~100k employees and processes millions of transactions weekly across a portfolio of business-critical platforms.
        <br><br>
          My focus is frontend — React, TypeScript, and modern tooling — but I work across the full stack and own outcomes end to end. I've rebuilt legacy applications from the ground up, driven test coverage from near zero to 95%, and moved teams from ad-hoc deployments to structured CI/CD pipelines. 
        <br><br>
          Beyond the code, I care deeply about the craft of engineering — thoughtful code review, mentorship, and finding process improvements that stick.
        <br><br>
          I thrive when I have real ownership, close collaboration with my team, and products that reach people at scale.</p>
          
          <ul style="margin:0 0 .75rem 0; padding-left:1.25rem">
            <li>Currently leading a team of developers to build business critical tools at AT&T</li>
            <li>Love tinkering with AI for the Home! Ask me what my hermes agent is up to!</li>
            <li>When I'm not coding, you can find me playing golf our hanging out with my wife and dog!</li>
          </ul>
          <div style="margin-top:12px">
            <app-button href="mailto:austinhardaway@gmail.com">Contact</app-button>
            <app-button href="/assets/Austin-Hardaway-2026-general.pdf" download style="margin-left:8px">View My Resume</app-button>
          </div>
        </site-card>
        <site-card style="margin-top:16px; background:"rgba(252, 210, 23, .8)">
            This site is still under construction!
        </site-card>
      </div>
    `;
  }
}

customElements.define('home-page', HomePage);

export default HomePage;
