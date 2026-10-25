const panels = [...document.querySelectorAll('.wizard-panel')];
const nextButtons = document.querySelectorAll('.next-btn');
const steps = [...document.querySelectorAll('.step')];

function showPanel(index) {
  panels.forEach((panel, i) => {
    panel.classList.toggle('active', i === index);
  });

  steps.forEach((step, i) => {
    const label = step.querySelector('.step-label');
    if (i < index) {
      step.classList.add('complete');
      step.classList.remove('current');
      step.innerHTML = '<span class="step-check">✓</span><span class="step-label">' + label.textContent + '</span>';
    } else if (i === index) {
      step.classList.add('current');
      step.classList.remove('complete');
      step.innerHTML = '<span class="step-dot"></span><span class="step-label">' + label.textContent + '</span>';
    } else {
      step.classList.remove('complete');
      step.classList.remove('current');
      step.innerHTML = '<span class="step-dot" style="background:#d5d0ca;border:0;"></span><span class="step-label">' + label.textContent + '</span>';
    }
  });
}

let current = 0;
showPanel(current);

nextButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (current < panels.length - 1) {
      current += 1;
      showPanel(current);
    }
  });
});

const backButton = document.querySelector('.step-back');
if (backButton) {
  backButton.addEventListener('click', () => {
    if (current > 0) {
      current -= 1;
      showPanel(current);
    }
  });
}


































































































