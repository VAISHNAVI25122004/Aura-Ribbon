(function () {
  const USERS = 'giftStoreUsers';
  const CURRENT = 'giftStoreCurrentUser';
  const get = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; } };
  const set = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  const current = () => {
    try { return JSON.parse(localStorage.getItem(CURRENT)) || JSON.parse(sessionStorage.getItem(CURRENT)); } catch { return null; }
  };
  const emailOk = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const message = (form, text, good) => { const node = form.querySelector('[data-auth-message]'); if (node) { node.textContent = text; node.className = `form-message ${good ? 'is-success' : 'is-error'}`; } };
  const toggle = button => { const input = document.getElementById(button.dataset.toggle); if (!input) return; input.type = input.type === 'password' ? 'text' : 'password'; button.setAttribute('aria-label', input.type === 'password' ? 'Show password' : 'Hide password'); button.innerHTML = `<i data-lucide="${input.type === 'password' ? 'eye' : 'eye-off'}"></i>`; window.lucide?.createIcons(); };
  function initToggles() { document.querySelectorAll('[data-toggle]').forEach(button => button.addEventListener('click', () => toggle(button))); }
  function initSignup() {
    const form = document.querySelector('[data-signup-form]'); if (!form) return;
    const password = form.elements.password, strength = form.querySelector('[data-password-strength]');
    password?.addEventListener('input', () => { const value = password.value; const score = [value.length >= 8, /[A-Z]/.test(value), /[a-z]/.test(value), /\d/.test(value), /[^A-Za-z\d]/.test(value)].filter(Boolean).length; strength.textContent = score >= 4 ? 'Strong' : score >= 2 ? 'Medium' : value ? 'Weak' : ''; strength.dataset.level = score >= 4 ? 'strong' : score >= 2 ? 'medium' : 'weak'; });
    form.addEventListener('submit', event => {
      event.preventDefault(); const data = Object.fromEntries(new FormData(form)); const users = get(USERS, []);
      if (!data.firstName || !data.lastName) return message(form, 'Please enter your first and last name.');
      if (!emailOk(data.email)) return message(form, 'Please enter a valid email address.');
      if (!/^[\d\s()+-]{7,}$/.test(data.phone)) return message(form, 'Please enter a valid phone number.');
      if (data.password.length < 8) return message(form, 'Password must contain at least 8 characters.');
      if (data.password !== data.confirmPassword) return message(form, 'Passwords do not match.');
      if (!form.elements.terms.checked) return message(form, 'Please accept the Terms & Conditions.');
      if (users.some(user => user.email === data.email.toLowerCase())) return message(form, 'An account with this email already exists.');
      users.push({ id: Date.now(), firstName: data.firstName, lastName: data.lastName, email: data.email.toLowerCase(), phone: data.phone, password: data.password }); set(USERS, users); set(CURRENT, users.at(-1)); location.href = 'account.html';
    });
  }
  function initLogin() {
    const form = document.querySelector('[data-login-form]'); if (!form) return;
    form.addEventListener('submit', event => { event.preventDefault(); const data = Object.fromEntries(new FormData(form)); if (!emailOk(data.email)) return message(form, 'Please enter a valid email address.'); if (data.password.length < 8) return message(form, 'Password must contain at least 8 characters.'); const user = get(USERS, []).find(item => item.email === data.email.toLowerCase() && item.password === data.password); if (!user) return message(form, 'Email or password is incorrect.'); (form.elements.remember.checked ? localStorage : sessionStorage).setItem(CURRENT, JSON.stringify(user)); location.href = new URLSearchParams(location.search).get('redirect') || 'account.html'; });
  }
  function initAccount() {
    const page = document.querySelector('[data-account-page]'); if (!page) return; const user = current(); if (!user) { location.href = `login.html?redirect=account.html`; return; }
    page.querySelectorAll('[data-user-field]').forEach(node => { node.textContent = user[node.dataset.userField] || 'Not provided'; }); page.querySelector('[data-logout]')?.addEventListener('click', () => { localStorage.removeItem(CURRENT); sessionStorage.removeItem(CURRENT); location.href = 'index.html'; });
  }
  function updateHeader() {
    const user = current(), actions = document.querySelector('.nav-actions'); if (!actions || actions.querySelector('[data-account-link]')) return;
    const link = document.createElement('a'); link.className = 'icon-button nav-action auth-account-link'; link.dataset.accountLink = ''; link.href = user ? 'account.html' : 'login.html'; link.setAttribute('aria-label', user ? `My account, ${user.firstName}` : 'Account'); link.innerHTML = user ? `<span class="auth-greeting">Hi, ${user.firstName}</span>` : '<i data-lucide="user-round"></i>'; actions.prepend(link); window.lucide?.createIcons();
  }
  initToggles(); initSignup(); initLogin(); initAccount(); updateHeader();
})();
