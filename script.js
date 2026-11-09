const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.textContent = open ? '×' : '☰';
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.textContent = '☰';
}));
const form = document.getElementById('waitlist-form');
if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const submitBtn = form.querySelector('.submit-button');
    if (submitBtn) {
      submitBtn.textContent = 'Joining waitlist...';
      submitBtn.disabled = true;
    }

    const name = form.querySelector('#name')?.value || '';
    const email = form.querySelector('#email')?.value || '';
    const month = form.querySelector('#month')?.value || 'Flexible';
    const guests = form.querySelector('#guests')?.value || '';

    const payload = {
      _subject: `New Waitlist Lead — Schwarzwald Yoga Escape (${name})`,
      _template: "table",
      _captcha: "false",
      Name: name,
      Email: email,
      "Preferred Time of Year": month,
      "Places Desired": guests,
      "Retreat Sanctuary": "Schwarzwald Yoga Escape (Germany)"
    };

    try {
      const response = await fetch('https://formsubmit.co/ajax/bermondish@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('Network error');
    } catch (err) {
      console.error('Waitlist submission notice:', err);
    }

    const success = document.getElementById('form-success');
    if (success) {
      success.textContent = `Thank you, ${name}! Your interest in Schwarzwald Yoga Escape has been received. You will be among the first to receive booking details and founder rates.`;
      success.classList.add('show');
      success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    if (submitBtn) {
      submitBtn.textContent = 'Early access confirmed 🌲';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.85';
    }
  });
}
