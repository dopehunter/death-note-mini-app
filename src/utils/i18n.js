/**
 * Death Note Mini-App
 * i18n (Internationalization) Module
 */

// Available languages
const AVAILABLE_LANGUAGES = ['en', 'ru', 'de'];

// Default language
let currentLanguage = 'en';

// Translations
const translations = {
    // English (default)
    en: {
        // Language selection
        selectLanguage: 'Select Language',
        
        // Menu screen
        welcomeTitle: 'Welcome, Kira',
        introText: 'You have found the Death Note. With its power, you can bring justice to the world.',
        startGame: 'Start Justice',
        rules: 'Rules',
        returnToRyuk: 'Return to Ryuk',
        
        // Game screen
        caseTitle: 'Case #1: The Serial Killer',
        daysLeft: 'Days left: 5',
        noteUses: 'Death Note uses: 3',
        evidence: 'Evidence',
        suspects: 'Suspects',
        useDeathNote: 'Use Death Note',
        solve: 'Solve Case',
        
        // Death Note
        deathNote: 'Death Note',
        noteRules: 'The human whose name is written in this note shall die.',
        writeNameHere: 'Write name here...',
        write: 'Write',
        
        // Results screen
        caseResults: 'Case Results',
        nextCase: 'Next Case',
        shareResults: 'Share Results',
        mainMenu: 'Main Menu',
        
        // Rules screen
        rulesOfDeathNote: 'Rules of the Death Note',
        back: 'Back',
        gameRules: 'Game Rules',
        
        // Death Note Rules
        rule1: 'The human whose name is written in this note shall die.',
        rule2: 'This note will not take effect unless the writer has the person\'s face in mind when writing their name.',
        rule3: 'If the cause of death is written within the next 40 seconds of writing the person\'s name, it will happen.',
        rule4: 'If the cause of death is not specified, the person will simply die of a heart attack.',
        rule5: 'After writing the cause of death, details of the death should be written in the next 6 minutes and 40 seconds.',
        
        // Game Rules
        gameRule1: 'Solve crimes by analyzing evidence and identifying suspects.',
        gameRule2: 'Use the Death Note wisely - you have a limited number of uses.',
        gameRule3: 'Writing an innocent person\'s name will lead to negative consequences.',
        gameRule4: 'Each action consumes time - manage your days carefully.',
        gameRule5: 'To win, you must solve all cases and eliminate all criminals.',
        
        // Case information
        caseBrief: 'Case Brief',
        caseBriefText: 'As Light Yagami, your goal is to:',
        caseBriefItem1: 'Review the evidence carefully',
        caseBriefItem2: 'Identify the culprit among the suspects',
        caseBriefItem3: 'Use the Death Note to eliminate the culprit',
        caseBriefItem4: 'Solve the case within the time limit',
        
        // Case results
        caseSolved: 'Case Solved Successfully!',
        caseSolvedText: 'You have eliminated the criminal and brought justice to the world.',
        caseFailed: 'Case Failed',
        caseFailedText: 'You failed to identify the true criminal or eliminated an innocent person.',
        
        // Footer
        footer: 'Created by Ryuk • Light Yagami is watching'
    },
    
    // Russian
    ru: {
        // Language selection
        selectLanguage: 'Выберите Язык',
        
        // Menu screen
        welcomeTitle: 'Добро пожаловать, Кира',
        introText: 'Вы нашли Тетрадь Смерти. С её помощью вы можете принести справедливость в мир.',
        startGame: 'Начать правосудие',
        rules: 'Правила',
        returnToRyuk: 'Вернуться к Рюку',
        
        // Game screen
        caseTitle: 'Дело №1: Серийный убийца',
        daysLeft: 'Осталось дней: 5',
        noteUses: 'Использований Тетради: 3',
        evidence: 'Улики',
        suspects: 'Подозреваемые',
        useDeathNote: 'Использовать Тетрадь',
        solve: 'Решить дело',
        
        // Death Note
        deathNote: 'Тетрадь Смерти',
        noteRules: 'Человек, чьё имя записано в этой тетради, умрёт.',
        writeNameHere: 'Напишите имя здесь...',
        write: 'Записать',
        
        // Results screen
        caseResults: 'Результаты Дела',
        nextCase: 'Следующее Дело',
        shareResults: 'Поделиться Результатами',
        mainMenu: 'Главное Меню',
        
        // Rules screen
        rulesOfDeathNote: 'Правила Тетради Смерти',
        back: 'Назад',
        gameRules: 'Правила Игры',
        
        // Death Note Rules
        rule1: 'Человек, чьё имя записано в этой тетради, умрёт.',
        rule2: 'Эта тетрадь не подействует, если писавший не представляет лицо того, чьё имя он пишет.',
        rule3: 'Если причина смерти написана в течение 40 секунд после написания имени, то человек умрёт так, как указано.',
        rule4: 'Если причина смерти не указана, человек просто умрёт от сердечного приступа.',
        rule5: 'После указания причины смерти, у вас есть 6 минут и 40 секунд, чтобы описать детали смерти.',
        
        // Game Rules
        gameRule1: 'Расследуйте преступления, анализируя улики и выявляя подозреваемых.',
        gameRule2: 'Используйте Тетрадь Смерти с умом - у вас ограниченное количество использований.',
        gameRule3: 'Написание имени невиновного человека приведёт к негативным последствиям.',
        gameRule4: 'Каждое действие отнимает время - управляйте днями осторожно.',
        gameRule5: 'Чтобы выиграть, вы должны раскрыть все дела и устранить всех преступников.',
        
        // Case information
        caseBrief: 'Описание Дела',
        caseBriefText: 'Как Лайт Ягами, ваша цель:',
        caseBriefItem1: 'Тщательно изучить улики',
        caseBriefItem2: 'Определить преступника среди подозреваемых',
        caseBriefItem3: 'Использовать Тетрадь Смерти для устранения преступника',
        caseBriefItem4: 'Решить дело в отведённый срок',
        
        // Case results
        caseSolved: 'Дело Успешно Раскрыто!',
        caseSolvedText: 'Вы устранили преступника и принесли справедливость в мир.',
        caseFailed: 'Дело Провалено',
        caseFailedText: 'Вы не смогли выявить настоящего преступника или устранили невиновного человека.',
        
        // Footer
        footer: 'Создано Рюком • Лайт Ягами наблюдает'
    },
    
    // German
    de: {
        // Language selection
        selectLanguage: 'Sprache Wählen',
        
        // Menu screen
        welcomeTitle: 'Willkommen, Kira',
        introText: 'Du hast das Death Note gefunden. Mit seiner Macht kannst du der Welt Gerechtigkeit bringen.',
        startGame: 'Gerechtigkeit beginnen',
        rules: 'Regeln',
        returnToRyuk: 'Zurück zu Ryuk',
        
        // Game screen
        caseTitle: 'Fall #1: Der Serienmörder',
        daysLeft: 'Verbleibende Tage: 5',
        noteUses: 'Death Note Verwendungen: 3',
        evidence: 'Beweise',
        suspects: 'Verdächtige',
        useDeathNote: 'Death Note benutzen',
        solve: 'Fall lösen',
        
        // Death Note
        deathNote: 'Death Note',
        noteRules: 'Der Mensch, dessen Name in diesem Notizbuch geschrieben steht, wird sterben.',
        writeNameHere: 'Namen hier eintragen...',
        write: 'Schreiben',
        
        // Results screen
        caseResults: 'Fallergebnisse',
        nextCase: 'Nächster Fall',
        shareResults: 'Ergebnisse teilen',
        mainMenu: 'Hauptmenü',
        
        // Rules screen
        rulesOfDeathNote: 'Regeln des Death Note',
        back: 'Zurück',
        gameRules: 'Spielregeln',
        
        // Death Note Rules
        rule1: 'Der Mensch, dessen Name in diesem Notizbuch geschrieben steht, wird sterben.',
        rule2: 'Dieses Notizbuch wird nicht wirken, wenn der Schreiber nicht das Gesicht der Person im Sinn hat, während er ihren Namen schreibt.',
        rule3: 'Wenn die Todesursache innerhalb von 40 Sekunden nach dem Schreiben des Namens eingetragen wird, wird sie eintreten.',
        rule4: 'Wenn die Todesursache nicht angegeben ist, stirbt die Person einfach an einem Herzinfarkt.',
        rule5: 'Nach dem Eintragen der Todesursache hat man 6 Minuten und 40 Sekunden Zeit, um die Details des Todes zu beschreiben.',
        
        // Game Rules
        gameRule1: 'Löse Verbrechen, indem du Beweise analysierst und Verdächtige identifizierst.',
        gameRule2: 'Nutze das Death Note weise - du hast nur begrenzte Verwendungsmöglichkeiten.',
        gameRule3: 'Das Aufschreiben des Namens einer unschuldigen Person führt zu negativen Konsequenzen.',
        gameRule4: 'Jede Aktion verbraucht Zeit - verwalte deine Tage sorgfältig.',
        gameRule5: 'Um zu gewinnen, musst du alle Fälle lösen und alle Kriminellen beseitigen.',
        
        // Case information
        caseBrief: 'Fallbeschreibung',
        caseBriefText: 'Als Light Yagami ist dein Ziel:',
        caseBriefItem1: 'Die Beweise sorgfältig zu überprüfen',
        caseBriefItem2: 'Den Täter unter den Verdächtigen zu identifizieren',
        caseBriefItem3: 'Das Death Note zu verwenden, um den Täter zu beseitigen',
        caseBriefItem4: 'Den Fall innerhalb des Zeitlimits zu lösen',
        
        // Case results
        caseSolved: 'Fall erfolgreich gelöst!',
        caseSolvedText: 'Du hast den Kriminellen beseitigt und der Welt Gerechtigkeit gebracht.',
        caseFailed: 'Fall gescheitert',
        caseFailedText: 'Du konntest den wahren Täter nicht identifizieren oder hast eine unschuldige Person beseitigt.',
        
        // Footer
        footer: 'Erstellt von Ryuk • Light Yagami beobachtet'
    }
};

// Initialize language from URL, localStorage or browser settings
function initLanguage() {
    let langToUse = null;
    
    // First check URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    
    if (langParam && AVAILABLE_LANGUAGES.includes(langParam)) {
        langToUse = langParam;
    }
    
    // If not in URL, try localStorage
    if (!langToUse) {
        const savedLang = localStorage.getItem('deathNoteLanguage');
        if (savedLang && AVAILABLE_LANGUAGES.includes(savedLang)) {
            langToUse = savedLang;
        }
    }
    
    // If still not found, try browser language
    if (!langToUse) {
        const browserLang = navigator.language.split('-')[0];
        if (AVAILABLE_LANGUAGES.includes(browserLang)) {
            langToUse = browserLang;
        }
    }
    
    // Set the language if we found a valid one
    if (langToUse) {
        currentLanguage = langToUse;
        localStorage.setItem('deathNoteLanguage', langToUse);
    }
    
    // Apply translations
    applyTranslations();
}

// Change language
function setLanguage(lang) {
    if (AVAILABLE_LANGUAGES.includes(lang)) {
        currentLanguage = lang;
        localStorage.setItem('deathNoteLanguage', lang);
        applyTranslations();
        return true;
    }
    return false;
}

// Get current language
function getLanguage() {
    return currentLanguage;
}

// Apply translations to all elements with data-i18n attribute
function applyTranslations() {
    // Set language attribute on html element
    document.documentElement.setAttribute('lang', currentLanguage);
    
    // Update all elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
    
    // Update all input placeholders with data-i18n-placeholder attribute
    const inputs = document.querySelectorAll('[data-i18n-placeholder]');
    inputs.forEach(input => {
        const key = input.getAttribute('data-i18n-placeholder');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            input.placeholder = translations[currentLanguage][key];
        }
    });
    
    // Dispatch a custom event that other scripts can listen for
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: currentLanguage }}));
}

// Translate a specific key
function translate(key) {
    if (translations[currentLanguage] && translations[currentLanguage][key]) {
        return translations[currentLanguage][key];
    }
    // Fallback to English
    if (translations.en && translations.en[key]) {
        return translations.en[key];
    }
    // If key not found, return the key itself
    return key;
}

// Setup language selection event handlers
function setupLanguageSelection() {
    // Language selection screen buttons
    const langButtons = document.querySelectorAll('.lang-select-button');
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            if (setLanguage(lang)) {
                // Hide language screen and show menu
                document.getElementById('languageScreen').classList.add('hide');
                document.getElementById('menuScreen').classList.remove('hide');
            }
        });
    });
    
    // Language switcher in header
    const langToggle = document.getElementById('langToggle');
    const langDropdown = document.getElementById('langDropdown');
    
    // Toggle dropdown
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            langDropdown.classList.toggle('hide');
        });
    }
    
    // Language options in dropdown
    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.getAttribute('data-lang');
            setLanguage(lang);
            langDropdown.classList.add('hide');
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.language-switcher')) {
            langDropdown.classList.add('hide');
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    setupLanguageSelection();
    
    // Show language selection screen first, then menu
    document.getElementById('loading').classList.add('hide');
    document.getElementById('languageScreen').classList.remove('hide');
}); 