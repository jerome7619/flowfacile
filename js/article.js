// ── Language management ──
let currentLang = localStorage.getItem('lang') || 'fr';

function toggleLang() {
  currentLang = currentLang === 'fr' ? 'en' : 'fr';
  localStorage.setItem('lang', currentLang);
  applyLang();
}

function applyLang() {
  const isFr = currentLang === 'fr';
  document.getElementById('lang-btn').textContent = isFr ? 'EN' : 'FR';
  document.documentElement.lang = currentLang;

  // Show/hide article bodies
  const bodyFr = document.getElementById('article-body-fr');
  const bodyEn = document.getElementById('article-body-en');
  if (bodyFr) bodyFr.style.display = isFr ? '' : 'none';
  if (bodyEn) bodyEn.style.display = isFr ? 'none' : '';

  // Update title
  const titleEl = document.getElementById('article-title');
  if (titleEl) {
    const t = titleEl.getAttribute(isFr ? 'data-lang-fr' : 'data-lang-en');
    if (t) titleEl.textContent = t;
  }

  // Apply i18n keys
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[currentLang] && i18n[currentLang][key]) {
      el.innerHTML = i18n[currentLang][key];
    }
  });
}

// ── Minimal i18n for article pages ──
const i18n = {
  fr: {
    brand_main: 'Automatisez vos tâches', brand_accent: 'répétitives',
    nav_articles: 'Articles', nav_vote: 'Voter',
    nav_suggest: 'Proposez un sujet', nav_newsletter: 'Infolettre',
    nav_cta: "S'abonner", nav_home: 'Accueil', article_section: 'Articles',
    footer_sub: 'Des tutoriels concrets pour aller plus loin avec Microsoft 365',
  },
  en: {
    brand_main: 'Automate office tasks', brand_accent: 'yourself',
    nav_articles: 'Articles', nav_vote: 'Vote',
    nav_suggest: 'Suggest a topic', nav_newsletter: 'Newsletter',
    nav_cta: 'Subscribe', nav_home: 'Home', article_section: 'Articles',
    footer_sub: 'Practical tutorials to go further with Microsoft 365',
  }
};

// Init on load
applyLang();
