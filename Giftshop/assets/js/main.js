const BRAND_NAME = 'Aura & Ribbon';
const IMAGE_MAP = {
  hero: 'https://images.unsplash.com/photo-1549465220-1a8f9238cd48?auto=format&fit=crop&w=1100&q=80&fm=webp',
  diwali: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=75&fm=webp',
  wedding: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=75&fm=webp',
  birthday: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=75&fm=webp',
  hamper: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&w=800&q=75&fm=webp',
  housewarming: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=800&q=75&fm=webp',
  christmas: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=800&q=75&fm=webp',
  occasion1: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=75&fm=webp',
  occasion2: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=75&fm=webp',
  occasion3: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=75&fm=webp',
  occasion4: 'https://images.unsplash.com/photo-1600011728180-6c3a7d45f2ef?auto=format&fit=crop&w=800&q=75&fm=webp',
  occasion5: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=75&fm=webp',
  occasion6: 'https://images.unsplash.com/photo-1556760544-74068565f05c?auto=format&fit=crop&w=800&q=75&fm=webp',
  product1: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=75&fm=webp', product2: 'https://images.unsplash.com/photo-1513884923967-4b182ef167ab?auto=format&fit=crop&w=800&q=75&fm=webp', product3: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=75&fm=webp', product4: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=75&fm=webp', product5: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=75&fm=webp', product6: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=75&fm=webp', product7: 'https://images.unsplash.com/photo-1516981879613-9f5b2a2a6c4d?auto=format&fit=crop&w=800&q=75&fm=webp', product8: 'https://images.unsplash.com/photo-1549465220-1a8f9238cd48?auto=format&fit=crop&w=800&q=75&fm=webp', personal: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=1000&q=80&fm=webp'
};

const storage = { get(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } }, set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* memory fallback */ } } };
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
let lastFocus;

function initSharedChrome() {
  const excluded = ['404.html', 'coming-soon.html', 'login.html', 'signup.html', 'forgot-password.html', 'about.html'];
  if (excluded.includes(location.pathname.split('/').pop())) return;
  const headerMarkup = `<header class="header"><div class="container nav-wrap"><button class="menu-toggle icon-button" aria-label="Open menu" aria-expanded="false"><i data-lucide="menu" aria-hidden="true"></i></button><a class="logo" href="index.html"><span class="logo-mark"><i data-lucide="gift" aria-hidden="true"></i></span>Aura &amp; Ribbon</a><nav class="desktop-nav" aria-label="Main navigation"><details class="home-menu"><summary class="nav-link">Home <i data-lucide="chevron-down" aria-hidden="true"></i></summary><div class="home-dropdown"><a href="index.html">Home 01 <span>Curated catalog</span></a><a href="home-2.html">Home 02 <span>Editorial dark</span></a></div></details><a class="nav-link" href="products.html">Gifts</a><a class="nav-link" href="personalization.html">Personalization</a><a class="nav-link" href="corporate-gifting.html">Corporate Gifting</a><a class="nav-link" href="gift-wrapping.html">Gift Wrapping</a><a class="nav-link" href="about.html">About</a><a class="nav-link" href="contact.html">Contact</a></nav><div class="nav-actions"><button class="icon-button" aria-label="Search"><i data-lucide="search" aria-hidden="true"></i></button><button class="icon-button" aria-label="Wishlist"><i data-lucide="heart" aria-hidden="true"></i></button><button class="icon-button nav-action" aria-label="Cart"><i data-lucide="shopping-bag" aria-hidden="true"></i><span class="cart-count" data-cart-count>0</span></button><button class="theme-toggle icon-button" data-theme-toggle aria-label="Switch theme"><i data-lucide="sun" aria-hidden="true"></i></button><button class="direction-toggle icon-button" data-direction-toggle aria-label="Switch text direction"><i data-lucide="globe" aria-hidden="true"></i></button></div></div></header>`;
  const drawerMarkup = `<div class="drawer-backdrop"></div><aside class="drawer" aria-label="Mobile navigation"><button class="icon-button close-button" data-close-drawer aria-label="Close menu"><i data-lucide="x" aria-hidden="true"></i></button><nav class="drawer-nav"><details class="home-menu"><summary>Home <i data-lucide="chevron-down" aria-hidden="true"></i></summary><div class="drawer-subnav"><a href="index.html">Home 01 - Curated catalog</a><a href="home-2.html">Home 02 - Editorial dark</a></div></details><a href="products.html">Gifts</a><a href="personalization.html">Personalization</a><a href="corporate-gifting.html">Corporate Gifting</a><a href="gift-wrapping.html">Gift Wrapping</a><a href="about.html">About</a><a href="contact.html">Contact</a></nav></aside>`;
  const footerMarkup = `<footer class="footer"><div class="container footer-grid"><div><a class="logo" href="index.html"><span class="logo-mark"><i data-lucide="gift" aria-hidden="true"></i></span>Aura &amp; Ribbon</a><p style="margin-top:14px;color:#e1cdc1;font-size:.82rem">Gifts for the moments that matter.</p></div><div><h3>Quick Links</h3><ul><li><a href="index.html">Home</a></li><li><a href="products.html">Gifts</a></li><li><a href="personalization.html">Personalization</a></li><li><a href="corporate-gifting.html">Corporate Gifting</a></li><li><a href="gift-wrapping.html">Gift Wrapping</a></li><li><a href="about.html">About</a></li><li><a href="contact.html">Contact</a></li></ul></div><div><h3>Services</h3><ul><li><a href="personalization.html">Personalization</a></li><li><a href="corporate-gifting.html">Corporate Gifting</a></li><li><a href="gift-wrapping.html">Gift Wrapping</a></li></ul></div><div><h3>Company</h3><ul><li><a href="about.html">About Us</a></li><li><a href="contact.html">Contact</a></li><li><a href="#">FAQs</a></li></ul></div><div><h3>Support</h3><ul><li><a href="order-enquiry.html">Order Enquiry</a></li><li><a href="shipping.html">Shipping</a></li><li><a href="returns.html">Returns</a></li><li><a href="privacy-policy.html">Privacy Policy</a></li><li><a href="terms-conditions.html">Terms &amp; Conditions</a></li></ul></div><div class="contact-column"><h3>Contact</h3><ul><li>24 Memento Lane, New York</li><li>+1 (212) 555-0148</li><li>hello@maisonmemento.com</li><li>Mon-Fri, 9am-6pm</li></ul><div class="socials" style="margin-top:14px"><a class="icon-button" href="#" aria-label="Instagram"><i data-lucide="instagram" aria-hidden="true"></i></a><a class="icon-button" href="#" aria-label="Facebook"><i data-lucide="facebook" aria-hidden="true"></i></a><a class="icon-button" href="#" aria-label="Pinterest"><i data-lucide="pinterest" aria-hidden="true"></i></a></div></div></div><div class="container footer-bottom"><span>© 2026 Aura &amp; Ribbon. Made for meaningful moments.</span><span>Thoughtful gifts, beautifully given.</span></div></footer>`;
  document.querySelector('.announcement-bar')?.remove();
  document.body.insertAdjacentHTML('afterbegin', `<div class="announcement-bar" role="status">Make Every Moment Special - Free Gift Wrapping on Selected Orders <button class="icon-button" data-dismiss-announcement aria-label="Dismiss announcement"><i data-lucide="x" aria-hidden="true"></i></button></div>`);
  document.querySelector('.header')?.remove();
  document.querySelector('.announcement-bar').insertAdjacentHTML('afterend', headerMarkup);
  document.querySelector('.drawer-backdrop')?.remove();
  document.querySelector('.drawer')?.remove();
  document.querySelector('.header').insertAdjacentHTML('afterend', drawerMarkup);
  document.querySelector('.footer')?.remove();
  document.body.insertAdjacentHTML('beforeend', footerMarkup);
}

function initTheme() { const saved = storage.get('theme', null); const theme = saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); document.documentElement.dataset.theme = theme; const button = $('[data-theme-toggle]'); const updateButton = current => { if (!button) return; const next = current === 'dark' ? 'light' : 'dark'; button.innerHTML = `<i data-lucide="${current === 'dark' ? 'sun' : 'moon'}" aria-hidden="true"></i>`; button.setAttribute('aria-label', `Switch to ${next} theme`); if (window.lucide) lucide.createIcons(); }; updateButton(theme); button?.addEventListener('click', () => { const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; document.documentElement.dataset.theme = next; storage.set('theme', next); updateButton(next); }); }
function initRTL() {
  const button = $('[data-direction-toggle]');
  const apply = dir => {
    document.documentElement.dir = dir;
    button?.setAttribute('aria-label', `Switch to ${dir === 'rtl' ? 'left-to-right' : 'right-to-left'} text direction`);
  };
  apply(storage.get('direction', 'ltr'));
  button?.addEventListener('click', () => {
    const next = document.documentElement.dir === 'rtl' ? 'ltr' : 'rtl';
    apply(next);
    storage.set('direction', next);
  });
}
function initNavigationState() {
  const current = location.pathname.split('/').pop() || 'index.html';
  $$('a.nav-link, .drawer-nav a').forEach(link => {
    const target = link.getAttribute('href')?.split('#')[0];
    if (target === current) link.setAttribute('aria-current', 'page');
  });
}
function initAnnouncement() { const bar = $('.announcement-bar'); const dismissed = storage.get('announcementDismissed', false); if (dismissed) bar?.classList.add('is-dismissed'); $('[data-dismiss-announcement]')?.addEventListener('click', () => { bar?.classList.add('is-dismissed'); storage.set('announcementDismissed', true); }); }
function initHeader() { const header = $('.header'); const sentinel = document.createElement('div'); sentinel.className = 'header-sentinel'; header?.before(sentinel); new IntersectionObserver(([entry]) => header?.classList.toggle('scrolled', !entry.isIntersecting), { threshold: 0 }).observe(sentinel); }
function initMobileNavigation() { const drawer = $('.drawer'); const backdrop = $('.drawer-backdrop'); const trigger = $('.menu-toggle'); if (drawer) { drawer.id ||= 'mobile-navigation'; drawer.setAttribute('aria-hidden', 'true'); drawer.inert = true; } trigger?.setAttribute('aria-controls', drawer?.id || 'mobile-navigation'); const close = () => { drawer?.classList.remove('is-open'); drawer?.setAttribute('aria-hidden', 'true'); if (drawer) drawer.inert = true; backdrop?.classList.remove('is-visible'); document.body.classList.remove('drawer-open'); trigger?.setAttribute('aria-expanded', 'false'); lastFocus?.focus(); }; const open = () => { lastFocus = trigger; drawer?.classList.add('is-open'); drawer?.setAttribute('aria-hidden', 'false'); if (drawer) drawer.inert = false; backdrop?.classList.add('is-visible'); document.body.classList.add('drawer-open'); trigger?.setAttribute('aria-expanded', 'true'); $('.drawer a')?.focus(); }; trigger?.addEventListener('click', open); $('[data-close-drawer]')?.addEventListener('click', close); backdrop?.addEventListener('click', close); $$('.drawer a').forEach(link => link.addEventListener('click', close)); document.addEventListener('keydown', event => { if (event.key === 'Escape' && drawer?.classList.contains('is-open')) close(); if (event.key === 'Tab' && drawer?.classList.contains('is-open')) { const focusables = $$('a,button', drawer); const first = focusables[0], last = focusables.at(-1); if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); } } }); }
function initScrollReveal() { const items = $$('.reveal'); items.forEach(item => $$('.reveal-grid > *', item).forEach((child, index) => child.style.setProperty('--i', index))); const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); $$('.image-reveal-target', entry.target).forEach(t => { t.classList.add('is-visible'); t.removeAttribute('data-reveal-direction'); }); observer.unobserve(entry.target); } }), { threshold: .15 }); items.forEach(item => observer.observe(item)); }
function initGiftJourney() { const journey = $('.gift-journey'); if (!journey) return; const track = $('.gift-journey-track', journey); const steps = $$('.gift-step', journey); if (!track || !steps.length) return; journey.classList.add('is-animating'); const activate = index => { steps[index]?.classList.add('is-active'); track.style.setProperty('--gift-progress-scale', (index + 1) / steps.length); }; const reveal = () => { if (journey.dataset.journeyStarted) return; journey.dataset.journeyStarted = 'true'; if (matchMedia('(prefers-reduced-motion: reduce)').matches) { steps.forEach((_, index) => activate(index)); journey.classList.add('is-visible'); return; } steps.forEach((_, index) => setTimeout(() => activate(index), 180 + index * 520)); }; const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) return; reveal(); observer.disconnect(); }, { threshold: .25 }); observer.observe(journey); }
function showToast(message) { const toast = $('[data-toast]'); if (!toast) return; toast.textContent = message; toast.classList.add('is-visible'); clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove('is-visible'), 3500); }
function initWishlist() { const wishlist = new Set(storage.get('wishlist', [])); $$('[data-wishlist]').forEach(button => { const id = button.dataset.wishlist; if (wishlist.has(id)) button.classList.add('is-active'); button.setAttribute('aria-pressed', wishlist.has(id)); }); const grid = $('.product-grid'); if (!grid || grid.dataset.wishlistBound) return; grid.dataset.wishlistBound = 'true'; grid.addEventListener('click', event => { const button = event.target.closest('[data-wishlist]'); if (!button) return; const id = button.dataset.wishlist; wishlist.has(id) ? wishlist.delete(id) : wishlist.add(id); button.classList.toggle('is-active'); button.setAttribute('aria-pressed', wishlist.has(id)); storage.set('wishlist', [...wishlist]); showToast(wishlist.has(id) ? 'Saved to your wishlist' : 'Removed from your wishlist'); }); }
function initCart() { let cart = storage.get('cart', []); const count = $('[data-cart-count]'); const update = () => { if (count) { count.textContent = cart.length; count.classList.remove('is-bumped'); void count.offsetWidth; count.classList.add('is-bumped'); } storage.set('cart', cart); }; update(); document.addEventListener('click', event => { const button = event.target.closest('[data-add-cart]'); if (!button) return; cart.push(button.dataset.addCart); update(); const original = button.innerHTML; button.innerHTML = '<i data-lucide="check" aria-hidden="true"></i> Added'; button.disabled = true; if (window.lucide) lucide.createIcons(); showToast('Gift added to your cart'); setTimeout(() => { button.innerHTML = original; button.disabled = false; if (window.lucide) lucide.createIcons(); }, 1200); }); $('[aria-label="Cart"]')?.addEventListener('click', () => showToast(cart.length ? `${cart.length} gift${cart.length === 1 ? '' : 's'} in your bag` : 'Your bag is empty')); }
function trapModal(modal, event) { if (event.key !== 'Tab') return; const focusables = $$('button,a,input', modal); const first = focusables[0], last = focusables.at(-1); if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); } }
function initQuickView() { const modal = $('[data-modal]'); const backdrop = $('.modal-backdrop'); const close = () => { modal?.classList.remove('is-open'); backdrop?.classList.remove('is-visible'); lastFocus?.focus(); }; document.addEventListener('click', event => { const trigger = event.target.closest('[data-quick-view]'); if (!trigger) return; lastFocus = trigger; $('[data-modal-title]').textContent = trigger.dataset.title; $('[data-modal-description]').textContent = trigger.dataset.description; modal.classList.add('is-open'); backdrop.classList.add('is-visible'); $('[data-modal-close]').focus(); }); $('[data-modal-close]')?.addEventListener('click', close); backdrop?.addEventListener('click', close); document.addEventListener('keydown', event => { if (event.key === 'Escape' && modal?.classList.contains('is-open')) close(); if (modal?.classList.contains('is-open')) trapModal(modal, event); }); }
function initNewsletterForm() { const form = $('[data-newsletter-form]'); if (!form) return; const email = $('input[type="email"]', form); const message = $('[data-form-message]', form); form.addEventListener('submit', event => { event.preventDefault(); const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()); email.setAttribute('aria-invalid', String(!valid)); if (!valid) { message.textContent = 'Please enter a valid email address.'; message.classList.remove('success'); email.focus(); return; } message.textContent = "You're subscribed! Watch your inbox for gifting inspiration."; message.classList.add('success'); form.reset(); }); }
function initCarousel() { const track = $('.carousel-track'); const slides = $$('.carousel-track .product-card'); const region = $('[data-carousel]'); let index = 0; const move = direction => { const visible = innerWidth >= 1024 ? 4 : innerWidth >= 640 ? 2 : 1; index = Math.max(0, Math.min(index + direction, slides.length - visible)); track.style.transform = `translateX(${document.documentElement.dir === 'rtl' ? '' : '-'}${index * (100 / visible + 2)}%)`; region?.setAttribute('aria-label', `Showing products ${index + 1} to ${Math.min(index + visible, slides.length)}`); }; $('[data-carousel-prev]')?.addEventListener('click', () => move(-1)); $('[data-carousel-next]')?.addEventListener('click', () => move(1)); region?.addEventListener('keydown', event => { if (event.key === 'ArrowLeft') move(document.documentElement.dir === 'rtl' ? 1 : -1); if (event.key === 'ArrowRight') move(document.documentElement.dir === 'rtl' ? -1 : 1); }); }
function initLoadingStates() { $$('.skeleton').forEach(item => item.setAttribute('aria-hidden', 'true')); }
function initFastImageLoading() {
  const optimize = image => {
    const source = image.getAttribute('src') || '';
    if (!source.startsWith('../assets/image/') || source.includes('/optimized/')) return;
    const filename = source.split('/').pop();
    const extension = filename.lastIndexOf('.');
    const base = filename.slice(0, extension);
    if ((!/^img\d+$/.test(base) && !base.startsWith('pexels-')) || base === 'img63') return;
    const width = innerWidth < 640 ? 400 : innerWidth < 1280 ? 600 : 800;
    const optimized = `../assets/image/optimized/${base}-${width}.webp`;
    const original = image.src;
    image.addEventListener('error', () => {
      if (image.src.endsWith(optimized) || image.srcset) {
        image.removeAttribute('srcset');
        image.dataset.retryingOriginal = 'true';
        image.src = original;
        image.addEventListener('error', () => {
          delete image.dataset.retryingOriginal;
        }, { once: true });
      }
    }, { once: true });
    const hasHighRes = !['img1', 'img2', 'img21', 'img22', 'img41', 'img42', 'img62'].includes(base);
    if (hasHighRes) {
      const max2x = Math.min(width * 2, 1920);
      image.srcset = `${optimized} 1x, ../assets/image/optimized/${base}-${max2x}.webp 2x`;
    } else {
      image.srcset = `${optimized} 1x`;
    }
    image.src = optimized;
    image.loading = 'eager';
    image.decoding = 'async';
  };
  $$('img').forEach(optimize);
}
function initBrandName() { document.documentElement.dataset.brand = BRAND_NAME; $$('.logo').forEach(logo => { const text = [...logo.childNodes].find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim()); if (text) text.textContent = BRAND_NAME; }); const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let node; while ((node = walker.nextNode())) { if (node.nodeValue.includes('Maison Memento')) node.nodeValue = node.nodeValue.replace(/Maison Memento/g, BRAND_NAME); } if (document.title.includes('Maison Memento')) document.title = document.title.replace(/Maison Memento/g, BRAND_NAME); }
function initImageFallbacks() {
  $$('img').forEach(image => {
    const useFallback = () => {
      if (image.dataset.retryingOriginal) return;
      if (image.closest('.avatar')) {
        image.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 42 42'%3E%3Ccircle cx='21' cy='21' r='21' fill='%23e1cdc1'/%3E%3Ccircle cx='21' cy='16' r='7' fill='%238d183b'/%3E%3Cpath d='M8 36c0-7.2 5.8-13 13-13s13 5.8 13 13' fill='%238d183b'/%3E%3C/svg%3E`;
        return;
      }
      const label = encodeURIComponent(image.alt || 'Gift image');
      image.removeAttribute('srcset');
      image.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 900'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%23f1d8ca'/%3E%3Cstop offset='1' stop-color='%23d99a86'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='900' fill='url(%23g)'/%3E%3Cpath d='M250 430h300v220H250zM220 390h360v60H220zM400 390v260M400 390c-100-20-130-130-70-130 55 0 70 130 70 130m0 0c100-20 130-130 70-130-55 0-70 130-70 130' fill='none' stroke='%23fffaf4' stroke-width='18'/%3E%3Ctext x='400' y='770' fill='%23fffaf4' font-family='sans-serif' font-size='24' text-anchor='middle'%3E${label}%3C/text%3E%3C/svg%3E`;
    };
    image.addEventListener('error', useFallback, { once: true });
    if (/^https?:/.test(image.getAttribute('src') || '')) {
      if (image.complete && image.naturalWidth === 0) useFallback();
      else setTimeout(() => { if (image.naturalWidth === 0) useFallback(); }, 2500);
    }
  });
}
function initGiftFinder() { const buttons = $$('.finder-btn'); const counter = $('[data-match-counter]'); const counts = [14, 8, 19, 6, 23, 11, 15]; let countIndex = 0; buttons.forEach(button => button.addEventListener('click', () => { $$(`[data-group="${button.dataset.group}"]`).forEach(option => option.classList.remove('is-selected')); button.classList.add('is-selected'); countIndex = (countIndex + 1) % counts.length; if (counter) counter.textContent = `${counts[countIndex]} Bespoke Gift Options`; })); }
function initArchiveRail() { const rail = $('[data-archive-rail]'); $('[data-archive-prev]')?.addEventListener('click', () => rail?.scrollBy({ left: -398, behavior: 'smooth' })); $('[data-archive-next]')?.addEventListener('click', () => rail?.scrollBy({ left: 398, behavior: 'smooth' })); }
function initCollectionsRail() {
  const rail = $('[data-collections-rail]');
  const previous = $('[data-collections-prev]');
  const next = $('[data-collections-next]');
  if (!rail || !previous || !next) return;
  const AUTO_SCROLL_SPEED = 40;
  const originalCards = [...rail.querySelectorAll('.collection-card')];
  originalCards.forEach(card => {
    const clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.inert = true;
    rail.append(clone);
  });
  let setWidth = 0;
  let animationFrame;
  let lastFrame = 0;
  let pauseUntil = 0;
  let isHovered = false;
  let isInteracting = false;
  const measure = () => {
    setWidth = rail.scrollWidth / 2;
    updateButtons();
  };
  const updateButtons = () => {
    previous.disabled = rail.scrollWidth <= rail.clientWidth;
    next.disabled = rail.scrollWidth <= rail.clientWidth;
  };
  const scrollByCard = direction => {
    const card = rail.querySelector('.collection-card');
    const amount = card ? card.getBoundingClientRect().width * 2 + 16 : rail.clientWidth * .8;
    rail.scrollBy({ left: direction * amount, behavior: 'smooth' });
    pauseUntil = performance.now() + 2000;
  };
  const animate = timestamp => {
    if (!lastFrame) lastFrame = timestamp;
    const elapsed = Math.min(timestamp - lastFrame, 100);
    lastFrame = timestamp;
    if (!isHovered && !isInteracting && timestamp >= pauseUntil && !document.hidden && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      rail.scrollLeft += AUTO_SCROLL_SPEED * elapsed / 1000;
      if (setWidth > 0 && rail.scrollLeft >= setWidth) rail.scrollLeft -= setWidth;
    }
    animationFrame = requestAnimationFrame(animate);
  };
  previous.addEventListener('click', () => scrollByCard(-1));
  next.addEventListener('click', () => scrollByCard(1));
  rail.addEventListener('scroll', updateButtons, { passive: true });
  rail.addEventListener('wheel', event => {
    const maxScroll = rail.scrollWidth - rail.clientWidth;
    if (maxScroll <= 1 || (event.deltaY < 0 && rail.scrollLeft <= 0) || (event.deltaY > 0 && rail.scrollLeft >= maxScroll)) return;
    event.preventDefault();
    rail.scrollLeft += event.deltaY;
    pauseUntil = performance.now() + 2000;
  }, { passive: false });
  rail.addEventListener('mouseenter', () => { isHovered = true; });
  rail.addEventListener('mouseleave', () => { isHovered = false; pauseUntil = performance.now() + 1500; });
  rail.addEventListener('pointerdown', () => { isInteracting = true; });
  rail.addEventListener('pointerup', () => { isInteracting = false; pauseUntil = performance.now() + 2000; });
  rail.addEventListener('pointercancel', () => { isInteracting = false; pauseUntil = performance.now() + 2000; });
  window.addEventListener('resize', measure);
  measure();
  animationFrame = requestAnimationFrame(animate);
}
function initArchiveImages() { if (!document.body.classList.contains('home-two')) return; const images = $$('.archive-card img'); const localImages = ['../assets/image/img8.jpg', '../assets/image/img37.jpg', '../assets/image/img53.jpg', '../assets/image/img4.jpg']; localImages.forEach((source, index) => { if (images[index]) images[index].src = source; }); }
function initHomeTwoCopy() { if (!document.body.classList.contains('home-two')) return; const heroText = $('.editorial-hero-content > p'); const introTitle = $('.intro-copy h2'); const introText = $('.intro-copy > p'); const primaryCta = $('.editorial-hero .button'); const bondTitle = $('.bond-section h2'); const signatureTitle = $('.signature-section h2'); const craftTitle = $('.craft-section h2'); if (heroText) heroText.textContent = "Curated treasures, personalized touches, and unforgettable presentation for life's most meaningful moments."; if (introTitle) { introTitle.childNodes[0].textContent = 'Made for Moments '; const emphasis = $('em', introTitle); if (emphasis) emphasis.textContent = 'That Truly Matter.'; } if (introText) introText.textContent = 'A gift is not merely an object; it is the physical embodiment of affection, reverence, and shared joy. Each Aura & Ribbon assemblage is conceived as a multisensory journey, from hand-torn paper to the quiet reveal of a beautiful keepsake.'; if (primaryCta && primaryCta.firstChild) primaryCta.firstChild.textContent = 'Explore Collections '; if (bondTitle) bondTitle.textContent = 'For Every Cherished Bond'; if (signatureTitle) signatureTitle.textContent = 'Signature Collections'; if (craftTitle) craftTitle.textContent = 'The Art of the Finished Detail'; }
function initBondImages() { if (!document.body.classList.contains('home-two')) return; const images = $$('.bond-card img'); const localImages = ['../assets/image/img58.jpg', '../assets/image/img49.jpg', '../assets/image/img53.jpg', '../assets/image/img31.jpg', '../assets/image/img7.jpg', '../assets/image/img26.jpg']; localImages.forEach((source, index) => { if (images[index]) images[index].src = source; }); }
function initHomeTwoCatalog() { if (!document.body.classList.contains('home-two')) return; const grid = $('.editorial-products .product-grid'); if (!grid || grid.dataset.complete) return; const products = [{ id: 'velvet-chest', title: 'Tailored Velvet Keepsake Chest', description: 'An archival-safe jewel box in deep Italian velvet.', price: '$180', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80&fm=webp', alt: 'Deep emerald velvet keepsake chest with brass hardware' }, { id: 'botanical-box', title: 'Botanical Curated Gift Box', description: 'Wild-foraged rituals for a slower kind of luxury.', price: '$160', image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80&fm=webp', alt: 'Botanical bath and fragrance gift box with candles' }, { id: 'truffle-vault', title: 'Fine Chocolate Collection', description: 'Twenty-four jewel-like truffles for a grand gesture.', price: '$125', image: 'https://images.unsplash.com/photo-1548907040-4d42c42c8f9a?auto=format&fit=crop&w=900&q=80&fm=webp', alt: 'Premium chocolate collection arranged in a gift box' }, { id: 'desk-gift', title: 'Luxury Desk Gift', description: 'Refined tools for focused days and beautiful routines.', price: '$96', image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=900&q=80&fm=webp', alt: 'Premium desk accessories arranged on a walnut workspace' }]; products.forEach(product => { grid.insertAdjacentHTML('beforeend', `<article class="product-card"><div class="card-image"><button class="wishlist-button icon-button" data-wishlist="${product.id}" aria-label="Add ${product.title} to wishlist" aria-pressed="false"><i data-lucide="heart" aria-hidden="true"></i></button><img src="${product.image}" width="900" height="970" loading="lazy" alt="${product.alt}"></div><div class="card-body"><h3 class="product-title">${product.title}</h3><p>${product.description}</p><div class="price">${product.price}</div><div class="product-actions"><button class="button" data-add-cart="${product.id}"><i data-lucide="shopping-bag" aria-hidden="true"></i> Add to Cart</button><button class="icon-button" data-quick-view data-title="${product.title}" data-description="${product.description}" aria-label="Quick view ${product.title}"><i data-lucide="eye" aria-hidden="true"></i></button></div></div></article>`); }); grid.dataset.complete = 'true'; if (window.lucide) lucide.createIcons(); }
function initHomeTwoProductImages() { if (!document.body.classList.contains('home-two')) return; const replacements = { 'The Imperial Travel Case': '../assets/image/img45.jpg', 'Bespoke Crystal Decanter': '../assets/image/img9.jpg', 'Heirloom Writing Set': '../assets/image/img37.jpg', 'Sunday Tea Ritual': '../assets/image/img10.jpg', 'Tailored Velvet Keepsake Chest': '../assets/image/img29.jpg', 'Botanical Curated Gift Box': '../assets/image/img46.jpg', 'Fine Chocolate Collection': '../assets/image/img8.jpg' }; $$('.editorial-products .product-card').forEach(card => { const title = $('.product-title', card)?.textContent.trim(); if (replacements[title]) $('img', card).src = replacements[title]; }); }


function productCardMarkup(product) {
  const stars = '★'.repeat(Math.floor(product.rating)) + (product.rating % 1 ? '½' : '');
  return `<article class="product-card reveal" data-category="${product.category}" data-tags="${product.tags.join(' ')}"><div class="card-image">${product.badge ? `<span class="badge ${product.badge === 'Personalizable' ? 'personalizable' : ''}">${product.badge}</span>` : ''}<button class="wishlist-button icon-button" data-wishlist="${product.id}" aria-label="Add ${product.title} to wishlist" aria-pressed="false"><i data-lucide="heart" aria-hidden="true"></i></button><img src="${product.image}" width="900" height="970" loading="lazy" alt="${product.alt}"></div><div class="card-body"><h3 class="product-title">${product.title}</h3><p>${product.description}</p><div class="rating" aria-label="Rated ${product.rating} out of 5 stars">${stars}<span class="sr-only">Rated ${product.rating} out of 5 stars</span></div><div class="price">$${product.price}${product.oldPrice ? ` <span class="old-price">$${product.oldPrice}</span>` : ''}</div><div class="product-actions"><button class="button" data-add-cart="${product.id}"><i data-lucide="shopping-bag" aria-hidden="true"></i> Add to Cart</button><a class="icon-button" href="product-details.html?id=${product.id}" aria-label="View ${product.title}"><i data-lucide="arrow-up-right" aria-hidden="true"></i></a></div></div></article>`;
}

function initProductCatalog() {
  const grid = $('[data-product-grid]');
  if (!grid || !window.GIFT_PRODUCTS) return;
  const search = $('[data-product-search]'), category = $('[data-product-category]'), sort = $('[data-product-sort]'), count = $('[data-product-count]');
  const render = () => {
    const query = (search?.value || '').trim().toLowerCase(), selected = category?.value || 'all';
    let products = window.GIFT_PRODUCTS.filter(product => (!query || `${product.title} ${product.category} ${product.tags.join(' ')}`.toLowerCase().includes(query)) && (selected === 'all' || product.category === selected));
    if (sort?.value === 'price-low') products.sort((a, b) => a.price - b.price);
    if (sort?.value === 'price-high') products.sort((a, b) => b.price - a.price);
    if (sort?.value === 'name') products.sort((a, b) => a.title.localeCompare(b.title));
    grid.innerHTML = products.length ? products.map(productCardMarkup).join('') : '<p class="empty-state">No gifts match that search. Try a different moment or category.</p>';
    if (count) count.textContent = `${products.length} ${products.length === 1 ? 'gift' : 'gifts'}`;
    initWishlist();
    if (window.lucide) lucide.createIcons();
    requestAnimationFrame(() => $$('.product-card', grid).forEach(card => card.classList.add('is-visible')));
  };
  [search, category, sort].forEach(control => { control?.addEventListener('input', render); control?.addEventListener('change', render); });
  render();
}

function initProductDetail() {
  const root = $('[data-product-detail]');
  if (!root || !window.GIFT_PRODUCTS) return;
  const id = new URLSearchParams(location.search).get('id') || window.GIFT_PRODUCTS[0].id;
  const product = window.GIFT_PRODUCTS.find(item => item.id === id) || window.GIFT_PRODUCTS[0];
  root.querySelector('[data-detail-title]').textContent = product.title;
  root.querySelector('[data-detail-description]').textContent = product.description;
  root.querySelector('[data-detail-price]').innerHTML = `$${product.price}${product.oldPrice ? ` <span class="old-price">$${product.oldPrice}</span>` : ''}`;
  root.querySelector('[data-detail-image]').src = product.image;
  root.querySelector('[data-detail-image]').alt = product.alt;
  root.querySelector('[data-detail-category]').textContent = product.category;
  root.querySelector('[data-detail-add]').dataset.addCart = product.id;
  document.title = `${product.title} | Aura & Ribbon`;
}

function initServiceForms() {
  $$('[data-service-form]').forEach(form => form.addEventListener('submit', event => {
    event.preventDefault();
    const fields = [...form.querySelectorAll('input, textarea, select')];
    const invalid = fields.find(field => field.required && !field.value.trim() || field.type === 'email' && field.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim()));
    const message = $('[data-form-message]', form);
    fields.forEach(field => field.setAttribute('aria-invalid', 'false'));
    if (invalid) {
      invalid.setAttribute('aria-invalid', 'true');
      if (message) { message.textContent = invalid.type === 'email' ? 'Please enter a valid email address.' : 'Please complete this field.'; message.classList.remove('success'); }
      invalid.focus();
      return;
    }
    if (message) { message.textContent = 'Thank you — our gifting team will be in touch within one business day.'; message.classList.add('success'); }
    form.reset();
    showToast('Thanks for reaching out');
  }));
}

function initCustomCursor() {
  if (!matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches || document.querySelector('.custom-cursor')) return;
  const dot = document.createElement('span');
  const ring = document.createElement('span');
  const label = document.createElement('span');
  dot.className = 'custom-cursor';
  ring.className = 'custom-cursor-ring';
  label.className = 'custom-cursor-label';
  [dot, ring, label].forEach(element => { element.setAttribute('aria-hidden', 'true'); });
  document.body.append(dot, ring, label);
  document.body.classList.add('cursor-active');

  let targetX = innerWidth / 2, targetY = innerHeight / 2;
  let dotX = targetX, dotY = targetY, ringX = targetX, ringY = targetY;
  let frame;
  const render = () => {
    dotX += (targetX - dotX) * .42;
    dotY += (targetY - dotY) * .42;
    ringX += (targetX - ringX) * .14;
    ringY += (targetY - ringY) * .14;
    dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    label.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    frame = requestAnimationFrame(render);
  };
  const setHover = target => {
    const image = target?.closest('img');
    const interactive = target?.closest('a, button, input, select, textarea, [role="button"]');
    if (image && !image.dataset.cursorText) image.dataset.cursorText = image.closest('a, [data-quick-view]') ? 'View' : 'Drag';
    const text = image?.dataset.cursorText || target?.closest('[data-cursor-text]')?.dataset.cursorText;
    document.body.classList.toggle('cursor-hover', Boolean(interactive || image));
    document.body.classList.toggle('cursor-image', Boolean(text));
    label.textContent = text || '';
  };
  const hide = () => document.body.classList.add('cursor-hidden');
  const show = () => document.body.classList.remove('cursor-hidden');
  document.addEventListener('pointermove', event => {
    targetX = event.clientX;
    targetY = event.clientY;
    show();
    setHover(event.target);
  }, { passive: true });
  document.addEventListener('pointerover', event => setHover(event.target), { passive: true });
  document.addEventListener('pointerout', event => { if (!event.relatedTarget) hide(); }, { passive: true });
  document.addEventListener('pointerdown', event => {
    document.body.classList.add('cursor-pressed');
    const button = event.target.closest('.button, .icon-button, [data-ripple]');
    button?.classList.add('is-pressed');
  });
  document.addEventListener('pointerup', () => document.body.classList.remove('cursor-pressed'));
  document.addEventListener('pointercancel', () => document.body.classList.remove('cursor-pressed'));
  $$('img').forEach(image => {
    if (!image.dataset.cursorText) image.dataset.cursorText = image.closest('a, [data-quick-view]') ? 'View' : 'Drag';
  });
  render();
  window.addEventListener('pagehide', () => cancelAnimationFrame(frame), { once: true });
}

function initMicroInteractions() {
  document.addEventListener('pointerdown', event => {
    const button = event.target.closest('.button, .icon-button');
    if (!button) return;
    button.classList.add('is-pressed');
    setTimeout(() => button.classList.remove('is-pressed'), 220);
  });
}

function initMagneticButtons() {
  if (!matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  $$('.button, [data-magnetic]').forEach(button => {
    button.classList.add('magnetic-target');
    button.addEventListener('pointermove', event => {
      const bounds = button.getBoundingClientRect();
      button.style.setProperty('--magnetic-x', `${(event.clientX - bounds.left - bounds.width / 2) * .12}px`);
      button.style.setProperty('--magnetic-y', `${(event.clientY - bounds.top - bounds.height / 2) * .12}px`);
    });
    button.addEventListener('pointerleave', () => {
      button.style.setProperty('--magnetic-x', '0px');
      button.style.setProperty('--magnetic-y', '0px');
    });
  });
}

function initCardTilt() {
  if (!matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  $$('.product-card, .collection-card, .occasion-card, [data-tilt]').forEach(card => {
    card.classList.add('card-tilt');
    card.addEventListener('pointermove', event => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      card.style.setProperty('--tilt-x', `${y * -5}deg`);
      card.style.setProperty('--tilt-y', `${x * 5}deg`);
      card.style.setProperty('--tilt-lift', '-4px');
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
      card.style.setProperty('--tilt-lift', '0px');
    });
  });
}

function initTextRevealLines() {
  const targets = $$('[data-text-reveal], .text-reveal');
  if (!targets.length) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  targets.forEach(target => {
    if (!target.children.length && target.textContent.trim()) {
      const text = target.textContent.trim();
      target.setAttribute('aria-label', text);
      target.innerHTML = text.split(/\s+/).map(word => `<span>${word}</span>`).join(' ');
    }
  });
  if (reduced) {
    targets.forEach(target => target.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), { threshold: .2 });
  targets.forEach(target => observer.observe(target));
}

function initImageRevealMask() {
  const excluded = image => image.closest('.hero-slider, .carousel-track, [data-collections-rail], .collection-grid, .logo, .avatar, .custom-cursor, .custom-cursor-ring, .custom-cursor-label');
  const entries = new Map();
  const addEntry = (target, image) => {
    if (!target || !image || excluded(image)) return;
    if (!target.classList.contains('image-reveal-target')) target.classList.add('image-reveal-target');
    image.classList.add('image-reveal-image');
    if (target === image) target.classList.add('image-reveal-direct');
    if (image.closest('.product-card')) target.classList.add('image-reveal-product');
    entries.set(target, image);
  };
  $$('[data-image-reveal], .image-reveal').forEach(element => addEntry(element.matches('img') ? element.parentElement : element, element.matches('img') ? element : $('img', element)));
  $$('img').forEach(image => {
    if (excluded(image) || image.closest('[data-image-reveal], .image-reveal')) return;
    const target = image.closest('.card-image, .image-frame, .detail-media, .wrapping-gallery-tile, .bond-card, .signature-card, .archive-card .card-image, .atelier-hero-art, .studio-preview, .story-grid > div, .split-grid > div') || image;
    addEntry(target, image);
  });
  const targets = [...entries.keys()];
  if (!targets.length) return;
  targets.forEach((target, index) => {
    target.classList.add('image-reveal-ready');
    target.dataset.revealDirection = index % 3 === 1 ? 'left' : index % 3 === 2 ? 'right' : 'bottom';
    target.style.setProperty('--image-reveal-delay', `${(index % 4) * 120}ms`);
  });
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    targets.forEach(target => {
      target.classList.add('is-visible');
      target.removeAttribute('data-reveal-direction');
    });
    return;
  }
  const makeVisible = target => {
    if (!target) return;
    target.classList.add('is-visible');
    target.removeAttribute('data-reveal-direction');
  };
  const observer = new IntersectionObserver(entriesToReveal => entriesToReveal.forEach(entry => {
    if (entry.isIntersecting) {
      makeVisible(entry.target);
      observer.unobserve(entry.target);
    }
  }), { threshold: 0, rootMargin: '50px 0px 50px 0px' });
  targets.forEach(target => {
    const img = target.matches('img') ? target : target.querySelector('img');
    if (img) {
      if (img.complete && img.naturalWidth > 0) makeVisible(target);
      else img.addEventListener('load', () => makeVisible(target), { once: true });
    }
    const bounds = target.getBoundingClientRect();
    const inView = bounds.bottom > 0 && bounds.top < innerHeight;
    if (target.closest('.reveal')?.classList.contains('is-visible') || inView) {
      makeVisible(target);
    } else {
      observer.observe(target);
    }
  });
  setTimeout(() => {
    targets.forEach(makeVisible);
  }, 800);
}

function initRippleEffect() {
  document.addEventListener('pointerdown', event => {
    const target = event.target.closest('.button, .icon-button, [data-ripple]');
    if (!target || target.disabled) return;
    const bounds = target.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = `${event.clientX - bounds.left}px`;
    ripple.style.top = `${event.clientY - bounds.top}px`;
    target.append(ripple);
    ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
  });
}

function initScrollProgress() {
  if (document.querySelector('.scroll-progress')) return;
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  progress.innerHTML = '<span></span>';
  document.body.append(progress);
  const bar = $('span', progress);
  let ticking = false;
  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    ticking = false;
  };
  document.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();
}

function initPageLoadTransition() {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const overlay = document.createElement('div');
  overlay.className = 'page-transition';
  overlay.setAttribute('aria-hidden', 'true');
  document.body.append(overlay);
  requestAnimationFrame(() => overlay.classList.add('is-ready'));
  if (reduced) return;
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || !['http:', 'https:', 'file:'].includes(link.protocol) || link.target === '_blank' || link.hasAttribute('download') || link.origin !== location.origin || link.pathname === location.pathname && link.hash) return;
    event.preventDefault();
    overlay.classList.remove('is-ready');
    overlay.classList.add('is-leaving');
    setTimeout(() => { location.href = link.href; }, 220);
  });
}

function initAnimationPolish() {
  document.body.classList.add('animation-ready');
  $$('.page-hero h1, .hero-copy h1, .section-heading h2, .copy-block h2, .intro-copy h2').forEach(element => element.dataset.textReveal = '');
  $$('.image-frame, .detail-media, .story-grid img, .split-grid img').forEach(element => element.dataset.imageReveal = '');
  $$('[data-text-reveal], [data-image-reveal]').forEach(element => element.classList.add('polish-target'));
}

function initSkeletonCrossfade() {
  $$('.skeleton').forEach(skeleton => {
    const image = $('img', skeleton);
    const reveal = () => skeleton.classList.add('is-loaded');
    if (image) {
      image.complete ? reveal() : image.addEventListener('load', reveal, { once: true });
    } else {
      window.addEventListener('load', reveal, { once: true });
    }
  });
}

function initHeroSlider() {
  const slider = document.querySelector('.hero-slider');
  if (!slider) return;
  const slides = [...slider.querySelectorAll('.hero-slide')];
  const dots   = [...slider.querySelectorAll('.slider-dot')];
  const prev   = slider.querySelector('.slider-prev');
  const next   = slider.querySelector('.slider-next');
  if (slides.length !== 3 || dots.length !== slides.length) return;
  let current  = 0;
  let timer;
  let isHovered = false;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    dots[current].setAttribute('aria-selected', 'false');
    slides[current].setAttribute('aria-hidden', 'true');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    dots[current].setAttribute('aria-selected', 'true');
    slides[current].setAttribute('aria-hidden', 'false');
    slider.setAttribute('aria-label', `Hero image slider, showing slide ${current + 1} of ${slides.length}`);
  }

  function startAuto() {
    clearInterval(timer);
    timer = null;
    if (isHovered || document.hidden) return;
    timer = setInterval(() => goTo(current + 1), 3000);
  }

  function stopAuto() {
    clearInterval(timer);
    timer = null;
  }

  prev?.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  next?.addEventListener('click', () => { goTo(current + 1); startAuto(); });
  dots.forEach(dot => dot.addEventListener('click', () => { goTo(Number(dot.dataset.slide)); startAuto(); }));

  slider.addEventListener('mouseenter', () => { isHovered = true; stopAuto(); });
  slider.addEventListener('mouseleave', () => { isHovered = false; startAuto(); });
  document.addEventListener('visibilitychange', startAuto);

  // Keyboard support
  slider.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  { goTo(current - 1); startAuto(); }
    if (e.key === 'ArrowRight') { goTo(current + 1); startAuto(); }
  });

  slides.forEach((slide, index) => slide.setAttribute('aria-hidden', String(index !== current)));
  startAuto();
}

function initPersonalizationStudio() {
  const studio = document.querySelector('[data-personalization-studio]');
  if (!studio) return;
  const name = studio.querySelector('[data-preview-input="name"]');
  const date = studio.querySelector('[data-preview-input="date"]');
  const previewName = document.querySelector('[data-preview-name]');
  const previewDate = document.querySelector('[data-preview-date]');
  const update = () => {
    if (previewName) previewName.textContent = (name.value.trim() || 'YOUR NAME').toUpperCase();
    if (previewDate) previewDate.textContent = (date.value.trim() || 'YOUR SPECIAL DATE').toUpperCase();
  };
  [name, date].forEach(input => input?.addEventListener('input', update));
  studio.addEventListener('submit', event => {
    event.preventDefault();
    const invalid = [name, date].find(input => !input?.value.trim());
    [name, date].forEach(input => input?.setAttribute('aria-invalid', String(input === invalid)));
    if (invalid) { showToast('Please add a name and date or message'); invalid.focus(); return; }
    studio.querySelector('[data-add-cart]')?.click();
  });
  studio.addEventListener('click', event => {
    const choice = event.target.closest('.studio-choice, .finish-swatch');
    if (!choice) return;
    const group = choice.classList.contains('finish-swatch') ? '.finish-swatch' : `.studio-choice[data-choice="${choice.dataset.choice}"]`;
    studio.querySelectorAll(group).forEach(item => item.classList.remove('is-selected'));
    choice.classList.add('is-selected');
    if (choice.dataset.finish) document.querySelector('.studio-book').style.background = choice.dataset.finish === 'forest' ? 'linear-gradient(135deg,#26483b,#10251e)' : choice.dataset.finish === 'champagne' ? 'linear-gradient(135deg,#b48b55,#6f4a28)' : 'linear-gradient(135deg,#51301e,#28140d)';
  });
  update();
}

document.addEventListener('DOMContentLoaded', () => {
  initSharedChrome();
  initTheme(); initRTL(); initNavigationState(); initAnnouncement(); initMobileNavigation(); initHeader(); initScrollReveal(); initGiftJourney();
  initWishlist(); initCart(); initQuickView(); initNewsletterForm(); initLoadingStates(); initBrandName(); initFastImageLoading(); initImageFallbacks();
  initGiftFinder(); initArchiveImages(); initArchiveRail(); initHomeTwoCopy(); initBondImages(); initHomeTwoCatalog(); initHomeTwoProductImages();
  initCarousel(); initHeroSlider(); initCollectionsRail(); initProductCatalog(); initProductDetail(); initServiceForms();
  initAnimationPolish(); initCustomCursor(); initMicroInteractions(); initMagneticButtons(); initCardTilt();
  initTextRevealLines(); initImageRevealMask(); initRippleEffect(); initScrollProgress(); initPageLoadTransition(); initSkeletonCrossfade();
  initPersonalizationStudio();
  const authScript = document.createElement('script');
  authScript.src = new URL('../assets/js/auth.js', location.href).href;
  document.body.append(authScript);
  if (window.lucide) lucide.createIcons();
});
