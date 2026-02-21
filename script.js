const currentYear = document.getElementById('currentYear');
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

const nav = document.getElementById('mainNav');
const backToTop = document.getElementById('backToTop');

const onScroll = () => {
  if (window.scrollY > 24) {
    nav?.classList.add('scrolled');
  } else {
    nav?.classList.remove('scrolled');
  }

  if (window.scrollY > 520) {
    backToTop?.classList.add('show');
  } else {
    backToTop?.classList.remove('show');
  }
};

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('formSubmitBtn');
const successAlert = document.getElementById('formSuccess');
const errorAlert = document.getElementById('formError');

if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    successAlert?.classList.add('d-none');
    errorAlert?.classList.add('d-none');

    submitBtn?.setAttribute('disabled', 'true');
    const oldText = submitBtn?.textContent;
    if (submitBtn) submitBtn.textContent = 'Enviando...';

    try {
      const formData = new FormData(contactForm);
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        successAlert?.classList.remove('d-none');
        contactForm.reset();
      } else {
        errorAlert?.classList.remove('d-none');
      }
    } catch (error) {
      errorAlert?.classList.remove('d-none');
    } finally {
      submitBtn?.removeAttribute('disabled');
      if (submitBtn && oldText) submitBtn.textContent = oldText;
    }
  });
}
