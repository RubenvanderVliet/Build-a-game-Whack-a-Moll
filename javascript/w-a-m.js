(function () {
    // Elementen ophalen
    const molesContainer = document.getElementById("moles-container");
    const scoreValue = document.getElementById("score-value");
    const startButton = document.getElementById("start-button");
    const resetButton = document.getElementById("reset-button");
    const cursor = document.querySelector(".cursor");

    // Afbeeldingen initialiseren
    const bodyImage = new Image();
    bodyImage.src = '/image/bkbk.png';

    molesContainer.style.backgroundImage = `url('${bodyImage.src}')`;
    molesContainer.style.backgroundSize = '100% 100%';

    const moleImage = new Image();
    moleImage.src = '/image/mole.png';

    let score = 0;
    let gameInterval;

    // Startknop eventlistener toevoegen
    startButton.addEventListener("click", startGame);

    // Resetknop eventlistener toevoegen
    resetButton.addEventListener("click", resetGame);

    function startGame() {
        resetGame(); 

        // Spelinterval starten
        gameInterval = setInterval(() => {
            createMole();
        }, 1000);

        // Eventlistener toevoegen voor klikken op mol
        document.addEventListener("click", hitMole);
    }

    function resetGame() {
        // Clear moles
        const moles = document.querySelectorAll('.mole');
        moles.forEach(mole => mole.remove());

        // Reset variables
        score = 0;
        updateScore();
    }

    function createMole() {
        // Mol element aanmaken
        const mole = document.createElement("img");
        mole.className = "mole";
        mole.src = moleImage.src;
        mole.addEventListener("click", () => {
            // Score verhogen bij het raken van mol
            score++;
            updateScore();
            molesContainer.removeChild(mole);
            checkGameOutcome();
        });

        // Mol aan willekeurige positie toevoegen
        molesContainer.appendChild(mole);

        const molePositionRegions = [
            { top: 0, bottom: 100 },
            { top: 100, bottom: 200 }
        ];

        const randomRegionIndex = Math.floor(Math.random() * molePositionRegions.length);
        const region = molePositionRegions[randomRegionIndex];

        const randomPositionX = getRandomPositionX();
        const randomPositionY = getRandomPositionY(region.top, region.bottom);

        mole.style.left = `${randomPositionX}px`;
        mole.style.top = `${randomPositionY}px`;

        // Mol na 2 seconden verwijderen als niet geraakt
        setTimeout(() => {
            molesContainer.removeChild(mole);
            checkGameOutcome();
        }, 1250);
    }

    function getRandomPositionX() {
        // Willekeurige X-positie binnen het molesContainer
        return Math.floor(Math.random() * (molesContainer.clientWidth - 100));
    }

    function getRandomPositionY(top, bottom) {
        // Willekeurige Y-positie binnen opgegeven bereik
        return Math.floor(Math.random() * (bottom - top)) + top;
    }

    function hitMole(event) {
        const clickedElement = event.target;

        // Check if the clicked element is a mole
        if (clickedElement.classList.contains("mole")) {
            // Score verhogen bij het raken van mol
            score++;
            updateScore();
            molesContainer.removeChild(clickedElement);
            checkGameOutcome();
        } else {
            // Als er buiten een mol wordt geklikt, verlies 1 punt
            score = Math.max(0, score - 1);
            updateScore();
        }
    }

    function updateScore() {
        // Score bijwerken op het scherm
        scoreValue.textContent = score;
    }

    function checkGameOutcome() {
        // Spelresultaat controleren
        if (score === 28) {
            alert("Gefeliciteerd! Je hebt gewonnen!");
            stopGame();
            resetGame();
        }
    }

    function stopGame() {
        // Spel stoppen en eventlisteners verwijderen
        clearInterval(gameInterval);
        document.removeEventListener("click", hitMole);

        // Alle mollen verwijderen
        const moles = document.querySelectorAll('.mole');
        moles.forEach(mole => mole.remove());
    }

    // Eventlistener toevoegen om het spel te stoppen bij het sluiten van de pagina
    window.addEventListener("beforeunload", stopGame);

    // Cursorpositie volgen en activeren bij muisklik
    window.addEventListener("mousemove", (e) => {
        cursor.style.top = e.pageY + "px";
        cursor.style.left = e.pageX + "px";
    });

    window.addEventListener("mousedown", () => {
        cursor.classList.add("active");
    });

    window.addEventListener("mouseup", () => {
        cursor.classList.remove("active");
    });
})();
