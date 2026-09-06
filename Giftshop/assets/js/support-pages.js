/**
 * Aura & Ribbon - Support Pages Logic
 * Pure Vanilla JavaScript (ES6+)
 * - Order Enquiry Form Client-side Validation & Feedback
 * - Shipping FAQ Accordion with WCAG ARIA Support
 */

(function () {
  'use strict';

  // --- Order Enquiry Form Handling ---
  function initOrderEnquiryForm() {
    const form = document.querySelector('[data-order-enquiry-form]');
    if (!form) return;

    const successBanner = document.querySelector('[data-form-success]');
    const fields = {
      fullName: form.querySelector('#fullName'),
      email: form.querySelector('#email'),
      phone: form.querySelector('#phone'),
      orderNumber: form.querySelector('#orderNumber'),
      enquiryType: form.querySelector('#enquiryType'),
      message: form.querySelector('#message')
    };

    const errors = {
      fullName: form.querySelector('#fullName-error'),
      email: form.querySelector('#email-error'),
      phone: form.querySelector('#phone-error'),
      enquiryType: form.querySelector('#enquiryType-error'),
      message: form.querySelector('#message-error')
    };

    function clearFieldError(key) {
      const input = fields[key];
      const error = errors[key];
      if (input) {
        input.removeAttribute('aria-invalid');
        input.classList.remove('is-invalid');
      }
      if (error) {
        error.textContent = '';
        error.classList.remove('is-visible');
      }
    }

    function setFieldError(key, message) {
      const input = fields[key];
      const error = errors[key];
      if (input) {
        input.setAttribute('aria-invalid', 'true');
        input.classList.add('is-invalid');
      }
      if (error) {
        error.textContent = message;
        error.classList.add('is-visible');
      }
    }

    // Clear errors on user input
    Object.keys(fields).forEach(key => {
      const input = fields[key];
      if (!input) return;
      input.addEventListener('input', () => clearFieldError(key));
      input.addEventListener('change', () => clearFieldError(key));
    });

    form.addEventListener('submit', event => {
      event.preventDefault();
      let isValid = true;
      let firstInvalid = null;

      // Validate Full Name
      const nameVal = fields.fullName ? fields.fullName.value.trim() : '';
      if (!nameVal) {
        setFieldError('fullName', 'Please enter your full name.');
        isValid = false;
        if (!firstInvalid) firstInvalid = fields.fullName;
      } else if (nameVal.length < 2) {
        setFieldError('fullName', 'Please enter a valid full name.');
        isValid = false;
        if (!firstInvalid) firstInvalid = fields.fullName;
      } else {
        clearFieldError('fullName');
      }

      // Validate Email
      const emailVal = fields.email ? fields.email.value.trim() : '';
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal) {
        setFieldError('email', 'Please enter your email address.');
        isValid = false;
        if (!firstInvalid) firstInvalid = fields.email;
      } else if (!emailPattern.test(emailVal)) {
        setFieldError('email', 'Please enter a valid email address (e.g. name@example.com).');
        isValid = false;
        if (!firstInvalid) firstInvalid = fields.email;
      } else {
        clearFieldError('email');
      }

      // Validate Phone Number
      const phoneVal = fields.phone ? fields.phone.value.trim() : '';
      const phoneDigits = phoneVal.replace(/\D/g, '');
      if (!phoneVal) {
        setFieldError('phone', 'Please enter your phone number.');
        isValid = false;
        if (!firstInvalid) firstInvalid = fields.phone;
      } else if (phoneDigits.length < 7 || phoneDigits.length > 15) {
        setFieldError('phone', 'Please enter a valid phone number.');
        isValid = false;
        if (!firstInvalid) firstInvalid = fields.phone;
      } else {
        clearFieldError('phone');
      }

      // Validate Enquiry Type
      const typeVal = fields.enquiryType ? fields.enquiryType.value.trim() : '';
      if (!typeVal || typeVal === '') {
        setFieldError('enquiryType', 'Please select an enquiry type.');
        isValid = false;
        if (!firstInvalid) firstInvalid = fields.enquiryType;
      } else {
        clearFieldError('enquiryType');
      }

      // Validate Message
      const messageVal = fields.message ? fields.message.value.trim() : '';
      if (!messageVal) {
        setFieldError('message', 'Please enter your message.');
        isValid = false;
        if (!firstInvalid) firstInvalid = fields.message;
      } else if (messageVal.length < 10) {
        setFieldError('message', 'Please provide a little more detail in your message (at least 10 characters).');
        isValid = false;
        if (!firstInvalid) firstInvalid = fields.message;
      } else {
        clearFieldError('message');
      }

      if (!isValid) {
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Successful Demo Submission
      form.reset();
      Object.keys(fields).forEach(clearFieldError);

      if (successBanner) {
        successBanner.classList.add('is-visible');
        successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        successBanner.setAttribute('tabindex', '-1');
        successBanner.focus();
      }
    });
  }

  // --- Shipping FAQ Accordion Handling ---
  function initShippingFaq() {
    const faqItems = document.querySelectorAll('[data-faq-item]');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
      const trigger = item.querySelector('[data-faq-trigger]');
      const content = item.querySelector('[data-faq-content]');
      if (!trigger || !content) return;

      trigger.addEventListener('click', () => {
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

        trigger.setAttribute('aria-expanded', String(!isExpanded));
        if (isExpanded) {
          item.classList.remove('is-active');
          content.hidden = true;
        } else {
          item.classList.add('is-active');
          content.hidden = false;
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initOrderEnquiryForm();
    initShippingFaq();
  });
})();
