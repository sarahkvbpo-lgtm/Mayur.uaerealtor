'use strict';
const settings = window.SITE_SETTINGS || {};
const toggle = document.querySelector('#menu-toggle');
const nav = document.querySelector('#navigation');
toggle.hidden = false;
toggle.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('open', !expanded);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) {
    nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.focus();
  }
});
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => {
  document.querySelector('#service').value = link.dataset.service;
}));
const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.email || '') ? settings.email : '';
const contact = document.querySelector('#direct-contact');
function addContact(label, url) {
  const link = document.createElement('a'); link.className = 'contact-link';
  link.textContent = label; link.href = url; contact.append(link);
}
if (email) addContact(email, 'mailto:' + email);
if (/^\+\d[\d\s()-]{6,20}$/.test(settings.phone || '')) addContact('Call Mayur', 'tel:' + settings.phone.replace(/[\s()-]/g, ''));
if (/^\d{8,15}$/.test(settings.whatsapp || '')) addContact('Chat on WhatsApp ↗', 'https://wa.me/' + settings.whatsapp);
document.querySelector('#year').textContent = new Date().getFullYear();
const form = document.querySelector('#enquiry-form');
const status = document.querySelector('#form-status');
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const body = ['Property enquiry for Mayur', '', 'Name: ' + data.get('name'), 'Email: ' + data.get('email'), 'Phone: ' + (data.get('phone') || 'Not provided'), 'Service: ' + data.get('service'), '', data.get('message'), '', 'I agree to be contacted about this enquiry.'].join('\n');
  document.querySelector('#prepared-enquiry').value = body;
  document.querySelector('#enquiry-result').hidden = false;
  const emailLink = document.querySelector('#email-enquiry');
  emailLink.hidden = !email;
  if (email) emailLink.href = 'mailto:' + email + '?subject=' + encodeURIComponent('UAE property enquiry: ' + data.get('service')) + '&body=' + encodeURIComponent(body);
  status.textContent = email ? 'Enquiry prepared. Open your email app, review it and send. Nothing has been sent yet.' : 'Enquiry prepared for copying. Direct email is not configured yet; nothing has been sent.';
});
document.querySelector('#copy-enquiry').addEventListener('click', async () => {
  const field = document.querySelector('#prepared-enquiry');
  try { await navigator.clipboard.writeText(field.value); status.textContent = 'Copied. Paste into your preferred messaging or email app to share.'; }
  catch { field.focus(); field.select(); status.textContent = 'Select and copy the prepared enquiry below using your device’s copy command.'; }
});
