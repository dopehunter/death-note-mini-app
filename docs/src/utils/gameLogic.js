/**
 * Death Note Mini-App
 * Game Logic Module
 */

// Import translation utilities
const { getLanguage, translate } = window;

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
                    clues: ["Выступал против агрессивных стратегий приобретения в личных электронных письмах.", "Был в отпуске во время двух смертей.", "Имеет семейные связи с компанией одной из жертв."]
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

// Get current cases based on language
function getCases() {
    const lang = getLanguage();
    return caseTranslations[lang] || caseTranslations.en;
}

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
    // Find the case
    const caseData = getCases().find(c => c.id === caseId);
    
    if (!caseData) {
        console.error(`Case ${caseId} not found`);
        return;
    }
    
    // Update game state
    gameState.currentCase = caseData;
    gameState.daysLeft = caseData.days;
    gameState.deathNoteUses = caseData.deathNoteUses;
    gameState.suspects = caseData.suspects;
    gameState.evidence = caseData.evidence;
    gameState.killedSuspects = [];
    
    // Update UI
    document.getElementById('caseTitle').textContent = caseData.title;
    document.getElementById('daysLeft').textContent = `Days left: ${caseData.days}`;
    document.getElementById('noteUses').textContent = `Death Note uses: ${caseData.deathNoteUses}`;
    
    // Load the case board
    loadCaseBoard(caseData);
    
    console.log(`Case ${caseId} loaded:`, caseData);
}

// Get case description based on current language
function getCaseDescription(caseData) {
    const lang = getLanguage();
    
    // Case descriptions in different languages
    const descriptions = {
        // Case 1
        1: {
            en: "A series of murders has occurred in Tokyo. All victims died of heart attacks, but they were all criminals who had escaped justice. The police are baffled.",
            ru: "В Токио произошла серия убийств. Все жертвы умерли от сердечных приступов, и все они были преступниками, избежавшими правосудия. Полиция в недоумении.",
            de: "In Tokio hat sich eine Reihe von Morden ereignet. Alle Opfer starben an Herzinfarkten, und alle waren Kriminelle, die der Justiz entkommen waren. Die Polizei ist ratlos."
        },
        // Case 2
        2: {
            en: "CEOs of competing companies are dying in mysterious accidents. All companies are now being acquired by Yotsuba Group.",
            ru: "Генеральные директора конкурирующих компаний погибают в загадочных авариях. Все компании теперь приобретаются группой Ёцуба.",
            de: "CEOs konkurrierender Unternehmen sterben bei mysteriösen Unfällen. Alle Unternehmen werden nun von der Yotsuba-Gruppe übernommen."
        }
    };
    
    // Return the description in the current language or English as fallback
    return descriptions[caseData.id]?.[lang] || descriptions[caseData.id]?.en || caseData.description;
}

// Load the case board with case description
function loadCaseBoard(caseData) {
    const caseBoard = document.getElementById('caseBoard');
    caseBoard.innerHTML = '';
    
    // Case description
    const description = document.createElement('div');
    description.className = 'case-description';
    
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
}

// View evidence for the current case
function viewEvidence() {
    if (!gameState.currentCase) return;
    
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
    
    const caseBoard = document.getElementById('caseBoard');
    caseBoard.innerHTML = '';
    
    // Create solve header
    const header = document.createElement('h3');
    header.textContent = translate('solveCase');
    caseBoard.appendChild(header);
    
    // Create solve form
    const solveForm = document.createElement('div');
    solveForm.className = 'solve-form';
    solveForm.innerHTML = `
        <p>${translate('chooseCulprit')}</p>
        <div class="suspect-options">
            ${gameState.currentCase.suspects.map(suspect => `
                <div class="suspect-option">
                    <input type="radio" id="suspect-${suspect.id}" name="culprit" value="${suspect.name}" ${gameState.killedSuspects.includes(suspect.name) ? 'disabled' : ''}>
                    <label for="suspect-${suspect.id}">${suspect.name} ${gameState.killedSuspects.includes(suspect.name) ? `(${translate('deceased')})` : ''}</label>
                </div>
            `).join('')}
        </div>
        <button id="submitSolution" class="main-button">${translate('submitSolution')}</button>
    `;
    caseBoard.appendChild(solveForm);
    
    // Add back button
    const backButton = document.createElement('button');
    backButton.className = 'secondary-button';
    backButton.textContent = translate('cancel');
    backButton.addEventListener('click', () => loadCaseBoard(gameState.currentCase));
    caseBoard.appendChild(backButton);
    
    // Add event listener for the submit button
    document.getElementById('submitSolution').addEventListener('click', () => {
        const selectedCulprit = document.querySelector('input[name="culprit"]:checked')?.value;
        
        if (!selectedCulprit) {
            alert(translate('selectSuspect'));
            return;
        }
        
        // Check if the selected culprit is correct
        const isCorrect = selectedCulprit === gameState.currentCase.culprit;
        
        // Check if the culprit is dead
        const isCulpritKilled = gameState.killedSuspects.includes(gameState.currentCase.culprit);
        
        // Determine if the case is solved
        const isSolved = isCorrect && isCulpritKilled;
        
        // Show results
        showResults(isSolved);
        
        // Update game state
        if (isSolved) {
            gameState.casesSolved++;
        }
    });
}

// Check if a name written in the Death Note matches a suspect
function checkDeathNoteTarget(name) {
    if (!gameState.currentCase) return;
    
    // Find the suspect
    const suspect = gameState.currentCase.suspects.find(s => 
        s.name.toLowerCase() === name.toLowerCase()
    );
    
    if (suspect) {
        // Mark as killed
        gameState.killedSuspects.push(suspect.name);
        
        // Show notification
        const notification = document.createElement('div');
        notification.className = 'death-note-notification';
        notification.textContent = `${suspect.name} has died of a heart attack.`;
        document.body.appendChild(notification);
        
        // Remove notification after a few seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
        
        // If innocent person killed, penalize
        if (!suspect.isGuilty) {
            consumeDay(2); // Penalty: lose 2 days
        }
    }
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