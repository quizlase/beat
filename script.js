// Tutorial System Variables
let currentTutorialStep = 0;
let isTutorialActive = false;

const tutorialSteps = [
    {
        title: "Welcome to Beat the Deck!",
        text: "This is a tutorial that will teach you how to play. Your goal is to predict if the next card will be Higher or Lower.",
        position: "bottom-center",
        highlight: null,
        arrow: null
    },
    {
        title: "Click Any Card",
        text: "Tap on any card to select it. This will show the guess buttons.",
        position: "bottom-center",
        highlight: "card-1",
        arrow: { target: "card-1", direction: "pointing-up" }
    },
    {
        title: "The Guess Buttons",
        text: "These buttons let you predict the next card. ▲ Higher means the next card will be higher than 7, ▼ Lower means it will be lower.",
        position: "bottom-center",
        highlight: "buttons",
        arrow: { target: "card-1", direction: "pointing-up" }
    },
    {
        title: "Wrong Guess = Lost Pile",
        text: "The 7♥ was guessed Higher, but got 3♦ (lower)! That pile is lost forever. You continue with remaining piles.",
        position: "bottom-center", 
        highlight: "card-1",
        arrow: { target: "card-1", direction: "pointing-up" }
    },
    {
        title: "Watch Your Score!",
        text: "Correct guesses earn points! Wrong guesses (or equal cards) lose that pile. Remember: Aces are HIGH (14)!",
        position: "bottom-center",
        highlight: "score",
        arrow: { target: "score", direction: "pointing-up" }
    },
    {
        title: "Multiple Game Modes!",
        text: "Explore different game modes: Classic & Infinite (solo), Panic & No Mercy (time pressure), 2 Player modes (competitive), and Battle Royale (lives system)!",
        position: "top-center",
        highlight: "settings",
        arrow: { target: "settings", direction: "pointing-down" }
    }
];

// Tutorial Functions
function startTutorial() {
    if (isTutorialActive) return;
    
    isTutorialActive = true;
    currentTutorialStep = 0;
    
    // Stop any running game
    stopTimer();
    
    // Show tutorial elements
    const backdrop = document.getElementById('tutorialBackdrop');
    const overlayElements = document.getElementById('tutorialOverlayElements');
    const popup = document.getElementById('tutorialPopup');
    
    if (backdrop) backdrop.style.display = 'block';
    if (overlayElements) overlayElements.style.display = 'block';
    if (popup) popup.style.display = 'block';
    
    updateTutorialStep();
}

function nextTutorialStep() {
    if (!isTutorialActive) return;
    
    currentTutorialStep++;
    
    if (currentTutorialStep >= tutorialSteps.length) {
        completeTutorial();
        return;
    }
    
    updateTutorialStep();
}

function previousTutorialStep() {
    if (!isTutorialActive) return;
    
    if (currentTutorialStep > 0) {
        currentTutorialStep--;
        updateTutorialStep();
    }
}

function updateTutorialStep() {
    if (!isTutorialActive) return;
    
    const step = tutorialSteps[currentTutorialStep];
    const popup = document.getElementById('tutorialPopup');
    const arrow = document.getElementById('tutorialArrow');
    const backBtn = document.getElementById('backBtn');
    
    if (!popup) return;
    
    // Update content
    const currentStepSpan = document.getElementById('currentStep');
    const titleElement = document.getElementById('tutorialTitle');
    const textElement = document.getElementById('tutorialText');
    
    if (currentStepSpan) currentStepSpan.textContent = currentTutorialStep + 1;
    if (titleElement) titleElement.textContent = step.title;
    
    // Special handling for step 6 (game modes) - use HTML
    if (currentTutorialStep === 5 && textElement) {
        // Make popup bigger for step 6 - responsive sizing
        const isSmallMobile = window.innerWidth < 400;
        const isMobile = window.innerWidth <= 480;
        const isRegularTablet = window.innerWidth > 480 && window.innerWidth <= 768;
        const isIpadPro = window.innerWidth > 768 && window.innerWidth <= 1024;
        const isLargeTablet = window.innerWidth > 1024 && window.innerWidth <= 1366;
        
        if (isSmallMobile) {
            // Under 400px - mer yta nertill
            popup.style.maxWidth = '';
            popup.style.width = '';
            popup.style.maxHeight = '80vh';
            popup.style.minHeight = '75vh';
        } else if (isMobile) {
            // Mobile 400-480px - 100% bredd som andra steps
            popup.style.maxWidth = '';
            popup.style.width = '';
            popup.style.maxHeight = '70vh';
            popup.style.minHeight = '65vh';
        } else if (isRegularTablet) {
            // Regular tablets och iPad Air - mer yta nertill
            const isIpadAir = (window.innerWidth >= 790 && window.innerWidth <= 870) || 
                             (window.innerHeight >= 790 && window.innerHeight <= 870 && window.innerWidth >= 1150);
            if (isIpadAir) {
                popup.style.maxWidth = '450px';
                popup.style.width = '450px';
                popup.style.maxHeight = '70vh';
                popup.style.minHeight = '65vh';
            } else {
                popup.style.maxWidth = '450px';
                popup.style.width = '450px';
                popup.style.maxHeight = '60vh';
                popup.style.minHeight = '55vh';
            }
        } else if (isIpadPro) {
            // iPad Pro - betydligt mindre yta
            popup.style.maxWidth = '400px';
            popup.style.width = '400px';
            popup.style.maxHeight = '45vh';
            popup.style.minHeight = '40vh';
        } else if (isLargeTablet) {
            // Large tablets/small laptops
            popup.style.maxWidth = '450px';
            popup.style.width = '450px';
            popup.style.maxHeight = '50vh';
            popup.style.minHeight = '45vh';
        } else {
            // Desktop
            popup.style.maxWidth = '500px';
            popup.style.width = '500px';
            popup.style.maxHeight = '65vh';
            popup.style.minHeight = '60vh';
        }
        popup.style.height = 'auto';
        
        // Adjust sizes for tablets
        const iconSize = isRegularTablet || isIpadPro ? '28px' : '24px';
        const emojiSize = isRegularTablet || isIpadPro ? '1.6rem' : '1.4rem';
        const nameSize = isRegularTablet || isIpadPro ? '0.85rem' : '0.75rem';
        const descSize = isRegularTablet || isIpadPro ? '0.75rem' : '0.7rem';
        
        textElement.innerHTML = `
            <p style="margin: 0 0 1rem 0; color: #f5f5dc; font-size: 0.9rem;">Explore different game modes and challenges:</p>
            <div class="tutorial-game-modes" style="display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: repeat(3, 1fr); gap: 0.8rem; margin: 1rem 0; width: 100%;">
                <div class="tutorial-mode-item" style="background: rgba(52, 73, 94, 0.4); border: 2px solid #85a0bc; border-radius: 10px; padding: 0.8rem; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 70px; box-sizing: border-box;">
                    <div class="tutorial-mode-icon" style="margin-bottom: 0.4rem; display: flex; align-items: center; justify-content: center; height: 30px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="#FFD700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                            <line x1="8" y1="21" x2="16" y2="21"></line>
                            <line x1="12" y1="17" x2="12" y2="21"></line>
                        </svg>
                    </div>
                    <div class="tutorial-mode-name" style="color: #FFD700; font-size: ${nameSize}; font-weight: 800; margin-bottom: 0.3rem; text-transform: uppercase; letter-spacing: 0.5px;">Classic</div>
                    <div class="tutorial-mode-desc" style="color: #ecf0f1; font-size: ${descSize}; font-weight: 500;">Solo standard</div>
                </div>
                <div class="tutorial-mode-item" style="background: rgba(52, 73, 94, 0.4); border: 2px solid #85a0bc; border-radius: 10px; padding: 0.8rem; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 70px; box-sizing: border-box;">
                    <div class="tutorial-mode-icon" style="margin-bottom: 0.4rem; display: flex; align-items: center; justify-content: center; height: 24px;">
                        <span style="color: #FFD700; font-size: ${emojiSize}; font-weight: bold; line-height: 1;">∞</span>
                    </div>
                    <div class="tutorial-mode-name" style="color: #FFD700; font-size: ${nameSize}; font-weight: 800; margin-bottom: 0.3rem; text-transform: uppercase; letter-spacing: 0.5px;">Infinite</div>
                    <div class="tutorial-mode-desc" style="color: #ecf0f1; font-size: ${descSize}; font-weight: 500;">Endless cards</div>
                </div>
                <div class="tutorial-mode-item" style="background: rgba(52, 73, 94, 0.4); border: 2px solid #85a0bc; border-radius: 10px; padding: 0.8rem; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 70px; box-sizing: border-box;">
                    <div class="tutorial-mode-icon" style="margin-bottom: 0.4rem; display: flex; align-items: center; justify-content: center; height: 24px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="#FFD700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12,6 12,12 16,14"></polyline>
                        </svg>
                    </div>
                    <div class="tutorial-mode-name" style="color: #FFD700; font-size: ${nameSize}; font-weight: 800; margin-bottom: 0.3rem; text-transform: uppercase; letter-spacing: 0.5px;">Panic</div>
                    <div class="tutorial-mode-desc" style="color: #ecf0f1; font-size: ${descSize}; font-weight: 500;">Time pressure</div>
                </div>
                <div class="tutorial-mode-item" style="background: rgba(52, 73, 94, 0.4); border: 2px solid #85a0bc; border-radius: 10px; padding: 0.8rem; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 70px; box-sizing: border-box;">
                    <div class="tutorial-mode-icon" style="margin-bottom: 0.4rem; display: flex; align-items: center; justify-content: center; height: 24px;">
                        <span style="color: #FFD700; font-size: ${emojiSize}; font-weight: bold; line-height: 1;">💀</span>
                    </div>
                    <div class="tutorial-mode-name" style="color: #FFD700; font-size: ${nameSize}; font-weight: 800; margin-bottom: 0.3rem; text-transform: uppercase; letter-spacing: 0.5px;">No Mercy</div>
                    <div class="tutorial-mode-desc" style="color: #ecf0f1; font-size: ${descSize}; font-weight: 500;">Hardcore mode</div>
                </div>
                <div class="tutorial-mode-item" style="background: rgba(52, 73, 94, 0.4); border: 2px solid #85a0bc; border-radius: 10px; padding: 0.8rem; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 70px; box-sizing: border-box;">
                    <div class="tutorial-mode-icon" style="margin-bottom: 0.4rem; display: flex; align-items: center; justify-content: center; height: 24px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="#FFD700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                    </div>
                    <div class="tutorial-mode-name" style="color: #FFD700; font-size: ${nameSize}; font-weight: 800; margin-bottom: 0.3rem; text-transform: uppercase; letter-spacing: 0.5px;">2 Player</div>
                    <div class="tutorial-mode-desc" style="color: #ecf0f1; font-size: ${descSize}; font-weight: 500;">Offline play</div>
                </div>
                <div class="tutorial-mode-item" style="background: rgba(52, 73, 94, 0.4); border: 2px solid #85a0bc; border-radius: 10px; padding: 0.8rem; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 70px; box-sizing: border-box;">
                    <div class="tutorial-mode-icon" style="margin-bottom: 0.4rem; display: flex; align-items: center; justify-content: center; height: 24px;">
                        <span style="color: #FFD700; font-size: ${emojiSize}; font-weight: bold; line-height: 1;">⚔️</span>
                    </div>
                    <div class="tutorial-mode-name" style="color: #FFD700; font-size: ${nameSize}; font-weight: 800; margin-bottom: 0.3rem; text-transform: uppercase; letter-spacing: 0.5px;">Battle Royale</div>
                    <div class="tutorial-mode-desc" style="color: #ecf0f1; font-size: ${descSize}; font-weight: 500;">3 lives each</div>
                </div>
            </div>
        `;
    } else if (textElement) {
        // Reset popup size for other steps
        popup.style.maxWidth = '';
        popup.style.width = '';
        popup.style.maxHeight = '';
        popup.style.minHeight = '';
        popup.style.height = '';
        
        textElement.textContent = step.text;
    }
    
    // Show/hide back button
    if (backBtn) {
        backBtn.style.display = currentTutorialStep > 0 ? 'block' : 'none';
    }
    
    // Change Next button text for last step
    const nextBtn = document.querySelector('#tutorialPopup .tutorial-btn:not(.back)');
    if (nextBtn) {
        if (currentTutorialStep === tutorialSteps.length - 1) {
            nextBtn.textContent = "Let's Go!";
            nextBtn.style.background = '#f1c40f';
            nextBtn.style.color = '#2c3e50';
            nextBtn.style.fontWeight = 'bold';
        } else {
            nextBtn.textContent = "Next";
            nextBtn.style.background = '#2980b9';
            nextBtn.style.color = 'white';
            nextBtn.style.fontWeight = 'bold';
        }
    }
    
    // Update popup position
    popup.className = `tutorial-popup ${step.position}`;
    
    // Handle special case for step 4 (lost pile)
    const card1 = document.querySelector('[data-idx="1"]');
    if (card1) {
        if (currentTutorialStep === 3) {
            card1.classList.add('lost');
            card1.classList.remove('red');
            card1.innerHTML = `
                <div class="top-left">7♥</div>
                <div class="bottom-right">7♥</div>
                <div class="lost-card">3♦</div>
            `;
        } else {
            card1.classList.remove('lost');
            card1.classList.add('red');
            card1.innerHTML = `
                <div class="top-left">7♥</div>
                <div class="bottom-right">7♥</div>
                ${(currentTutorialStep === 1 || currentTutorialStep === 2) ? 
                  '<div class="buttons"><button class="up">▲</button><button class="down">▼</button></div>' : ''}
            `;
        }
    }
    
    // Hide all overlay elements first
    hideAllTutorialOverlayElements();
    
    // Show appropriate overlay element with delay
    setTimeout(() => {
        if (step.highlight) {
            switch (step.highlight) {
                case 'card-1':
                    showTutorialOverlayCard();
                    break;
                case 'buttons':
                    showTutorialOverlayCardWithButtons();
                    break;
                case 'score':
                    showTutorialOverlayScore();
                    break;
                case 'settings':
                    showTutorialOverlaySettings();
                    break;
            }
        }
        
        // Position and show arrow
        if (step.arrow && arrow) {
            positionTutorialArrow(step.arrow.target, step.arrow.direction);
            arrow.style.display = 'block';
        } else if (arrow) {
            arrow.style.display = 'none';
        }
    }, 100);
}

function hideAllTutorialOverlayElements() {
    const overlayCard = document.getElementById('tutorialOverlayCard');
    const overlayScore = document.getElementById('tutorialOverlayScore');
    const overlaySettings = document.getElementById('tutorialOverlaySettings');
    const originalSettings = document.getElementById('settingsButton');
    const arrow = document.getElementById('tutorialArrow');
    
    if (overlayCard) overlayCard.style.display = 'none';
    if (overlayScore) overlayScore.style.display = 'none';
    if (overlaySettings) overlaySettings.style.display = 'none';
    if (arrow) arrow.style.display = 'none';
    
    // Show the original settings button
    if (originalSettings) originalSettings.style.display = 'flex';
}

function showTutorialOverlayCard() {
    const overlayCard = document.getElementById('tutorialOverlayCard');
    const originalCard = document.querySelector('[data-idx="1"]');
    if (!originalCard || !overlayCard) return;
    
    const rect = originalCard.getBoundingClientRect();
    overlayCard.style.left = rect.left + 'px';
    overlayCard.style.top = rect.top + 'px';
    overlayCard.style.display = 'flex';
    
    if (currentTutorialStep === 3) {
        // Force lost styling with VERY strong glow that overrides everything
        overlayCard.classList.add('lost', 'lost-glow');
        overlayCard.style.backgroundColor = '#222 !important';
        overlayCard.style.boxShadow = '0 0 40px 15px #FFD700, 0 0 80px 25px rgba(255, 215, 0, 0.8) !important';
        overlayCard.style.animation = 'glow 2s ease-in-out infinite !important';
        overlayCard.style.border = '3px solid #FFD700';
        overlayCard.innerHTML = `
            <div class="top-left" style="color: #888 !important;">7♥</div>
            <div class="bottom-right" style="color: #888 !important;">7♥</div>
            <div class="lost-card" style="color: #888 !important; font-weight: 900; font-size: 3rem; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 2;">3♦</div>
        `;
    } else {
        overlayCard.classList.remove('lost', 'lost-glow');
        overlayCard.style.backgroundColor = '';
        overlayCard.style.boxShadow = '';
        overlayCard.style.animation = '';
        overlayCard.style.border = '';
        overlayCard.innerHTML = `
            <div class="top-left">7♥</div>
            <div class="bottom-right">7♥</div>
        `;
    }
}

function showTutorialOverlayCardWithButtons() {
    const overlayCard = document.getElementById('tutorialOverlayCard');
    const originalCard = document.querySelector('[data-idx="1"]');
    if (!originalCard || !overlayCard) return;
    
    const rect = originalCard.getBoundingClientRect();
    overlayCard.style.left = rect.left + 'px';
    overlayCard.style.top = rect.top + 'px';
    overlayCard.style.display = 'flex';
    overlayCard.classList.remove('lost');
    
    overlayCard.innerHTML = `
        <div class="top-left">7♥</div>
        <div class="bottom-right">7♥</div>
        <div class="buttons tutorial-pulse-buttons" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); display: flex !important; flex-direction: column; gap: 6px; z-index: 10;">
            <button class="up" style="border: none; width: 40px; height: 40px; border-radius: 50%; background-color: #2c3e50; color: #f5f5dc; font-size: 20px; cursor: pointer; display: flex !important; justify-content: center; align-items: center; animation: pulse-button 1.2s ease-in-out infinite;">▲</button>
            <button class="down" style="border: none; width: 40px; height: 40px; border-radius: 50%; background-color: #2c3e50; color: #f5f5dc; font-size: 20px; cursor: pointer; display: flex !important; justify-content: center; align-items: center; animation: pulse-button 1.2s ease-in-out infinite;">▼</button>
        </div>
    `;
}

function showTutorialOverlayScore() {
    const overlayScore = document.getElementById('tutorialOverlayScore');
    const originalScore = document.getElementById('score');
    if (!originalScore || !overlayScore) return;
    
    const rect = originalScore.getBoundingClientRect();
    overlayScore.style.left = rect.left + 'px';
    overlayScore.style.top = rect.top + 'px';
    overlayScore.style.display = 'block';
}

function showTutorialOverlaySettings() {
    const overlaySettings = document.getElementById('tutorialOverlaySettings');
    const originalSettings = document.getElementById('settingsButton');
    if (!originalSettings || !overlaySettings) return;
    
    // Hide the original settings button
    originalSettings.style.display = 'none';
    
    // Force position to bottom center like the original settings button
    overlaySettings.style.position = 'fixed';
    overlaySettings.style.bottom = '20px';
    overlaySettings.style.left = '50%';
    overlaySettings.style.top = 'auto';
    overlaySettings.style.right = 'auto';
    overlaySettings.style.transform = 'translateX(-50%)';
    overlaySettings.style.zIndex = '600';
    overlaySettings.style.display = 'flex';
}

function positionTutorialArrow(target, direction) {
    const arrow = document.getElementById('tutorialArrow');
    if (!arrow) return;
    
    // Force show arrow on mobile by removing CSS classes and setting inline styles
    arrow.removeAttribute('class');
    arrow.className = '';
    
    let targetElement;
    
    if (target === 'card-1') {
        const overlayCard = document.getElementById('tutorialOverlayCard');
        targetElement = (overlayCard && overlayCard.style.display !== 'none') 
            ? overlayCard
            : document.querySelector('[data-idx="1"]');
    } else if (target === 'buttons') {
        const overlayButtons = document.getElementById('tutorialOverlayButtons');
        targetElement = overlayButtons 
            ? overlayButtons
            : document.querySelector('[data-idx="1"] .buttons');
    } else if (target === 'score') {
        const overlayScore = document.getElementById('tutorialOverlayScore');
        targetElement = (overlayScore && overlayScore.style.display !== 'none')
            ? overlayScore
            : document.getElementById('score');
    } else if (target === 'settings') {
        const overlaySettings = document.getElementById('tutorialOverlaySettings');
        targetElement = (overlaySettings && overlaySettings.style.display !== 'none')
            ? overlaySettings
            : document.getElementById('settingsButton');
    }
    
    if (!targetElement) return;
    
    const rect = targetElement.getBoundingClientRect();
    
    let arrowX = rect.left + rect.width / 2 - 18;
    let arrowY;
    
    switch (direction) {
        case 'pointing-down':
            arrowY = rect.top - 35;
            arrow.innerHTML = '<div style="width: 0; height: 0; border-left: 18px solid transparent; border-right: 18px solid transparent; border-top: 22px solid #FFD700;"></div>';
            break;
        case 'pointing-up':
            arrowY = rect.bottom + 15;
            arrow.innerHTML = '<div style="width: 0; height: 0; border-left: 18px solid transparent; border-right: 18px solid transparent; border-bottom: 22px solid #FFD700;"></div>';
            break;
    }
    
    // Force all styles inline to override CSS
    arrow.style.cssText = `
        position: fixed;
        left: ${arrowX}px;
        top: ${arrowY}px;
        transform: none;
        z-index: 1000;
        display: block;
        visibility: visible;
        opacity: 1;
        animation: bounce 2s infinite;
        filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
    `;
}

function completeTutorial() {
    const backdrop = document.getElementById('tutorialBackdrop');
    const overlayElements = document.getElementById('tutorialOverlayElements');
    const popup = document.getElementById('tutorialPopup');
    const arrow = document.getElementById('tutorialArrow');
    
    if (backdrop) backdrop.style.display = 'none';
    if (overlayElements) overlayElements.style.display = 'none';
    if (popup) popup.style.display = 'none';
    if (arrow) arrow.style.display = 'none';
    
    hideAllTutorialOverlayElements();
    
    isTutorialActive = false;
    localStorage.setItem('tutorialCompleted', 'true');
    
    // Start a fresh game immediately without popup
    startGame();
}

// Original Game Variables
let isVibrationEnabled = false;

// Läs inställningar från localStorage vid start
function loadSettings() {
  // Lazy Mode
  const savedLazyMode = localStorage.getItem('lazyModeEnabled');
  if (savedLazyMode === 'true') {
    isShowAllButtonsMode = true;
    const lazyModeToggle = document.getElementById('lazyModeToggle');
    if (lazyModeToggle) {
      lazyModeToggle.checked = true;
    }
    const showAllButtonsBtn = document.getElementById('showAllButtons');
    if (showAllButtonsBtn) {
      showAllButtonsBtn.classList.add('active');
    }
  }

  // Dark Mode
  const savedDarkMode = localStorage.getItem('darkModeEnabled');
  if (savedDarkMode === 'true') {
    document.body.classList.add('dark-mode');
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
      darkModeToggle.checked = true;
    }
    const darkModeBtn = document.getElementById('darkModeButton');
    if (darkModeBtn) {
      darkModeBtn.classList.add('active');
    }
  }

  // Vibration
  const savedVibration = localStorage.getItem('vibrationEnabled');
  if (savedVibration === 'true') {
    isVibrationEnabled = true;
    const vibrationToggle = document.getElementById('vibrationToggle');
    if (vibrationToggle) {
      vibrationToggle.checked = true;
    }
  }

  // High Contrast Mode
  const savedHighContrast = localStorage.getItem('highContrastEnabled');
  if (savedHighContrast === 'true') {
    document.body.classList.add('high-contrast');
    const highContrastToggle = document.getElementById('highContrastToggle');
    if (highContrastToggle) {
      highContrastToggle.checked = true;
    }
  }
}

// Vibrationsfunktion - Förbättrad för PWA
function triggerVibration(pattern = [100]) {
  console.log('Vibration attempt:', { 
    isVibrationEnabled, 
    hasVibrate: 'vibrate' in navigator, 
    hasWebkitVibrate: 'webkitVibrate' in navigator,
    pattern,
    userAgent: navigator.userAgent,
    isPWA: window.matchMedia('(display-mode: standalone)').matches
  });
  
  if (!isVibrationEnabled) {
    console.log('Vibration disabled in settings');
    return;
  }
  
  // Kontrollera om vi är i PWA-läge
  const isPWA = window.matchMedia('(display-mode: standalone)').matches || 
                window.navigator.standalone === true ||
                document.referrer.includes('android-app://');
  
  console.log('PWA mode detected:', isPWA);
  
  // Kontrollera stöd för vibration
  const hasVibrate = 'vibrate' in navigator;
  const hasWebkitVibrate = 'webkitVibrate' in navigator;
  
  if (!hasVibrate && !hasWebkitVibrate) {
    console.log('Vibration not supported on this device/browser');
    console.log('Available vibration methods:', {
      vibrate: hasVibrate,
      webkitVibrate: hasWebkitVibrate,
      navigator: Object.keys(navigator).filter(key => key.includes('vibrat'))
    });
    return;
  }
  
  try {
    // Försök standard vibration först
    if (hasVibrate) {
      const result = navigator.vibrate(pattern);
      console.log('Standard vibration result:', result);
      if (result) {
        console.log('Vibration triggered successfully with standard API');
        return;
      }
    }
    
    // Fallback till webkit vibration
    if (hasWebkitVibrate) {
      const result = navigator.webkitVibrate(pattern);
      console.log('Webkit vibration result:', result);
      if (result) {
        console.log('Vibration triggered successfully with webkit API');
        return;
      }
    }
    
    console.log('No vibration method returned true');
    
  } catch (error) {
    console.log('Vibration error:', error);
    console.log('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
  }
}

// Debug funktion för att testa vibration
function testVibration() {
  console.log('Testing vibration...');
  console.log('isVibrationEnabled:', isVibrationEnabled);
  console.log('navigator.vibrate available:', 'vibrate' in navigator);
  console.log('User agent:', navigator.userAgent);
  
  // Test olika vibration patterns
  triggerVibration([100]);
  setTimeout(() => triggerVibration([50, 50, 50]), 200);
  setTimeout(() => triggerVibration([200]), 500);
}

// Exponera test-funktioner globalt för debugging
window.testVibration = testVibration;

// Test funktion för uppdateringar
window.testUpdate = function() {
  console.log('Testing update notification...');
  const installer = new PWAInstaller();
  installer.showUpdateNotification();
};

// Test funktion för install-knapp
window.testInstallButton = function() {
  console.log('Testing install button...');
  const installer = new PWAInstaller();
  installer.isInstalled = false; // Force show button
  installer.showInstallButton();
};

// Återställ dold install-knapp
window.resetInstallButton = function() {
  console.log('Resetting install button visibility...');
  localStorage.removeItem('pwa-install-hidden');
  console.log('Install button will show again on next page load');
  // Visa knappen direkt också
  const installer = new PWAInstaller();
  installer.isInstalled = false;
  installer.showInstallButton();
};

// Test funktion för splash screen
window.testSplash = function() {
  console.log('Testing splash screen...');
  showSplashScreen();
};

// Kontrollera vibration-stöd vid sidladdning
function checkVibrationSupport() {
  console.log('=== VIBRATION SUPPORT CHECK ===');
  console.log('User Agent:', navigator.userAgent);
  console.log('PWA Mode:', window.matchMedia('(display-mode: standalone)').matches);
  console.log('Standalone:', window.navigator.standalone);
  console.log('Referrer:', document.referrer);
  
  const hasVibrate = 'vibrate' in navigator;
  const hasWebkitVibrate = 'webkitVibrate' in navigator;
  
  console.log('Vibration Support:', {
    standard: hasVibrate,
    webkit: hasWebkitVibrate,
    supported: hasVibrate || hasWebkitVibrate
  });
  
  if (!hasVibrate && !hasWebkitVibrate) {
    console.warn('⚠️ Vibration API not supported on this device/browser');
    console.log('This might be because:');
    console.log('1. Device doesn\'t support vibration');
    console.log('2. Browser doesn\'t support Vibration API');
    console.log('3. Running in non-secure context (HTTP instead of HTTPS)');
    console.log('4. PWA restrictions');
  } else {
    console.log('✅ Vibration API is supported');
  }
  
  return hasVibrate || hasWebkitVibrate;
}

// Kör kontrollen vid sidladdning
document.addEventListener('DOMContentLoaded', checkVibrationSupport);

// Splash Screen with Scale Animation
function showSplashScreen() {
  // Check if running as PWA - if so, don't show custom splash screen
  const isPWA = window.matchMedia('(display-mode: standalone)').matches || 
                window.navigator.standalone === true ||
                document.referrer.includes('android-app://');
  
  if (isPWA) {
    console.log('Running as PWA, hiding custom splash screen');
    const splash = document.getElementById('splash-screen');
    if (splash) {
      splash.style.display = 'none';
    }
    return;
  }
  
  const splash = document.getElementById('splash-screen');
  const logo = document.getElementById('splash-logo');
  
  if (splash && logo) {
    // Set initial state - logo starts at 80%
    logo.style.transform = 'scale(0.8)';
    
    // Force reflow
    logo.offsetHeight;
    
    // Scale up logo (80% to 100%) after brief delay
    setTimeout(() => {
      logo.classList.add('scale-up');
    }, 50);
    
    // Fade out logo after 0.3 seconds
    setTimeout(() => {
      logo.classList.add('fade-out');
    }, 300);
    
    // Hide splash screen after 0.8 seconds (0.3s scale + 0.5s fade)
    setTimeout(() => {
      splash.style.display = 'none';
    }, 800);
  }
}

// Show splash screen when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', showSplashScreen);
} else {
  showSplashScreen();
}

const suits = ['♠', '♥', '♦', '♣'];
const suitColors = { '♠': 'black', '♣': 'black', '♥': 'red', '♦': 'red' };
const ranks = [
  { name: 'A', value: 14 }, { name: 'K', value: 13 },
  { name: 'Q', value: 12 }, { name: 'J', value: 11 },
  { name: '10', value: 10 }, { name: '9', value: 9 },
  { name: '8', value: 8 }, { name: '7', value: 7 },
  { name: '6', value: 6 }, { name: '5', value: 5 },
  { name: '4', value: 4 }, { name: '3', value: 3 },
  { name: '2', value: 2 },
];

let gameStartTime = null;
let timerInterval = null;
let isGameStarted = false;
let speedModeTimer = null;
let speedModeStartTime = null;
let speedModeTimeLeft = 12;
let speedModeErrors = 0;
let speedModeVibrationStarted = false;
let panicModeTime = 12; // Default 12 sekunder, kan justeras av användaren
let panicModeFinalTime = 0; // Sparar tiden för Panic Mode när spelet slutar
let isPanicModeTimeout = false; // Flagga för om Panic Mode slutade på timeout
let currentStreak = 0;
let bestStreak = 0;
let activePileCount = 9;
let lastGameTimestamp = null;
let madeHighscore = false;
let madeTop3 = false;
let deck = [];
let grid = [];
let selectedPileIndex = null;
let score = 0;
let isUnlimitedMode = false;
let isShowAllButtonsMode = false;
let isNoMercyMode = false;
let isSpeedMode = false;
let currentHighscoreMode = 'classic';

const cardGrid = document.getElementById('cardGrid');
const scoreDiv = document.querySelector('#score .value');
const gameModeDiv = document.querySelector('#gameMode .value');
const deckCounter = document.querySelector('#deckCounter .value');
const restartButton = document.getElementById('restartButton');
const darkModeButton = document.getElementById('darkModeButton');
const showAllButtons = document.getElementById('showAllButtons');
const settingsButton = document.getElementById('settingsButton');
const winOverlay = document.getElementById('winOverlay');
const gameOverOverlay = document.getElementById('gameOverOverlay');

// Använd det riktiga JSConfetti biblioteket
const jsConfetti = new JSConfetti();

const winPhrases = [
  { title: "You're a Winner!", subtitle: "Finally, a victory you can tell your family about." },
  { title: "You've Done It!", subtitle: "Did you just cheat? No, you're just that good." },
  { title: "Victory!", subtitle: "Your enemy is probably crying right now. Good." },
  { title: "Champion!", subtitle: "Your brain cells are thanking you for that workout." },
  { title: "Unbelievable!", subtitle: "The cards feared your unmatched skill." },
  { title: "Absolute Legend!", subtitle: "Someone call the newspapers, this is history." },
  { title: "Flawless Victory!", subtitle: "Wait, was that a bug or were you just that lucky?" },
  { title: "The Stars Aligned!", subtitle: "And you were there to seize the moment, you magnificent human." },
  { title: "You've Conquered the Deck!", subtitle: "Now go conquer the world, or at least get a snack." },
  { title: "Winner, Winner!", subtitle: "Chicken dinner! (Is that still a thing? Who cares, you won!)" }
];

const losePhrases = [
  { title: "You lost!", subtitle: "The cards are laughing at you now." },
  { title: "Game Over!", subtitle: "Maybe card games aren't your thing?" },
  { title: "Better luck next time!", subtitle: "You'll need it." },
  { title: "A dramatic failure.", subtitle: "Even the other cards were embarrassed." },
  { title: "You got schooled.", subtitle: "By a deck of cards. Ouch." },
  { title: "Not even close!", subtitle: "But thanks for playing anyway." },
  { title: "The deck won.", subtitle: "As it always does." },
  { title: "An epic defeat!", subtitle: "Are you sure you understood the rules?" },
  { title: "You fumbled at the finish line.", subtitle: "And fell flat on your face." },
  { title: "Total wipeout!", subtitle: "Your score has been sent to the shadow realm." }
];

function createDeck() {
  const deck = [];
  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push({
        suit,
        rank: rank.name,
        value: rank.value,
        color: suitColors[suit],
      });
    }
  }
  return deck;
}

function createRandomCard() {
  // In 2P Panic mode, use shared deck like Classic 2P
  if (isTwoPlayerMode && twoPlayerState.gameMode === 'panic' && twoPlayerState.sharedDeck && twoPlayerState.sharedDeck.length > 0) {
    return twoPlayerState.sharedDeck.pop();
  }
  
  // In 2P No Mercy mode, use shared deck for identical card sequence
  if (isTwoPlayerMode && twoPlayerState.gameMode === 'noMercy' && twoPlayerState.sharedDeck && twoPlayerState.sharedDeck.length > 0) {
    return twoPlayerState.sharedDeck.pop();
  }
  
  // Standard random card generation for regular panic/no mercy mode
  const randomSuit = suits[Math.floor(Math.random() * suits.length)];
  const randomRank = ranks[Math.floor(Math.random() * ranks.length)];
  return {
    suit: randomSuit,
    rank: randomRank.name,
    value: randomRank.value,
    color: suitColors[randomSuit],
  };
}

function startTimer() {
  if (!isGameStarted) {
    gameStartTime = Date.now();
    isGameStarted = true;
    timerInterval = setInterval(updateTimer, 1000);
  }
}

const speedTimerBar = document.getElementById('speedTimerBar');

function startSpeedModeTimer() {
  if (!isSpeedMode) return;
  speedModeStartTime = Date.now();
  speedModeTimeLeft = panicModeTime; // Använd den valda tiden
  speedModeVibrationStarted = false;
  
  // Visa och aktivera speed timer bar
  speedTimerBar.classList.add('active');
  speedTimerBar.style.width = '100%';
  
  speedModeTimer = setInterval(() => {
    const elapsed = Math.floor((Date.now() - speedModeStartTime) / 1000);
    speedModeTimeLeft = Math.max(0, panicModeTime - elapsed); // Använd den valda tiden
    
    // Uppdatera progress bar
    const percentage = (speedModeTimeLeft / panicModeTime) * 100; // Använd den valda tiden
    speedTimerBar.style.width = `${percentage}%`;
    
    const timerDiv = document.querySelector('#timer .value');
    if (timerDiv) {
      timerDiv.textContent = `${speedModeTimeLeft}s`;
    }
    
    // Vibrera när det är 2 sekunder kvar
    if (speedModeTimeLeft <= 2 && !speedModeVibrationStarted) {
      speedModeVibrationStarted = true;
      if (isVibrationEnabled) {
        // Kontinuerlig vibration de sista 2 sekunderna
        const vibrationInterval = setInterval(() => {
          if (speedModeTimeLeft > 0) {
            triggerVibration([50]);
          } else {
            clearInterval(vibrationInterval);
          }
        }, 200);
      }
    }
    
    if (speedModeTimeLeft <= 0) {
      clearInterval(speedModeTimer);
      speedModeTimer = null;
      // Dölj speed timer bar
      speedTimerBar.classList.remove('active');
      isPanicModeTimeout = true; // Sätt flaggan för timeout
      checkGameOver();
    }
  }, 100);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  if (speedModeTimer) {
    clearInterval(speedModeTimer);
    speedModeTimer = null;
    // Dölj speed timer bar när timer stoppas
    speedTimerBar.classList.remove('active');
  }
}

function resetTimer() {
  stopTimer();
  isGameStarted = false;
  gameStartTime = null;
  speedModeStartTime = null;
  speedModeTimeLeft = panicModeTime; // Använd den valda tiden
  panicModeFinalTime = 0; // Återställ Panic Mode final time
  isPanicModeTimeout = false; // Återställ timeout flaggan
  const timerDiv = document.querySelector('#timer .value');
  if (timerDiv) {
    if (isSpeedMode) {
      timerDiv.textContent = `${panicModeTime}s`; // Använd den valda tiden
    } else {
      timerDiv.textContent = '00:00';
    }
  }
}

function updateTimer() {
  if (isSpeedMode) return;
  if (gameStartTime) {
    const currentTime = Date.now();
    const elapsedTime = currentTime - gameStartTime;
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const timerDiv = document.querySelector('#timer .value');
    if (timerDiv) {
      timerDiv.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  }
}

function getFinalTime() {
  console.log('🚨🚨🚨 getFinalTime FUNCTION CALLED! 🚨🚨🚨');
  console.log('=== getFinalTime called ===');
  console.log('isSpeedMode:', isSpeedMode);
  console.log('panicModeFinalTime:', panicModeFinalTime);
  console.log('speedModeStartTime:', speedModeStartTime);
  console.log('gameStartTime:', gameStartTime);
  console.log('panicModeFinalTime type:', typeof panicModeFinalTime);
  console.log('panicModeFinalTime > 0:', panicModeFinalTime > 0);
  
  if (isSpeedMode) {
    console.log('✅ isSpeedMode is true, checking panicModeFinalTime');
    // Använd den sparade tiden för Panic Mode
    if (panicModeFinalTime > 0) {
      console.log('✅ Using panicModeFinalTime:', panicModeFinalTime);
      return `${panicModeFinalTime}s`;
    }
    console.log('❌ panicModeFinalTime is not > 0, value:', panicModeFinalTime);
    // Fallback till speedModeStartTime om den finns
    if (speedModeStartTime) {
      const currentTime = Date.now();
      const elapsedTime = currentTime - speedModeStartTime;
      const totalSeconds = Math.floor(elapsedTime / 1000);
      console.log('⚠️ Using speedModeStartTime fallback:', totalSeconds);
      return `${totalSeconds}s`;
    }
    console.log('❌ No time data available, returning 0s');
    return '0s';
  }
  if (gameStartTime) {
    const currentTime = Date.now();
    const elapsedTime = currentTime - gameStartTime;
    const totalSeconds = Math.floor(elapsedTime / 1000);
    console.log('Using gameStartTime:', totalSeconds);
    return `${totalSeconds}s`;
  }
  console.log('No game time data, returning 0s');
  return '0s';
}

function saveGameStats(score, seconds, won, gameMode, errors = 0) {
  let statsKey;
  if (gameMode === 'speed') {
    statsKey = 'gameStatsSpeed';
  } else if (gameMode === 'infinite') {
    statsKey = 'gameStatsInfinite';
  } else if (gameMode === 'noMercy') {
    statsKey = 'gameStatsNoMercy';
  } else {
    statsKey = 'gameStatsClassic';
  }
  
  const stats = JSON.parse(localStorage.getItem(statsKey) || '{}');
  const today = new Date().toDateString();

  if (!stats.totalGames) {
    stats.totalGames = 0;
    stats.totalWins = 0;
    stats.totalScore = 0;
    stats.totalTime = 0;
    stats.totalErrors = 0;
    stats.perfectRuns = 0;
    stats.quickDeaths = 0;
    stats.lastPlayDate = null;
    stats.dayStreak = 0;
    stats.bestStreak = 0;
    stats.games43Plus = 0;
  }

  stats.totalGames++;
  if (won) stats.totalWins++;
  stats.totalScore += score;
  stats.totalTime += seconds;
  stats.totalErrors += errors;
  
  if (gameMode === 'infinite') {
    if (bestStreak > (stats.bestStreak || 0)) {
      stats.bestStreak = bestStreak;
    }
    if (score >= 43) {
      stats.games43Plus = (stats.games43Plus || 0) + 1;
    }
  }
  
  if (gameMode === 'noMercy' && score >= 10) {
    stats.perfectRuns++;
  }
  
  if (gameMode === 'noMercy' && score === 0) {
    stats.quickDeaths++;
  }

  if (stats.lastPlayDate === today) {
  } else if (stats.lastPlayDate) {
    const lastDate = new Date(stats.lastPlayDate);
    const currentDate = new Date(today);
    const timeDiff = currentDate.getTime() - lastDate.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (dayDiff === 1) {
      stats.dayStreak++;
    } else if (dayDiff > 1) {
      stats.dayStreak = 1;
    }
  } else {
    stats.dayStreak = 1;
  }

  stats.lastPlayDate = today;
  localStorage.setItem(statsKey, JSON.stringify(stats));
}

function getGameStats(gameMode) {
  let statsKey;
  if (gameMode === 'speed') {
    statsKey = 'gameStatsSpeed';
  } else if (gameMode === 'infinite') {
    statsKey = 'gameStatsInfinite';
  } else if (gameMode === 'noMercy') {
    statsKey = 'gameStatsNoMercy';
  } else {
    statsKey = 'gameStatsClassic';
  }
  
  const stats = JSON.parse(localStorage.getItem(statsKey) || '{}');
  
  if (gameMode === 'speed') {
    return {
      totalGames: stats.totalGames || 0,
      totalWins: stats.totalGames > 0 ? (stats.totalScore / stats.totalTime).toFixed(1) : 0,
      winPercentage: stats.totalGames > 0 ? (stats.totalErrors / stats.totalTime).toFixed(2) : 0,
      avgScore: stats.totalGames > 0 ? Math.round(stats.totalScore / stats.totalGames) : 0,
      avgTime: stats.totalGames > 0 ? Math.round(stats.totalTime / stats.totalGames) : 0,
      dayStreak: stats.dayStreak || 0
    };
  }
  
  if (gameMode === 'infinite') {
    return {
      totalGames: stats.totalGames || 0,
      totalWins: stats.games43Plus || 0,
      winPercentage: stats.bestStreak || 0,
      avgScore: stats.totalGames > 0 ? Math.round(stats.totalScore / stats.totalGames) : 0,
      avgTime: stats.totalGames > 0 ? Math.round(stats.totalTime / stats.totalGames) : 0,
      dayStreak: stats.dayStreak || 0
    };
  }
  
  if (gameMode === 'noMercy') {
    return {
      totalGames: stats.totalGames || 0,
      totalWins: (stats.perfectRuns || 0),
      winPercentage: (stats.quickDeaths || 0),
      avgScore: stats.totalGames > 0 ? Math.round(stats.totalScore / stats.totalGames) : 0,
      avgTime: stats.totalGames > 0 ? Math.round(stats.totalTime / stats.totalGames) : 0,
      dayStreak: stats.dayStreak || 0
    };
  }
  
  return {
    totalGames: stats.totalGames || 0,
    totalWins: stats.totalWins || 0,
    winPercentage: stats.totalGames > 0 ? Math.round((stats.totalWins / stats.totalGames) * 100) : 0,
    avgScore: stats.totalGames > 0 ? Math.round(stats.totalScore / stats.totalGames) : 0,
    avgTime: stats.totalGames > 0 ? Math.round(stats.totalTime / stats.totalGames) : 0,
    dayStreak: stats.dayStreak || 0
  };
}

function saveHighscore(score, seconds) {
  let gameMode, highscoreKey, highscoreScore;
  
  if (isSpeedMode) {
    gameMode = 'speed';
    highscoreKey = 'highscoresSpeed';
    highscoreScore = score;
  } else if (isNoMercyMode) {
    gameMode = 'noMercy';
    highscoreKey = 'highscoresNoMercy';
    highscoreScore = score * 3;
  } else if (isUnlimitedMode) {
    gameMode = 'infinite';
    highscoreKey = 'highscoresInfinite';
    highscoreScore = score;
  } else {
    gameMode = 'classic';
    highscoreKey = 'highscoresClassic';
    highscoreScore = score;
  }
  
  const highscores = JSON.parse(localStorage.getItem(highscoreKey) || '[]');
  const newEntry = {
    date: new Date().toLocaleDateString('sv-SE'),
    score: score,
    highscoreScore: highscoreScore,
    seconds: seconds,
    timestamp: Date.now()
  };

  lastGameTimestamp = newEntry.timestamp;
  highscores.push(newEntry);

  if (isSpeedMode) {
    highscores.sort((a, b) => {
      const scoreA = a.highscoreScore || a.score;
      const scoreB = b.highscoreScore || b.score;
      return scoreB - scoreA;
    });
  } else {
    highscores.sort((a, b) => {
      const scoreA = a.highscoreScore || a.score;
      const scoreB = b.highscoreScore || b.score;
      if (scoreA !== scoreB) return scoreB - scoreA;
      return a.seconds - b.seconds;
    });
  }

  const top8 = highscores.slice(0, 8);
  localStorage.setItem(highscoreKey, JSON.stringify(top8));

  const entryIndex = top8.findIndex(entry => entry.timestamp === newEntry.timestamp);
  const isNewRecord = entryIndex !== -1;
  const isTop3 = entryIndex !== -1 && entryIndex < 3 && top8.length >= 5;

  madeHighscore = isNewRecord;
  madeTop3 = isTop3;

  return { isNewRecord, isTop3 };
}

function getHighscores(gameMode) {
  let highscoreKey;
  if (gameMode === 'speed') {
    highscoreKey = 'highscoresSpeed';
  } else if (gameMode === 'infinite') {
    highscoreKey = 'highscoresInfinite';
  } else if (gameMode === 'noMercy') {
    highscoreKey = 'highscoresNoMercy';
  } else {
    highscoreKey = 'highscoresClassic';
  }
  return JSON.parse(localStorage.getItem(highscoreKey) || '[]');
}

function showHighscoreOverlay() {
  const overlay = document.getElementById('highscoreOverlay');
  if (isSpeedMode) {
    currentHighscoreMode = 'speed';
  } else if (isNoMercyMode) {
    currentHighscoreMode = 'noMercy';
  } else if (isUnlimitedMode) {
    currentHighscoreMode = 'infinite';
  } else {
    currentHighscoreMode = 'classic';
  }
  updateHighscoreTabs();
  overlay.style.display = 'flex';
  displayHighscores();
}

function showHighscoreOverlayForMode(gameMode) {
  const overlay = document.getElementById('highscoreOverlay');
  currentHighscoreMode = gameMode;
  updateHighscoreTabs();
  overlay.style.display = 'flex';
  displayHighscores();
}

function updateHighscoreTabs() {
  document.querySelectorAll('.tab-btn').forEach(tab => {
    tab.classList.remove('active');
  });
  const activeTabId = currentHighscoreMode + 'Tab';
  const activeTab = document.getElementById(activeTabId);
  if (activeTab) {
    activeTab.classList.add('active');
  }
}

function displayHighscores() {
  let gameMode;
  if (currentHighscoreMode === 'speed') {
    gameMode = 'speed';
  } else if (currentHighscoreMode === 'noMercy') {
    gameMode = 'noMercy';
  } else if (currentHighscoreMode === 'infinite') {
    gameMode = 'infinite';
  } else {
    gameMode = 'classic';
  }
  
  const highscores = getHighscores(gameMode);
  const stats = getGameStats(gameMode);
  const listElement = document.getElementById('highscoreList');

  document.getElementById('totalGames').textContent = stats.totalGames;
  document.getElementById('totalWins').textContent = stats.totalWins;
  document.getElementById('winPercentage').textContent = stats.winPercentage + (gameMode === 'classic' ? '%' : '');
  document.getElementById('avgScore').textContent = stats.avgScore;
  document.getElementById('avgTime').textContent = stats.avgTime + 's';
  document.getElementById('dayStreak').textContent = stats.dayStreak;

  const totalWinsLabel = document.querySelector('.stat-item:nth-child(3) .stat-label');
  const winPercentageLabel = document.querySelector('.stat-item:nth-child(4) .stat-label');
  
  if (currentHighscoreMode === 'speed') {
    if (totalWinsLabel) totalWinsLabel.textContent = 'Score/s';
    if (winPercentageLabel) winPercentageLabel.textContent = 'Misses/s';
  } else if (currentHighscoreMode === 'infinite') {
    if (totalWinsLabel) totalWinsLabel.textContent = '43+ Games';
    if (winPercentageLabel) winPercentageLabel.textContent = 'Longest Run';
  } else if (currentHighscoreMode === 'noMercy') {
    if (totalWinsLabel) totalWinsLabel.textContent = '10+ Games';
    if (winPercentageLabel) winPercentageLabel.textContent = 'Quick Deaths';
  } else {
    if (totalWinsLabel) totalWinsLabel.textContent = 'Wins';
    if (winPercentageLabel) winPercentageLabel.textContent = 'Win Rate';
  }

  if (highscores.length === 0) {
    listElement.innerHTML = '<div class="empty-state">No scores yet. Play a game to set your first record!</div>';
    return;
  }

  let html = '';
  highscores.forEach((entry, index) => {
    const rank = index + 1;
    const rankEmoji = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '';
    const isNewEntry = lastGameTimestamp && entry.timestamp === lastGameTimestamp;
    const isEvenRow = rank % 2 === 0;

    let rowClass = 'highscore-row';
    if (isNewEntry) {
      rowClass += ' new-entry';
    } else if (isEvenRow) {
      rowClass += ' even-row';
    }

    html += `
    <div class="${rowClass}">
      <div class="col-date">
        <div class="rank-section">
          <span class="rank-number">${rank}.</span>
          <span class="rank-emoji">${rankEmoji}</span>
        </div>
        <span class="date-text">${entry.date}</span>
      </div>
      <div class="col-score">${entry.score}</div>
      <div class="col-time">${entry.seconds}s</div>
    </div>
    `;
  });

  listElement.innerHTML = html;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function animateCorrectGuess(idx) {
  const cardDiv = document.querySelector(`.card[data-idx='${idx}']`);
  if (cardDiv) {
    cardDiv.classList.add('pulse');
    setTimeout(() => {
      cardDiv.classList.remove('pulse');
    }, 100);
  }
}

function startGame() {
  resetTimer();
  speedModeErrors = 0;
  currentStreak = 0;
  bestStreak = 0;
  activePileCount = 9;
  speedModeVibrationStarted = false;
  
  // Use shared deck in 2P mode, otherwise create new deck
  if (isTwoPlayerMode && twoPlayerState.sharedDeck) {
    // Clone the shared deck so both players get the exact same sequence
    deck = [...twoPlayerState.sharedDeck];
    // Start 2P timer
    twoPlayerGameStartTime = Date.now();
  } else {
    deck = createDeck();
    shuffle(deck);
  }
  score = 0;
  selectedPileIndex = null;
  grid = [];
  cardGrid.innerHTML = '';

  for (let i = 0; i < 9; i++) {
    const startCard = (deck.length > 0) ? deck.pop() : createRandomCard();
    grid[i] = [startCard];
    grid[i].lost = false;
    grid[i].lostCard = null;

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.dataset.idx = i;
    cardDiv.innerHTML = `
      <div class="top-left">${startCard.rank}${startCard.suit}</div>
      <div class="bottom-right">${startCard.rank}${startCard.suit}</div>
    `;

    if (startCard.color === 'red') {
      cardDiv.classList.add('red');
    }

    cardGrid.appendChild(cardDiv);
  }

  // Använd sparad lazy mode inställning
  const savedLazyMode = localStorage.getItem('lazyModeEnabled');
  if (savedLazyMode === 'true') {
    isShowAllButtonsMode = true;
  }
  
  showAllButtons.classList.toggle('active', isShowAllButtonsMode);
  updateUI();
}

function updateUI() {
  scoreDiv.textContent = score;
  activePileCount = grid.filter(pile => !pile.lost).length;
  
  if (isSpeedMode) {
    deckCounter.textContent = '∞';
    // Show Panic 2P when in 2P mode, otherwise Panic
    gameModeDiv.textContent = (isTwoPlayerMode && twoPlayerState.gameMode === 'panic') ? 'Panic 2P' : 'Panic';
  } else if (isNoMercyMode) {
    deckCounter.textContent = '∞';
    // Show No Mercy 2P when in 2P mode, otherwise No Mercy
    gameModeDiv.textContent = (isTwoPlayerMode && twoPlayerState.gameMode === 'noMercy') ? 'No Mercy 2P' : 'No Mercy';
  } else if (isUnlimitedMode) {
    deckCounter.textContent = '∞';
    gameModeDiv.textContent = 'Infinite';
  } else {
    deckCounter.textContent = deck.length;
    // Show Classic 2P when in 2P mode, otherwise Classic
    gameModeDiv.textContent = isTwoPlayerMode ? 'Classic 2P' : 'Classic';
  }

  document.querySelectorAll('.card').forEach(card => {
    const idx = parseInt(card.dataset.idx);
    const pile = grid[idx];
    
    // Skip if pile doesn't exist (e.g., during tutorial or before game starts)
    if (!pile) return;
    
    const lost = pile.lost || false;

    card.classList.toggle('selected', selectedPileIndex === idx && !lost);
    card.classList.toggle('lost', lost);

    card.onclick = () => onSelectPile(idx);
  });

  if (isShowAllButtonsMode) {
    renderAllButtons();
  } else {
    renderButtons();
  }
}

function renderAllButtons() {
  document.querySelectorAll('.buttons').forEach(btns => btns.remove());

  grid.forEach((pile, idx) => {
    if (!pile || pile.lost) return;
    
    const selectedCardDiv = document.querySelector(`.card[data-idx='${idx}']`);
    if (!selectedCardDiv) return;

    let btnsDiv = selectedCardDiv.querySelector('.buttons');
    if (!btnsDiv) {
      btnsDiv = document.createElement('div');
      btnsDiv.classList.add('buttons');
      selectedCardDiv.appendChild(btnsDiv);

      const upBtn = document.createElement('button');
      upBtn.classList.add('up');
      upBtn.setAttribute('aria-label', 'Guess Higher');
      upBtn.innerHTML = `<svg viewBox="0 0 24 24"><polygon points="12,6 18,18 6,18" /></svg>`;
      upBtn.onclick = e => {
        e.stopPropagation();
        guess('higher', idx);
      };

      const downBtn = document.createElement('button');
      downBtn.classList.add('down');
      downBtn.setAttribute('aria-label', 'Guess Lower');
      downBtn.innerHTML = `<svg viewBox="0 0 24 24"><polygon points="6,6 18,6 12,18" /></svg>`;
      downBtn.onclick = e => {
        e.stopPropagation();
        guess('lower', idx);
      };

      btnsDiv.appendChild(upBtn);
      btnsDiv.appendChild(downBtn);
    }
  });
}

function toggleShowAllButtons() {
  isShowAllButtonsMode = !isShowAllButtonsMode;
  showAllButtons.classList.toggle('active');

  if (isShowAllButtonsMode) {
    selectedPileIndex = null;
  }

  updateUI();
}

function onSelectPile(idx) {
  // Skip if pile doesn't exist (e.g., during tutorial)
  if (!grid[idx] || grid[idx].lost) return;

  if (isShowAllButtonsMode) {
    return;
  }

  if (selectedPileIndex === idx) {
    selectedPileIndex = null;
  } else {
    selectedPileIndex = idx;
  }

  updateUI();
}

function renderButtons() {
  document.querySelectorAll('.buttons').forEach(btns => btns.remove());

  if (selectedPileIndex === null) return;
  if (!grid[selectedPileIndex] || grid[selectedPileIndex].lost) return;

  const selectedCardDiv = document.querySelector(`.card[data-idx='${selectedPileIndex}']`);
  if (!selectedCardDiv) return;

  const btnsDiv = document.createElement('div');
  btnsDiv.classList.add('buttons');

  const upBtn = document.createElement('button');
  upBtn.classList.add('up');
  upBtn.setAttribute('aria-label', 'Guess Higher');
  upBtn.innerHTML = `<svg viewBox="0 0 24 24"><polygon points="12,6 18,18 6,18" /></svg>`;
  upBtn.onclick = e => {
    e.stopPropagation();
    guess('higher', selectedPileIndex);
  };

  const downBtn = document.createElement('button');
  downBtn.classList.add('down');
  downBtn.setAttribute('aria-label', 'Guess Lower');
  downBtn.innerHTML = `<svg viewBox="0 0 24 24"><polygon points="6,6 18,6 12,18" /></svg>`;
  downBtn.onclick = e => {
    e.stopPropagation();
    guess('lower', selectedPileIndex);
  };

  btnsDiv.appendChild(upBtn);
  btnsDiv.appendChild(downBtn);
  selectedCardDiv.appendChild(btnsDiv);
}

function guess(direction, idx) {
  // Handle Battle Royale mode first
  if (battleRoyaleState.isActive) {
    const result = battleRoyaleGuess(direction, idx);
    if (result) return; // Battle Royale handled the guess
  }
  
  if (isSpeedMode && !speedModeStartTime) {
    startSpeedModeTimer();
  } else if (!isSpeedMode) {
    startTimer();
  }

  if (grid[idx].lost) return;

  let nextCard;
  if (isUnlimitedMode || isNoMercyMode || isSpeedMode) {
    nextCard = createRandomCard();
  } else {
    if (deck.length === 0) return;
    nextCard = deck.pop();
  }

  const pile = grid[idx];
  const topCard = pile[pile.length - 1];

  let correct = false;
  if (nextCard.value === topCard.value) {
    correct = false;
  } else if (direction === 'higher') {
    correct = nextCard.value > topCard.value;
  } else if (direction === 'lower') {
    correct = nextCard.value < topCard.value;
  }

  const cardDiv = document.querySelector(`.card[data-idx='${idx}']`);

  if (correct) {
    pile.push(nextCard);
    score++;
    
    currentStreak++;
    if (currentStreak > bestStreak) {
      bestStreak = currentStreak;
    }

    if (cardDiv) {
      cardDiv.querySelector('.top-left').innerHTML = `${nextCard.rank}${nextCard.suit}`;
      cardDiv.querySelector('.bottom-right').innerHTML = `${nextCard.rank}${nextCard.suit}`;

      if (nextCard.color === 'red') {
        cardDiv.classList.add('red');
      } else {
        cardDiv.classList.remove('red');
      }

      animateCorrectGuess(idx);
    }

    scoreDiv.textContent = score;
    
    if (isSpeedMode) {
      deckCounter.textContent = '∞';
    } else if (isNoMercyMode) {
      deckCounter.textContent = '∞';
    } else if (isUnlimitedMode) {
      deckCounter.textContent = '∞';
    } else {
      deckCounter.textContent = deck.length;
    }

    setTimeout(() => {
      updateUI();
      checkGameOver();
    }, 100);
  } else {
    currentStreak = 0;
    
    // Vibrera vid fel gissning
    triggerVibration([100]);
    
    if (isSpeedMode) {
      speedModeErrors++;
    }
    
    if (isNoMercyMode) {
      pile.lost = true;
      pile.lostCard = nextCard;

      const buttons = cardDiv.querySelector('.buttons');
      if (buttons) buttons.remove();

      cardDiv.classList.add('lost');

      const lostCardDiv = document.createElement('div');
      lostCardDiv.className = 'lost-card';
      lostCardDiv.textContent = `${nextCard.rank}${nextCard.suit}`;
      cardDiv.appendChild(lostCardDiv);

      cardDiv.classList.add('shake');
      setTimeout(() => {
        cardDiv.classList.remove('shake');
      }, 300);

      grid.forEach((otherPile, otherIdx) => {
        if (otherIdx !== idx && !otherPile.lost) {
          otherPile.lost = true;
          const otherCardDiv = document.querySelector(`.card[data-idx='${otherIdx}']`);
          if (otherCardDiv) {
            const otherButtons = otherCardDiv.querySelector('.buttons');
            if (otherButtons) otherButtons.remove();
            otherCardDiv.classList.add('lost');
          }
        }
      });
      
      selectedPileIndex = null;
      
      setTimeout(() => {
        updateUI();
        checkGameOver();
      }, 300);
    } else {
      pile.lost = true;
      pile.lostCard = nextCard;

      const buttons = cardDiv.querySelector('.buttons');
      if (buttons) buttons.remove();

      cardDiv.classList.add('lost');

      const lostCardDiv = document.createElement('div');
      lostCardDiv.className = 'lost-card';
      lostCardDiv.textContent = `${nextCard.rank}${nextCard.suit}`;
      cardDiv.appendChild(lostCardDiv);

      cardDiv.classList.add('shake');
      setTimeout(() => {
        cardDiv.classList.remove('shake');
      }, 300);

      selectedPileIndex = null;

      setTimeout(() => {
        updateUI();
        checkGameOver();
      }, 300);
    }
  }
}

function checkGameOver() {
  const allLost = grid.every(pile => pile.lost);
  const noMoreCards = !isUnlimitedMode && !isNoMercyMode && !isSpeedMode && deck.length === 0;
  const speedModeTimeUp = isSpeedMode && speedModeTimeLeft <= 0;

  if (allLost || noMoreCards || speedModeTimeUp) {
    // Spara Panic Mode tid INNAN stopTimer() anropas
    if (isSpeedMode && speedModeStartTime) {
      const currentTime = Date.now();
      const elapsedTime = currentTime - speedModeStartTime;
      panicModeFinalTime = Math.floor(elapsedTime / 1000);
      console.log('Final panicModeFinalTime set before stopTimer:', panicModeFinalTime);
    }
    
    stopTimer();
    
    console.log('After stopTimer - panicModeFinalTime:', panicModeFinalTime);
    console.log('After stopTimer - isSpeedMode:', isSpeedMode);

    // För Panic Mode: Bestäm om det är en vinst eller förlust
    let won = false;
    if (isSpeedMode) {
      // I Panic Mode: Vinst om alla kort är gissade innan tiden går ut
      won = (noMoreCards && !allLost) && !speedModeTimeUp;
      // Sätt timeout flaggan om tiden gick ut
      if (speedModeTimeUp) {
        isPanicModeTimeout = true;
      }
    } else {
      won = (noMoreCards && !allLost);
    }

    if (score > 0) {
      let totalSeconds;
      if (isSpeedMode && speedModeStartTime) {
        const currentTime = Date.now();
        const elapsedTime = currentTime - speedModeStartTime;
        totalSeconds = Math.floor(elapsedTime / 1000);
      } else if (isSpeedMode) {
        totalSeconds = 0;
      } else if (gameStartTime) {
        const currentTime = Date.now();
        const elapsedTime = currentTime - gameStartTime;
        totalSeconds = Math.floor(elapsedTime / 1000);
      } else {
        totalSeconds = 0;
      }
      
      // Check if this will be a winning game for Speed/No Mercy modes
      let shouldShowWinOverlay = won;
      
      if ((isSpeedMode || isNoMercyMode) && !won) {
        // Get current highscores before saving the new one
        let currentHighscores;
        if (isSpeedMode) {
          currentHighscores = getHighscores('speed');
        } else if (isNoMercyMode) {
          currentHighscores = getHighscores('noMercy');
        }
        
        // Check if there are at least 6 entries and if this score would be first place
        if (currentHighscores.length >= 6) {
          let newHighscoreScore = score;
          if (isNoMercyMode) {
            newHighscoreScore = score * 3; // No Mercy uses multiplied score
          }
          
          // Check if this would be first place
          if (currentHighscores.length === 0 || newHighscoreScore > (currentHighscores[0].highscoreScore || currentHighscores[0].score)) {
            shouldShowWinOverlay = true;
          }
        }
      }
      
      const result = saveHighscore(score, totalSeconds);

      let gameMode;
      if (isSpeedMode) {
        gameMode = 'speed';
      } else if (isNoMercyMode) {
        gameMode = 'noMercy';
      } else if (isUnlimitedMode) {
        gameMode = 'infinite';
      } else {
        gameMode = 'classic';
      }
      
      saveGameStats(score, totalSeconds, won, gameMode, isSpeedMode ? speedModeErrors : 0);

      if (result.isNewRecord) {
        console.log('New record!');
      }
      if (result.isTop3) {
        console.log('Top 3 achievement!');
      }
      
      // Use the determined overlay type
      if (isShowAllButtonsMode) {
        toggleShowAllButtons();
      }

      setTimeout(() => {
        if (shouldShowWinOverlay) {
          showWinOverlay();
        } else {
          showGameOverOverlay();
        }
      }, 100);
    } else {
      let totalSeconds;
      if (isSpeedMode && speedModeStartTime) {
        const currentTime = Date.now();
        const elapsedTime = currentTime - speedModeStartTime;
        totalSeconds = Math.floor(elapsedTime / 1000);
      } else if (isSpeedMode) {
        totalSeconds = 0;
      } else if (gameStartTime) {
        const currentTime = Date.now();
        const elapsedTime = currentTime - gameStartTime;
        totalSeconds = Math.floor(elapsedTime / 1000);
      } else {
        totalSeconds = 0;
      }
      
      let gameMode;
      if (isSpeedMode) {
        gameMode = 'speed';
      } else if (isNoMercyMode) {
        gameMode = 'noMercy';
      } else if (isUnlimitedMode) {
        gameMode = 'infinite';
      } else {
        gameMode = 'classic';
      }
      
      saveGameStats(0, totalSeconds, won, gameMode, isSpeedMode ? speedModeErrors : 0);

      if (isShowAllButtonsMode) {
        toggleShowAllButtons();
      }

      setTimeout(() => {
        showGameOverOverlay();
      }, 100);
    }
  }
}

function showWinOverlay() {
  // Check if in 2P mode
  if (isTwoPlayerMode) {
    let finalTime;
    if (twoPlayerState.gameMode === 'panic') {
      // In Panic mode, use panicModeFinalTime directly as number
      if (panicModeFinalTime > 0) {
        finalTime = panicModeFinalTime; // Already in seconds as number
      } else {
        // Fallback calculation
        if (speedModeStartTime) {
          const currentTime = Date.now();
          const elapsedTime = currentTime - speedModeStartTime;
          finalTime = Math.floor(elapsedTime / 1000);
        } else {
          finalTime = 0;
        }
      }
    } else if (twoPlayerState.gameMode === 'noMercy') {
      // No Mercy mode uses elapsed time like Classic
      finalTime = getTwoPlayerElapsedTime();
    } else {
      // Classic mode uses elapsed time
      finalTime = getTwoPlayerElapsedTime();
    }
    const finalScore = score;
    
    if (twoPlayerState.currentPlayer === 1) {
      // Player 1 finished, start Player 2
      onPlayer1GameEnd(finalScore, finalTime);
    } else {
      // Player 2 finished, show results
      onPlayer2GameEnd(finalScore, finalTime);
    }
    return; // Don't show normal win overlay
  }

  const overlay = document.getElementById('winOverlay');
  const winTitleText = document.getElementById('winTitleText');
  const winSubtitleText = document.getElementById('winSubtitleText');

  const randomPhrase = winPhrases[Math.floor(Math.random() * winPhrases.length)];
  winTitleText.textContent = randomPhrase.title;
  winSubtitleText.textContent = randomPhrase.subtitle;

  overlay.style.display = 'flex';
  overlay.querySelector('#winScoreValue').textContent = score;
  overlay.querySelector('#winTimeValue').textContent = getFinalTime();

  const highscoreWinBtn = document.getElementById('highscoreWinBtn');
  if (madeHighscore) {
    highscoreWinBtn.classList.add('pulse-highscore');
  } else {
    highscoreWinBtn.classList.remove('pulse-highscore');
  }

  if (madeTop3) {
    highscoreWinBtn.classList.add('top3-achievement');
  } else {
    highscoreWinBtn.classList.remove('top3-achievement');
  }

  // Visa alltid konfetti för win overlay
  jsConfetti.addConfetti({
    confettiColors: ['#fbb1bd', '#f9bec7', '#ff477e', '#f5f5dc', '#FFD700', '#85a0bc', '#2980b9', '#3498db', '#5dade2']
  });

  const playAgainBtn = document.getElementById('playAgainWinBtn');
  playAgainBtn.onclick = () => {
    overlay.style.display = 'none';
    startGame();
  };

  const closeBtn = document.getElementById('closeWinOverlayBtn');
  closeBtn.onclick = () => {
    overlay.style.display = 'none';
  };
}

function showGameOverOverlay() {
  console.log('=== showGameOverOverlay called ===');
  console.log('isSpeedMode:', isSpeedMode);
  console.log('panicModeFinalTime:', panicModeFinalTime);
  console.log('isPanicModeTimeout:', isPanicModeTimeout);
  
  // Check if in 2P mode
  if (isTwoPlayerMode) {
    let finalTime;
    if (twoPlayerState.gameMode === 'panic') {
      // In Panic mode, use panicModeFinalTime directly as number
      if (panicModeFinalTime > 0) {
        finalTime = panicModeFinalTime; // Already in seconds as number
      } else {
        // Fallback calculation
        if (speedModeStartTime) {
          const currentTime = Date.now();
          const elapsedTime = currentTime - speedModeStartTime;
          finalTime = Math.floor(elapsedTime / 1000);
        } else {
          finalTime = 0;
        }
      }
    } else {
      // Classic mode uses elapsed time
      finalTime = getTwoPlayerElapsedTime();
    }
    const finalScore = score;
    
    if (twoPlayerState.currentPlayer === 1) {
      // Player 1 finished, start Player 2
      onPlayer1GameEnd(finalScore, finalTime);
    } else {
      // Player 2 finished, show results
      onPlayer2GameEnd(finalScore, finalTime);
    }
    return; // Don't show normal game over overlay
  }

  const overlay = document.getElementById('gameOverOverlay');
  const gameOverTitleText = document.getElementById('gameOverTitleText');
  const gameOverSubtitleText = document.getElementById('gameOverSubtitleText');

  const randomPhrase = losePhrases[Math.floor(Math.random() * losePhrases.length)];
  gameOverTitleText.textContent = randomPhrase.title;
  gameOverSubtitleText.textContent = randomPhrase.subtitle;

  overlay.style.display = 'flex';
  overlay.querySelector('#gameOverScoreValue').textContent = score;
  
  console.log('About to call getFinalTime()...');
  const finalTime = getFinalTime();
  console.log('getFinalTime() returned:', finalTime);
  console.log('Final time from getFinalTime():', finalTime);
  console.log('About to set overlay time value to:', finalTime);
  console.log('panicModeFinalTime right before getFinalTime call:', panicModeFinalTime);
  console.log('Type of finalTime:', typeof finalTime);
  console.log('Value of finalTime:', finalTime);
  overlay.querySelector('#gameOverTimeValue').textContent = finalTime;

  const highscoreBtn = document.getElementById('highscoreBtn');
  if (madeHighscore) {
    highscoreBtn.classList.add('pulse-highscore');
  } else {
    highscoreBtn.classList.remove('pulse-highscore');
  }

  if (madeTop3) {
    highscoreBtn.classList.add('top3-achievement');
  } else {
    highscoreBtn.classList.remove('top3-achievement');
  }

  const closeOverlayBtn = document.getElementById('closeOverlayBtn');
  const playAgainBtn = document.getElementById('playAgainBtn');

  // Lås overlay:en för Panic Mode - alltid
  if (isSpeedMode) {
    console.log('Panic Mode detected in showGameOverOverlay - locking overlay');
    // Dölj krysset (×) för Panic Mode - alltid
    closeOverlayBtn.style.display = 'none';
  } else {
    console.log('Not Panic Mode - showing close button');
    // Visa krysset för andra lägen
    closeOverlayBtn.style.display = 'block';
  }

  closeOverlayBtn.onclick = () => {
    overlay.style.display = 'none';
  };

  playAgainBtn.onclick = () => {
    overlay.style.display = 'none';
    startGame();
  };
}

function showSettingsOverlay() {
  const overlay = document.getElementById('settingsOverlay');
  overlay.style.display = 'flex';
  const closeBtn = document.getElementById('closeSettingsBtn');
  closeBtn.onclick = () => {
    overlay.style.display = 'none';
  };
}

function showHelpOverlay() {
  const overlay = document.getElementById('helpOverlay');
  overlay.style.display = 'flex';
  const closeBtn = document.getElementById('closeHelpOverlayBtn');
  closeBtn.onclick = () => {
    overlay.style.display = 'none';
  };
}

function showGameModesOverlay() {
  const overlay = document.getElementById('gameModesOverlay');
  overlay.style.display = 'flex';
  const closeBtn = document.getElementById('closeGameModesBtn');
  closeBtn.onclick = () => {
    overlay.style.display = 'none';
  };
}

// VIKTIGA FUNKTIONER FÖR ATT RADERA ALLA HIGHSCORES OCH STATISTIK
function deleteAllHighscores() {
  if (confirm('Are you sure you want to delete ALL highscores for ALL game modes? This will permanently delete:\n\n• Classic Mode Highscores\n• Infinite Mode Highscores\n• Panic Mode Highscores\n• No Mercy Mode Highscores\n\nThis action cannot be undone!')) {
    localStorage.removeItem('highscoresClassic');
    localStorage.removeItem('highscoresInfinite');
    localStorage.removeItem('highscoresSpeed');
    localStorage.removeItem('highscoresNoMercy');
    
    // Update display if currently viewing highscores
    if (document.getElementById('highscoreOverlay').style.display === 'flex') {
      displayHighscores();
    }
    
    alert('All highscores have been deleted successfully.');
  }
}

function deleteAllStatistics() {
  if (confirm('Are you sure you want to delete ALL statistics for ALL game modes? This will permanently delete:\n\n• Classic Mode Statistics\n• Infinite Mode Statistics\n• Speed Mode Statistics\n• No Mercy Mode Statistics\n\nThis action cannot be undone!')) {
    localStorage.removeItem('gameStatsClassic');
    localStorage.removeItem('gameStatsInfinite');
    localStorage.removeItem('gameStatsSpeed');
    localStorage.removeItem('gameStatsNoMercy');
    
    // Update display if currently viewing highscores
    if (document.getElementById('highscoreOverlay').style.display === 'flex') {
      displayHighscores();
    }
    
    alert('All statistics have been deleted successfully.');
  }
}

function deleteAllData() {
  if (confirm('⚠️ WARNING: This will delete ALL data permanently! ⚠️\n\nThis action will remove:\n\n• All highscores for all game modes\n• All statistics for all game modes\n• All game settings and preferences\n• Tutorial completion status\n• Panic mode timer settings\n• All other saved data\n\nThis action CANNOT be undone!\n\nAre you absolutely sure you want to continue?')) {
    // Delete all highscores
    localStorage.removeItem('highscoresClassic');
    localStorage.removeItem('highscoresInfinite');
    localStorage.removeItem('highscoresSpeed');
    localStorage.removeItem('highscoresNoMercy');
    
    // Delete all statistics
    localStorage.removeItem('gameStatsClassic');
    localStorage.removeItem('gameStatsInfinite');
    localStorage.removeItem('gameStatsSpeed');
    localStorage.removeItem('gameStatsNoMercy');
    
    // Delete all settings and preferences
    localStorage.removeItem('lazyModeEnabled');
    localStorage.removeItem('darkModeEnabled');
    localStorage.removeItem('vibrationEnabled');
    localStorage.removeItem('highContrastEnabled');
    localStorage.removeItem('twoPlayerModeEnabled');
    localStorage.removeItem('panicModeTime');
    localStorage.removeItem('tutorialCompleted');
    
    // Reset game state
    isShowAllButtonsMode = false;
    isVibrationEnabled = false;
    
    // Update UI to reflect changes
    if (document.getElementById('highscoreOverlay').style.display === 'flex') {
      displayHighscores();
    }
    
    // Reset toggles to default state
    const lazyModeToggle = document.getElementById('lazyModeToggle');
    const darkModeToggleSettings = document.getElementById('darkModeToggle');
    const vibrationToggle = document.getElementById('vibrationToggle');
    const highContrastToggle = document.getElementById('highContrastToggle');
    const twoPlayerToggle = document.getElementById('twoPlayerToggle');
    
    if (lazyModeToggle) lazyModeToggle.checked = false;
    if (darkModeToggleSettings) darkModeToggleSettings.checked = false;
    if (vibrationToggle) vibrationToggle.checked = false;
    if (highContrastToggle) highContrastToggle.checked = false;
    if (twoPlayerToggle) twoPlayerToggle.checked = false;
    
    // Reset panic timer to default
    const panicTimerSelect = document.getElementById('panicTimerSelect');
    if (panicTimerSelect) {
      panicTimerSelect.value = '12';
      panicModeTime = 12;
    }
    
    // Remove dark mode class from body
    document.body.classList.remove('dark-mode');
    document.body.classList.remove('high-contrast');
    
    // Update show all buttons button
    const showAllButtons = document.getElementById('showAllButtons');
    if (showAllButtons) {
      showAllButtons.classList.remove('active');
    }
    
    // Update dark mode button
    const darkModeButton = document.getElementById('darkModeButton');
    if (darkModeButton) {
      darkModeButton.classList.remove('active');
    }
    
    // Hide 2-player button
    hideTwoPlayerButton();
    
    alert('All data has been completely deleted. The game has been reset to default settings.');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const highscoreBtn = document.getElementById('highscoreBtn');
  const highscoreWinBtn = document.getElementById('highscoreWinBtn');

  if (highscoreBtn) {
    highscoreBtn.onclick = () => {
      document.getElementById('gameOverOverlay').style.display = 'none';
      showHighscoreOverlay();
    };
  }

  if (highscoreWinBtn) {
    highscoreWinBtn.onclick = () => {
      document.getElementById('winOverlay').style.display = 'none';
      showHighscoreOverlay();
    };
  }

  const closeHighscoreBtn = document.getElementById('closeHighscoreBtn');
  if (closeHighscoreBtn) {
    closeHighscoreBtn.onclick = () => {
      document.getElementById('highscoreOverlay').style.display = 'none';
    };
  }

  const closeInfoOverlayBtn = document.getElementById('closeInfoOverlayBtn');
  if (closeInfoOverlayBtn) {
    closeInfoOverlayBtn.onclick = () => {
      document.getElementById('infoOverlay').style.display = 'none';
    };
  }

  // KOPPLA KNAPPARNA FÖR ATT RADERA ALLA HIGHSCORES OCH STATISTIK
  const resetHighscoresBtn = document.getElementById('resetHighscoresBtn');
  const resetStatisticsBtn = document.getElementById('resetStatisticsBtn');
  const deleteAllDataBtn = document.getElementById('deleteAllDataBtn');
  const gameModesBtn = document.getElementById('gameModesBtn');

  if (resetHighscoresBtn) {
    resetHighscoresBtn.onclick = deleteAllHighscores;
  }

  if (resetStatisticsBtn) {
    resetStatisticsBtn.onclick = deleteAllStatistics;
  }

  if (deleteAllDataBtn) {
    deleteAllDataBtn.onclick = deleteAllData;
  }

  if (gameModesBtn) {
    gameModesBtn.onclick = () => {
      document.getElementById('infoOverlay').style.display = 'none';
      showGameModesOverlay();
    };
  }

  // KOPPLA TOGGLE-FUNKTIONALITET
  const lazyModeToggle = document.getElementById('lazyModeToggle');
  const darkModeToggleSettings = document.getElementById('darkModeToggle');
  const vibrationToggle = document.getElementById('vibrationToggle');
  const highContrastToggle = document.getElementById('highContrastToggle');

  if (lazyModeToggle) {
    lazyModeToggle.onchange = function() {
      isShowAllButtonsMode = this.checked;
      localStorage.setItem('lazyModeEnabled', this.checked.toString());
      showAllButtons.classList.toggle('active', this.checked);
      updateUI();
    };
  }

  if (darkModeToggleSettings) {
    darkModeToggleSettings.onchange = function() {
      const isDarkMode = this.checked;
      localStorage.setItem('darkModeEnabled', isDarkMode.toString());
      document.body.classList.toggle('dark-mode', isDarkMode);
      darkModeButton.classList.toggle('active', isDarkMode);
    };
  }

  if (vibrationToggle) {
    vibrationToggle.onchange = function() {
      isVibrationEnabled = this.checked;
      localStorage.setItem('vibrationEnabled', this.checked.toString());
      
      // Test vibration när toggle aktiveras
      if (this.checked) {
        console.log('Vibration enabled - testing...');
        triggerVibration([200, 100, 200]);
      }
    };
  }

  if (highContrastToggle) {
    highContrastToggle.onchange = function() {
      const isHighContrast = this.checked;
      document.body.classList.toggle('high-contrast', isHighContrast);
      localStorage.setItem('highContrastEnabled', isHighContrast.toString());
    };
  }

  // 2 PLAYER TOGGLE
  const twoPlayerToggle = document.getElementById('twoPlayerToggle');
  if (twoPlayerToggle) {
    // Ladda sparad inställning
    const savedTwoPlayerMode = localStorage.getItem('twoPlayerModeEnabled');
    if (savedTwoPlayerMode === 'true') {
      twoPlayerToggle.checked = true;
      showTwoPlayerButton();
    }
    
    twoPlayerToggle.onchange = function() {
      const isTwoPlayerMode = this.checked;
      localStorage.setItem('twoPlayerModeEnabled', isTwoPlayerMode.toString());
      
      if (isTwoPlayerMode) {
        showTwoPlayerButton();
      } else {
        hideTwoPlayerButton();
      }
    };
  }

  // PANIC MODE TIMER DROPDOWN
  const panicTimerSelect = document.getElementById('panicTimerSelect');
  if (panicTimerSelect) {
    // Ladda sparad inställning
    const savedPanicTime = localStorage.getItem('panicModeTime');
    if (savedPanicTime) {
      panicModeTime = parseInt(savedPanicTime);
      panicTimerSelect.value = savedPanicTime;
    }
    
    panicTimerSelect.onchange = function() {
      panicModeTime = parseInt(this.value);
      localStorage.setItem('panicModeTime', this.value);
      updatePanicModeDescription(); // Uppdatera beskrivningen
    };
    
    updatePanicModeDescription(); // Uppdatera vid laddning
  }
  
  // Funktion för att uppdatera Panic Mode-beskrivningen
  function updatePanicModeDescription() {
    const panicModeDescElement = document.getElementById('panicModeDesc');
    if (panicModeDescElement) {
      panicModeDescElement.textContent = `${panicModeTime}s rush`;
    }
  }

  const howToPlayBtn = document.getElementById('howToPlayBtn');
  const highscoreSettingsBtn = document.getElementById('highscoreSettingsBtn');
  const infoBtn = document.getElementById('infoBtn');
  
  const classicInfoPlayIcon = document.getElementById('classicInfoPlayIcon');
  const classicInfoTrophyIcon = document.getElementById('classicInfoTrophyIcon');
  const infiniteInfoPlayIcon = document.getElementById('infiniteInfoPlayIcon');
  const infiniteInfoTrophyIcon = document.getElementById('infiniteInfoTrophyIcon');
  const speedInfoPlayIcon = document.getElementById('speedInfoPlayIcon');
  const speedInfoTrophyIcon = document.getElementById('speedInfoTrophyIcon');
  const noMercyInfoPlayIcon = document.getElementById('noMercyInfoPlayIcon');
  const noMercyInfoTrophyIcon = document.getElementById('noMercyInfoTrophyIcon');
  const battleRoyaleInfoPlayIcon = document.getElementById('battleRoyaleInfoPlayIcon');
  
  const classicModeBtn = document.getElementById('classicModeBtn');
  const speedModeBtn = document.getElementById('speedModeBtn');
  const noMercyModeBtn = document.getElementById('noMercyModeBtn');
  const twoPlayerHeroBtn = document.getElementById('twoPlayerHeroBtn');

  if (howToPlayBtn) {
    howToPlayBtn.onclick = () => {
      document.getElementById('settingsOverlay').style.display = 'none';
      showHelpOverlay();
    };
  }

  if (highscoreSettingsBtn) {
    highscoreSettingsBtn.onclick = () => {
      document.getElementById('settingsOverlay').style.display = 'none';
      showHighscoreOverlay();
    };
  }

  if (infoBtn) {
    infoBtn.onclick = () => {
      document.getElementById('settingsOverlay').style.display = 'none';
      const overlay = document.getElementById('infoOverlay');
      overlay.style.display = 'flex';
    };
  }

  if (classicInfoPlayIcon) {
    classicInfoPlayIcon.onclick = () => {
      // Reset Battle Royale state if active
      resetBattleRoyaleForGameMode();
      
      isUnlimitedMode = false;
      isNoMercyMode = false;
      isSpeedMode = false;
      document.getElementById('gameModesOverlay').style.display = 'none';
      startGame();
    };
  }

  if (classicInfoTrophyIcon) {
    classicInfoTrophyIcon.onclick = () => {
      document.getElementById('gameModesOverlay').style.display = 'none';
      showHighscoreOverlayForMode('classic');
    };
  }

  if (infiniteInfoPlayIcon) {
    infiniteInfoPlayIcon.onclick = () => {
      // Reset Battle Royale state if active
      resetBattleRoyaleForGameMode();
      
      isUnlimitedMode = true;
      isNoMercyMode = false;
      isSpeedMode = false;
      document.getElementById('gameModesOverlay').style.display = 'none';
      startGame();
    };
  }

  if (infiniteInfoTrophyIcon) {
    infiniteInfoTrophyIcon.onclick = () => {
      document.getElementById('gameModesOverlay').style.display = 'none';
      showHighscoreOverlayForMode('infinite');
    };
  }

  if (speedInfoPlayIcon) {
    speedInfoPlayIcon.onclick = () => {
      // Reset Battle Royale state if active
      resetBattleRoyaleForGameMode();
      
      isUnlimitedMode = false;
      isNoMercyMode = false;
      isSpeedMode = true;
      isShowAllButtonsMode = true;
      document.getElementById('gameModesOverlay').style.display = 'none';
      startGame();
    };
  }

  if (speedInfoTrophyIcon) {
    speedInfoTrophyIcon.onclick = () => {
      document.getElementById('gameModesOverlay').style.display = 'none';
      showHighscoreOverlayForMode('speed');
    };
  }

  if (noMercyInfoPlayIcon) {
    noMercyInfoPlayIcon.onclick = () => {
      // Reset Battle Royale state if active
      resetBattleRoyaleForGameMode();
      
      isUnlimitedMode = false;
      isNoMercyMode = true;
      isSpeedMode = false;
      document.getElementById('gameModesOverlay').style.display = 'none';
      startGame();
    };
  }

  if (noMercyInfoTrophyIcon) {
    noMercyInfoTrophyIcon.onclick = () => {
      document.getElementById('gameModesOverlay').style.display = 'none';
      showHighscoreOverlayForMode('noMercy');
    };
  }

  if (battleRoyaleInfoPlayIcon) {
    battleRoyaleInfoPlayIcon.onclick = () => {
      document.getElementById('gameModesOverlay').style.display = 'none';
      showBattleRoyaleOverlay();
    };
  }

  if (classicModeBtn) {
    classicModeBtn.onclick = () => {
      // Reset Battle Royale state if active
      resetBattleRoyaleForGameMode();
      
      isUnlimitedMode = false;
      isNoMercyMode = false;
      isSpeedMode = false;
      resetTwoPlayerMode(); // Exit 2P mode when starting normal Classic
      document.getElementById('settingsOverlay').style.display = 'none';
      startGame();
    };
  }

  if (twoPlayerHeroBtn) {
    twoPlayerHeroBtn.onclick = () => {
      console.log('twoPlayerHeroBtn clicked!'); // Debug log
      document.getElementById('settingsOverlay').style.display = 'none';
      showTwoPlayerOverlay();
    };
  }

  if (speedModeBtn) {
    speedModeBtn.onclick = () => {
      // Reset Battle Royale state if active
      resetBattleRoyaleForGameMode();
      
      isUnlimitedMode = false;
      isNoMercyMode = false;
      isSpeedMode = true;
      isShowAllButtonsMode = true;
      resetTwoPlayerMode(); // Exit 2P mode when starting Panic
      document.getElementById('settingsOverlay').style.display = 'none';
      startGame();
    };
  }

  if (noMercyModeBtn) {
    noMercyModeBtn.onclick = () => {
      // Reset Battle Royale state if active
      resetBattleRoyaleForGameMode();
      
      isUnlimitedMode = false;
      isNoMercyMode = true;
      isSpeedMode = false;
      resetTwoPlayerMode(); // Exit 2P mode when starting No Mercy
      document.getElementById('settingsOverlay').style.display = 'none';
      startGame();
    };
  }

  const classicTab = document.getElementById('classicTab');
  const infiniteTab = document.getElementById('infiniteTab');
  const speedTab = document.getElementById('speedTab');
  const noMercyTab = document.getElementById('noMercyTab');

  const playClassicBtn = document.getElementById('playClassicBtn');
  const aboutGameModesBtn = document.getElementById('aboutGameModesBtn');

  if (playClassicBtn) {
    playClassicBtn.onclick = () => {
      isUnlimitedMode = false;
      isNoMercyMode = false;
      isSpeedMode = false;
      document.getElementById('helpOverlay').style.display = 'none';
      startGame();
    };
  }

  if (aboutGameModesBtn) {
    aboutGameModesBtn.onclick = () => {
      document.getElementById('helpOverlay').style.display = 'none';
      showGameModesOverlay();
    };
  }

  if (classicTab) {
    classicTab.onclick = () => {
      currentHighscoreMode = 'classic';
      updateHighscoreTabs();
      displayHighscores();
    };
  }

  if (infiniteTab) {
    infiniteTab.onclick = () => {
      currentHighscoreMode = 'infinite';
      updateHighscoreTabs();
      displayHighscores();
    };
  }

  if (speedTab) {
    speedTab.onclick = () => {
      currentHighscoreMode = 'speed';
      updateHighscoreTabs();
      displayHighscores();
    };
  }

  if (noMercyTab) {
    noMercyTab.onclick = () => {
      currentHighscoreMode = 'noMercy';
      updateHighscoreTabs();
      displayHighscores();
    };
  }

  const resetHighscoresLink = document.getElementById('resetHighscores');
  const resetStatisticsLink = document.getElementById('resetStatistics');

  if (resetHighscoresLink) {
    resetHighscoresLink.onclick = (e) => {
      e.preventDefault();
      let gameMode, modeText, highscoreKey;
      
      if (currentHighscoreMode === 'speed') {
        gameMode = 'speed';
        modeText = 'Speed';
        highscoreKey = 'highscoresSpeed';
      } else if (currentHighscoreMode === 'noMercy') {
        gameMode = 'noMercy';
        modeText = 'No Mercy';
        highscoreKey = 'highscoresNoMercy';
      } else if (currentHighscoreMode === 'infinite') {
        gameMode = 'infinite';
        modeText = 'Infinite';
        highscoreKey = 'highscoresInfinite';
      } else {
        gameMode = 'classic';
        modeText = 'Classic';
        highscoreKey = 'highscoresClassic';
      }
      
      if (confirm(`Are you sure you want to reset all ${modeText} highscores? This cannot be undone.`)) {
        localStorage.removeItem(highscoreKey);
        displayHighscores();
      }
    };
  }

  if (resetStatisticsLink) {
    resetStatisticsLink.onclick = (e) => {
      e.preventDefault();
      let gameMode, modeText, statsKey;
      
      if (currentHighscoreMode === 'speed') {
        gameMode = 'speed';
        modeText = 'Speed';
        statsKey = 'gameStatsSpeed';
      } else if (currentHighscoreMode === 'noMercy') {
        gameMode = 'noMercy';
        modeText = 'No Mercy';
        statsKey = 'gameStatsNoMercy';
      } else if (currentHighscoreMode === 'infinite') {
        gameMode = 'infinite';
        modeText = 'Infinite';
        statsKey = 'gameStatsInfinite';
      } else {
        gameMode = 'classic';
        modeText = 'Classic';
        statsKey = 'gameStatsClassic';
      }
      
      if (confirm(`Are you sure you want to reset all ${modeText} statistics? This cannot be undone.`)) {
        localStorage.removeItem(statsKey);
        displayHighscores();
      }
    };
  }

  // Tutorial button event listeners
  const startTutorialBtn = document.getElementById('startTutorialBtn');
  if (startTutorialBtn) {
    startTutorialBtn.onclick = () => {
      document.getElementById('helpOverlay').style.display = 'none';
      startTutorial();
    };
  }

  // Tutorial navigation buttons
  const nextBtn = document.querySelector('#tutorialPopup .tutorial-btn:not(.back)');
  if (nextBtn) {
    nextBtn.onclick = nextTutorialStep;
  }

  const backBtn = document.getElementById('backBtn');
  if (backBtn) {
    backBtn.onclick = previousTutorialStep;
  }
});

// Ladda inställningar när sidan laddas
loadSettings();

let pressTimer;

restartButton.addEventListener('mousedown', startPress);
restartButton.addEventListener('touchstart', startPress);
restartButton.addEventListener('mouseup', endPress);
restartButton.addEventListener('touchend', endPress);

function startPress() {
  pressTimer = setTimeout(() => {
    deck = [];
    // Forcera win overlay istället för game over när man håller restart
    setTimeout(() => {
      showWinOverlay();
    }, 100);
  }, 5000);
}

function endPress() {
  clearTimeout(pressTimer);
}

restartButton.onclick = () => {
  startGame();
};

darkModeButton.onclick = () => {
  const isDarkMode = !document.body.classList.contains('dark-mode');
  document.body.classList.toggle('dark-mode');
  darkModeButton.classList.toggle('active');
  
  // Uppdatera även settings toggle
  const darkModeToggleSettings = document.getElementById('darkModeToggle');
  if (darkModeToggleSettings) {
    darkModeToggleSettings.checked = isDarkMode;
  }
  
  // Spara inställning
  localStorage.setItem('darkModeEnabled', isDarkMode.toString());
};

showAllButtons.onclick = () => {
  toggleShowAllButtons();
  // Uppdatera även settings toggle
  const lazyModeToggle = document.getElementById('lazyModeToggle');
  if (lazyModeToggle) {
    lazyModeToggle.checked = isShowAllButtonsMode;
  }
  // Spara inställning
  localStorage.setItem('lazyModeEnabled', isShowAllButtonsMode.toString());
};

settingsButton.onclick = () => {
  showSettingsOverlay();
};

// Handle window resize for tutorial arrow positioning
window.addEventListener('resize', () => {
  if (isTutorialActive && currentTutorialStep < tutorialSteps.length) {
    const step = tutorialSteps[currentTutorialStep];
    if (step.arrow) {
      setTimeout(() => {
        positionTutorialArrow(step.arrow.target, step.arrow.direction);
      }, 100);
    }
  }
});

// Check if tutorial should auto-start
window.addEventListener('load', () => {
  const tutorialCompleted = localStorage.getItem('tutorialCompleted');
  if (!tutorialCompleted) {
    setTimeout(() => {
      startTutorial();
    }, 1000);
  }
});

// Click outside overlay to close functionality
document.addEventListener('DOMContentLoaded', function() {
  const overlays = [
    'gameOverOverlay',
    'winOverlay', 
    'helpOverlay',
    'settingsOverlay',
    'infoOverlay',
    'gameModesOverlay',
    'highscoreOverlay',
    'twoPlayerOverlay',
    'classic2POverlay',
    'panic2POverlay',
    'noMercy2POverlay',
    'battleRoyaleOverlay'
  ];

  overlays.forEach(overlayId => {
    const overlay = document.getElementById(overlayId);
    if (overlay) {
      overlay.addEventListener('click', function(e) {
        // If clicked on the overlay background (not the content)
        if (e.target === overlay) {
          // Don't allow click-outside-to-close for gameOverOverlay in Panic Mode
          if (overlayId === 'gameOverOverlay' && isSpeedMode) {
            console.log('Prevented click outside gameOverOverlay in Panic Mode');
            return;
          }
          overlay.style.display = 'none';
        }
      });
    }
  });
});

// 2 PLAYER MODE FUNCTIONS
function showTwoPlayerButton() {
  const twoPlayerButton = document.getElementById('twoPlayerButton');
  if (twoPlayerButton) {
    twoPlayerButton.style.display = 'flex';
  }
}

function hideTwoPlayerButton() {
  const twoPlayerButton = document.getElementById('twoPlayerButton');
  if (twoPlayerButton) {
    twoPlayerButton.style.display = 'none';
  }
}

function showTwoPlayerOverlay() {
  console.log('showTwoPlayerOverlay called!'); // Debug log
  
  // Stäng ner Settings-overlayen först
  const settingsOverlay = document.getElementById('settingsOverlay');
  console.log('settingsOverlay element:', settingsOverlay); // Debug log
  
  if (settingsOverlay) {
    console.log('Hiding settingsOverlay'); // Debug log
    settingsOverlay.style.display = 'none';
  }
  
  // Visa 2P-overlayen
  const overlay = document.getElementById('twoPlayerOverlay');
  console.log('twoPlayerOverlay element:', overlay); // Debug log
  
  if (overlay) {
    console.log('Showing twoPlayerOverlay'); // Debug log
    overlay.style.display = 'flex';
  }
}

function hideTwoPlayerOverlay() {
  const overlay = document.getElementById('twoPlayerOverlay');
  if (overlay) {
    overlay.style.display = 'none';
  }
}

// 2 PLAYER MODE VARIABLES
let isTwoPlayerMode = false;
let twoPlayerGameStartTime = null;
let twoPlayerState = {
  currentPlayer: 1,
  player1Data: null,
  player2Data: null,
  gameMode: null,
  sharedDeck: null
};

// BATTLE ROYALE MODE VARIABLES
let battleRoyaleState = {
  isActive: false,
  player1Lives: 3,
  player2Lives: 3,
  currentPlayer: 1,
  gameEnded: false,
  winner: null,
  sharedDeck: null,
  originalSharedDeck: null
};

// 2 PLAYER MODE FUNCTIONS
function createSharedDeck() {
  const deck = [];
  
  // Use the same format as the traditional game
  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push({
        suit,
        rank: rank.name,
        value: rank.value,
        color: suitColors[suit],
      });
    }
  }
  
  // Shuffle the deck
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  
  return deck;
}

function getTwoPlayerElapsedTime() {
  if (!twoPlayerGameStartTime) return 0;
  return Math.floor((Date.now() - twoPlayerGameStartTime) / 1000);
}



function showClassic2POverlay() {
  hideAllOverlays();
  const overlay = document.getElementById('classic2POverlay');
  if (overlay) {
    overlay.style.display = 'flex';
  }
}

function hideClassic2POverlay() {
  const overlay = document.getElementById('classic2POverlay');
  if (overlay) {
    overlay.style.display = 'none';
  }
}

function startClassic2PGame() {
  // Reset Battle Royale state if active
  resetBattleRoyaleForGameMode();
  
  hideClassic2POverlay();
  isTwoPlayerMode = true;
  twoPlayerState.gameMode = 'classic';
  twoPlayerState.currentPlayer = 1;
  twoPlayerState.player1Data = null;
  twoPlayerState.player2Data = null;
  
  // Create and store shared deck
  twoPlayerState.sharedDeck = createSharedDeck();
  
  // Reset any game mode flags for classic
  isSpeedMode = false;
  isUnlimitedMode = false;
  isNoMercyMode = false;
  
  // Show player indicator
  updatePlayerIndicator();
  
  // Start Player 1's game using the traditional startGame function
  startGame();
}

function showNoMercy2POverlay() {
  hideAllOverlays();
  const overlay = document.getElementById('noMercy2POverlay');
  if (overlay) {
    overlay.style.display = 'flex';
  }
}

function hideNoMercy2POverlay() {
  const overlay = document.getElementById('noMercy2POverlay');
  if (overlay) {
    overlay.style.display = 'none';
  }
}

function createSharedNoMercyDeck() {
  // Create a standard 52-card deck for both players to use
  // This ensures both players get the exact same cards in same positions
  const deck = createDeck(); // Use the standard deck creation
  shuffle(deck); // Shuffle once for both players
  return deck;
}

function startNoMercy2PGame() {
  // Reset Battle Royale state if active
  resetBattleRoyaleForGameMode();
  
  hideNoMercy2POverlay();
  isTwoPlayerMode = true;
  twoPlayerState.gameMode = 'noMercy';
  twoPlayerState.currentPlayer = 1;
  twoPlayerState.player1Data = null;
  twoPlayerState.player2Data = null;
  
  // Create and store shared deck - both players use exact same deck and layout
  const originalDeck = createSharedNoMercyDeck();
  twoPlayerState.sharedDeck = [...originalDeck]; // For Player 1
  twoPlayerState.originalSharedDeck = [...originalDeck]; // Backup for Player 2
  
  // Set no mercy mode flags
  isSpeedMode = false;
  isUnlimitedMode = false;
  isNoMercyMode = true;
  isShowAllButtonsMode = false;
  
  // Show player indicator
  updatePlayerIndicator();
  
  // Start Player 1's game using the traditional startGame function
  startGame();
}

// === PANIC 2P MODE FUNCTIONS ===

function showPanic2POverlay() {
  hideAllOverlays();
  const overlay = document.getElementById('panic2POverlay');
  if (overlay) {
    // Update timer display with current setting
    const timerDisplay = document.getElementById('panic2PTimerDisplay');
    if (timerDisplay) {
      timerDisplay.textContent = `${panicModeTime}s`;
    }
    overlay.style.display = 'flex';
  }
}

function hidePanic2POverlay() {
  const overlay = document.getElementById('panic2POverlay');
  if (overlay) {
    overlay.style.display = 'none';
  }
}

function createSharedPanicDeck() {
  // Create a standard 52-card deck for both players to use
  // This ensures both players get the exact same cards in same positions
  const deck = createDeck(); // Use the standard deck creation
  shuffle(deck); // Shuffle once for both players
  return deck;
}

function startPanic2PGame() {
  // Reset Battle Royale state if active
  resetBattleRoyaleForGameMode();
  
  hidePanic2POverlay();
  isTwoPlayerMode = true;
  twoPlayerState.gameMode = 'panic';
  twoPlayerState.currentPlayer = 1;
  twoPlayerState.player1Data = null;
  twoPlayerState.player2Data = null;
  
  // Create and store shared deck - both players use exact same deck and layout
  const originalDeck = createSharedPanicDeck();
  twoPlayerState.sharedDeck = [...originalDeck]; // For Player 1
  twoPlayerState.originalSharedDeck = [...originalDeck]; // Backup for Player 2
  
  // Set panic mode flags
  isSpeedMode = true;
  isUnlimitedMode = false;
  isNoMercyMode = false;
  isShowAllButtonsMode = true; // Force show all buttons for speed
  
  // Show player indicator
  updatePlayerIndicator();
  
  // Start Player 1's panic game
  startGame();
}

function onPlayer1GameEnd(finalScore, finalTime) {
  // Store data differently based on game mode
  if (twoPlayerState.gameMode === 'panic') {
    twoPlayerState.player1Data = {
      score: finalScore,
      time: finalTime,
      errors: speedModeErrors,
      timestamp: Date.now()
    };
    // Reset shared deck for Player 2 to use identical starting conditions
    twoPlayerState.sharedDeck = [...twoPlayerState.originalSharedDeck];
  } else if (twoPlayerState.gameMode === 'noMercy') {
    twoPlayerState.player1Data = {
      score: finalScore,
      time: finalTime,
      timestamp: Date.now()
    };
    // Reset shared deck for Player 2 to use identical starting conditions
    twoPlayerState.sharedDeck = [...twoPlayerState.originalSharedDeck];
  } else {
    twoPlayerState.player1Data = {
      score: finalScore,
      time: finalTime,
      timestamp: Date.now()
    };
  }
  
  showPlayer2ReadyOverlay();
}

function showPlayer2ReadyOverlay() {
  const overlay = document.getElementById('player2ReadyOverlay');
  
  if (overlay) {
    overlay.style.display = 'flex';
  }
}

function hidePlayer2ReadyOverlay() {
  const overlay = document.getElementById('player2ReadyOverlay');
  if (overlay) {
    overlay.style.display = 'none';
  }
}

function startPlayer2Game() {
  hidePlayer2ReadyOverlay();
  twoPlayerState.currentPlayer = 2;
  
  // Set game mode flags based on 2P game mode
  if (twoPlayerState.gameMode === 'panic') {
    isSpeedMode = true;
    isUnlimitedMode = false;
    isNoMercyMode = false;
    isShowAllButtonsMode = true; // Force show all buttons for speed
  } else if (twoPlayerState.gameMode === 'noMercy') {
    isSpeedMode = false;
    isUnlimitedMode = false;
    isNoMercyMode = true;
    isShowAllButtonsMode = false;
  } else {
    // Classic mode
    isSpeedMode = false;
    isUnlimitedMode = false;
    isNoMercyMode = false;
  }
  
  // Update player indicator to show Player 2
  updatePlayerIndicator();
  
  // Start Player 2's game with the same deck/sequence
  startGame();
}

function onPlayer2GameEnd(finalScore, finalTime) {
  // Store data differently based on game mode
  if (twoPlayerState.gameMode === 'panic') {
    twoPlayerState.player2Data = {
      score: finalScore,
      time: finalTime,
      errors: speedModeErrors,
      timestamp: Date.now()
    };
  } else if (twoPlayerState.gameMode === 'noMercy') {
    twoPlayerState.player2Data = {
      score: finalScore,
      time: finalTime,
      timestamp: Date.now()
    };
  } else {
    twoPlayerState.player2Data = {
      score: finalScore,
      time: finalTime,
      timestamp: Date.now()
    };
  }
  
  showShowResultsOverlay();
}

function showShowResultsOverlay() {
  const overlay = document.getElementById('showResultsOverlay');
  if (overlay) {
    overlay.style.display = 'flex';
  }
}

function hideShowResultsOverlay() {
  const overlay = document.getElementById('showResultsOverlay');
  if (overlay) {
    overlay.style.display = 'none';
  }
}

function proceedToResults() {
  hideShowResultsOverlay();
  showTwoPlayerResultsOverlay();
}

function showTwoPlayerResultsOverlay() {
  const overlay = document.getElementById('twoPlayerResultsOverlay');
  
  if (!overlay || !twoPlayerState.player1Data || !twoPlayerState.player2Data) {
    return;
  }
  
  // Update result displays
  const player1ScoreEl = document.getElementById('player1ResultScore');
  const player1TimeEl = document.getElementById('player1ResultTime');
  const player2ScoreEl = document.getElementById('player2ResultScore');
  const player2TimeEl = document.getElementById('player2ResultTime');
  const winnerTextEl = document.getElementById('winnerText');
  const player1ResultEl = document.getElementById('player1Result');
  const player2ResultEl = document.getElementById('player2Result');
  
  if (player1ScoreEl) player1ScoreEl.textContent = twoPlayerState.player1Data.score;
  if (player2ScoreEl) player2ScoreEl.textContent = twoPlayerState.player2Data.score;
  
  // Display time consistently for all game modes - just show seconds
  if (player1TimeEl) player1TimeEl.textContent = twoPlayerState.player1Data.time + ' seconds';
  if (player2TimeEl) player2TimeEl.textContent = twoPlayerState.player2Data.time + ' seconds';
  
  // Determine winner and highlight
  const player1Score = parseInt(twoPlayerState.player1Data.score);
  const player2Score = parseInt(twoPlayerState.player2Data.score);
  
  // Remove previous winner classes
  if (player1ResultEl) player1ResultEl.classList.remove('winner');
  if (player2ResultEl) player2ResultEl.classList.remove('winner');
  
  if (player1Score > player2Score) {
    if (winnerTextEl) winnerTextEl.textContent = 'Player 1 Wins!';
    if (player1ResultEl) player1ResultEl.classList.add('winner');
  } else if (player2Score > player1Score) {
    if (winnerTextEl) winnerTextEl.textContent = 'Player 2 Wins!';
    if (player2ResultEl) player2ResultEl.classList.add('winner');
  } else {
    // Tie! Best time wins
    const player1Time = twoPlayerState.player1Data.time;
    const player2Time = twoPlayerState.player2Data.time;
    
    if (player1Time < player2Time) {
      if (winnerTextEl) winnerTextEl.innerHTML = 'Player 1 Wins!<br><small>(Better Time)</small>';
      if (player1ResultEl) player1ResultEl.classList.add('winner');
    } else if (player2Time < player1Time) {
      if (winnerTextEl) winnerTextEl.innerHTML = 'Player 2 Wins!<br><small>(Better Time)</small>';
      if (player2ResultEl) player2ResultEl.classList.add('winner');
    } else {
      // Perfect tie - same score and time (very rare!)
      if (winnerTextEl) winnerTextEl.textContent = 'Perfect Tie!';
    }
  }
  
  overlay.style.display = 'flex';
  
  // Add confetti for 2-player victory
  jsConfetti.addConfetti({
    confettiColors: ['#fbb1bd', '#f9bec7', '#ff477e', '#f5f5dc', '#FFD700', '#85a0bc', '#2980b9', '#3498db', '#5dade2']
  });
}

function hideTwoPlayerResultsOverlay() {
  const overlay = document.getElementById('twoPlayerResultsOverlay');
  if (overlay) {
    overlay.style.display = 'none';
  }
  
  // Don't reset 2P mode here - let individual close actions handle it
  // resetTwoPlayerMode(); // Moved to close button handler only
}

function updatePlayerIndicator() {
  const indicator = document.getElementById('playerIndicator');
  const playerText = document.getElementById('currentPlayerText');
  
  if (isTwoPlayerMode && indicator && playerText) {
    indicator.style.display = 'block';
    playerText.textContent = `Player ${twoPlayerState.currentPlayer}`;
    
    // Trigga animering för Player Text
    triggerPlayerTextAnimation(playerText);
  } else if (indicator) {
    indicator.style.display = 'none';
  }
}

// Hjälpfunktion för att trigga Player Text animering
function triggerPlayerTextAnimation(playerTextElement) {
  if (playerTextElement) {
    // Stoppa eventuell pågående animering
    playerTextElement.style.animation = 'none';
    playerTextElement.offsetHeight; // Trigger reflow
    
    // Starta om animeringen
    playerTextElement.style.animation = 'playerTextScaleIn 0.6s ease-out forwards';
  }
}

function resetTwoPlayerMode() {

  isTwoPlayerMode = false;
  twoPlayerState.currentPlayer = 1;
  twoPlayerState.player1Data = null;
  twoPlayerState.player2Data = null;
  twoPlayerState.sharedDeck = null;
  twoPlayerState.gameMode = null;
  
  // Hide player indicator
  updatePlayerIndicator();
  
  // Update UI to remove 2P mode display
  updateUI();
}

function playAgain2P() {
  hideTwoPlayerResultsOverlay();
  
  // Check if we're in Battle Royale mode
  if (battleRoyaleState.isActive) {
    startBattleRoyaleGame();
    return;
  }
  
  // Get the current game mode to replay the same mode
  const currentGameMode = twoPlayerState.gameMode || 'classic';

  
  // Reset 2P state and start Player 1 directly
  isTwoPlayerMode = true;
  twoPlayerState.gameMode = currentGameMode;
  twoPlayerState.currentPlayer = 1;
  twoPlayerState.player1Data = null;
  twoPlayerState.player2Data = null;
  
  if (currentGameMode === 'panic') {
    // Create new shared deck for panic mode
    const originalDeck = createSharedPanicDeck();
    twoPlayerState.sharedDeck = [...originalDeck];
    twoPlayerState.originalSharedDeck = [...originalDeck];
    
    // Set panic mode flags
    isSpeedMode = true;
    isUnlimitedMode = false;
    isNoMercyMode = false;
    isShowAllButtonsMode = true;
  } else if (currentGameMode === 'noMercy') {
    // Create new shared deck for no mercy mode
    const originalDeck = createSharedNoMercyDeck();
    twoPlayerState.sharedDeck = [...originalDeck];
    twoPlayerState.originalSharedDeck = [...originalDeck];
    
    // Set no mercy mode flags
    isSpeedMode = false;
    isUnlimitedMode = false;
    isNoMercyMode = true;
    isShowAllButtonsMode = false;
  } else {
    // Create new shared deck for classic
    twoPlayerState.sharedDeck = createSharedDeck();
    
    // Reset game mode flags for classic
    isSpeedMode = false;
    isUnlimitedMode = false;
    isNoMercyMode = false;
  }
  
  // Update player indicator back to Player 1
  updatePlayerIndicator();
  
  // Start Player 1's game directly
  startGame();
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function hideAllOverlays() {
  const overlayIds = [
    'twoPlayerOverlay',
    'classic2POverlay', 
    'player2ReadyOverlay',
    'showResultsOverlay',
    'twoPlayerResultsOverlay',
    'battleRoyaleResultsOverlay',
    'gameOverOverlay',
    'winOverlay',
    'settingsOverlay',
    'helpOverlay',
    'highscoreOverlay',
    'infoOverlay',
    'gameModesOverlay'
  ];
  
  overlayIds.forEach(id => {
    const overlay = document.getElementById(id);
    if (overlay) {
      overlay.style.display = 'none';
    }
  });
}

// 2 PLAYER BUTTON EVENT LISTENERS
document.addEventListener('DOMContentLoaded', function() {
  const twoPlayerButton = document.getElementById('twoPlayerButton');
  const closeTwoPlayerBtn = document.getElementById('closeTwoPlayerBtn');
  
  // 2P main overlay
  if (twoPlayerButton) {
    twoPlayerButton.onclick = showTwoPlayerOverlay;
  }

  if (closeTwoPlayerBtn) {
    closeTwoPlayerBtn.onclick = hideTwoPlayerOverlay;
  }

  // Classic 2P buttons
  const classic2PBtn = document.getElementById('classic2PBtn');
  const closeClassic2PBtn = document.getElementById('closeClassic2PBtn');
  const startClassic2PBtn = document.getElementById('startClassic2PBtn');
  
  if (classic2PBtn) {
    classic2PBtn.onclick = showClassic2POverlay;
  }
  
  if (closeClassic2PBtn) {
    closeClassic2PBtn.onclick = hideClassic2POverlay;
  }
  
  if (startClassic2PBtn) {
    startClassic2PBtn.onclick = startClassic2PGame;
  }

  // Panic 2P buttons
  const panic2PBtn = document.getElementById('panic2PBtn');
  const closePanic2PBtn = document.getElementById('closePanic2PBtn');
  const startPanic2PBtn = document.getElementById('startPanic2PBtn');
  
  if (panic2PBtn) {
    panic2PBtn.onclick = showPanic2POverlay;
  }
  
  if (closePanic2PBtn) {
    closePanic2PBtn.onclick = hidePanic2POverlay;
  }
  
  if (startPanic2PBtn) {
    startPanic2PBtn.onclick = startPanic2PGame;
  }

  // No Mercy 2P buttons
  const noMercy2PBtn = document.getElementById('noMercy2PBtn');
  const closeNoMercy2PBtn = document.getElementById('closeNoMercy2PBtn');
  const startNoMercy2PBtn = document.getElementById('startNoMercy2PBtn');
  
  if (noMercy2PBtn) {
    noMercy2PBtn.onclick = showNoMercy2POverlay;
  }
  
  if (closeNoMercy2PBtn) {
    closeNoMercy2PBtn.onclick = hideNoMercy2POverlay;
  }
  
  if (startNoMercy2PBtn) {
    startNoMercy2PBtn.onclick = startNoMercy2PGame;
  }

  // Battle Royale 2P button in main menu
  const battleRoyale2PBtn = document.getElementById('battleRoyale2PBtn');
  if (battleRoyale2PBtn) {
    battleRoyale2PBtn.onclick = () => {
      hideTwoPlayerOverlay();
      showBattleRoyaleOverlay();
    };
  }

  // Player 2 ready buttons
  const player2StartBtn = document.getElementById('player2StartBtn');
  if (player2StartBtn) {
    player2StartBtn.onclick = startPlayer2Game;
  }

  // Show Results overlay buttons
  const showResultsBtn = document.getElementById('showResultsBtn');
  if (showResultsBtn) {
    showResultsBtn.onclick = proceedToResults;
  }

  // Results overlay buttons
  const closeTwoPlayerResultsBtn = document.getElementById('closeTwoPlayerResultsBtn');
  const playAgain2PBtn = document.getElementById('playAgain2PBtn');
  
  if (closeTwoPlayerResultsBtn) {
    closeTwoPlayerResultsBtn.onclick = () => {
      hideTwoPlayerResultsOverlay();
      resetTwoPlayerMode(); // Reset when explicitly closing
    };
  }
  
  if (playAgain2PBtn) {
    playAgain2PBtn.onclick = playAgain2P;
  }

  // Old twoPlayerSettingsBtn removed - now using twoPlayerHeroBtn

  // Battle Royale overlay buttons
  const closeBattleRoyaleBtn = document.getElementById('closeBattleRoyaleBtn');
  const startBattleRoyaleBtn = document.getElementById('startBattleRoyaleBtn');
  
  if (closeBattleRoyaleBtn) {
    closeBattleRoyaleBtn.onclick = hideBattleRoyaleOverlay;
  }
  
  if (startBattleRoyaleBtn) {
    startBattleRoyaleBtn.onclick = startBattleRoyaleGame;
  }

  // Add click outside functionality for 2P overlays (excluding critical game flow overlays)
  const overlaysToHandle = [
    'twoPlayerOverlay',
    'classic2POverlay',
    'panic2POverlay',
    'battleRoyaleOverlay'
  ];
  
  overlaysToHandle.forEach(overlayId => {
    const overlay = document.getElementById(overlayId);
    if (overlay) {
      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
          overlay.style.display = 'none';
        }
      });
    }
  });
});

// BATTLE ROYALE MODE FUNCTIONS
function showBattleRoyaleOverlay() {
  const overlay = document.getElementById('battleRoyaleOverlay');
  if (overlay) {
    overlay.style.display = 'flex';
  }
}

function hideBattleRoyaleOverlay() {
  const overlay = document.getElementById('battleRoyaleOverlay');
  if (overlay) {
    overlay.style.display = 'none';
  }
}

function startBattleRoyaleGame() {
  hideBattleRoyaleOverlay();
  
  // Reset and initialize Battle Royale state
  battleRoyaleState = {
    isActive: true,
    player1Lives: 3,
    player2Lives: 3,
    currentPlayer: 1,
    gameEnded: false,
    winner: null,
    sharedDeck: null,
    originalSharedDeck: null
  };
  
  // Create shared infinite deck
  const originalDeck = createSharedInfiniteDeck();
  battleRoyaleState.sharedDeck = [...originalDeck];
  battleRoyaleState.originalSharedDeck = [...originalDeck];
  
  // Set game mode flags
  isTwoPlayerMode = true;
  isUnlimitedMode = true;
  isSpeedMode = false;
  isNoMercyMode = false;
  isShowAllButtonsMode = true;
  
  // Initialize game
  startGame();
  
  // Show Battle Royale scoreboard and hide normal scoreboard
  const normalScoreboard = document.getElementById('scoreboard');
  const battleScoreboard = document.getElementById('battleRoyaleScoreboard');
  
  if (normalScoreboard) normalScoreboard.style.display = 'none';
  if (battleScoreboard) battleScoreboard.style.display = 'flex';
  
  // Add class to body for CSS targeting
  document.body.classList.add('battle-royale-active');
  
  // Hide 2P player indicator text if it exists
  const currentPlayerText = document.getElementById('currentPlayerText');
  if (currentPlayerText) {
    currentPlayerText.style.display = 'none';
  }
  
  // Disable restart button during Battle Royale
  const restartButton = document.getElementById('restartButton');
  if (restartButton) {
    restartButton.disabled = true;
    restartButton.style.opacity = '0.5';
    restartButton.style.cursor = 'not-allowed';
  }
  
  // Update UI
  updateBattleRoyaleUI();
}

function createSharedInfiniteDeck() {
  const deck = [];
  // Create a larger deck for infinite mode
  for (let i = 0; i < 100; i++) {
    deck.push(createRandomCard());
  }
  shuffle(deck);
  return deck;
}

function updateBattleRoyaleUI() {
  if (!battleRoyaleState.isActive) return;
  
  // Update player names with current player indication
  const player1Name = document.getElementById('br-player1-name');
  const player2Name = document.getElementById('br-player2-name');
  const player1Lives = document.getElementById('player1Lives');
  const player2Lives = document.getElementById('player2Lives');
  
  if (player1Name && player2Name) {
    player1Name.classList.toggle('inactive', battleRoyaleState.currentPlayer !== 1);
    player2Name.classList.toggle('inactive', battleRoyaleState.currentPlayer !== 2);
  }
  
  if (player1Lives && player2Lives) {
    // Update lives display
    player1Lives.innerHTML = generateLivesDisplay(battleRoyaleState.player1Lives, 1);
    player2Lives.innerHTML = generateLivesDisplay(battleRoyaleState.player2Lives, 2);
    
    // Add glow effect for current player
    player1Lives.classList.toggle('current-player', battleRoyaleState.currentPlayer === 1);
    player2Lives.classList.toggle('current-player', battleRoyaleState.currentPlayer === 2);
  }
  
  // Add active player scaling animation
  const player1Section = document.querySelector('.player-section.player-1');
  const player2Section = document.querySelector('.player-section.player-2');
  
  if (player1Section && player2Section) {
    player1Section.classList.toggle('active-player', battleRoyaleState.currentPlayer === 1);
    player2Section.classList.toggle('active-player', battleRoyaleState.currentPlayer === 2);
  }
  
  // Update current player indicator
  const currentPlayerText = document.getElementById('currentPlayerText');
  if (currentPlayerText) {
    currentPlayerText.textContent = `Player ${battleRoyaleState.currentPlayer}`;
  }
  
  // Show glow effects on buttons based on ALL cards on table
  updateBattleRoyaleGlowEffects();
}

function generateLivesDisplay(lives, player = 1) {
  const maxLives = Math.max(lives, 3); // Show at least 3 heart positions
  let hearts = [];
  
  // Create array of hearts
  for (let i = 0; i < maxLives; i++) {
    if (i < lives) {
      hearts.push('♥');
    } else {
      hearts.push('<span class="life-lost">♥</span>');
    }
  }
  
  // For Player 2, reverse the order so lost hearts appear on the left
  if (player === 2) {
    hearts.reverse();
  }
  
  return hearts.join(' ');
}

function updateBattleRoyaleGlowEffects() {
  if (!battleRoyaleState.isActive) return;
  
  // Remove existing glow effects from ALL buttons first
  const allHigherBtns = document.querySelectorAll('.buttons button.up');
  const allLowerBtns = document.querySelectorAll('.buttons button.down');
  
  allHigherBtns.forEach(btn => {
    btn.classList.remove('button-glow-gold');
  });
  allLowerBtns.forEach(btn => {
    btn.classList.remove('button-glow-gold');
  });
  
  // Check each card pile individually and apply glow to corresponding buttons
  grid.forEach((pile, pileIndex) => {
    if (pile && pile.length > 0 && !pile.lost) {
      const topCard = pile[pile.length - 1];
      const cardRank = topCard.rank || topCard.value;
      
      console.log('Checking pile', pileIndex, 'card:', cardRank);
      
      // Find the buttons for this specific pile
      const pileButtons = document.querySelector(`[data-idx="${pileIndex}"] .buttons`);
      if (pileButtons) {
        const higherBtn = pileButtons.querySelector('button.up');
        const lowerBtn = pileButtons.querySelector('button.down');
        
        // Check for high cards (J/Q/K) - glow UP button
        if (['J', 'Q', 'K'].includes(cardRank) || ['J', 'Q', 'K'].includes(cardRank.toString())) {
          if (higherBtn) {
            higherBtn.classList.add('button-glow-gold');
          }
        }
        
        // Check for low cards (3/4/5) - glow DOWN button  
        if (['3', '4', '5'].includes(cardRank) || ['3', '4', '5'].includes(cardRank.toString())) {
          if (lowerBtn) {
            lowerBtn.classList.add('button-glow-gold');
          }
        }
      }
    }
  });
}

function showBattleRoyaleGlowEffects(cardValue) {
  // This function is kept for backwards compatibility
  updateBattleRoyaleGlowEffects();
}

function battleRoyaleGuess(direction, cardIndex) {
  if (!battleRoyaleState.isActive || battleRoyaleState.gameEnded) return false;
  if (!grid[cardIndex] || grid[cardIndex].lost) return false;
  
  const currentCard = grid[cardIndex][grid[cardIndex].length - 1];
  let nextCard;
  
  // Use shared deck if available, otherwise create random card
  if (battleRoyaleState.sharedDeck && battleRoyaleState.sharedDeck.length > 0) {
    nextCard = battleRoyaleState.sharedDeck.pop();
  } else {
    nextCard = createRandomCard();
  }
  
  // Determine if guess was correct
  let isCorrect = false;
  if (direction === 'higher') {
    isCorrect = nextCard.value > currentCard.value;
  } else if (direction === 'lower') {
    isCorrect = nextCard.value < currentCard.value;
  }
  
  // Check for equal cards (life bonus)
  const isEqual = nextCard.value === currentCard.value;
  
  // Check for special bonus conditions
  let isSpecialBonus = false;
  if (isCorrect) {
    if (['J', 'Q', 'K'].includes(currentCard.rank) && direction === 'higher') {
      isSpecialBonus = true;
    } else if (['3', '4', '5'].includes(currentCard.rank) && direction === 'lower') {
      isSpecialBonus = true;
    }
  }
  
  // Update the card display
  const cardDiv = document.querySelector(`.card[data-idx='${cardIndex}']`);
  if (cardDiv) {
    cardDiv.querySelector('.top-left').innerHTML = `${nextCard.rank}${nextCard.suit}`;
    cardDiv.querySelector('.bottom-right').innerHTML = `${nextCard.rank}${nextCard.suit}`;

    if (nextCard.color === 'red') {
      cardDiv.classList.add('red');
    } else {
      cardDiv.classList.remove('red');
    }
  }
  
  // Update lives based on result
  const currentPlayerLives = battleRoyaleState.currentPlayer === 1 ? 'player1Lives' : 'player2Lives';
  
  if (isEqual || isSpecialBonus) {
    // Gain life
    battleRoyaleState[currentPlayerLives]++;
    updateBattleRoyaleLives(battleRoyaleState.currentPlayer, 1);
    showCardLifeBonus(cardIndex, isEqual);
    animateCorrectGuess(cardIndex);
  } else if (!isCorrect) {
    // Lose life
    battleRoyaleState[currentPlayerLives]--;
    updateBattleRoyaleLives(battleRoyaleState.currentPlayer, -1);
    
    // Show wrong guess cross animation and shake animation simultaneously
    showWrongGuessCross(battleRoyaleState.currentPlayer, cardIndex);
    
    // Add shake animation and red flash
    if (cardDiv) {
      cardDiv.classList.add('shake');
      cardDiv.classList.add('red-flash');
      
      setTimeout(() => {
        cardDiv.classList.remove('shake');
        cardDiv.classList.remove('red-flash');
      }, 300);
    }
  } else {
    // Correct guess, no life change
    animateCorrectGuess(cardIndex);
  }
  
  // Update the grid
  grid[cardIndex].push(nextCard);
  
  // Check for game end
  if (battleRoyaleState.player1Lives <= 0 || battleRoyaleState.player2Lives <= 0) {
    battleRoyaleState.gameEnded = true;
    battleRoyaleState.winner = battleRoyaleState.player1Lives > 0 ? 1 : 2;
    
    setTimeout(() => {
      showBattleRoyaleResults();
    }, 500);
    
      return true;
}

// Show wrong guess cross animation for Battle Royale
function showWrongGuessCross(player, cardIndex) {
  // Create a temporary cross element on the card
  const cardDiv = document.querySelector(`.card[data-idx='${cardIndex}']`);
  
  if (cardDiv) {
    // Create cross element
    const crossElement = document.createElement('div');
    crossElement.className = 'wrong-guess-cross';
    crossElement.innerHTML = '❌';
    
    // Position it on the card
    cardDiv.style.position = 'relative';
    cardDiv.appendChild(crossElement);
    
    // Trigger animation immediately (no delay)
    crossElement.classList.add('show');
    
    // Remove the cross element after animation completes
    setTimeout(() => {
      if (crossElement.parentNode) {
        crossElement.parentNode.removeChild(crossElement);
      }
    }, 1200);
  }
}
  
  // Switch player
  battleRoyaleState.currentPlayer = battleRoyaleState.currentPlayer === 1 ? 2 : 1;
  
  // Update UI
  setTimeout(() => {
    updateBattleRoyaleUI();
    updateBattleRoyaleGlowEffects();
  }, 100);
  
  return true;
}

function updateBattleRoyaleLives(player, change) {
  const livesElement = document.getElementById(`player${player}Lives`);
  if (!livesElement) return;
  
  // Add animation class
  if (change > 0) {
    livesElement.classList.add('life-gain');
    setTimeout(() => livesElement.classList.remove('life-gain'), 600);
  } else if (change < 0) {
    livesElement.classList.add('life-loss');
    setTimeout(() => livesElement.classList.remove('life-loss'), 400);
  }
}

function showCardLifeBonus(cardIndex, isEqual = false) {
  const card = document.querySelector(`.card[data-idx="${cardIndex}"]`);
  if (!card) return;
  
  const bonus = document.createElement('div');
  bonus.className = isEqual ? 'card-equal-text' : 'card-life-bonus';
  bonus.textContent = isEqual ? 'EQUAL' : '♥';
  
  card.style.position = 'relative';
  card.appendChild(bonus);
  
  setTimeout(() => {
    if (bonus.parentNode) {
      bonus.parentNode.removeChild(bonus);
    }
  }, 1000);
}

function showBattleRoyaleResults() {
  // Hide Battle Royale scoreboard, show normal scoreboard
  const normalScoreboard = document.getElementById('scoreboard');
  const battleScoreboard = document.getElementById('battleRoyaleScoreboard');
  
  if (normalScoreboard) normalScoreboard.style.display = 'flex';
  if (battleScoreboard) battleScoreboard.style.display = 'none';
  
  // Remove class from body
  document.body.classList.remove('battle-royale-active');
  
  // Re-enable restart button
  const restartButton = document.getElementById('restartButton');
  if (restartButton) {
    restartButton.disabled = false;
    restartButton.style.opacity = '1';
    restartButton.style.cursor = 'pointer';
  }
  
  // Show Battle Royale specific results overlay
  const overlay = document.getElementById('battleRoyaleResultsOverlay');
  const winnerText = document.getElementById('battleRoyaleWinnerText');
  const winnerName = document.getElementById('battleRoyaleWinnerName');
  const winnerLives = document.getElementById('battleRoyaleWinnerLives');
  const rematchBtn = document.getElementById('battleRoyaleRematchBtn');
  
  if (overlay && winnerText) {
    // Set winner information
    winnerText.textContent = `Player ${battleRoyaleState.winner} Wins!`;
    winnerName.textContent = `Player ${battleRoyaleState.winner}`;
    
    // Show winner's remaining lives
    const winnerLifeCount = battleRoyaleState.winner === 1 ? battleRoyaleState.player1Lives : battleRoyaleState.player2Lives;
    let livesDisplay = '';
    for (let i = 0; i < winnerLifeCount; i++) {
      livesDisplay += '♥ ';
    }
    winnerLives.textContent = livesDisplay.trim();
    
    // Set up rematch button
    if (rematchBtn) {
      rematchBtn.onclick = () => {
        overlay.style.display = 'none';
        // Reset and start new Battle Royale game
        startBattleRoyaleGame();
      };
    }
    
    overlay.style.display = 'flex';
    
    // Start confetti animation for winner
    jsConfetti.addConfetti({
      confettiColors: ['#FFD700', '#FFA500', '#ff6b6b', '#f5f5dc', '#85a0bc', '#2980b9', '#3498db']
    });
  }
}

function resetBattleRoyaleMode() {
  battleRoyaleState = {
    isActive: false,
    player1Lives: 3,
    player2Lives: 3,
    currentPlayer: 1,
    gameEnded: false,
    winner: null,
    sharedDeck: null,
    originalSharedDeck: null
  };
  
  // Show normal scoreboard, hide Battle Royale scoreboard
  const normalScoreboard = document.getElementById('scoreboard');
  const battleScoreboard = document.getElementById('battleRoyaleScoreboard');
  
  if (normalScoreboard) normalScoreboard.style.display = 'flex';
  if (battleScoreboard) battleScoreboard.style.display = 'none';
  
  // Remove class from body
  document.body.classList.remove('battle-royale-active');
  
  // Show 2P player indicator text again if in 2P mode
  const currentPlayerText = document.getElementById('currentPlayerText');
  if (currentPlayerText && isTwoPlayerMode) {
    currentPlayerText.style.display = 'block';
  }
  
  // Re-enable restart button
  const restartButton = document.getElementById('restartButton');
  if (restartButton) {
    restartButton.disabled = false;
    restartButton.style.opacity = '1';
    restartButton.style.cursor = 'pointer';
  }
  
  // Reset game mode flags
  isTwoPlayerMode = false;
  isUnlimitedMode = false;
  isShowAllButtonsMode = false;
}

// Helper function to reset Battle Royale state when switching game modes
function resetBattleRoyaleForGameMode() {
  if (battleRoyaleState.isActive) {
    resetBattleRoyaleMode();
  }
}

startGame();

// PWA Installation and Update Handling med Git Hash Version
class PWAInstaller {
  constructor() {
    this.deferredPrompt = null;
    this.isInstalled = false;
    this.currentGitHash = this.getCurrentGitHash();
    this.init();
  }

  getCurrentGitHash() {
    const metaHash = document.querySelector('meta[name="git-hash"]');
    return metaHash ? metaHash.getAttribute('content') : 'unknown';
  }

  init() {
    // Check if app is already installed
    this.checkInstallStatus();
    
    // Listen for beforeinstallprompt
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('PWA install prompt available');
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallButton();
    });

    // Listen for app installed
    window.addEventListener('appinstalled', () => {
      console.log('PWA was installed');
      this.isInstalled = true;
      this.hideInstallButton();
    });

    // Register service worker
    this.registerServiceWorker();
  }

  checkInstallStatus() {
    // Check if running as PWA
    if (window.matchMedia('(display-mode: standalone)').matches || 
        window.navigator.standalone === true) {
      this.isInstalled = true;
      console.log('Running as PWA with Git Hash:', this.currentGitHash);
    }
  }

  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        // Use correct path for custom domain
        const registration = await navigator.serviceWorker.register('/beat/sw.js');
        console.log('Service Worker registered for Git Hash:', this.currentGitHash);

        // Check for updates immediately
        await this.checkForUpdates(registration);

        // Check for updates periodically
        setInterval(() => {
          this.checkForUpdates(registration);
        }, 30000); // Check every 30 seconds

        // Listen for updatefound event
        registration.addEventListener('updatefound', () => {
          console.log('Service Worker update found!');
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            console.log('New worker state:', newWorker.state);
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('New version installed, showing notification');
              this.showUpdateNotification();
            }
          });
        });

        // Listen for controlling service worker changes
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          console.log('Service Worker updated, reloading page...');
          window.location.reload();
        });

      } catch (error) {
        console.log('Service Worker registration failed:', error);
      }
    }
  }

  async checkForUpdates(registration) {
    try {
      console.log('Checking for updates...');
      await registration.update();
      console.log('Update check completed');
    } catch (error) {
      console.log('Update check failed:', error);
    }
  }

  showInstallButton() {
    // Don't show button if already installed
    if (this.isInstalled) return;
    
    // Check if user has hidden the button
    const isHidden = localStorage.getItem('pwa-install-hidden') === 'true';
    if (isHidden) {
      console.log('Install button hidden by user');
      return;
    }
    
    // Remove any existing install button first
    const existingBtn = document.getElementById('pwa-install-btn');
    if (existingBtn) {
      existingBtn.remove();
    }
    
    // Create install button container
    const installContainer = document.createElement('div');
    installContainer.id = 'pwa-install-btn';
    installContainer.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 10px;
      background: #16213e;
      padding: 15px 20px;
      border-radius: 30px;
      box-shadow: 0 6px 20px rgba(0,0,0,0.4);
      transition: all 0.3s ease;
      font-family: Arial, sans-serif;
    `;
    
    // Create install button
    const installBtn = document.createElement('button');
    installBtn.innerHTML = '📱 Install app';
    installBtn.style.cssText = `
      background: transparent;
      color: white;
      border: none;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      padding: 0;
      margin: 0;
    `;
    
    // Create checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'hide-install-checkbox';
    checkbox.style.cssText = `
      width: 16px;
      height: 16px;
      cursor: pointer;
      accent-color: #4CAF50;
    `;
    
    // Create label for checkbox
    const label = document.createElement('label');
    label.htmlFor = 'hide-install-checkbox';
    label.textContent = 'Dölj';
    label.style.cssText = `
      color: white;
      font-size: 12px;
      cursor: pointer;
      user-select: none;
    `;
    
    // Add event listeners
    installBtn.addEventListener('click', () => this.installApp());
    
    checkbox.addEventListener('change', (e) => {
      if (e.target.checked) {
        localStorage.setItem('pwa-install-hidden', 'true');
        installContainer.remove();
        console.log('Install button hidden until next visit');
      }
    });
    
    // Hover effects
    installContainer.addEventListener('mouseenter', () => {
      installContainer.style.transform = 'translateX(-50%) scale(1.05)';
      installContainer.style.background = '#1a1a2e';
    });
    
    installContainer.addEventListener('mouseleave', () => {
      installContainer.style.transform = 'translateX(-50%) scale(1)';
      installContainer.style.background = '#16213e';
    });

    // Assemble the container
    installContainer.appendChild(installBtn);
    installContainer.appendChild(checkbox);
    installContainer.appendChild(label);
    
    document.body.appendChild(installContainer);
    console.log('Install button with hide option created and positioned at top center');
  }

  hideInstallButton() {
    const installBtn = document.getElementById('pwa-install-btn');
    if (installBtn) {
      installBtn.remove();
    }
  }

  async installApp() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      const { outcome } = await this.deferredPrompt.userChoice;
      console.log('User choice:', outcome);
      this.deferredPrompt = null;
      
      if (outcome === 'accepted') {
        this.hideInstallButton();
      }
    }
  }

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
        padding: 20px 30px;
        border-radius: 15px;
        box-shadow: 0 6px 20px rgba(0,0,0,0.4);
        z-index: 1001;
        text-align: center;
        max-width: 500px;
        width: 90%;
        font-family: Arial, sans-serif;
        border: 2px solid #FFD700;
      ">
        <div style="font-weight: bold; margin-bottom: 10px; color: #FFD700; font-size: 18px;">🔄 Update Available!</div>
        <div style="font-size: 12px; margin-bottom: 5px; opacity: 0.8;">Current: ${this.currentGitHash}</div>
        <div style="font-size: 16px; margin-bottom: 20px;">A new version is ready to install.</div>
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 15px;">
          <button id="dismiss-update" style="
            background: #1a1a2e;
            color: #FFD700;
            border: 2px solid #FFD700;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-family: Arial, sans-serif;
            font-weight: bold;
            transition: all 0.3s ease;
            flex: 1;
          ">Later</button>
          <button id="update-btn" style="
            background: #FFD700;
            color: #16213e;
            border: 2px solid #FFD700;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-family: Arial, sans-serif;
            font-weight: bold;
            transition: all 0.3s ease;
            flex: 1;
          ">Update Now</button>
        </div>
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

  updateApp() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then(registration => {
        if (registration && registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
      });
    }
    // Remove notification
    const updateDiv = document.getElementById('pwa-update-notification');
    if (updateDiv) updateDiv.remove();
  }
}

// Initialize PWA when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PWAInstaller();
});