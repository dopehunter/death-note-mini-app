/**
 * Death Note Mini-App
 * Main entry point
 */

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Telegram Mini App
    const telegramApp = window.Telegram?.WebApp;
    
    // Set up the app
    initApp();
    
    // Initialize the game
    initGame();
    
    // Get user info from Telegram if available
    if (telegramApp) {
        const user = telegramApp.initDataUnsafe?.user;
        if (user) {
            const userInfoElement = document.getElementById('userInfo');
            userInfoElement.textContent = `${user.first_name || 'Kira'}`;
        }
        
        // Set Telegram theme
        document.body.style.setProperty('--dn-black', telegramApp.themeParams.bg_color || '#0a0a0a');
        document.body.style.setProperty('--dn-white', telegramApp.themeParams.text_color || '#f0f0f0');
        
        // Expand the app to fullscreen
        telegramApp.expand();
        
        // Set main button for actions later
        telegramApp.MainButton.setParams({
            text: translate('startGame'),
            color: '#b20000',
            text_color: '#ffffff',
            is_visible: false
        });
    }
    
    // Update the main button when language changes
    document.addEventListener('languageChanged', (e) => {
        if (telegramApp) {
            telegramApp.MainButton.setText(translate('startGame'));
        }
        
        // Update dynamic content that might not have data-i18n attributes
        updateDynamicContent();
    });
});

// Initialize app event listeners
function initApp() {
    // Menu buttons
    document.getElementById('startGameBtn').addEventListener('click', startGame);
    document.getElementById('rulesBtn').addEventListener('click', showRules);
    document.getElementById('backToChatBtn').addEventListener('click', backToChat);
    
    // Rules screen
    document.getElementById('backFromRulesBtn').addEventListener('click', backFromRules);
    
    // Game screen buttons
    document.getElementById('viewEvidenceBtn').addEventListener('click', viewEvidence);
    document.getElementById('viewSuspectsBtn').addEventListener('click', viewSuspects);
    document.getElementById('useDeathNoteBtn').addEventListener('click', toggleDeathNote);
    document.getElementById('solveBtn').addEventListener('click', attemptSolve);
    
    // Death Note actions
    document.getElementById('writeNameBtn').addEventListener('click', writeNameInDeathNote);
    
    // Results screen
    document.getElementById('nextCaseBtn').addEventListener('click', nextCase);
    document.getElementById('shareResultsBtn').addEventListener('click', shareResults);
    document.getElementById('returnToMenuBtn').addEventListener('click', returnToMenu);
}

// Show the rules screen
function showRules() {
    hideAllScreens();
    document.getElementById('rulesScreen').classList.remove('hide');
    updateBackButton();
}

// Go back from rules to menu
function backFromRules() {
    hideAllScreens();
    document.getElementById('menuScreen').classList.remove('hide');
    updateBackButton();
}

// Close the app and return to chat
function backToChat() {
    const telegramApp = window.Telegram?.WebApp;
    if (telegramApp) {
        telegramApp.close();
    }
}

// Start the game
function startGame() {
    hideAllScreens();
    document.getElementById('gameScreen').classList.remove('hide');
    loadCase(1); // Load the first case
    updateBackButton();
}

// Hide all screens
function hideAllScreens() {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.add('hide');
    });
}

// Toggle the Death Note panel
function toggleDeathNote() {
    const deathNotePanel = document.getElementById('deathNotePanel');
    if (deathNotePanel.classList.contains('hide')) {
        deathNotePanel.classList.remove('hide');
        document.getElementById('useDeathNoteBtn').textContent = translate('closeDeathNote');
    } else {
        deathNotePanel.classList.add('hide');
        document.getElementById('useDeathNoteBtn').textContent = translate('useDeathNote');
    }
}

// Write a name in the Death Note
function writeNameInDeathNote() {
    const nameInput = document.getElementById('nameInput');
    const name = nameInput.value.trim();
    
    if (name) {
        // Add the name to the written names
        const writtenNames = document.getElementById('writtenNames');
        const nameEntry = document.createElement('p');
        nameEntry.textContent = name;
        writtenNames.appendChild(nameEntry);
        
        // Clear the input
        nameInput.value = '';
        
        // Update game state
        updateDeathNoteUses();
        
        // Check if this was the correct suspect
        checkDeathNoteTarget(name);
    }
}

// Update the Death Note uses counter
function updateDeathNoteUses() {
    // For now, just decrement the counter
    const usesElement = document.getElementById('noteUses');
    const currentUses = parseInt(usesElement.textContent.split(': ')[1]);
    if (currentUses > 0) {
        const newUses = currentUses - 1;
        
        // Update with translated template
        if (getLanguage() === 'en') {
            usesElement.textContent = `Death Note uses: ${newUses}`;
        } else if (getLanguage() === 'ru') {
            usesElement.textContent = `Использований Тетради: ${newUses}`;
        } else if (getLanguage() === 'de') {
            usesElement.textContent = `Death Note Verwendungen: ${newUses}`;
        }
    }
    
    // Disable the Death Note if no uses left
    if (currentUses <= 1) {
        document.getElementById('writeNameBtn').disabled = true;
        document.getElementById('nameInput').disabled = true;
    }
}

// Go to the results screen after solving a case
function showResults(solved) {
    hideAllScreens();
    
    const resultsSummary = document.getElementById('resultsSummary');
    resultsSummary.innerHTML = '';
    
    if (solved) {
        const successMessage = document.createElement('h3');
        successMessage.textContent = translate('caseSolved');
        successMessage.style.color = '#4CAF50';
        resultsSummary.appendChild(successMessage);
        
        const detailsMessage = document.createElement('p');
        detailsMessage.textContent = translate('caseSolvedText');
        resultsSummary.appendChild(detailsMessage);
    } else {
        const failureMessage = document.createElement('h3');
        failureMessage.textContent = translate('caseFailed');
        failureMessage.style.color = '#b20000';
        resultsSummary.appendChild(failureMessage);
        
        const detailsMessage = document.createElement('p');
        detailsMessage.textContent = translate('caseFailedText');
        resultsSummary.appendChild(detailsMessage);
    }
    
    document.getElementById('resultsScreen').classList.remove('hide');
    updateBackButton();
}

// Go to the next case
function nextCase() {
    // For demo, just go back to menu
    returnToMenu();
}

// Share results with the Telegram chat
function shareResults() {
    const telegramApp = window.Telegram?.WebApp;
    if (telegramApp) {
        telegramApp.sendData(JSON.stringify({
            action: 'share_results',
            case_solved: true, // Replace with actual result
            case_id: 1, // Replace with actual case ID
            language: getLanguage() // Include the language
        }));
    }
}

// Return to the main menu
function returnToMenu() {
    hideAllScreens();
    document.getElementById('menuScreen').classList.remove('hide');
    updateBackButton();
}

// Update Telegram back button based on current screen
function updateBackButton() {
    const telegramApp = window.Telegram?.WebApp;
    if (!telegramApp) return;
    
    const currentScreen = getCurrentScreen();
    
    if (currentScreen === 'menuScreen' || currentScreen === 'loadingScreen' || currentScreen === 'languageScreen') {
        telegramApp.BackButton.hide();
    } else {
        telegramApp.BackButton.show();
    }
}

// Get current screen
function getCurrentScreen() {
    if (!document.getElementById('loading').classList.contains('hide')) {
        return 'loadingScreen';
    }
    if (!document.getElementById('languageScreen').classList.contains('hide')) {
        return 'languageScreen';
    }
    if (!document.getElementById('menuScreen').classList.contains('hide')) {
        return 'menuScreen';
    }
    if (!document.getElementById('gameScreen').classList.contains('hide')) {
        return 'gameScreen';
    }
    if (!document.getElementById('rulesScreen').classList.contains('hide')) {
        return 'rulesScreen';
    }
    if (!document.getElementById('resultsScreen').classList.contains('hide')) {
        return 'resultsScreen';
    }
    
    return null;
}

// Update dynamic content that can't use data-i18n
function updateDynamicContent() {
    // Update dynamic texts that depend on values (like days left, note uses, etc.)
    const currentCase = gameState?.currentCase;
    if (currentCase) {
        // Update days left text using translate with formatted value
        document.getElementById('daysLeft').textContent = 
            translate('daysLeft').replace('5', gameState.daysLeft);
            
        // Update note uses text using translate with formatted value
        document.getElementById('noteUses').textContent = 
            translate('noteUses').replace('3', gameState.deathNoteUses);
    }
    
    // Update Death Note button text if panel is open
    const deathNotePanel = document.getElementById('deathNotePanel');
    if (!deathNotePanel.classList.contains('hide')) {
        document.getElementById('useDeathNoteBtn').textContent = translate('closeDeathNote');
    }
} 