// src/pwa.js
let promptInstalar = null;

export function registrarSW() {
  if (!('serviceWorker' in navigator)) return;
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((e) => {
      console.warn('SW: falha ao registrar', e);
    });
  });
}

export function ouvirPromptInstalar(callback) {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    promptInstalar = e;
    callback(true);
  });
  window.addEventListener('appinstalled', () => {
    promptInstalar = null;
    callback(false);
  });
}

export async function instalar() {
  if (!promptInstalar) return false;
  promptInstalar.prompt();
  const escolha = await promptInstalar.userChoice;
  promptInstalar = null;
  return escolha.outcome === 'accepted';
}

export function jaInstalado() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  );
}