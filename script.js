const panels = [...document.querySelectorAll('.wizard-panel')];
const steps = [...document.querySelectorAll('.step')];
const nextButtons = document.querySelectorAll('.next-btn');
const skipBtn = document.querySelector('.skip-btn');
const submitBtn = document.querySelector('.submit-btn');
const backButton = document.querySelector('.step-back');

const faqAnswers = {
  1: 'That\'s completely fine. You do not need to know everything about the experience before applying. The application and chatbot are here to help you understand the expectations, responsibilities, and commitments involved. Take the time to ask questions, learn what participation entails, and decide whether No Nut November 2026 is something you genuinely want to experience.',
  2: 'If your financial circumstances change, contact Goddess Jade as soon as possible to discuss your situation. Any change to your proposed tribute amount or payment arrangement requires her approval. Your existing arrangement remains in effect until a change is confirmed.',
  3: 'Your initial tribute must be received by November 1, 2026 at 8:00 AM Pacific Time. A three-day grace period applies to eligible payment deadlines, and any extension or alternative arrangement must be confirmed by Goddess Jade.',
  4: 'You may submit your application before paying, but your participation is not confirmed until your application is approved and your payment has been received and verified. You will receive email instructions with the timeline and payment details.',
  5: 'No. The chatbot can explain the published application requirements and payment procedures, but it cannot approve exceptions, amend payment terms, or make application decisions on behalf of Goddess Jade. All requests requiring approval must be directed to her.'
};

let currentIndex = 0;

function renderSteps() {
  steps.forEach((step, index) => {
    const label = step.querySelector('.step-label');
    if (index < currentIndex) {
      step.classList.add('complete');
      step.classList.remove('current');
      step.innerHTML = '<span class="step-check">✓</span><span class="step-label">' + label.textContent + '</span>';
    } else if (index === currentIndex) {
      step.classList.add('current');
      step.classList.remove('complete');
      step.innerHTML = '<span class="step-dot"></span><span class="step-label">' + label.textContent + '</span>';
    } else {
      step.classList.remove('complete');
      step.classList.remove('current');
      step.innerHTML = '<span class="step-dot neutral"></span><span class="step-label">' + label.textContent + '</span>';
    }
  });
}

function showPanel(index) {
  panels.forEach((panel, i) => {
    panel.classList.toggle('active', i === index);
  });
  currentIndex = index;
  renderSteps();
}

nextButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const activePanel = document.querySelector('.wizard-panel.active');
    const activeIndex = panels.indexOf(activePanel);
    if (activeIndex < panels.length - 1) {
      showPanel(activeIndex + 1);
    }
  });
});

if (backButton) {
  backButton.addEventListener('click', () => {
    const activePanel = document.querySelector('.wizard-panel.active');
    const activeIndex = panels.indexOf(activePanel);
    if (activeIndex > 0) {
      showPanel(activeIndex - 1);
    }
  });
}

if (skipBtn) {
  skipBtn.addEventListener('click', () => {
    showPanel(panels.length - 1);
    const finalPanel = document.querySelector('.wizard-panel.active');
    if (finalPanel) {
      finalPanel.innerHTML = `
        <div class="card form-card thankyou-card">
          <h2>Application Submitted</h2>
          <p>Your application has been submitted successfully. You may skip payment for now and will receive an email with your application details and payment instructions.</p>
          <p>Your participation will be confirmed only after your payment is reviewed and approved.</p>
          <button class="primary-btn" type="button" onclick="window.location.reload()">Return to start</button>
        </div>
      `;
    }
  });
}

if (submitBtn) {
  submitBtn.addEventListener('click', () => {
    const paymentPanel = document.querySelector('[data-panel="payment"]');
    if (paymentPanel) {
      paymentPanel.innerHTML = `
        <div class="card form-card thankyou-card">
          <h2>Application Submitted</h2>
          <p>Your application has been submitted successfully. You may complete your payment later, and you will receive email instructions after review.</p>
          <p>Your application will be approved only after payment verification.</p>
          <button class="primary-btn" type="button" onclick="window.location.reload()">Return to start</button>
        </div>
      `;
    }
  });
}

const faqButtons = document.querySelectorAll('.faq-question');
const faqAnswer = document.getElementById('faq-answer');

faqButtons.forEach((button) => {
  button.addEventListener('click', () => {
    faqButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    const key = button.dataset.answer;
    faqAnswer.textContent = faqAnswers[key] || faqAnswers[1];
  });
});

renderSteps();
