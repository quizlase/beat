// Uppdaterad showInstallButton funktion - kopiera denna till din script.js

showInstallButton() {
  // Don't show button if already installed
  if (this.isInstalled) return;
  
  // Create install button
  const installBtn = document.createElement('button');
  installBtn.id = 'pwa-install-btn';
  installBtn.innerHTML = '📱 Install Beat the Deck Pro';
  installBtn.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #16213e;
    color: white;
    border: 2px solid #4CAF50;
    padding: 15px 30px;
    border-radius: 30px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    z-index: 1000;
    box-shadow: 0 6px 20px rgba(0,0,0,0.4);
    transition: all 0.3s ease;
    font-family: Arial, sans-serif;
  `;
  
  installBtn.addEventListener('click', () => this.installApp());
  installBtn.addEventListener('mouseenter', () => {
    installBtn.style.transform = 'translateX(-50%) scale(1.05)';
    installBtn.style.background = '#1a1a2e';
    installBtn.style.borderColor = '#66BB6A';
  });
  installBtn.addEventListener('mouseleave', () => {
    installBtn.style.transform = 'translateX(-50%) scale(1)';
    installBtn.style.background = '#16213e';
    installBtn.style.borderColor = '#4CAF50';
  });

  document.body.appendChild(installBtn);
}
