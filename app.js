const toast = document.getElementById('toast');

document.querySelectorAll('[data-pending="true"]').forEach((card) => {
  card.addEventListener('click', (event) => {
    event.preventDefault();
    showToast('Esta herramienta todavía está en desarrollo.');
  });
});

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}
