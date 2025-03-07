/**
 * Death Note Mini-App
 * Game Logic Module
 */

// We'll access translation utilities from global scope when needed
// NOT at import time because they may not be available yet

// Game state
let gameState = {
    currentCase: null,
    casesSolved: 0,
    daysLeft: 5,
    deathNoteUses: 3,
    suspects: [],
    evidence: [],
    killedSuspects: []
};

// Case database with translations
const caseTranslations = {
    // English cases
    en: [
        {
            id: 1,
            title: "Case #1: The Serial Killer",
            description: "A series of murders has occurred in Tokyo. All victims died of heart attacks, but they were all criminals who had escaped justice. The police are baffled.",
            days: 5,
            deathNoteUses: 3,
            culprit: "Higuchi Kyosuke",
            evidence: [
                {
                    id: "e1",
                    title: "Crime Scene Photos",
                    description: "Photos showing victims died clutching their chests. No signs of struggle or forced entry."
                },
                {
                    id: "e2",
                    title: "Victim List",
                    description: "All victims were criminals who had escaped prosecution or received light sentences."
                },
                {
                    id: "e3",
                    title: "Surveillance Footage",
                    description: "One victim was caught on camera dying suddenly at a cafe. A businessman in a suit was watching from across the street."
                }
            ],
            suspects: [
                {
                    id: "s1",
                    name: "Higuchi Kyosuke",
                    description: "A businessman who works at Yotsuba Group. Has expressed extreme views about justice on social media.",
                    isGuilty: true,
                    clues: ["Was seen near the location of the third murder.", "Has access to criminal records through company database.", "Recent promotion coincided with start of killings."]
                },
                {
                    id: "s2",
                    name: "Misa Amane",
                    description: "A popular model whose parents were murdered. The killer was never brought to justice.",
                    isGuilty: false,
                    clues: ["Publicly supports the mysterious killings.", "Has an alibi for two of the murder times.", "Shows no signs of the calculated planning evident in the crimes."]
                },
                {
                    id: "s3",
                    name: "Teru Mikami",
                    description: "A prosecutor who has lost several high-profile cases against obvious criminals.",
                    isGuilty: false,
                    clues: ["Was out of the country during two of the killings.", "Has expressed frustration with the justice system.", "Works within legal channels despite his frustration."]
                }
            ]
        },
        {
            id: 2,
            title: "Case #2: The Corporate Conspiracy",
            description: "CEOs of competing companies are dying in mysterious accidents. All companies are now being acquired by Yotsuba Group.",
            days: 6,
            deathNoteUses: 2,
            culprit: "Reiji Namikawa",
            evidence: [
                {
                    id: "e1",
                    title: "Financial Records",
                    description: "Yotsuba Group's stock rises after each CEO's death."
                },
                {
                    id: "e2",
                    title: "Meeting Minutes",
                    description: "Secret meetings held by Yotsuba executives discussing 'removing obstacles'."
                },
                {
                    id: "e3",
                    title: "Accident Reports",
                    description: "All deaths appeared to be accidents but occurred in statistically improbable ways."
                }
            ],
            suspects: [
                {
                    id: "s1",
                    name: "Reiji Namikawa",
                    description: "Yotsuba's Director of Sales. Known for his ruthless business tactics.",
                    isGuilty: true,
                    clues: ["Was present at all meetings where 'obstacles' were discussed.", "Received largest bonus after acquisitions.", "Has personal grudges against two of the deceased CEOs."]
                },
                {
                    id: "s2",
                    name: "Shingo Mido",
                    description: "Yotsuba's Marketing Director. Stands to gain from company expansion.",
                    isGuilty: false,
                    clues: ["Opposed aggressive acquisition strategies in private emails.", "Was on vacation during two deaths.", "Has family connections to one of the victim's companies."]
                },
                {
                    id: "s3",
                    name: "Suguru Shimura",
                    description: "Yotsuba's Personnel Director. Has access to all company information.",
                    isGuilty: false,
                    clues: ["No direct benefit from the acquisitions.", "Expressed ethical concerns in private communications.", "Had alibis for three of the deaths."]
                }
            ]
        }
    ],
    
    // Russian cases
    ru: [
        {
            id: 1,
            title: "Дело №1: Серийный убийца",
            description: "В Токио произошла серия убийств. Все жертвы умерли от сердечных приступов, но все они были преступниками, избежавшими правосудия. Полиция в недоумении.",
            days: 5,
            deathNoteUses: 3,
            culprit: "Хигучи Кёсукэ",
            evidence: [
                {
                    id: "e1",
                    title: "Фотографии с места преступления",
                    description: "На фотографиях видно, что жертвы умерли, схватившись за грудь. Нет признаков борьбы или взлома."
                },
                {
                    id: "e2",
                    title: "Список жертв",
                    description: "Все жертвы были преступниками, которые избежали судебного преследования или получили мягкие приговоры."
                },
                {
                    id: "e3",
                    title: "Записи с камер наблюдения",
                    description: "Одна из жертв была заснята в момент внезапной смерти в кафе. Бизнесмен в костюме наблюдал с противоположной стороны улицы."
                }
            ],
            suspects: [
                {
                    id: "s1",
                    name: "Хигучи Кёсукэ",
                    description: "Бизнесмен, работающий в компании Ётсуба. Выражал экстремистские взгляды на правосудие в социальных сетях.",
                    isGuilty: true,
                    clues: ["Был замечен рядом с местом третьего убийства.", "Имеет доступ к базе данных преступников через корпоративную систему.", "Недавнее повышение совпало с началом убийств."]
                },
                {
                    id: "s2",
                    name: "Миса Аманэ",
                    description: "Популярная модель, чьи родители были убиты. Убийца никогда не был привлечен к ответственности.",
                    isGuilty: false,
                    clues: ["Публично поддерживает таинственные убийства.", "Имеет алиби на время двух убийств.", "Не проявляет признаков расчетливого планирования, очевидного в этих преступлениях."]
                },
                {
                    id: "s3",
                    name: "Теру Миками",
                    description: "Прокурор, проигравший несколько громких дел против очевидных преступников.",
                    isGuilty: false,
                    clues: ["Был за границей во время двух убийств.", "Выражал разочарование в судебной системе.", "Несмотря на разочарование, действует в рамках закона."]
                }
            ]
        },
        {
            id: 2,
            title: "Дело №2: Корпоративный заговор",
            description: "Генеральные директора конкурирующих компаний погибают в загадочных несчастных случаях. Все компании теперь приобретаются группой Ётсуба.",
            days: 6,
            deathNoteUses: 2,
            culprit: "Рейджи Намикава",
            evidence: [
                {
                    id: "e1",
                    title: "Финансовые отчеты",
                    description: "Акции группы Ётсуба растут после смерти каждого генерального директора."
                },
                {
                    id: "e2",
                    title: "Протоколы собраний",
                    description: "Секретные встречи руководителей Ётсуба, обсуждающих 'устранение препятствий'."
                },
                {
                    id: "e3",
                    title: "Отчеты о несчастных случаях",
                    description: "Все смерти выглядели как несчастные случаи, но произошли статистически невероятным образом."
                }
            ],
            suspects: [
                {
                    id: "s1",
                    name: "Рейджи Намикава",
                    description: "Директор по продажам Ётсуба. Известен своей безжалостной деловой тактикой.",
                    isGuilty: true,
                    clues: ["Присутствовал на всех встречах, где обсуждались 'препятствия'.", "Получил самый большой бонус после приобретений.", "Имеет личные счеты с двумя умершими директорами."]
                },
                {
                    id: "s2",
                    name: "Синго Мидо",
                    description: "Директор по маркетингу Ётсуба. Заинтересован в расширении компании.",
                    isGuilty: false,
                    clues: ["Выступал против агрессивных стратегий приобретения в личных электронных письмах.", "War während zwei Todesfällen im Urlaub.", "Hat familiäre Verbindungen zu einem der Unternehmen der Opfer."]
                },
                {
                    id: "s3",
                    name: "Сугуру Симура",
                    description: "Директор по персоналу Ётсуба. Имеет доступ ко всей информации компании.",
                    isGuilty: false,
                    clues: ["Нет прямой выгоды от приобретений.", "Выражал этические опасения в приватных коммуникациях.", "Имел алиби на время трех смертей."]
                }
            ]
        }
    ],
    
    // German cases
    de: [
        {
            id: 1,
            title: "Fall #1: Der Serienmörder",
            description: "In Tokio ist eine Reihe von Morden geschehen. Alle Opfer starben an Herzanfällen, aber sie waren alle Verbrecher, die der Gerechtigkeit entkommen waren. Die Polizei ist ratlos.",
            days: 5,
            deathNoteUses: 3,
            culprit: "Higuchi Kyosuke",
            evidence: [
                {
                    id: "e1",
                    title: "Fotos vom Tatort",
                    description: "Fotos zeigen, dass die Opfer starben, während sie sich an die Brust fassten. Keine Anzeichen von Kampf oder gewaltsamen Eindringen."
                },
                {
                    id: "e2",
                    title: "Opferliste",
                    description: "Alle Opfer waren Verbrecher, die einer Strafverfolgung entgangen sind oder milde Urteile erhalten haben."
                },
                {
                    id: "e3",
                    title: "Überwachungsaufnahmen",
                    description: "Ein Opfer wurde auf Kamera festgehalten, als es plötzlich in einem Café starb. Ein Geschäftsmann im Anzug beobachtete von der gegenüberliegenden Straßenseite."
                }
            ],
            suspects: [
                {
                    id: "s1",
                    name: "Higuchi Kyosuke",
                    description: "Ein Geschäftsmann, der bei der Yotsuba Group arbeitet. Hat extreme Ansichten über Gerechtigkeit in sozialen Medien geäußert.",
                    isGuilty: true,
                    clues: ["Wurde in der Nähe des dritten Mordes gesehen.", "Hat Zugang zu Strafregistern über die Firmendatenbank.", "Kürzliche Beförderung fiel mit dem Beginn der Morde zusammen."]
                },
                {
                    id: "s2",
                    name: "Misa Amane",
                    description: "Ein beliebtes Model, dessen Eltern ermordet wurden. Der Mörder wurde nie zur Rechenschaft gezogen.",
                    isGuilty: false,
                    clues: ["Unterstützt öffentlich die mysteriösen Morde.", "Hat ein Alibi für zwei der Mordzeiten.", "Zeigt keine Anzeichen der kalkulierten Planung, die bei den Verbrechen erkennbar ist."]
                },
                {
                    id: "s3",
                    name: "Teru Mikami",
                    description: "Ein Staatsanwalt, der mehrere hochkarätige Fälle gegen offensichtliche Verbrecher verloren hat.",
                    isGuilty: false,
                    clues: ["War während zwei der Morde außer Landes.", "Hat Frustration über das Justizsystem geäußert.", "Arbeitet trotz seiner Frustration innerhalb legaler Kanäle."]
                }
            ]
        },
        {
            id: 2,
            title: "Fall #2: Die Unternehmensverschwörung",
            description: "CEOs konkurrierender Unternehmen sterben bei mysteriösen Unfällen. Alle Unternehmen werden nun von der Yotsuba Group übernommen.",
            days: 6,
            deathNoteUses: 2,
            culprit: "Reiji Namikawa",
            evidence: [
                {
                    id: "e1",
                    title: "Finanzunterlagen",
                    description: "Die Aktien der Yotsuba Group steigen nach dem Tod jedes CEOs."
                },
                {
                    id: "e2",
                    title: "Sitzungsprotokolle",
                    description: "Geheime Treffen von Yotsuba-Führungskräften, bei denen 'Hindernisse beseitigen' diskutiert wurde."
                },
                {
                    id: "e3",
                    title: "Unfallberichte",
                    description: "Alle Todesfälle schienen Unfälle zu sein, traten jedoch auf statistisch unwahrscheinliche Weise auf."
                }
            ],
            suspects: [
                {
                    id: "s1",
                    name: "Reiji Namikawa",
                    description: "Verkaufsdirektor von Yotsuba. Bekannt für seine rücksichtslose Geschäftstaktik.",
                    isGuilty: true,
                    clues: ["War bei allen Treffen anwesend, bei denen 'Hindernisse' besprochen wurden.", "Erhielt den größten Bonus nach Übernahmen.", "Hat persönliche Groll gegen zwei der verstorbenen CEOs."]
                },
                {
                    id: "s2",
                    name: "Shingo Mido",
                    description: "Marketingdirektor von Yotsuba. Profitiert von der Unternehmensexpansion.",
                    isGuilty: false,
                    clues: ["Sprach sich in privaten E-Mails gegen aggressive Übernahmestrategien aus.", "War während zwei Todesfällen im Urlaub.", "Hat familiäre Verbindungen zu einem der Unternehmen der Opfer."]
                },
                {
                    id: "s3",
                    name: "Suguru Shimura",
                    description: "Personaldirektor von Yotsuba. Hat Zugang zu allen Unternehmensinformationen.",
                    isGuilty: false,
                    clues: ["Kein direkter Nutzen aus den Übernahmen.", "Äußerte ethische Bedenken in privater Kommunikation.", "Hatte Alibis für drei der Todesfälle."]
                }
            ]
        }
    ]
};

// Correct Russian cases to ensure proper ID types
const russianCases = caseTranslations.ru.map(c => {
    // Ensure case ID is a number, not a string
    return {
        ...c,
        id: Number(c.id)
    };
});

// Update with corrected cases
caseTranslations.ru = russianCases;

// Apply the same fix to other languages for consistency
caseTranslations.en = caseTranslations.en.map(c => ({...c, id: Number(c.id)}));
caseTranslations.de = caseTranslations.de.map(c => ({...c, id: Number(c.id)}));

// Make caseTranslations accessible globally for other scripts
window.caseTranslations = caseTranslations;

// Get current cases based on language
function getCases() {
    const currentLang = typeof window.getLanguage === 'function' ? window.getLanguage() : 'en';
    console.log("getCases called - current language:", currentLang);
    
    // Debug case counts in each language
    console.log("Case counts by language:", {
        en: caseTranslations.en?.length || 0,
        ru: caseTranslations.ru?.length || 0,
        de: caseTranslations.de?.length || 0
    });
    
    // Ensure Russian cases have correct IDs
    if (currentLang === 'ru') {
        console.log("Russian cases:", caseTranslations.ru.map(c => ({ id: c.id, title: c.title })));
    }
    
    // Make sure both cases are actually present for each language
    const casesForCurrentLang = caseTranslations[currentLang] || caseTranslations.en;
    console.log("Returning cases for", currentLang, ":", casesForCurrentLang.length);
    return casesForCurrentLang;
}

// Make getCases function globally accessible
window.getCases = getCases;

// Initialize the game
function initGame() {
    // Reset game state
    gameState = {
        currentCase: null,
        casesSolved: 0,
        daysLeft: 5,
        deathNoteUses: 3,
        suspects: [],
        evidence: [],
        killedSuspects: []
    };
    
    console.log("Game initialized");
}

// Load a specific case
function loadCase(caseId) {
    // Ensure caseId is a number
    const numericCaseId = Number(caseId);
    console.log(`loadCase(${numericCaseId}) called - current language: ${getLanguage()}`);
    
    // Force refresh case data based on current language
    const currentCases = getCases();
    console.log("Available cases:", currentCases.map(c => `ID: ${c.id} (${typeof c.id}), Title: ${c.title}`));
    
    // Find the case - use Number() for type-safe comparison
    const caseData = currentCases.find(c => Number(c.id) === numericCaseId);
    
    if (!caseData) {
        console.error(`Case with ID ${numericCaseId} not found in language ${getLanguage()}`);
        // Try to find the case in the default English locale if it's missing in current locale
        if (getLanguage() !== 'en') {
            console.log("Trying to find case in English as fallback...");
            const englishCaseData = caseTranslations.en.find(c => Number(c.id) === numericCaseId);
            if (englishCaseData) {
                console.log("Case found in English, using as fallback");
                return loadCaseWithData(englishCaseData);
            }
        }
        return null;
    }
    
    return loadCaseWithData(caseData);
}

// Helper function to load a case using case data
function loadCaseWithData(caseData) {
    // Reset game state for the new case
    gameState.currentCase = caseData;
    gameState.daysLeft = caseData.days;
    gameState.deathNoteUses = caseData.deathNoteUses;
    gameState.killedSuspects = []; // Reset killed suspects for the new case
    
    // Update UI elements
    document.getElementById('caseTitle').textContent = caseData.title;
    
    // Update the days left and Death Note uses display
    if (typeof window.updateDynamicContent === 'function') {
        window.updateDynamicContent();
    } else if (typeof updateDynamicContent === 'function') {
        updateDynamicContent();
    }
    
    // Load the case board
    loadCaseBoard(caseData);
    
    console.log(`Case ${caseData.id} loaded:`, caseData.title);
    
    return caseData;
}

// Get case description based on current language
function getCaseDescription(caseData) {
    const lang = typeof window.getLanguage === 'function' ? window.getLanguage() : 'en';
    
    // Case descriptions in different languages
    const descriptions = {
        en: `${caseData.description}`,
        ru: `${caseData.description}`,
        de: `${caseData.description}`
    };
    
    // Return description in current language, or fall back to English
    return descriptions[lang] || descriptions.en;
}

// Display the case board with information
function loadCaseBoard(caseData) {
    const caseBoard = document.getElementById('caseBoard');
    caseBoard.innerHTML = '';
    
    // Case description
    const description = document.createElement('div');
    description.className = 'case-description';
    
    // Get translate function safely
    const translate = typeof window.translate === 'function' ? window.translate : (key) => key;
    
    // Use translated case description
    const translatedDescription = getCaseDescription(caseData);
    
    // Use translations for the content
    description.innerHTML = `
        <h3>${translate('caseBrief')}</h3>
        <p>${translatedDescription}</p>
        <div class="case-instructions">
            <p>${translate('caseBriefText')}</p>
            <ol>
                <li>${translate('caseBriefItem1')}</li>
                <li>${translate('caseBriefItem2')}</li>
                <li>${translate('caseBriefItem3')}</li>
                <li>${translate('caseBriefItem4')}</li>
            </ol>
        </div>
    `;
    caseBoard.appendChild(description);
    
    // Populate the Death Note dropdown with suspects
    populateDeathNoteDropdown(caseData.suspects);
}

// Function to populate the Death Note dropdown with suspects
function populateDeathNoteDropdown(suspects) {
    const dropdown = document.getElementById('nameInput');
    if (!dropdown) return;
    
    // Clear existing options except the first one (prompt)
    while (dropdown.options.length > 1) {
        dropdown.remove(1);
    }
    
    // Add each suspect as an option
    suspects.forEach(suspect => {
        // Skip suspects who are already killed
        if (gameState.killedSuspects.includes(suspect.name)) return;
        
        const option = document.createElement('option');
        option.value = suspect.name;
        option.textContent = suspect.name;
        dropdown.appendChild(option);
    });
}

// View evidence for the current case
function viewEvidence() {
    if (!gameState.currentCase) return;
    
    // Get translate function safely
    const translate = typeof window.translate === 'function' ? window.translate : (key) => key;
    
    const caseBoard = document.getElementById('caseBoard');
    caseBoard.innerHTML = '';
    
    // Create evidence header
    const header = document.createElement('h3');
    header.textContent = translate('evidence');
    caseBoard.appendChild(header);
    
    // Create evidence list
    const evidenceList = document.createElement('div');
    evidenceList.className = 'evidence-list';
    
    gameState.currentCase.evidence.forEach(item => {
        const evidenceItem = document.createElement('div');
        evidenceItem.className = 'evidence-item';
        evidenceItem.innerHTML = `
            <h4>${item.title}</h4>
            <p>${item.description}</p>
        `;
        evidenceList.appendChild(evidenceItem);
    });
    
    caseBoard.appendChild(evidenceList);
    
    // Add back button
    const backButton = document.createElement('button');
    backButton.className = 'secondary-button';
    backButton.textContent = translate('backToCase');
    backButton.addEventListener('click', () => loadCaseBoard(gameState.currentCase));
    caseBoard.appendChild(backButton);
    
    // Consume a day
    consumeDay();
}

// View suspects for the current case
function viewSuspects() {
    if (!gameState.currentCase) return;
    
    // Get translate function safely
    const translate = typeof window.translate === 'function' ? window.translate : (key) => key;
    
    const caseBoard = document.getElementById('caseBoard');
    caseBoard.innerHTML = '';
    
    // Create suspects header
    const header = document.createElement('h3');
    header.textContent = translate('suspects');
    caseBoard.appendChild(header);
    
    // Create suspects list
    const suspectsList = document.createElement('div');
    suspectsList.className = 'suspects-list';
    
    gameState.currentCase.suspects.forEach(suspect => {
        // Check if the suspect is already killed
        const isKilled = gameState.killedSuspects.includes(suspect.name);
        
        const suspectItem = document.createElement('div');
        suspectItem.className = `suspect-item ${isKilled ? 'killed' : ''}`;
        
        let cluesHtml = '';
        if (!isKilled) {
            cluesHtml = `
                <div class="suspect-clues">
                    <h5>${translate('clues')}:</h5>
                    <ul>
                        ${suspect.clues.map(clue => `<li>${clue}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        suspectItem.innerHTML = `
            <h4>${suspect.name} ${isKilled ? `(${translate('deceased')})` : ''}</h4>
            <p>${suspect.description}</p>
            ${cluesHtml}
        `;
        suspectsList.appendChild(suspectItem);
    });
    
    caseBoard.appendChild(suspectsList);
    
    // Add back button
    const backButton = document.createElement('button');
    backButton.className = 'secondary-button';
    backButton.textContent = translate('backToCase');
    backButton.addEventListener('click', () => loadCaseBoard(gameState.currentCase));
    caseBoard.appendChild(backButton);
    
    // Consume a day
    consumeDay();
}

// Attempt to solve the case
function attemptSolve() {
    if (!gameState.currentCase) return;
    
    // Get translate function safely
    const translate = typeof window.translate === 'function' ? window.translate : (key) => key;
    
    // Check if any suspect has been killed with the Death Note
    if (gameState.killedSuspects.length === 0) {
        alert(translate('mustUseDeathNoteFirst'));
        return;
    }
    
    const caseBoard = document.getElementById('caseBoard');
    caseBoard.innerHTML = '';
    
    // Create solve header
    const header = document.createElement('h3');
    header.textContent = translate('solveCase');
    caseBoard.appendChild(header);
    
    // Create explanation text
    const explanation = document.createElement('p');
    explanation.className = 'solve-explanation';
    explanation.textContent = translate('solveExplanation');
    caseBoard.appendChild(explanation);
    
    // Create suspects list with animation
    const suspectsList = document.createElement('div');
    suspectsList.className = 'suspects-list solving';
    
    // Add all suspects to the list
    gameState.currentCase.suspects.forEach(suspect => {
        const isKilled = gameState.killedSuspects.includes(suspect.name);
        const suspectItem = document.createElement('div');
        suspectItem.className = `suspect-solving-item ${isKilled ? 'killed' : ''}`;
        suspectItem.innerHTML = `
            <span class="suspect-name">${suspect.name}</span>
            ${isKilled ? `<span class="death-status">(${translate('deceased')})</span>` : ''}
        `;
        suspectsList.appendChild(suspectItem);
        
        // If this suspect was killed, apply strikethrough animation after a short delay
        if (isKilled) {
            setTimeout(() => {
                const nameElement = suspectItem.querySelector('.suspect-name');
                nameElement.classList.add('strikethrough');
                
                // Add death status with animation
                const statusElement = suspectItem.querySelector('.death-status');
                statusElement.classList.add('fade-in');
                
                // Check if this is the correct culprit and show animation
                const isCorrectCulprit = suspect.name === gameState.currentCase.culprit;
                setTimeout(() => {
                    suspectItem.classList.add(isCorrectCulprit ? 'correct-choice' : 'wrong-choice');
                }, 1000);
            }, 500);
        }
    });
    
    caseBoard.appendChild(suspectsList);
    
    // Add confirm button - appears after animation
    setTimeout(() => {
        const confirmButton = document.createElement('button');
        confirmButton.className = 'main-button fade-in';
        confirmButton.textContent = translate('confirmSolution');
        confirmButton.addEventListener('click', () => {
            // Check if the culprit was killed
            const isCulpritKilled = gameState.killedSuspects.includes(gameState.currentCase.culprit);
            showResults(isCulpritKilled);
            
            // Update game state if solved
            if (isCulpritKilled) {
                gameState.casesSolved++;
            }
        });
        caseBoard.appendChild(confirmButton);
        
        // Add back button
        const backButton = document.createElement('button');
        backButton.className = 'secondary-button fade-in';
        backButton.textContent = translate('cancel');
        backButton.addEventListener('click', () => loadCaseBoard(gameState.currentCase));
        caseBoard.appendChild(backButton);
    }, 2500);
}

// Check if a name written in the Death Note matches a suspect
function checkDeathNoteTarget(name) {
    if (!gameState.currentCase) return;
    
    // Normalize the input name
    const normalizedInputName = name.toLowerCase().trim();
    
    // Get the current language
    const currentLang = typeof window.getLanguage === 'function' ? window.getLanguage() : 'en';
    
    // Find the suspect - check all suspects regardless of language
    let matchedSuspect = null;
    
    // Try to find the suspect by comparing normalized names
    for (const suspect of gameState.currentCase.suspects) {
        // Normalize the suspect name
        const suspectName = suspect.name.toLowerCase().trim();
        
        // Check if names match
        if (suspectName === normalizedInputName) {
            matchedSuspect = suspect;
            break;
        }
        
        // For non-English versions, also check if the name approximately matches
        // (handles slight variations in spelling or transliteration)
        if (currentLang !== 'en' && 
            (suspectName.includes(normalizedInputName) || 
             normalizedInputName.includes(suspectName))) {
            matchedSuspect = suspect;
            break;
        }
    }
    
    if (matchedSuspect) {
        // Mark as killed
        gameState.killedSuspects.push(matchedSuspect.name);
        
        // Show notification
        const translate = typeof window.translate === 'function' ? window.translate : (key) => key;
        const notification = document.createElement('div');
        notification.className = 'death-note-notification';
        notification.textContent = `${matchedSuspect.name} ${translate('hasDiedOfHeartAttack')}`;
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
        
        // Decrease available uses
        if (gameState.deathNoteUses > 0) {
            gameState.deathNoteUses--;
        }
        
        // Update UI
        // Use safely: check if updateDeathNoteUses is defined in global scope
        if (typeof window.updateDeathNoteUses === 'function') {
            window.updateDeathNoteUses();
        } else if (typeof updateDeathNoteUses === 'function') {
            updateDeathNoteUses();
        }
        
        // If an innocent person was killed, apply penalty
        if (!matchedSuspect.isGuilty) {
            // Penalty: lose additional days
            consumeDay(2);
        }
        
        return true;
    }
    
    return false;
}

// Consume days and check for game over
function consumeDay(days = 1) {
    if (!gameState.currentCase) return;
    
    // Update days left
    gameState.daysLeft -= days;
    document.getElementById('daysLeft').textContent = `Days left: ${gameState.daysLeft}`;
    
    // Check for game over
    if (gameState.daysLeft <= 0) {
        // Time's up!
        showResults(false);
    }
}

// Make sure we have a fadeIn keyframe animation
} 