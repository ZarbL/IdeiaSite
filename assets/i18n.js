// Configuração do i18next
const i18nextConfig = {
  lng: 'pt-BR', // idioma padrão
  fallbackLng: 'pt-BR',
  debug: false,
  resources: {}
};

// Função para carregar traduções
async function loadTranslations() {
  const languages = ['pt-BR', 'en', 'es'];
  
  for (const lang of languages) {
    try {
      const response = await fetch(`/locales/${lang}.json`);
      const translations = await response.json();
      i18nextConfig.resources[lang] = { translation: translations };
    } catch (error) {
      console.error(`Error loading ${lang} translations:`, error);
    }
  }
}

// Função para detectar idioma do navegador
function detectBrowserLanguage() {
  const browserLang = navigator.language || navigator.userLanguage;
  if (browserLang.startsWith('pt')) return 'pt-BR';
  if (browserLang.startsWith('es')) return 'es';
  if (browserLang.startsWith('en')) return 'en';
  return 'pt-BR';
}

// Inicializar i18next
async function initI18next() {
  await loadTranslations();
  
  // Verificar se há idioma salvo no localStorage
  const savedLang = localStorage.getItem('language') || detectBrowserLanguage();
  i18nextConfig.lng = savedLang;
  
  await i18next.init(i18nextConfig);
  
  updateContent();
}

// Função para atualizar conteúdo da página
function updateContent() {
  // Atualizar elementos com data-i18n
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = i18next.t(key);
    
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      element.placeholder = translation;
    } else {
      element.textContent = translation;
    }
  });
  
  // Atualizar elementos com data-i18n-html (para HTML)
  document.querySelectorAll('[data-i18n-html]').forEach(element => {
    const key = element.getAttribute('data-i18n-html');
    element.innerHTML = i18next.t(key);
  });
  
  // Atualizar listas dinâmicas (Hard Skills, Soft Skills, etc.)
  updateSkillsLists();
  
  // Atualizar atributo lang do HTML
  document.documentElement.lang = i18next.language;
}

// Função para atualizar listas de skills
function updateSkillsLists() {
  // Hard Skills
  const hardSkillsItems = i18next.t('metodologia.hardSkills.items', { returnObjects: true });
  if (Array.isArray(hardSkillsItems)) {
    const hardSkillsList = document.querySelector('[data-skills="hard"]');
    if (hardSkillsList) {
      hardSkillsList.innerHTML = hardSkillsItems.map(skill => `<li>${skill}</li>`).join('');
    }
  }
  
  // Soft Skills
  const softSkillsItems = i18next.t('metodologia.softSkills.items', { returnObjects: true });
  if (Array.isArray(softSkillsItems)) {
    const softSkillsList = document.querySelector('[data-skills="soft"]');
    if (softSkillsList) {
      softSkillsList.innerHTML = softSkillsItems.map(skill => `<li>${skill}</li>`).join('');
    }
  }
  
  // Entregáveis
  const entregaveisItems = i18next.t('entregaveis.items', { returnObjects: true });
  if (Array.isArray(entregaveisItems)) {
    const entregaveisList = document.querySelector('[data-list="entregaveis"]');
    if (entregaveisList) {
      entregaveisList.innerHTML = entregaveisItems.map(item => 
        `<li class="relative pl-8 text-lg">${item}</li>`
      ).join('');
    }
  }
  
  // Kit de Satélite
  const kitItems = i18next.t('satelite.kit.items', { returnObjects: true });
  if (Array.isArray(kitItems)) {
    const kitList = document.querySelector('[data-list="kit"]');
    if (kitList) {
      kitList.innerHTML = kitItems.map(item => `<li>${item}</li>`).join('');
    }
  }
}

// Função para trocar idioma
function changeLanguage(lang) {
  localStorage.setItem('language', lang);
  i18next.changeLanguage(lang, (err) => {
    if (err) {
      console.error('Error changing language:', err);
      return;
    }
    updateContent();
    updateLanguageUI(lang);
  });
  
  // Fechar dropdown
  document.querySelector('.lang-selector')?.classList.remove('active');
}

// Função para atualizar UI do seletor de idioma
function updateLanguageUI(lang) {
  const langData = {
    'pt-BR': { flag: '🇧🇷', label: 'PT', name: 'Português' },
    'en': { flag: '🇺🇸', label: 'EN', name: 'English' },
    'es': { flag: '🇪🇸', label: 'ES', name: 'Español' }
  };
  
  const currentData = langData[lang] || langData['pt-BR'];
  
  // Atualizar botão principal
  const currentFlag = document.getElementById('current-flag');
  const currentLang = document.getElementById('current-lang');
  if (currentFlag) currentFlag.textContent = currentData.flag;
  if (currentLang) currentLang.textContent = currentData.label;
  
  // Atualizar botões do dropdown
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    }
  });
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
  initI18next().then(() => {
    // Atualizar UI com o idioma inicial
    const initialLang = localStorage.getItem('language') || detectBrowserLanguage();
    updateLanguageUI(initialLang);
  });
});
