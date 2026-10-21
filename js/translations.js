// =============================================
// INTERNATIONALIZATION (i18n) & TRANSLATIONS
// D&G Mendez Landscaping LLC
// =============================================

const translations = {
  en: {
    // -----------------------------------------
    // NAVBAR & HEADER
    // -----------------------------------------
    "nav.home": "Home",
    "nav.our_work": "Our Work",
    "nav.about_us": "About Us",
    "nav.service_areas": "Service Areas",
    "nav.contact": "Contact",
    "nav.get_estimate": "Get a Free Estimate",

    // -----------------------------------------
    // FOOTER
    // -----------------------------------------
    "footer.cta_title": "Ready to Bring Your Outdoor Vision to Life?",
    "footer.cta_desc": "Tell us about your project and receive a custom consultation with our landscape architects.",
    "footer.cta_btn": "Get a Free Estimate",
    "footer.cta_call": "Call Us: (502) 667-9020",
    "footer.brand_desc": "Professional landscaping &amp; outdoor craftsmanship tailored to elevate American residential properties.",
    "footer.quick_links": "Quick Links",
    "footer.our_services": "Our Services",
    "footer.contact_title": "Contact &amp; Service Areas",
    "footer.hours_weekday": "Mon - Fri: 7:00 AM - 6:00 PM",
    "footer.hours_sat": "Sat: 8:00 AM - 3:00 PM",
    "footer.serving_area": "Serving Greater Kentuckiana &amp; Suburban Communities",
    "footer.rights": "© 2026 D&G Mendez Landscaping All rights reserved.",
    "footer.services_lawn": "Lawn Care",
    "footer.services_design": "Landscape Design",
    "footer.services_garden": "Garden Installation",
    "footer.services_mulch": "Mulching &amp; Edging",
    "footer.services_tree": "Tree &amp; Shrub Care",
    "footer.services_hardscape": "Hardscaping",
    "footer.faqs": "FAQs",

    // -----------------------------------------
    // INDEX.HTML - HERO & INTRO
    // -----------------------------------------
    "index.breadcrumb_home": "Home",
    "index.breadcrumb_about": "About Us",
    "index.badge_about": "About D&G Mendez Landscaping.",
    "index.hero_title": "Thoughtful Landscaping. <br class=\"hidden sm:inline\"/><span class=\"text-secondary font-medium\">Lasting Impressions.</span>",
    "index.hero_desc": "Founded on the belief that residential outdoor spaces should be enduring living extensions of the home, crafted with horticultural integrity, architectural precision, and respectful client partnerships. We bridge the gap between botanical science, soil vitality, and generational stonework.",
    "index.pillar1_title": "ISA-Certified",
    "index.pillar1_desc": "Certified Specialists",
    "index.pillar2_title": "100% Regional",
    "index.pillar2_desc": "Eco-Adapted Native Flora &amp; Soil Cultivation",
    "index.pillar3_title": "365-Day Guarantee",
    "index.pillar3_desc": "Full Botanical Replacement Warranty Program",
    "index.pillar4_title": "Fixed-Price Clarity",
    "index.pillar4_desc": "Transparent, Itemized Penny-Exact Contracts",
    "index.hero_card_badge": "Louisville Ky.",
    "index.hero_card_title": "Projects with experience and confidence",
    "index.hero_card_desc": "Curated with thermal bluestone courtyards, precision low-voltage lighting, and over forty drought-resilient perennial varieties.",

    // -----------------------------------------
    // INDEX.HTML - OUR STORY
    // -----------------------------------------
    "index.story_badge": "Our Foundation &amp; Philosophy",
    "index.story_title": "Cultivating Living Sanctuaries",
    "index.story_p1": "D&G Mendez Landscaping began with a deliberate commitment: to replace the transient, high-turnover nature of conventional \"mow-and-blow\" yard work with dedicated, holistic residential grounds stewardship. We believed private gardens deserved the same architectural rigor, geological integrity, and botanical science traditionally reserved for public conservatories and grand estates.",
    "index.story_p2": "Over nearly two decades, we have evolved into an interdisciplinary collective. Before a shovel touches the earth, our team maps local microclimates, analyzes subsoil microbiomes, calculates sun transit angles, and designs water-retention grades.",
    "index.story_p3": "From hand-chiseled dry-stack fieldstone to mature native plantings that flourish year after year, every square foot is deliberate, resilient, and deeply peaceful.",
    "index.tag_privately_owned": "Privately Owned &amp; Operated",
    "index.tag_community": "Locally Rooted Community Focus",
    "index.quote_text": "“We don’t simply install plants or lay pavers; we cultivate micro-ecosystems designed to thrive for generations, harmonizing architecture with the quiet rhythm of the earth.”",
    "index.quote_author": "Henry Mendez",
    "index.quote_role": "Founder",
    "index.precision_title": "Architectural Precision",
    "index.precision_desc": "Dry-stack &amp; Permeable Paver Systems",

    // -----------------------------------------
    // INDEX.HTML - PHILOSOPHIES
    // -----------------------------------------
    "index.philo_badge": "The Pillars Behind Every Garden",
    "index.philo_title": "Four Foundational Philosophies",
    "index.philo_subtitle": "Our standards are rooted in scientific discipline, environmental ethics, and enduring residential construction.",
    "index.philo1_cat": "01 / BOTANY",
    "index.philo1_title": "Microclimate-First Plant Selection",
    "index.philo1_desc": "We analyze soil pH, subsurface moisture tables, wind shear, and solar hours before prescribing any species. This ensures effortless long-term vitality and negligible water consumption.",
    "index.philo1_tag": "Zero-Guesswork Planting",
    "index.philo2_cat": "02 / HARDSCAPING",
    "index.philo2_title": "Architectural Structural Integrity",
    "index.philo2_desc": "Hand-chiseled native stone, laser-calibrated slope grading, and aggregate compaction bases twice the municipal standard guarantee driveways, steps, and retaining walls built for decades.",
    "index.philo2_tag": "Decade-Proof Masonry",
    "index.philo3_cat": "03 / SOIL BIOLOGY",
    "index.philo3_title": "Ecological Stewardship &amp; Soil Health",
    "index.philo3_desc": "True beauty begins underground. We prioritize mycorrhizal inoculation, premium organic compost, native pollinator corridors, and strict zero-toxic-runoff protocols for children and pets.",
    "index.philo3_tag": "Living Organic Substrates",
    "index.philo4_cat": "04 / INTEGRITY",
    "index.philo4_title": "Radical Communication &amp; Respect",
    "index.philo4_desc": "Daily end-of-day site sweeps, magnetic nail rakes, punctual crew arrivals, guaranteed completion schedules, and transparent, locked contracts without mid-project surprise change orders.",
    "index.philo4_tag": "White-Glove Job Sites",

    // -----------------------------------------
    // INDEX.HTML - CLIENT PROCESS
    // -----------------------------------------
    "index.process_badge": "The Client Experience Standard",
    "index.process_title": "White-Glove Service From Initial Consultation to Handover",
    "index.process_subtitle": "We treat your property with absolute reverence. Here is our structured, stress-free four-stage journey.",
    "index.step1_title": "Respectful On-Site Assessment",
    "index.step1_desc": "Prompt arrival, comprehensive property walking audit, soil compaction testing, shade path measurements, and attentive active listening to your lifestyle needs.",
    "index.step2_title": "3D Visual &amp; Fixed Proposal",
    "index.step2_desc": "Photorealistic rendering of your finished grounds paired with an itemized, transparent budget. Zero ambiguity, no surprise markups, locked completion schedules.",
    "index.step3_title": "Considerate, Low-Impact Build",
    "index.step3_desc": "Pristine turf protection mats, respectful equipment operating hours, daily magnetic nail sweeps, and end-of-day progress photo summaries via text.",
    "index.step4_title": "Handover &amp; Care Warranty",
    "index.step4_desc": "Guided evening and day walkthrough, tailored botanical seasonal care manual, instant 365-day warranty activation, and recurring maintenance scheduling options.",

    // -----------------------------------------
    // INDEX.HTML - ACCREDITATIONS & TESTIMONIALS
    // -----------------------------------------
    "index.accred_badge": "Verified Excellence",
    "index.accred_title": "Accreditations &amp; Industry Standards",
    "index.accred1_title": "ISA Arborists",
    "index.accred1_desc": "Certified Arborists On Staff",
    "index.accred2_title": "Licensed &amp; Bonded",
    "index.accred2_desc": "$2M General Liability Protection",
    "index.accred3_title": "Low-Voltage Lighting",
    "index.accred3_desc": "Certified Architectural Illuminators",
    "index.accred4_title": "WALP Member",
    "index.accred4_desc": "State Landscape Professionals Assn.",
    "index.testim_badge": "Verified 4-Year Estate Client",
    "index.testim_rating": "5.0 Star Client Rating",
    "index.testim_quote": "“Every evening, the driveway was swept spotless, the stones were placed with artistic obsession, and our botanical warranty was honored promptly when a rare frost struck. D&G Mendez is in a class of their own.”",
    "index.testim_author": "Victoria &amp; David Henderson",
    "index.testim_role": "Proud owners &amp; clients",

    // -----------------------------------------
    // INDEX.HTML - CTA BANNERS
    // -----------------------------------------
    "index.cta_curious": "Curious about what we can build together?",
    "index.cta_explore": "Explore Our Master Disciplines",
    "index.cta_badge": "Take the First Step",
    "index.cta_headline": "Ready to Create Your Own Living Sanctuary?",
    "index.cta_subtext": "Schedule an obligation-free grounds evaluation and soil consultation with our principal landscape architects.",
    "index.cta_estimate_btn": "Get a Free Estimate",
    "index.cta_call_btn": "Call: (502) 667-9020",

    // -----------------------------------------
    // SERVICE-AREAS.HTML - HERO & ROUTE CHECKER
    // -----------------------------------------
    "areas.breadcrumb_home": "Home",
    "areas.breadcrumb_current": "Service Areas",
    "areas.hero_badge": "Regional Service Footprint &amp; Daily Route Coverage",
    "areas.hero_title": "Landscaping Services <br class=\"hidden sm:inline\"/><span class=\"text-secondary italic font-light\">in Your Area.</span>",
    "areas.hero_desc": "Providing residential landscape architecture, horticultural stewardship, and custom masonry throughout Greater Metro and surrounding county communities. Check your neighborhood below for active crew dispatch and priority walkthrough scheduling.",
    "areas.zip_title": "Check Immediate Route Availability",
    "areas.zip_desc": "Enter your 5-digit ZIP code to confirm whether your property is within our weekly route schedule.",
    "areas.zip_placeholder": "Enter your 5-digit ZIP code (e.g. 40202, 40204, 40207)...",
    "areas.zip_btn": "Check Availability",
    "areas.badge_cities": "Daily route dispatch across 4 cities",
    "areas.badge_estimates": "Zero-obligation, guaranteed on-site estimates",
    "areas.badge_insurance": "State licensed, bonded &amp; $2M commercial liability",
    "areas.map_badge": "Operational Grid",
    "areas.map_title": "Regional Dispatch Map",
    "areas.map_subtitle": "Real-time territory map displaying regional dispatch hubs, county operational borders, and daily maintenance loops.",
    "areas.gps_sync": "GPS Sync Active",
    "areas.coverage_area": "Coverage Area: Louisville &amp; Greater Kentuckiana",
    "areas.depots_title": "Primary Yards &amp; Operations Depots",
    "areas.depots_desc": "Louisville Operations Depot &amp; Kentuckiana Material Yard",
    "areas.walkthrough_title": "Need a Walkthrough?",
    "areas.walkthrough_desc": "Next daylight slot in 24-48 hrs",

    // -----------------------------------------
    // SERVICE-AREAS.HTML - VALUE PROPOSITIONS
    // -----------------------------------------
    "areas.std_badge": "Standard of Excellence",
    "areas.std_title": "The D&G Mendez Service Standard",
    "areas.std_desc": "Regardless of your ZIP code or county, our operations ensure consistent punctuality, respectful property care, and horticultural mastery.",
    "areas.pillar1_title": "Microclimate Intelligence",
    "areas.pillar1_desc": "Plants selected for your specific microclimate elevation, sun orientation, and soil porosity to guarantee long-term health and zero nursery replacement waste.",
    "areas.pillar2_title": "Dedicated Route Crews",
    "areas.pillar2_desc": "Consistent superintendents who know your gate codes, dog zones, favored garden beds, and weekend noise preferences down to the minute.",
    "areas.pillar3_title": "Storm Readiness &amp; Care",
    "areas.pillar3_desc": "Priority routing for heavy wind and sudden ice events. Our dispatch redirects chippers and arborists rapidly to our contracted route clients.",
    "areas.pillar4_title": "Itemized, Zero Travel Fees",
    "areas.pillar4_desc": "Transparent pricing without arbitrary county boundary surcharges. What we quote on-site is the exact amount reflected on your transparent invoice.",

    // -----------------------------------------
    // SERVICE-AREAS.HTML - PHOTO SHOWCASE
    // -----------------------------------------
    "areas.showcase_badge": "Field Execution",
    "areas.showcase_title": "Crafted Across the Metro Area",
    "areas.showcase_link": "Explore All Local Case Studies",
    "areas.card1_loc": "Anchorage Estate",
    "areas.card1_title": "Terraced Bluestone Hardscaping",
    "areas.card2_loc": "Mockingbird Valley Residence",
    "areas.card2_title": "Hillside Grading &amp; Kentucky Bluegrass",
    "areas.card3_loc": "Old Louisville Historic District",
    "areas.card3_title": "Period-Accurate Brick Masonry &amp; Hedges",

    // -----------------------------------------
    // SERVICE-AREAS.HTML - FAQS
    // -----------------------------------------
    "areas.faq_badge": "Client Questions",
    "areas.faq_title": "Service Area &amp; Dispatch FAQs",
    "areas.faq_subtitle": "Everything you need to know about route schedules, estate boundaries, and neighborhood quotes.",
    "areas.faq1_q": "How do I confirm if my property is within your standard service boundary in Kentuckiana?",
    "areas.faq1_a": "You can enter your 5-digit postal code into our live checker at the top of this page or contact our office directly. We proudly serve the entire Greater Louisville and Kentuckiana metro area—including Jefferson, Oldham, Shelby, and Bullitt counties in Kentucky, as well as Clark and Floyd counties across the river in Southern Indiana. For large acreage estates just outside this boundary, our design-build division frequently coordinates custom project consultations.",
    "areas.faq2_q": "Do you charge extra travel fees across counties or over the river into Southern Indiana?",
    "areas.faq2_a": "No. We never charge arbitrary travel surcharges or hidden portal-to-portal fees within our standard Kentuckiana service network. Our crews operate along optimized neighborhood route loops across Louisville and Southern Indiana communities, keeping transit overhead minimal and your service costs predictable and transparent.",
    "areas.faq3_q": "How quickly can D&amp;G Mendez Landscaping come out for an on-site property walkthrough?",
    "areas.faq3_a": "For seasonal maintenance agreements, cleanups, and property enhancement walkthroughs, an on-site estimate can typically be scheduled within 24 to 48 hours. For comprehensive master-planned hardscaping, stonework, and retaining wall projects across Kentuckiana, our landscape specialists typically schedule consultations within 3 to 5 business days.",
    "areas.faq4_q": "Do you work with local HOA review boards in communities like Norton Commons or Anchorage?",
    "areas.faq4_a": "Yes, extensively. We have regular experience preparing landscape design submittal packages that comply with strict HOA guidelines across Norton Commons, Anchorage, Lake Forest, Springhurst, Glenview, and historic districts like Old Louisville. We assist with plant species selection, grading specifications, and hardscape cut sheets directly for your review committee.",
    "areas.faq5_q": "Can I request seasonal maintenance if my neighbor also uses D&amp;G Mendez Landscaping?",
    "areas.faq5_a": "Absolutely. In fact, clustering service visits with adjacent or nearby properties in your neighborhood allows us to offer our Kentuckiana Neighborhood Route Discount (up to 10% off recurring seasonal agreements) while minimizing equipment noise and vehicle traffic on your residential street.",

    // -----------------------------------------
    // SERVICE-AREAS.HTML - BOTTOM CALLOUTS
    // -----------------------------------------
    "areas.not_listed_title": "Don’t See Your Neighborhood or ZIP Code?",
    "areas.not_listed_desc": "We frequently expand our daily radius for comprehensive design-build grounds, vineyard estates, and large residential transformations. Contact our concierge to verify route logistics.",
    "areas.not_listed_btn": "Inquire About Your Property",
    "areas.bottom_badge": "Local Route Bookings Open for the Upcoming Season",
    "areas.bottom_title": "Ready to Transform Your <span class=\"text-secondary-fixed italic font-light\">Local Grounds?</span>",
    "areas.bottom_desc": "Speak directly with our director Henry Mendez, review custom horticultural specifications, and reserve your priority on-site consultation.",
    "areas.bottom_btn_est": "Request a Free Estimate",
    "areas.bottom_btn_call": "Call Dispatch: (502) 667-9020",
    "areas.trust1": "Strict No-Fee Cancellation Policy",
    "areas.trust2": "Prompt 48-Hour Proposal Turnaround",
    "areas.trust3": "100% Satisfaction Craftsmanship Warranty"
  },

  es: {
    // -----------------------------------------
    // NAVBAR & HEADER
    // -----------------------------------------
    "nav.home": "Inicio",
    "nav.our_work": "Proyectos",
    "nav.about_us": "Nosotros",
    "nav.service_areas": "Áreas de Servicio",
    "nav.contact": "Contacto",
    "nav.get_estimate": "Presupuesto Gratis",

    // -----------------------------------------
    // FOOTER
    // -----------------------------------------
    "footer.cta_title": "¿Listo para hacer realidad tu visión exterior?",
    "footer.cta_desc": "Cuéntanos sobre tu proyecto y recibe una consulta personalizada con nuestros arquitectos paisajistas.",
    "footer.cta_btn": "Presupuesto Gratis",
    "footer.cta_call": "Llámanos: (502) 667-9020",
    "footer.brand_desc": "Jardinería profesional y cantería artesanal para transformar y realzar propiedades residenciales.",
    "footer.quick_links": "Enlaces Rápidos",
    "footer.our_services": "Nuestros Servicios",
    "footer.contact_title": "Contacto y Zonas de Servicio",
    "footer.hours_weekday": "Lun - Vie: 7:00 AM - 6:00 PM",
    "footer.hours_sat": "Sáb: 8:00 AM - 3:00 PM",
    "footer.serving_area": "Sirviendo a Kentuckiana y comunidades suburbanas",
    "footer.rights": "© 2026 D&G Mendez Landscaping. Todos los derechos reservados.",
    "footer.services_lawn": "Cuidado de Césped",
    "footer.services_design": "Diseño Paisajístico",
    "footer.services_garden": "Instalación de Jardines",
    "footer.services_mulch": "Acolchado y Bordes",
    "footer.services_tree": "Cuidado de Árboles y Arbustos",
    "footer.services_hardscape": "Piedra y Pavimentos",
    "footer.faqs": "Preguntas Frecuentes",

    // -----------------------------------------
    // INDEX.HTML - HERO & INTRO
    // -----------------------------------------
    "index.breadcrumb_home": "Inicio",
    "index.breadcrumb_about": "Nosotros",
    "index.badge_about": "Acerca de D&G Mendez Landscaping.",
    "index.hero_title": "Jardinería con Propósito. <br class=\"hidden sm:inline\"/><span class=\"text-secondary font-medium\">Impresiones Duraderas.</span>",
    "index.hero_desc": "Fundados en la convicción de que los espacios exteriores deben ser extensiones vivas y perdurables del hogar, creadas con rigor botánico, precisión arquitectónica y relaciones de confianza con el cliente. Unimos la ciencia botánica, la vitalidad del suelo y la cantería de generación en generación.",
    "index.pillar1_title": "Certificados ISA",
    "index.pillar1_desc": "Especialistas Certificados",
    "index.pillar2_title": "100% Regional",
    "index.pillar2_desc": "Flora Autóctona Adaptada y Cultivo de Suelos",
    "index.pillar3_title": "Garantía de 365 Días",
    "index.pillar3_desc": "Programa Completo de Reemplazo Botánico",
    "index.pillar4_title": "Precios Claros y Fijos",
    "index.pillar4_desc": "Contratos Detallados y Transparentes al Centavo",
    "index.hero_card_badge": "Louisville Ky.",
    "index.hero_card_title": "Proyectos con experiencia y confianza",
    "index.hero_card_desc": "Diseñados con patios de piedra natural bluestone, iluminación arquitectónica de bajo voltaje y más de cuarenta variedades perennes resistentes a la sequía.",

    // -----------------------------------------
    // INDEX.HTML - OUR STORY
    // -----------------------------------------
    "index.story_badge": "Nuestra Filosofía y Fundamentos",
    "index.story_title": "Cultivando Santuarios Vivos",
    "index.story_p1": "D&G Mendez Landscaping nació con un propósito claro: sustituir el servicio rápido y superficial convencional por un cuidado integral, dedicado y duradero de los terrenos residenciales. Creemos que los jardines familiares merecen el mismo cuidado arquitectónico, estabilidad estructural y rigor botánico tradicionalmente reservados para grandes parques y fincas.",
    "index.story_p2": "A lo largo de casi dos décadas, nos hemos consolidado como un equipo interdisciplinario. Antes de tocar la tierra, estudiamos los microclimas locales, analizamos el suelo, calculamos los ángulos solares y diseñamos pendientes de drenaje óptimas.",
    "index.story_p3": "Desde muros de piedra colocados a mano hasta plantaciones maduras que florecen año tras año, cada metro cuadrado es intencional, resistente y profundamente armonioso.",
    "index.tag_privately_owned": "Empresa Familiar y Privada",
    "index.tag_community": "Arraigo y Compromiso Comunitario",
    "index.quote_text": "“No nos limitamos a plantar vegetación o colocar piedras; cultivamos microecosistemas diseñados para perdurar durante generaciones, uniendo la arquitectura con el ritmo natural de la tierra.”",
    "index.quote_author": "Henry Mendez",
    "index.quote_role": "Fundador",
    "index.precision_title": "Precisión Arquitectónica",
    "index.precision_desc": "Mampostería en seco y sistemas de adoquines permeables",

    // -----------------------------------------
    // INDEX.HTML - PHILOSOPHIES
    // -----------------------------------------
    "index.philo_badge": "Los Pilares de Cada Jardín",
    "index.philo_title": "Cuatro Filosofías Fundamentales",
    "index.philo_subtitle": "Nuestros estándares se fundamentan en la disciplina botánica, el respeto ambiental y una construcción residencial perdurable.",
    "index.philo1_cat": "01 / BOTÁNICA",
    "index.philo1_title": "Selección Vegetal según el Microclima",
    "index.philo1_desc": "Analizamos el pH del suelo, la humedad freática, los vientos y la insolación antes de prescribir especies. Esto garantiza vitalidad duradera y mínimo gasto de agua.",
    "index.philo1_tag": "Plantación Sin Imprevistos",
    "index.philo2_cat": "02 / CANTERÍA Y ESTRUCTURA",
    "index.philo2_title": "Integridad Estructural Arquitectónica",
    "index.philo2_desc": "Piedra local tallada a mano, pendientes calibradas por láser y bases compactadas que doblan la norma municipal garantizan caminos y muros construidos para durar décadas.",
    "index.philo2_tag": "Albañilería para Décadas",
    "index.philo3_cat": "03 / BIOLOGÍA DEL SUELO",
    "index.philo3_title": "Cuidado Ecológico y Salud del Suelo",
    "index.philo3_desc": "La verdadera belleza comienza bajo tierra. Priorizamos compost orgánico de alta calidad, corredores de polinización y protocolos sin residuos tóxicos para niños y mascotas.",
    "index.philo3_tag": "Sustratos Orgánicos Vivos",
    "index.philo4_cat": "04 / INTEGRIDAD",
    "index.philo4_title": "Comunicación Clara y Respeto Absoluto",
    "index.philo4_desc": "Limpieza diaria del área al terminar la jornada, barrido magnético de clavos, puntualidad, cronogramas garantizados y contratos cerrados sin cobros sorpresa a mitad de obra.",
    "index.philo4_tag": "Sitios de Trabajo Impecables",

    // -----------------------------------------
    // INDEX.HTML - CLIENT PROCESS
    // -----------------------------------------
    "index.process_badge": "El Estándar de Experiencia del Cliente",
    "index.process_title": "Servicio de Primera: Desde la Consulta Inicial hasta la Entrega",
    "index.process_subtitle": "Tratamos su propiedad con máximo respeto. Conozca nuestro proceso estructurado y transparente en 4 etapas.",
    "index.step1_title": "Evaluación Detallada en el Terreno",
    "index.step1_desc": "Llegada puntual, recorrido completo por la propiedad, examen del suelo, medición de sombras y escucha atenta de las necesidades de su familia.",
    "index.step2_title": "Diseño 3D y Presupuesto Cerrado",
    "index.step2_desc": "Visualización fotorrealista de su jardín con un presupuesto desglosado y transparente. Cero ambigüedad, sin sobrecostos y fechas de entrega claras.",
    "index.step3_title": "Construcción Cuidadosa y Limpia",
    "index.step3_desc": "Protección para el césped, horarios de trabajo respetuosos, recolección magnética de residuos y reportes fotográficos de avance por mensaje.",
    "index.step4_title": "Entrega Final y Garantía de Cuidado",
    "index.step4_desc": "Recorrido conjunto diurno y nocturno, manual de cuidados de temporada personalizado, activación inmediata de garantía de 365 días y planes de mantenimiento continuo.",

    // -----------------------------------------
    // INDEX.HTML - ACCREDITATIONS & TESTIMONIALS
    // -----------------------------------------
    "index.accred_badge": "Excelencia Demostrada",
    "index.accred_title": "Acreditaciones y Estándares de la Industria",
    "index.accred1_title": "Arboristas ISA",
    "index.accred1_desc": "Especialistas certificados en el equipo",
    "index.accred2_title": "Licencia y Fianzas",
    "index.accred2_desc": "Protección de responsabilidad civil de $2M",
    "index.accred3_title": "Iluminación de Bajo Voltaje",
    "index.accred3_desc": "Iluminadores arquitectónicos certificados",
    "index.accred4_title": "Miembros de WALP",
    "index.accred4_desc": "Asociación de profesionales del paisaje",
    "index.testim_badge": "Cliente Verificado por 4 Años",
    "index.testim_rating": "Calificación de 5.0 Estrellas",
    "index.testim_quote": "“Cada tarde la entrada quedaba impecable, las piedras se colocaron con una precisión artística admirable y la garantía de plantas se cumplió de inmediato ante una helada inesperada. D&G Mendez juega en otra categoría.”",
    "index.testim_author": "Victoria y David Henderson",
    "index.testim_role": "Clientes y propietarios",

    // -----------------------------------------
    // INDEX.HTML - CTA BANNERS
    // -----------------------------------------
    "index.cta_curious": "¿Tienes curiosidad de lo que podemos crear juntos?",
    "index.cta_explore": "Explora Nuestras Especialidades",
    "index.cta_badge": "Da el Primer Paso",
    "index.cta_headline": "¿Listo para Crear tu Propio Santuario Vivo?",
    "index.cta_subtext": "Agenda una evaluación sin compromiso y consulta de suelos con nuestros paisajistas expertos.",
    "index.cta_estimate_btn": "Presupuesto Gratis",
    "index.cta_call_btn": "Llama: (502) 667-9020",

    // -----------------------------------------
    // SERVICE-AREAS.HTML - HERO & ROUTE CHECKER
    // -----------------------------------------
    "areas.breadcrumb_home": "Inicio",
    "areas.breadcrumb_current": "Áreas de Servicio",
    "areas.hero_badge": "Cobertura Regional y Rutas Diarias de Servicio",
    "areas.hero_title": "Servicios de Jardinería <br class=\"hidden sm:inline\"/><span class=\"text-secondary italic font-light\">en Tu Zona.</span>",
    "areas.hero_desc": "Ofreciendo arquitectura paisajística residencial, cuidado hortícola y cantería artesanal en toda la zona metropolitana y condados cercanos. Consulta tu código postal abajo para confirmar disponibilidad de cuadrilla y programar tu visita técnica prioritaria.",
    "areas.zip_title": "Consulta Disponibilidad Inmediata de Ruta",
    "areas.zip_desc": "Ingresa tu código postal de 5 dígitos para verificar si tu propiedad está dentro de nuestra ruta semanal programada.",
    "areas.zip_placeholder": "Ingresa tu código postal de 5 dígitos (ej. 40202, 40204, 40207)...",
    "areas.zip_btn": "Verificar Disponibilidad",
    "areas.badge_cities": "Despacho diario de rutas en 4 ciudades",
    "areas.badge_estimates": "Presupuestos en el sitio 100% garantizados y sin compromiso",
    "areas.badge_insurance": "Licencia estatal, fianza y seguro comercial de $2M",
    "areas.map_badge": "Red Operativa",
    "areas.map_title": "Mapa Regional de Despacho",
    "areas.map_subtitle": "Mapa en tiempo real con centros de despacho regional, límites operativos por condado y rutas de mantenimiento diario.",
    "areas.gps_sync": "Sincronización GPS Activa",
    "areas.coverage_area": "Área de Cobertura: Louisville y Gran Kentuckiana",
    "areas.depots_title": "Patios Principales y Centros de Operación",
    "areas.depots_desc": "Centro de Operaciones Louisville y Patio de Materiales Kentuckiana",
    "areas.walkthrough_title": "¿Necesitas una Visita Técnica?",
    "areas.walkthrough_desc": "Citas disponibles en 24 a 48 hrs",

    // -----------------------------------------
    // SERVICE-AREAS.HTML - VALUE PROPOSITIONS
    // -----------------------------------------
    "areas.std_badge": "Estándar de Excelencia",
    "areas.std_title": "El Estándar de Servicio D&G Mendez",
    "areas.std_desc": "Sin importar tu código postal o condado, nuestras cuadrillas aseguran puntualidad, cuidado absoluto de tu propiedad y maestría hortícola.",
    "areas.pillar1_title": "Conocimiento del Microclima",
    "areas.pillar1_desc": "Plantas seleccionadas según la elevación, asoleamiento y porosidad del suelo para asegurar longevidad sin desperdicios ni reemplazos constantes.",
    "areas.pillar2_title": "Cuadrillas Asignadas por Ruta",
    "areas.pillar2_desc": "Encargados fijos que conocen los códigos de tus portones, zonas de mascotas, tus áreas de flores favoritas y los horarios convenientes.",
    "areas.pillar3_title": "Respuesta Rápida ante Tormentas",
    "areas.pillar3_desc": "Prioridad de ruta ante fuertes vientos o tormentas de hielo. Redirigimos trituradoras y arboristas con agilidad a nuestros clientes contratados.",
    "areas.pillar4_title": "Tarifas Transparentes sin Recargos",
    "areas.pillar4_desc": "Precios claros sin recargos por cruce de condado. Lo acordado en la visita técnica es exactamente lo que refleja tu factura.",

    // -----------------------------------------
    // SERVICE-AREAS.HTML - PHOTO SHOWCASE
    // -----------------------------------------
    "areas.showcase_badge": "Ejecución en Campo",
    "areas.showcase_title": "Proyectos Creados en el Área Metropolitana",
    "areas.showcase_link": "Ver Todos los Casos de Estudio Locales",
    "areas.card1_loc": "Finca en Anchorage",
    "areas.card1_title": "Patio Escalonado de Piedra Bluestone",
    "areas.card2_loc": "Residencia en Mockingbird Valley",
    "areas.card2_title": "Nivelación de Ladera y Césped Kentucky Bluegrass",
    "areas.card3_loc": "Distrito Histórico de Old Louisville",
    "areas.card3_title": "Albañilería de Época y Setos de Boj",

    // -----------------------------------------
    // SERVICE-AREAS.HTML - FAQS
    // -----------------------------------------
    "areas.faq_badge": "Preguntas de Clientes",
    "areas.faq_title": "Preguntas Frecuentes sobre Áreas de Servicio y Despacho",
    "areas.faq_subtitle": "Todo lo que necesitas saber sobre horarios de rutas, límites de servicio y presupuestos en tu vecindario.",
    "areas.faq1_q": "¿Cómo confirmo si mi propiedad está dentro del área de servicio en Kentuckiana?",
    "areas.faq1_a": "Puedes ingresar tu código postal de 5 dígitos en nuestro verificador al inicio de esta página o llamar directamente a nuestra oficina. Brindamos servicio a todo el área metropolitana de Greater Louisville y Kentuckiana, incluidos los condados de Jefferson, Oldham, Shelby y Bullitt en Kentucky, así como los condados de Clark y Floyd cruzando el río en Southern Indiana. Para propiedades grandes o fincas fuera de este perímetro, coordinamos visitas y proyectos personalizados.",
    "areas.faq2_q": "¿Cobran cargos adicionales por traslado entre condados o hacia el sur de Indiana?",
    "areas.faq2_a": "No. Nunca cobramos recargos arbitrarios de viaje o tarifas ocultas dentro de nuestra red de servicio establecida en Kentuckiana. Nuestras cuadrillas trabajan en circuitos de vecindarios optimizados tanto en Louisville como en comunidades del sur de Indiana, manteniendo costos predecibles y cotizaciones 100% transparentes.",
    "areas.faq3_q": "¿Qué tan rápido puede D&G Mendez Landscaping realizar una visita técnica a mi propiedad?",
    "areas.faq3_a": "Para mantenimiento estacional, limpieza y mejoras de jardín, las visitas suelen programarse en un plazo de 24 a 48 horas. Para proyectos integrales de diseño paisajístico, cantería y muros de contención en Kentuckiana, nuestros especialistas agendan consultas exhaustivas en 3 a 5 días hábiles.",
    "areas.faq4_q": "¿Trabajan con las normativas de asociaciones de vecinos (HOA) como Norton Commons o Anchorage?",
    "areas.faq4_a": "Sí, habitualmente. Contamos con amplia experiencia preparando propuestas de diseño paisajístico que cumplen con las estrictas pautas arquitectónicas de HOA en Norton Commons, Anchorage, Lake Forest, Springhurst, Glenview y áreas históricas como Old Louisville. Proporcionamos listas de especies botánicas, especificaciones de nivelación y detalles de cantería para facilitar la aprobación del comité.",
    "areas.faq5_q": "¿Puedo solicitar mantenimiento estacional si mis vecinos contiguos también usan D&G Mendez Landscaping?",
    "areas.faq5_a": "Por supuesto. Agrupar visitas de servicio con propiedades vecinas en tu misma calle o subdivisión nos permite ofrecer el Descuento de Ruta Vecinal de Kentuckiana (hasta un 10% de descuento en acuerdos estacionales recurrentes), reduciendo a la vez el tráfico de maquinaria y ruidos en la comunidad.",

    // -----------------------------------------
    // SERVICE-AREAS.HTML - BOTTOM CALLOUTS
    // -----------------------------------------
    "areas.not_listed_title": "¿No ves tu vecindario o código postal en la lista?",
    "areas.not_listed_desc": "Frecuentemente expandimos nuestro radio diario para transformaciones residenciales completas, viñedos y grandes terrenos. Contacta con nosotros para consultar logística de ruta.",
    "areas.not_listed_btn": "Consultar Sobre mi Propiedad",
    "areas.bottom_badge": "Reservas de Rutas Locales Abiertas para la Próxima Temporada",
    "areas.bottom_title": "¿Listo para Transformar tu <span class=\"text-secondary-fixed italic font-light\">Jardín o Terreno?</span>",
    "areas.bottom_desc": "Habla directamente con nuestro Director Henry Mendez, revisa especificaciones hortícolas a la medida y reserva tu consulta prioritaria.",
    "areas.bottom_btn_est": "Solicitar Presupuesto Gratis",
    "areas.bottom_btn_call": "Llamar a Despacho: (502) 667-9020",
    "areas.trust1": "Política Estricta de Cancelación sin Penalizaciones",
    "areas.trust2": "Propuesta y Presupuesto en 48 Horas",
    "areas.trust3": "Garantía de Satisfacción y Calidad al 100%"
  }
};

// =============================================
// GLOBAL TRANSLATION LOGIC
// =============================================

function applyTranslations(lang) {
  if (!translations[lang]) lang = 'en';

  // Set document lang attribute
  document.documentElement.setAttribute('lang', lang);

  // Update text content / innerHTML of marked elements
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key] !== undefined) {
      el.innerHTML = translations[lang][key];
    }
  });

  // Update input placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang] && translations[lang][key] !== undefined) {
      el.placeholder = translations[lang][key];
    }
  });

  // Synchronize language buttons state
  document.querySelectorAll('[data-lang]').forEach((btn) => {
    const btnLang = btn.getAttribute('data-lang');
    if (btnLang === lang) {
      btn.className = 'px-2.5 py-1 text-label-md font-label-md rounded-full transition-all bg-surface-container-lowest text-primary shadow-[0_2px_8px_-2px_rgba(24,34,28,0.06)] font-bold';
      btn.setAttribute('aria-pressed', 'true');
    } else {
      btn.className = 'px-2.5 py-1 text-label-md font-label-md rounded-full transition-all text-on-surface-variant font-normal';
      btn.setAttribute('aria-pressed', 'false');
    }
  });

  // Save preference
  try {
    localStorage.setItem('preferred-language', lang);
  } catch (e) {}

  // Broadcast event for custom components
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));

  // Re-sync dynamic phone numbers and call links if settings are loaded
  if (window.applyPhoneSettings && window.siteSettings) {
    window.applyPhoneSettings(window.siteSettings);
  }
}

function getCurrentLanguage() {
  try {
    return localStorage.getItem('preferred-language') || 'en';
  } catch (e) {
    return 'en';
  }
}

function setLanguage(lang) {
  applyTranslations(lang);
}

// Auto-run on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const lang = getCurrentLanguage();
  applyTranslations(lang);
});

// Expose globally
window.translations = translations;
window.setLanguage = setLanguage;
window.getCurrentLanguage = getCurrentLanguage;
window.applyTranslations = applyTranslations;
