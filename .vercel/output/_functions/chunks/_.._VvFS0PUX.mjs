import { c as createComponent } from './astro-component_xOQumydq.mjs';
import 'piccolore';
import { l as createRenderInstruction, m as maybeRenderHead, h as addAttribute, r as renderTemplate, n as renderComponent, o as renderSlot, p as renderHead, u as unescapeHTML } from './entrypoint_DQEGgZCF.mjs';
import 'clsx';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

const firebaseConfig = {
  apiKey: "AIzaSyCbMhjVTieAfdOZeSNIjskLPPv8rYr8drc",
  authDomain: "jmeducation-2026.firebaseapp.com",
  projectId: "jmeducation-2026",
  storageBucket: "jmeducation-2026.firebasestorage.app",
  messagingSenderId: "790151480036",
  appId: "1:790151480036:web:602b9e59d57a9116e257b1"
};
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
getAuth(app);
getStorage(app);

const $$PromoModal = createComponent(async ($$result, $$props, $$slots) => {
  let promo = null;
  const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 1e3));
  try {
    const docRef = doc(db, "configuracion", "promociones");
    const snap = await Promise.race([getDoc(docRef), timeoutPromise]);
    if (snap && snap.exists() && snap.data().modalActive) {
      promo = snap.data();
    }
  } catch (e) {
  }
  return renderTemplate`${promo && renderTemplate`${maybeRenderHead()}<div id="promo-modal-overlay" class="modal-overlay" data-astro-cid-ffmp5lqb><div class="modal-content" data-astro-cid-ffmp5lqb><button id="close-modal" class="modal-close" data-astro-cid-ffmp5lqb>&times;</button>${promo.modalImage && renderTemplate`<img${addAttribute(promo.modalImage, "src")}${addAttribute(promo.modalTitle, "alt")} class="modal-img" data-astro-cid-ffmp5lqb>`}<div class="modal-body" data-astro-cid-ffmp5lqb><h2 data-astro-cid-ffmp5lqb>${promo.modalTitle}</h2><p data-astro-cid-ffmp5lqb>${promo.modalText}</p><a${addAttribute(promo.modalLink, "href")} target="_blank" rel="noopener noreferrer" class="btn btn-primary cta-btn" data-astro-cid-ffmp5lqb>${promo.modalCta}</a></div></div></div>`}${renderScript($$result, "D:/MagnusCode/proyectos/voltag-landing/src/components/PromoModal.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/MagnusCode/proyectos/voltag-landing/src/components/PromoModal.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title = "Voltag Gym — Gimnasio en Manzanares Sector 17 | Candelaria, Valle del Cauca",
    description = "Voltag Gym es el mejor gimnasio en Manzanares Sector 17, Ciudad del Valle, Candelaria. Equipos profesionales, entrenadores certificados, suplementos y la mejor comunidad fitness cerca de Cali. Planes desde $70K. ¡Empieza hoy!"
  } = Astro2.props;
  const whatsappNumber = "573180046952";
  const siteUrl = Astro2.url.origin || "https://voltag-gym.com";
  const keywords = "gimnasio manzanares, gym manzanares sector 17, gimnasio candelaria, gimnasio ciudad del valle, gym candelaria valle del cauca, gimnasio cerca de cali, gym al sur de cali, entrenador personal candelaria, mejor gimnasio candelaria, voltag gym";
  return renderTemplate(_a || (_a = __template(['<html lang="es" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description"', '><meta name="keywords"', '><meta name="author" content="Voltag Gym"><meta name="robots" content="index, follow"><meta name="geo.region" content="CO-VAC"><meta name="geo.placename" content="Candelaria, Valle del Cauca"><meta name="geo.position" content="3.4012147;-76.4397344"><meta name="ICBM" content="3.4012147, -76.4397344"><!-- Open Graph --><meta property="og:title"', '><meta property="og:description"', '><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:locale" content="es_CO"><meta property="og:site_name" content="Voltag Gym — Manzanares Sector 17"><!-- Twitter --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"', '><meta name="twitter:description"', '><!-- Canonical --><link rel="canonical"', '><!-- Favicon --><link rel="icon" type="image/png" href="/favicon.png"><!-- Schema.org — GymOrHealthClub + LocalBusiness (Locations Playbook) --><script type="application/ld+json">', '</script><!-- Schema.org — BreadcrumbList --><script type="application/ld+json">', "</script><title>", "</title>", "</head> <body data-astro-cid-sckkx6r4> ", " ", ' <!-- WhatsApp Floating Button --> <a id="whatsapp-float"', ' target="_blank" rel="noopener noreferrer" aria-label="Contáctanos por WhatsApp" class="whatsapp-float" data-astro-cid-sckkx6r4> <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" data-astro-cid-sckkx6r4> <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" data-astro-cid-sckkx6r4></path> </svg> </a> <!-- Scroll Reveal Script --> ', " </body> </html>"])), addAttribute(description, "content"), addAttribute(keywords, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(siteUrl, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(siteUrl, "href"), unescapeHTML(JSON.stringify({
    "@context": "https://schema.org",
    "@type": ["GymOrHealthClub", "LocalBusiness"],
    "name": "Voltag Gym",
    "alternateName": "Voltag Gym Manzanares",
    "description": "El mejor gimnasio en Manzanares Sector 17, Ciudad del Valle, Candelaria. Equipos profesionales, entrenadores certificados, suplementos deportivos y la comunidad fitness más fuerte del sector.",
    "url": siteUrl,
    "telephone": `+${whatsappNumber}`,
    "image": `${siteUrl}/images/voltag-gym-manzanares.jpg`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Cl 12 # 20 Oeste - 10",
      "addressLocality": "Candelaria",
      "addressRegion": "Valle del Cauca",
      "addressCountry": "CO",
      "postalCode": "763042",
      "areaServed": [
        { "@type": "Place", "name": "Manzanares Sector 17" },
        { "@type": "Place", "name": "Ciudad del Valle" },
        { "@type": "Place", "name": "Candelaria" },
        { "@type": "Place", "name": "Sur de Cali" },
        { "@type": "City", "name": "Cali" }
      ]
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 3.4012147,
      "longitude": -76.4397344
    },
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "opens": "05:00", "closes": "22:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "06:00", "closes": "16:00" },
      { "@type": "OpeningHoursSpecification", "dayOfWeek": "Sunday", "opens": "08:00", "closes": "12:00" }
    ],
    "priceRange": "$$",
    "paymentAccepted": "Cash, Bank Transfer",
    "currenciesAccepted": "COP",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Planes de Membresía",
      "itemListElement": [
        { "@type": "Offer", "name": "Plan Mensual", "price": "70000", "priceCurrency": "COP" },
        { "@type": "Offer", "name": "Plan Trimestral", "price": "180000", "priceCurrency": "COP" },
        { "@type": "Offer", "name": "Plan Anual", "price": "600000", "priceCurrency": "COP" }
      ]
    },
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "Peso Libre", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Máquinas de Musculación", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Cardio", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Entrenamiento Personal", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Suplementos Deportivos", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Nutrición", "value": true }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "50",
      "bestRating": "5"
    },
    "sameAs": [
      "https://www.instagram.com/voltag_gym",
      "https://www.tiktok.com/@voltag_gym"
    ]
  })), unescapeHTML(JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Gimnasios en Valle del Cauca", "item": siteUrl },
      { "@type": "ListItem", "position": 2, "name": "Gimnasio en Candelaria", "item": siteUrl },
      { "@type": "ListItem", "position": 3, "name": "Voltag Gym Manzanares", "item": siteUrl }
    ]
  })), title, renderHead(), renderSlot($$result, $$slots["default"]), renderComponent($$result, "PromoModal", $$PromoModal, { "data-astro-cid-sckkx6r4": true }), addAttribute(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("¡Hola Voltag! 💪 Me gustaría obtener más información sobre el gym.")}`, "href"), renderScript($$result, "D:/MagnusCode/proyectos/voltag-landing/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts"));
}, "D:/MagnusCode/proyectos/voltag-landing/src/layouts/Layout.astro", void 0);

const prerender = false;
const $$ = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Voltag Gym | Portal Admin" }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "AdminApp", null, { "basename": "/admin", "client:only": "react", "client:component-hydration": "only", "client:component-path": "D:/MagnusCode/proyectos/voltag-landing/src/components/admin/AdminApp", "client:component-export": "default" })} ` })}`;
}, "D:/MagnusCode/proyectos/voltag-landing/src/pages/admin/[...route].astro", void 0);

const $$file = "D:/MagnusCode/proyectos/voltag-landing/src/pages/admin/[...route].astro";
const $$url = "/admin/[...route]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
