// Uppdaterad showUpdateNotification funktion med app-färger
showUpdateNotification() {
  // Remove existing notification if any
  const existing = document.getElementById('pwa-update-notification');
  if (existing) existing.remove();
  
  // Create update notification with Git Hash info
  const updateDiv = document.createElement('div');
  updateDiv.id = 'pwa-update-notification';
  updateDiv.innerHTML = `
    <div style="
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #16213e;
      color: white;
      padding: 15px 20px;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 1001;
      text-align: center;
      max-width: 300px;
      font-family: Arial, sans-serif;
      border: 2px solid #FFD700;
    ">
      <div style="font-weight: bold; margin-bottom: 10px; color: #FFD700;">🔄 Update Available!</div>
      <div style="font-size: 12px; margin-bottom: 5px; opacity: 0.8;">Current: ${this.currentGitHash}</div>
      <div style="font-size: 14px; margin-bottom: 15px;">A new version is ready to install.</div>
      <button id="update-btn" style="
        background: #FFD700;
        color: #16213e;
        border: 2px solid #FFD700;
        padding: 8px 16px;
        border-radius: 5px;
        cursor: pointer;
        margin-right: 10px;
        font-family: Arial, sans-serif;
        font-weight: bold;
        transition: all 0.3s ease;
      ">Update Now</button>
      <button id="dismiss-update" style="
        background: #1a1a2e;
        color: #FFD700;
        border: 2px solid #FFD700;
        padding: 8px 16px;
        border-radius: 5px;
        cursor: pointer;
        font-family: Arial, sans-serif;
        font-weight: bold;
        transition: all 0.3s ease;
      ">Later</button>
    </div>
  `;

  document.body.appendChild(updateDiv);

  // Add event listeners
  document.getElementById('update-btn').addEventListener('click', () => {
    this.updateApp();
  });

  document.getElementById('dismiss-update').addEventListener('click', () => {
    updateDiv.remove();
  });

  // Add hover effects
  const updateBtn = document.getElementById('update-btn');
  const dismissBtn = document.getElementById('dismiss-update');
  
  updateBtn.addEventListener('mouseenter', () => {
    updateBtn.style.background = '#FFA500';
    updateBtn.style.borderColor = '#FFA500';
    updateBtn.style.transform = 'scale(1.05)';
  });
  
  updateBtn.addEventListener('mouseleave', () => {
    updateBtn.style.background = '#FFD700';
    updateBtn.style.borderColor = '#FFD700';
    updateBtn.style.transform = 'scale(1)';
  });
  
  dismissBtn.addEventListener('mouseenter', () => {
    dismissBtn.style.background = '#FFD700';
    dismissBtn.style.color = '#16213e';
    dismissBtn.style.transform = 'scale(1.05)';
  });
  
  dismissBtn.addEventListener('mouseleave', () => {
    dismissBtn.style.background = '#1a1a2e';
    dismissBtn.style.color = '#FFD700';
    dismissBtn.style.transform = 'scale(1)';
  });

  // Auto-dismiss after 15 seconds
  setTimeout(() => {
    if (document.getElementById('pwa-update-notification')) {
      updateDiv.remove();
    }
  }, 15000);
}
