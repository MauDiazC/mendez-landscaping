// =============================================
// NAVBAR WEB COMPONENT (<app-navbar>)
// D&G Mendez Landscaping LLC
// =============================================

class AppNavbar extends HTMLElement {
  connectedCallback() {
    const root = this.getAttribute('root-path') !== null 
      ? this.getAttribute('root-path') 
      : (window.location.pathname.includes('/pages/') ? '../' : '');

    const isInsidePages = root.includes('..') || window.location.pathname.includes('/pages/');
    const isHttp = typeof window !== 'undefined' && window.location.protocol.startsWith('http');
    const activePage = (this.getAttribute('active-page') || '').toLowerCase();

    const homeHref = isInsidePages ? `${root}index.html` : (isHttp ? '/' : 'index.html');
    const workHref = isHttp ? '/blog' : (isInsidePages ? `${root}index.html#our-story` : '#our-story');
    const aboutHref = isInsidePages ? `${root}index.html#about-us` : '#about-us';
    const serviceAreasHref = isInsidePages ? 'service-areas.html' : `${root}pages/service-areas.html`;
    const contactHref = isInsidePages ? `${root}index.html#contact` : '#contact';

    // Helper for active link styles
    const getDesktopLinkClass = (page) => {
      if (activePage === page) {
        return 'font-label-lg text-label-lg text-primary font-bold bg-surface-container-high rounded-full px-space-sm py-space-2xs transition-colors';
      }
      return 'font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors';
    };

    const getMobileBarLinkClass = (page) => {
      if (activePage === page) {
        return 'px-3 py-1.5 text-xs font-bold rounded-full bg-primary text-on-primary shadow-sm shrink-0 transition-all';
      }
      return 'px-3 py-1.5 text-xs font-medium rounded-full bg-surface-container text-on-surface-variant hover:text-primary shrink-0 transition-all';
    };

    const getMobileDropdownLinkClass = (page) => {
      if (activePage === page) {
        return 'flex items-center gap-2.5 px-3 py-2.5 font-label-lg text-label-lg text-primary font-bold bg-surface-container-high rounded-xl';
      }
      return 'flex items-center gap-2.5 px-3 py-2.5 font-label-lg text-label-lg text-on-surface hover:bg-surface-container rounded-xl transition-colors';
    };

    this.innerHTML = `
<!-- =============================================
     NAVBAR / HEADER COMPONENT
     ============================================= -->
<header class="fixed top-0 left-0 right-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(24,34,28,0.06)] transition-all">
  <!-- Top Bar -->
  <div class="h-16 xl:h-20 w-full max-w-[1280px] mx-auto px-4 sm:px-margin md:px-margin-md lg:px-margin-lg flex items-center justify-between gap-space-sm sm:gap-space-md">
    
    <!-- Logo & Brand Name -->
    <div class="flex items-center gap-2 sm:gap-space-sm shrink-0">
      <img alt="D&G Mendez Landscaping Logo" class="h-7 sm:h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeJCV4PNcvxSSUyxuhLrp3aaRrpVPUKsEYpT5-RgdxJAfg5ZgGInF-TI6RmczCJdnf0PkXGnS3QIAKCyMMAIE4Vx1SpsbRFb1bfuyN27qXSBN9PiVRSh1KWoBtIx-ua77IsW9RE4zlr2QA6blDWn9oxUSZ04Zu-yyFTJnX4qwWb9FdCWFV20tSUUtVrZYisv4Mt19lv2oBsCa9WVYVlC1za42o3LgLzQRPGAMShDnq9HBFGH0zEluO"/>
      <a class="text-[17px] sm:font-headline-sm sm:text-headline-sm tracking-tight text-primary font-bold" data-path="home" href="${homeHref}">
        D&G Mendez <span class="text-secondary font-medium hidden sm:inline">Landscaping</span>
      </a>
    </div>

    <!-- Desktop Navigation Menu (xl and above) -->
    <nav class="hidden xl:flex items-center gap-space-md" data-active-classes="text-primary font-bold bg-surface-container-high rounded-full px-space-sm py-space-2xs">
      <a class="${getDesktopLinkClass('home')}" data-path="home" data-i18n="nav.home" href="${homeHref}">Home</a>
      <a class="${getDesktopLinkClass('our-work')}" data-path="our-work" data-i18n="nav.our_work" href="${workHref}">Our Work</a>
      <a class="${getDesktopLinkClass('about-us')}" data-path="about-us" data-i18n="nav.about_us" href="${aboutHref}">About Us</a>
      <a class="${getDesktopLinkClass('service-areas')}" data-path="service-areas" data-i18n="nav.service_areas" href="${serviceAreasHref}">Service Areas</a>
      <a class="${getDesktopLinkClass('contact')}" data-path="contact" data-i18n="nav.contact" href="${contactHref}">Contact</a>
    </nav>

    <!-- Header Actions -->
    <div class="flex items-center gap-2 sm:gap-space-sm shrink-0">
      <!-- Language Selector -->
      <div aria-label="Language Selector" class="bg-surface-container p-0.5 sm:p-1 rounded-full flex items-center shadow-inner" role="group">
        <button class="px-2.5 py-1 text-label-md font-label-md rounded-full bg-surface-container-lowest text-primary shadow-[0_2px_8px_-2px_rgba(24,34,28,0.06)] font-bold transition-all" data-lang="en" type="button" aria-pressed="true">EN</button>
        <button class="px-2.5 py-1 text-label-md font-label-md rounded-full text-on-surface-variant transition-all font-normal" data-lang="es" type="button" aria-pressed="false">ES</button>
      </div>

      <!-- Mobile Hamburger Toggle -->
      <button aria-label="Toggle Mobile Menu" aria-expanded="false" id="mobile-menu-toggle" class="xl:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-primary focus:outline-none transition-colors" type="button">
        <span class="material-symbols-outlined text-[22px]">menu</span>
      </button>
    </div>
  </div>

  <!-- Mobile Visible Navigation Bar (Always visible on mobile < xl) -->
  <nav aria-label="Mobile Navigation" class="xl:hidden flex items-center gap-1.5 overflow-x-auto px-4 py-2 bg-surface-container-low/95 border-t border-surface-container backdrop-blur-md scroll-smooth" style="scrollbar-width: none; -ms-overflow-style: none;">
    <a class="${getMobileBarLinkClass('home')}" data-path="home" data-i18n="nav.home" href="${homeHref}">Home</a>
    <a class="${getMobileBarLinkClass('our-work')}" data-path="our-work" data-i18n="nav.our_work" href="${workHref}">Our Work</a>
    <a class="${getMobileBarLinkClass('about-us')}" data-path="about-us" data-i18n="nav.about_us" href="${aboutHref}">About Us</a>
    <a class="${getMobileBarLinkClass('service-areas')}" data-path="service-areas" data-i18n="nav.service_areas" href="${serviceAreasHref}">Service Areas</a>
    <a class="${getMobileBarLinkClass('contact')}" data-path="contact" data-i18n="nav.contact" href="${contactHref}">Contact</a>
  </nav>

  <!-- Mobile Navigation Dropdown Menu (Opened via hamburger toggle) -->
  <div id="mobile-menu" class="hidden xl:hidden bg-surface-container-lowest border-b border-surface-container px-4 py-3 shadow-xl transition-all">
    <nav class="flex flex-col gap-1.5">
      <a class="${getMobileDropdownLinkClass('home')}" data-path="home" data-i18n="nav.home" href="${homeHref}">Home</a>
      <a class="${getMobileDropdownLinkClass('our-work')}" data-path="our-work" data-i18n="nav.our_work" href="${workHref}">Our Work</a>
      <a class="${getMobileDropdownLinkClass('about-us')}" data-path="about-us" data-i18n="nav.about_us" href="${aboutHref}">About Us</a>
      <a class="${getMobileDropdownLinkClass('service-areas')}" data-path="service-areas" data-i18n="nav.service_areas" href="${serviceAreasHref}">Service Areas</a>
      <a class="${getMobileDropdownLinkClass('contact')}" data-path="contact" data-i18n="nav.contact" href="${contactHref}">Contact</a>
    </nav>
  </div>
</header>
`;

    this.initNavbarInteractions();

    // Reapply active language translations to new elements if available
    if (window.applyTranslations && window.getCurrentLanguage) {
      window.applyTranslations(window.getCurrentLanguage());
    }
  }

  initNavbarInteractions() {
    const mobileMenuToggle = this.querySelector('#mobile-menu-toggle');
    const mobileMenu = this.querySelector('#mobile-menu');

    if (mobileMenuToggle && mobileMenu) {
      const menuIcon = mobileMenuToggle.querySelector('.material-symbols-outlined');

      const toggleMenu = () => {
        const isHidden = mobileMenu.classList.contains('hidden');
        if (isHidden) {
          mobileMenu.classList.remove('hidden');
          if (menuIcon) menuIcon.textContent = 'close';
          mobileMenuToggle.setAttribute('aria-expanded', 'true');
        } else {
          mobileMenu.classList.add('hidden');
          if (menuIcon) menuIcon.textContent = 'menu';
          mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
      };

      mobileMenuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
      });

      // Close when clicking any link inside mobile menu
      mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
          if (menuIcon) menuIcon.textContent = 'menu';
          mobileMenuToggle.setAttribute('aria-expanded', 'false');
        });
      });

      // Close when clicking outside
      document.addEventListener('click', (e) => {
        if (!this.contains(e.target) && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
          if (menuIcon) menuIcon.textContent = 'menu';
          mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
      });

      // Close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
          if (menuIcon) menuIcon.textContent = 'menu';
          mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
      });

      // Close on desktop resize
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 1280 && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
          if (menuIcon) menuIcon.textContent = 'menu';
          mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Sticky Header Shadow
    const header = this.querySelector('header');
    if (header) {
      const handleScroll = () => {
        if (window.scrollY > 20) {
          header.classList.add('shadow-md');
        } else {
          header.classList.remove('shadow-md');
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    }

    // Language Selector Switcher
    const langButtons = this.querySelectorAll('[data-lang]');

    langButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        if (window.setLanguage) {
          window.setLanguage(lang);
        } else {
          document.documentElement.setAttribute('lang', lang);
          try {
            localStorage.setItem('preferred-language', lang);
          } catch (e) {}
        }
      });
    });

    try {
      const savedLang = localStorage.getItem('preferred-language') || 'en';
      langButtons.forEach((btn) => {
        if (btn.getAttribute('data-lang') === savedLang) {
          btn.className = 'px-2.5 py-1 text-label-md font-label-md rounded-full transition-all bg-surface-container-lowest text-primary shadow-[0_2px_8px_-2px_rgba(24,34,28,0.06)] font-bold';
          btn.setAttribute('aria-pressed', 'true');
        } else {
          btn.className = 'px-2.5 py-1 text-label-md font-label-md rounded-full transition-all text-on-surface-variant font-normal';
          btn.setAttribute('aria-pressed', 'false');
        }
      });
    } catch (e) {}
  }
}

customElements.define('app-navbar', AppNavbar);
