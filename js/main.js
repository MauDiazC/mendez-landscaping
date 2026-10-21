// =============================================
// MAIN JAVASCRIPT
// =============================================

// =============================================
// DOM READY
// =============================================
document.addEventListener('DOMContentLoaded', () => {

  // =============================================
  // NAVIGATION
  // =============================================


  // 2. Sticky Header Shadow on Scroll
  const header = document.querySelector('header');
  if (header && !header.dataset.scrollInitialized) {
    header.dataset.scrollInitialized = 'true';
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

  // =============================================
  // COMPONENTS
  // =============================================

  // 1. Language Selector Switcher
  const langButtons = document.querySelectorAll('[data-lang]');
  if (langButtons.length > 0) {
    langButtons.forEach((btn) => {
      if (!btn.dataset.mainLangInit) {
        btn.dataset.mainLangInit = 'true';
        btn.addEventListener('click', () => {
          const lang = btn.getAttribute('data-lang');
          if (window.setLanguage) {
            window.setLanguage(lang);
          }
        });
      }
    });
  }

  // 2. Service Areas: ZIP Search Checker & Dynamic Google Map
  const zipBtn = document.getElementById('zip-search-btn');
  const zipInput = document.getElementById('zip-search-input');
  const feedback = document.getElementById('zip-search-feedback');
  const feedbackText = document.getElementById('zip-feedback-text');
  const mapIframe = document.getElementById('service-areas-map');
  const mapLocationBadge = document.getElementById('map-current-location');
  const mapContainer = document.getElementById('map-container');

  if (zipBtn && zipInput) {
    const handleSearch = () => {
      const val = zipInput.value.trim();
      const currentLang = (window.getCurrentLanguage && window.getCurrentLanguage()) || 'en';
      if (feedback) feedback.classList.remove('hidden');

      if (!val || val.length < 5) {
        if (feedback) {
          feedback.className = "mt-space-sm p-space-sm rounded-DEFAULT bg-error-container text-body-sm font-body-sm text-on-error-container flex items-center gap-2";
        }
        if (feedbackText) {
          feedbackText.textContent = currentLang === 'es'
            ? "Por favor ingresa un código postal válido de 5 dígitos para verificar la disponibilidad de ruta."
            : "Please enter a valid 5-digit ZIP code to verify regional route availability.";
        }
        return;
      }

      // 1. Update embedded Google Map location with the entered ZIP code
      if (mapIframe) {
        mapIframe.src = `https://maps.google.com/maps?q=${encodeURIComponent(val)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
      }

      // 2. Update map header badge with sector info
      if (mapLocationBadge) {
        mapLocationBadge.textContent = currentLang === 'es'
          ? `Sector Activo: Código Postal ${val}`
          : `Active Sector: ZIP ${val}`;
      }

      // 3. Show dynamic confirmation feedback
      if (feedback) {
        feedback.className = "mt-space-sm p-space-sm rounded-DEFAULT bg-secondary-container text-body-sm font-body-sm text-on-secondary-container flex items-center gap-2";
      }
      if (feedbackText) {
        feedbackText.textContent = currentLang === 'es'
          ? `¡Territorio activo para el código postal ${val}! Ubicación marcada en el mapa abajo. Unidades móviles listas para agendar visitas.`
          : `Territory active for ZIP ${val}! Location pinned on dispatch map below. Mobile units available for scheduling.`;
      }

      // 4. Smoothly scroll to map container so the user immediately sees the location
      if (mapContainer) {
        mapContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };

    zipBtn.addEventListener('click', handleSearch);
    zipInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSearch();
    });
  }

  // 3. Service Areas: Zone Filter Controller
  const filterBtns = document.querySelectorAll('.zone-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.className = "px-4 py-2 text-label-md font-label-md rounded-full text-on-surface-variant hover:text-primary transition-all zone-filter-btn";
      });
      btn.className = "px-4 py-2 text-label-md font-label-md rounded-full bg-surface-container-lowest text-primary shadow-sm font-bold transition-all zone-filter-btn";
    });
  });

  // 4. Accessible Accordion FAQs
  const accordionBtns = document.querySelectorAll('.faq-toggle-btn');
  accordionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const panel = btn.nextElementSibling;
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const icon = btn.querySelector('.material-symbols-outlined');

      // Close all other open panels in the same accordion group
      accordionBtns.forEach(otherBtn => {
        if (otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          if (otherBtn.nextElementSibling) otherBtn.nextElementSibling.classList.add('hidden');
          const otherIcon = otherBtn.querySelector('.material-symbols-outlined');
          if (otherIcon) otherIcon.textContent = 'add';
        }
      });

      // Toggle clicked panel
      if (isExpanded) {
        btn.setAttribute('aria-expanded', 'false');
        if (panel) panel.classList.add('hidden');
        if (icon) icon.textContent = 'add';
      } else {
        btn.setAttribute('aria-expanded', 'true');
        if (panel) panel.classList.remove('hidden');
        if (icon) icon.textContent = 'remove';
      }
    });
  });

  // =============================================
  // ANIMATIONS
  // =============================================

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // =============================================
  // 5. FREE ESTIMATE MODAL & LEAD CAPTURE
  // =============================================
  const setupEstimateModal = () => {
    let modal = document.getElementById('estimate-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'estimate-modal';
      modal.className = 'fixed inset-0 z-[100] hidden items-center justify-center p-4 bg-primary/70 backdrop-blur-sm transition-all';
      modal.innerHTML = `
        <div class="relative w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl p-5 sm:p-8 border border-surface-container overflow-hidden max-h-[92vh] overflow-y-auto">
          <!-- Close button -->
          <button type="button" id="close-estimate-modal" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high text-primary flex items-center justify-center transition-colors">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>

          <div class="mb-5 text-left">
            <span class="text-xs font-bold uppercase tracking-wider text-secondary">Free Consultation &amp; Estimate</span>
            <h3 class="text-2xl font-bold text-primary mt-1">Request Your Grounds Evaluation</h3>
            <p class="text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed">
              Serving Greater Louisville &amp; Kentuckiana. Enter your details and our team will get in touch within 24-48 hours.
            </p>
          </div>

          <form id="estimate-form" class="space-y-3.5 text-left">
            <div id="estimate-feedback" class="hidden p-3 rounded-xl text-xs font-semibold"></div>

            <div>
              <label class="block text-xs font-bold text-primary mb-1" for="modal-name">Full Name *</label>
              <input type="text" id="modal-name" name="name" required placeholder="John Doe"
                     class="w-full px-3.5 py-2.5 rounded-xl bg-surface text-on-surface text-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary/40" />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-primary mb-1" for="modal-phone">Phone Number *</label>
                <input type="tel" id="modal-phone" name="phone" required placeholder="(502) 000-0000"
                       class="w-full px-3.5 py-2.5 rounded-xl bg-surface text-on-surface text-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary/40" />
              </div>
              <div>
                <label class="block text-xs font-bold text-primary mb-1" for="modal-zip">ZIP Code</label>
                <input type="text" id="modal-zip" name="zip_code" maxlength="5" placeholder="e.g. 40207"
                       class="w-full px-3.5 py-2.5 rounded-xl bg-surface text-on-surface text-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary/40" />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-primary mb-1" for="modal-email">Email Address</label>
              <input type="email" id="modal-email" name="email" placeholder="john@example.com"
                     class="w-full px-3.5 py-2.5 rounded-xl bg-surface text-on-surface text-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary/40" />
            </div>

            <div>
              <label class="block text-xs font-bold text-primary mb-1" for="modal-service">Service Needed</label>
              <select id="modal-service" name="service" class="w-full px-3.5 py-2.5 rounded-xl bg-surface text-on-surface text-xs border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary/40">
                <option value="Hardscaping & Stone Masonry">Hardscaping &amp; Stone Masonry</option>
                <option value="Residential Landscape Design">Residential Landscape Design</option>
                <option value="Lawn Care & Grading">Lawn Care &amp; Grading</option>
                <option value="Seasonal Garden Maintenance">Seasonal Garden Maintenance</option>
                <option value="Tree & Shrub Stewardship">Tree &amp; Shrub Stewardship</option>
                <option value="Other Service">Other Inquiry</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold text-primary mb-1" for="modal-message">Brief Project Description</label>
              <textarea id="modal-message" name="message" rows="2" placeholder="Tell us about your outdoor vision or specific requirements..."
                        class="w-full px-3.5 py-2 rounded-xl bg-surface text-on-surface text-xs border border-surface-container focus:outline-none focus:ring-2 focus:ring-secondary/40"></textarea>
            </div>

            <button type="submit" id="modal-submit-btn" class="w-full py-3 rounded-xl bg-primary text-on-primary font-bold text-sm hover:bg-secondary transition-colors shadow-md flex items-center justify-center gap-2 mt-2">
              <span>Submit Estimate Request</span>
              <span class="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>
        </div>
      `;
      document.body.appendChild(modal);

      const closeModal = () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      };

      const openModal = () => {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        const nameInput = document.getElementById('modal-name');
        if (nameInput) nameInput.focus();
      };

      modal.querySelector('#close-estimate-modal').addEventListener('click', closeModal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
          closeModal();
        }
      });

      // Form submission via AJAX to /api/leads
      const form = modal.querySelector('#estimate-form');
      const feedback = modal.querySelector('#estimate-feedback');
      const submitBtn = modal.querySelector('#modal-submit-btn');

      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span>';

        const payload = {
          name: form.name.value.trim(),
          phone: form.phone.value.trim(),
          email: form.email.value.trim(),
          zip_code: form.zip_code.value.trim(),
          service: form.service.value,
          message: form.message.value.trim()
        };

        try {
          const res = await fetch('/api/leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          const data = await res.json();

          if (data.success) {
            feedback.className = 'p-3.5 rounded-xl text-xs font-bold bg-green-50 text-green-800 border border-green-200 block';
            feedback.textContent = data.message;
            form.reset();
            setTimeout(() => {
              closeModal();
              feedback.className = 'hidden';
            }, 3500);
          } else {
            feedback.className = 'p-3.5 rounded-xl text-xs font-bold bg-red-50 text-red-800 border border-red-200 block';
            feedback.textContent = data.error || 'Something went wrong. Please call us directly.';
          }
        } catch (err) {
          feedback.className = 'p-3.5 rounded-xl text-xs font-bold bg-red-50 text-red-800 border border-red-200 block';
          const currentPhone = (window.siteSettings && window.siteSettings.phone) || '(502) 667-9020';
          feedback.textContent = `Network error. Please call us directly at ${currentPhone}.`;
        } finally {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Submit Estimate Request</span><span class="material-symbols-outlined text-[18px]">send</span>';
        }
      });

      window.openEstimateModal = openModal;
    }

    // Bind all buttons with data-path="get-a-free-estimate"
    document.querySelectorAll('[data-path="get-a-free-estimate"]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.openEstimateModal) {
          window.openEstimateModal();
        }
      });
    });
  };

  setupEstimateModal();

  // =============================================
  // DYNAMIC CMS SETTINGS SYNC (Hero & Phone)
  // =============================================
  function applyPhoneSettings(settings) {
    if (!settings) return;
    const phone = settings.phone || '(502) 667-9020';
    const phoneRaw = settings.phone_raw || phone.replace(/[^0-9]/g, '');

    // 1. Update text of [data-phone] elements
    document.querySelectorAll('[data-phone]').forEach((el) => {
      el.textContent = phone;
    });

    // 2. Update all tel: links
    document.querySelectorAll('a[href^="tel:"], [data-phone-link]').forEach((link) => {
      link.setAttribute('href', `tel:${phoneRaw}`);
    });
  }
  window.applyPhoneSettings = applyPhoneSettings;

  async function syncSiteSettings() {
    try {
      const res = await fetch('/api/settings');
      if (!res.ok) return;
      const data = await res.json();
      if (!data.success || !data.settings) return;

      const s = data.settings;
      window.siteSettings = s;

      // 1. Update translations dictionary for dynamic i18n
      if (window.translations) {
        // English Hero
        if (s.hero_badge_en) window.translations.en['index.badge_about'] = s.hero_badge_en;
        if (s.hero_title_en) window.translations.en['index.hero_title'] = s.hero_title_en;
        if (s.hero_desc_en) window.translations.en['index.hero_desc'] = s.hero_desc_en;
        if (s.hero_card_badge_en) window.translations.en['index.hero_card_badge'] = s.hero_card_badge_en;
        if (s.hero_card_title_en) window.translations.en['index.hero_card_title'] = s.hero_card_title_en;

        // Spanish Hero
        if (s.hero_badge_es) window.translations.es['index.badge_about'] = s.hero_badge_es;
        if (s.hero_title_es) window.translations.es['index.hero_title'] = s.hero_title_es;
        if (s.hero_desc_es) window.translations.es['index.hero_desc'] = s.hero_desc_es;
        if (s.hero_card_badge_es) window.translations.es['index.hero_card_badge'] = s.hero_card_badge_es;
        if (s.hero_card_title_es) window.translations.es['index.hero_card_title'] = s.hero_card_title_es;

        // Phone in translations
        if (s.phone) {
          window.translations.en['footer.cta_call'] = `Call Us: ${s.phone}`;
          window.translations.en['index.cta_call_btn'] = `Call: ${s.phone}`;
          window.translations.en['areas.bottom_btn_call'] = `Call Dispatch: ${s.phone}`;

          window.translations.es['footer.cta_call'] = `Llámanos: ${s.phone}`;
          window.translations.es['index.cta_call_btn'] = `Llama: ${s.phone}`;
          window.translations.es['areas.bottom_btn_call'] = `Llamar a Despacho: ${s.phone}`;
        }
      }

      // 2. Update Hero panoramic image if on page
      if (s.hero_image) {
        const heroImg = document.getElementById('hero-panoramic-image');
        if (heroImg) {
          heroImg.style.backgroundImage = `url('${s.hero_image}')`;
        }
      }

      // 3. Update telephone links and texts
      applyPhoneSettings(s);

      // 4. Re-apply translations with active language
      const currentLang = (window.getCurrentLanguage && window.getCurrentLanguage()) || 'en';
      if (window.applyTranslations) {
        window.applyTranslations(currentLang);
      }
    } catch (err) {
      console.warn('[CMS SYNC] Could not load dynamic settings:', err);
    }
  }

  // Execute sync on page load
  syncSiteSettings();
  window.syncSiteSettings = syncSiteSettings;

  // =============================================
  // UTILITIES
  // =============================================
  console.log('D&G Mendez Landscaping initialized with CMS integration.');

});
