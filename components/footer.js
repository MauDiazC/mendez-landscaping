// =============================================
// FOOTER WEB COMPONENT (<app-footer>)
// D&G Mendez Landscaping LLC
// =============================================

class AppFooter extends HTMLElement {
  connectedCallback() {
    const root = this.getAttribute('root-path') !== null 
      ? this.getAttribute('root-path') 
      : (window.location.pathname.includes('/pages/') ? '../' : '');

    const isInsidePages = root.includes('..') || window.location.pathname.includes('/pages/');
    const isHttp = typeof window !== 'undefined' && window.location.protocol.startsWith('http');

    const homeHref = isInsidePages ? `${root}index.html` : (isHttp ? '/' : 'index.html');
    const servicesHref = isInsidePages ? `${root}index.html#services` : '#services';
    const workHref = isHttp ? '/blog' : (isInsidePages ? `${root}index.html#our-story` : '#our-story');
    const aboutHref = isInsidePages ? `${root}index.html#about-us` : '#about-us';
    const serviceAreasHref = isInsidePages ? 'service-areas.html' : `${root}pages/service-areas.html`;
    const contactHref = isInsidePages ? `${root}index.html#contact` : '#contact';
    const faqsHref = isInsidePages ? '#faqs' : '#faqs';

    this.innerHTML = `
<!-- =============================================
     FOOTER COMPONENT
     ============================================= -->
<footer class="w-full bg-surface-container-lowest text-on-surface">
  
  <!-- Pre-Footer CTA Bar -->
  <div class="bg-surface-container-low py-space-xl py-12 md:py-16 border-y border-primary-container/10">
    <div class="w-full max-w-[1280px] mx-auto px-margin md:px-margin-md lg:px-margin-lg px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-space-lg gap-6 text-center md:text-left">
      <div class="max-w-2xl">
        <h3 class="font-headline-sm text-headline-sm text-2xl md:text-3xl font-bold text-primary mb-space-2xs mb-2 tracking-tight" data-i18n="footer.cta_title">Ready to Bring Your Outdoor Vision to Life?</h3>
        <p class="font-body-md text-body-md text-sm sm:text-base text-on-surface-variant leading-relaxed" data-i18n="footer.cta_desc">Tell us about your project and receive a custom consultation with our landscape architects.</p>
      </div>
      <div class="flex flex-wrap items-center justify-center gap-space-sm gap-3 sm:gap-4 shrink-0">
        <a class="inline-flex items-center justify-between h-12 pl-6 pr-2 rounded-full bg-primary text-on-primary hover:bg-primary-container transition-all shadow-[0_2px_8px_-2px_rgba(24,34,28,0.1)] group" data-path="get-a-free-estimate" href="${contactHref}">
          <span class="font-label-lg text-label-lg text-sm font-bold mr-3" data-i18n="footer.cta_btn">Get a Free Estimate</span>
          <span class="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-on-secondary transition-transform group-hover:translate-x-0.5">
            <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
          </span>
        </a>
        <a class="inline-flex items-center gap-space-xs gap-2 h-12 px-6 rounded-full border border-primary-container/20 text-primary font-label-lg text-label-lg text-sm font-bold hover:bg-surface-container transition-colors" href="tel:5026679020" data-phone-link>
          <span class="material-symbols-outlined text-[20px] text-secondary">call</span>
          <span data-i18n="footer.cta_call">Call Us: (502) 667-9020</span>
        </a>
      </div>
    </div>
  </div>

  <!-- Main 4-Column Footer -->
  <div class="w-full max-w-[1280px] mx-auto px-margin md:px-margin-md lg:px-margin-lg px-6 md:px-12 lg:px-20 py-space-3xl py-16 md:py-24">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-lg gap-8 md:gap-12">
      
      <!-- Column 1: Brand & Socials -->
      <div class="flex flex-col gap-space-md gap-4">
        <div class="flex items-center gap-space-sm gap-3">
          <img alt="D&G Mendez Landscaping Logo" class="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeJCV4PNcvxSSUyxuhLrp3aaRrpVPUKsEYpT5-RgdxJAfg5ZgGInF-TI6RmczCJdnf0PkXGnS3QIAKCyMMAIE4Vx1SpsbRFb1bfuyN27qXSBN9PiVRSh1KWoBtIx-ua77IsW9RE4zlr2QA6blDWn9oxUSZ04Zu-yyFTJnX4qwWb9FdCWFV20tSUUtVrZYisv4Mt19lv2oBsCa9WVYVlC1za42o3LgLzQRPGAMShDnq9HBFGH0zEluO"/>
          <span class="font-headline-sm text-headline-sm text-lg font-bold tracking-tight text-primary">D&G Mendez</span>
        </div>
        <p class="font-body-sm text-body-sm text-xs sm:text-sm text-on-surface-variant leading-relaxed" data-i18n="footer.brand_desc">
          Professional landscaping &amp; outdoor craftsmanship tailored to elevate American residential properties.
        </p>
        <div class="flex items-center gap-space-xs gap-2">
          <a aria-label="Landscaping Portfolio Showcase" class="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-colors" href="${workHref}">
            <span class="material-symbols-outlined text-[18px]">nature_people</span>
          </a>
          <a aria-label="Customer Care Hotline" class="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-colors" href="tel:5026679020" data-phone-link>
            <span class="material-symbols-outlined text-[18px]">yard</span>
          </a>
          <a aria-label="Verified Reviews" class="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-colors" href="${homeHref}#testimonials">
            <span class="material-symbols-outlined text-[18px]">verified</span>
          </a>
          <a aria-label="Location Services" class="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-colors" href="${serviceAreasHref}">
            <span class="material-symbols-outlined text-[18px]">pin_drop</span>
          </a>
        </div>
      </div>

      <!-- Column 2: Quick Links -->
      <div class="flex flex-col gap-space-sm gap-3">
        <h4 class="font-label-caps text-label-caps text-xs font-bold text-secondary uppercase tracking-widest" data-i18n="footer.quick_links">Quick Links</h4>
        <ul class="flex flex-col gap-space-xs gap-2.5">
          <li><a class="font-body-sm text-body-sm text-xs sm:text-sm text-on-surface-variant hover:text-secondary transition-colors" data-path="home" data-i18n="nav.home" href="${homeHref}">Home</a></li>
          <li><a class="font-body-sm text-body-sm text-xs sm:text-sm text-on-surface-variant hover:text-secondary transition-colors" data-path="our-work" data-i18n="nav.our_work" href="${workHref}">Our Work</a></li>
          <li><a class="font-body-sm text-body-sm text-xs sm:text-sm text-on-surface-variant hover:text-secondary transition-colors" data-path="about-us" data-i18n="nav.about_us" href="${aboutHref}">About Us</a></li>
          <li><a class="font-body-sm text-body-sm text-xs sm:text-sm text-on-surface-variant hover:text-secondary transition-colors" data-path="service-areas" data-i18n="nav.service_areas" href="${serviceAreasHref}">Service Areas</a></li>
          <li><a class="font-body-sm text-body-sm text-xs sm:text-sm text-on-surface-variant hover:text-secondary transition-colors" data-path="contact" data-i18n="nav.contact" href="${contactHref}">Contact</a></li>
          <li><a class="font-body-sm text-body-sm text-xs sm:text-sm text-on-surface-variant hover:text-secondary transition-colors" data-path="faqs" data-i18n="footer.faqs" href="${faqsHref}">FAQs</a></li>
        </ul>
      </div>

      <!-- Column 3: Our Services -->
      <div class="flex flex-col gap-space-sm gap-3">
        <h4 class="font-label-caps text-label-caps text-xs font-bold text-secondary uppercase tracking-widest" data-i18n="footer.our_services">Our Services</h4>
        <ul class="flex flex-col gap-space-xs gap-2.5">
          <li><a class="font-body-sm text-body-sm text-xs sm:text-sm text-on-surface-variant hover:text-secondary transition-colors" data-path="lawn-care-maintenance" data-i18n="footer.services_lawn" href="${servicesHref}">Lawn Care</a></li>
          <li><a class="font-body-sm text-body-sm text-xs sm:text-sm text-on-surface-variant hover:text-secondary transition-colors" data-path="landscape-design" data-i18n="footer.services_design" href="${servicesHref}">Landscape Design</a></li>
          <li><a class="font-body-sm text-body-sm text-xs sm:text-sm text-on-surface-variant hover:text-secondary transition-colors" data-path="garden-installation" data-i18n="footer.services_garden" href="${servicesHref}">Garden Installation</a></li>
          <li><a class="font-body-sm text-body-sm text-xs sm:text-sm text-on-surface-variant hover:text-secondary transition-colors" data-path="mulching-edging" data-i18n="footer.services_mulch" href="${servicesHref}">Mulching &amp; Edging</a></li>
          <li><a class="font-body-sm text-body-sm text-xs sm:text-sm text-on-surface-variant hover:text-secondary transition-colors" data-path="tree-shrub-care" data-i18n="footer.services_tree" href="${servicesHref}">Tree &amp; Shrub Care</a></li>
          <li><a class="font-body-sm text-body-sm text-xs sm:text-sm text-on-surface-variant hover:text-secondary transition-colors" data-path="hardscaping-outdoor-living" data-i18n="footer.services_hardscape" href="${servicesHref}">Hardscaping</a></li>
        </ul>
      </div>

      <!-- Column 4: Contact & Service Areas -->
      <div class="flex flex-col gap-space-sm gap-3">
        <h4 class="font-label-caps text-label-caps text-xs font-bold text-secondary uppercase tracking-widest" data-i18n="footer.contact_title">Contact &amp; Service Areas</h4>
        <div class="flex flex-col gap-space-xs gap-3 font-body-sm text-body-sm text-xs sm:text-sm text-on-surface-variant">
          <div class="flex items-start gap-space-xs gap-2">
            <span class="material-symbols-outlined text-[18px] text-secondary shrink-0 mt-0.5">phone</span>
            <a href="tel:5026679020" class="hover:text-secondary transition-colors" data-phone-link data-phone>(502) 667-9020</a>
          </div>
          <div class="flex items-start gap-space-xs gap-2">
            <span class="material-symbols-outlined text-[18px] text-secondary shrink-0 mt-0.5">mail</span>
            <a href="mailto:mendezhenry273@gmail.com" class="hover:text-secondary transition-colors">mendezhenry273@gmail.com</a>
          </div>
          <div class="flex items-start gap-space-xs gap-2">
            <span class="material-symbols-outlined text-[18px] text-secondary shrink-0 mt-0.5">schedule</span>
            <div>
              <div data-i18n="footer.hours_weekday">Mon - Fri: 7:00 AM - 6:00 PM</div>
              <div data-i18n="footer.hours_sat">Sat: 8:00 AM - 3:00 PM</div>
            </div>
          </div>
          <div class="flex items-start gap-space-xs gap-2">
            <span class="material-symbols-outlined text-[18px] text-secondary shrink-0 mt-0.5">map</span>
            <span data-i18n="footer.serving_area">Serving Greater Kentukiana &amp; Suburban Communities</span>
          </div>
        </div>
      </div>

    </div>
  </div>

  <!-- Bottom Legal Strip -->
  <div class="border-t border-primary-container/10 bg-surface-container-low py-space-md py-4 sm:py-6">
    <div class="w-full max-w-[1280px] mx-auto px-margin md:px-margin-md lg:px-margin-lg px-6 md:px-12 lg:px-20 flex flex-col sm:flex-row items-center justify-between gap-space-sm gap-3 font-body-sm text-body-sm text-xs text-on-surface-variant text-center sm:text-left">
      <div data-i18n="footer.rights">© 2026 D&G Mendez Landscaping All rights reserved.</div>
    </div>
  </div>
</footer>
`;

    // Reapply active language translations to new elements if available
    if (window.applyTranslations && window.getCurrentLanguage) {
      window.applyTranslations(window.getCurrentLanguage());
    }
  }
}

customElements.define('app-footer', AppFooter);
