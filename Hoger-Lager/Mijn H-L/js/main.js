let computerCredi = 0; // Dit is de krediet van de computer
let playerCredi = 0; // Dit is de krediet van de speler

const computerCreditsv = document.querySelector(".computer-credits");
const playerCreditsv = document.querySelector(".player-credits");


const hogerButton = document.querySelector(".hg");
const lagerButton = document.querySelector(".lg");
hogerButton.disabled = true; // Zet de "Hoger" knop uit bij het begin
lagerButton.disabled = true; // Zet de "Lager" knop uit bij het begin

const inputNickname = document.querySelector('input.input-nickname');
const sendButton = document.querySelector(".button-send");

let nickname = "Speler"; // Dit is de standaard bijnaam
sendButton.addEventListener("click", function() { // Wanneer de send knop wordt aangeklikt
    nickname = inputNickname.value; // Verkrijg de bijnaam van het invoerveld
    console.log(nickname);

    const spelerCr = document.querySelector(".creditsspeler");
    console.log(spelerCr);
    spelerCr.textContent = nickname + " Credits:"; 
    document.querySelector(".nicknamesc").style.display = "none"; // Verberg het invoerveld voor de bijnaam
});




const doButton = document.querySelector(".do");  // Dit is de knop GO🚀
doButton.disabled = true; // Zet de "Dobbelsteen gooien" knop uit bij het begin

let currentNumber = 0; // Dit is het huidige dobbelsteen nummer
let nextNumber = 0; // Dit is het volgende dobbelsteen nummer
let gameActive = false; // Dit geeft aan of het spel actief is




doButton.addEventListener("click", function() { // Wanneer de "GO🚀" knop wordt aangeklikt
    hogerButton.disabled = false; // Zet de "Hoger" knop aan
    lagerButton.disabled = false; // Zet de "Lager" knop aan
    doButton.disabled = true; // Zet de "Dobbelsteen gooien" knop uit
    
    currentNumber = Math.ceil(Math.random() * 6); // Genereer een willekeurig dobbelsteen nummer tussen 1 en 6
    const resultElement = document.querySelector(".result"); // Dit is de HTML-element voor de resultaten
    resultElement.textContent = currentNumber; // Zet de huidige dobbelsteen waarde in de resultaten

    nextNumber = Math.ceil(Math.random() * 6);
    console.log("Volgende nummer:", nextNumber);

    gameActive = true; // Zet het spel op actief
});




hogerButton.addEventListener("click", function() {
    doButton.disabled = false; // Zet de "Dobbelsteen gooien" knop aan
    hogerButton.disabled = true; // Zet de "Hoger" knop uit
    lagerButton.disabled = true; // Zet de "Lager" knop uit
    if (gameActive) { 
        const resultElement = document.querySelector(".result"); // Dit is de HTML-element voor de resultaten
        if (nextNumber > currentNumber) {
            playerCredi++; // Verhoog de krediet van de speler
            resultElement.textContent += ` | Juist! Volgende nummer: ${nextNumber}`; // Zet een bericht dat de speler correct heeft geraden
        } else if (nextNumber === currentNumber) { 
            resultElement.textContent += ` | Gelijke worp!: ${nextNumber}`;
        } else {
            computerCredi++;
            resultElement.textContent += ` | Onjuist! Volgende nummer: ${nextNumber}`;
        }
        updateScores();
    }
});




lagerButton.addEventListener("click", function() { 
    doButton.disabled = false;
    hogerButton.disabled = true; 
    lagerButton.disabled = true;
    if (gameActive) {
        const resultElement = document.querySelector(".result");
        if (nextNumber < currentNumber) {
            playerCredi++; 
            resultElement.textContent += ` | Juist! Volgende nummer: ${nextNumber}`;
        } else if (nextNumber === currentNumber) { 
            resultElement.textContent += ` | Gelijke worp!: ${nextNumber}`;
        } else {
            computerCredi++; 
            resultElement.textContent += ` | Onjuist! Volgende nummer: ${nextNumber}`;
        }
        updateScores(); 
    }
});




function updateScores() {  // Dit is de functie om de scores bij te werken
    computerCreditsv.textContent = computerCredi; // Werk de krediet van de computer bij
    playerCreditsv.textContent = playerCredi; // Werk de krediet van de speler bij
    checkPlayerComputerCredits(); // Controleer de krediet van de speler en computer
}




function checkPlayerComputerCredits() {// Dit is de functie om de krediet van de speler en computer te controleren
    const resultElement = document.querySelector(".result");
    if (computerCredi >= 10) {
        console.log(nickname);
        resultElement.textContent = "Computer heeft gewonnen en " + nickname + " heeft verloren!😢";
        hogerButton.disabled = true;
        lagerButton.disabled = true;
        doButton.disabled = true;
        resetButton.disabled = false; 
        alert("Om opnieuw te spelen, druk op de RESET🔄 knop.");
    } else if (playerCredi >= 10) {
        resultElement.textContent = nickname + " heeft gewonnen! Computer heeft verloren!🎉";
        hogerButton.disabled = true;
        lagerButton.disabled = true;
        doButton.disabled = true;
        resetButton.disabled = false;
        alert("Om opnieuw te spelen, druk op de RESET🔄 knop.");
    }
}




const resetButton = document.querySelector(".reset");
resetButton.disabled = true; // Zet de "Reset" knop uit bij het begin

resetButton.addEventListener("click", function() {
    const resultElement = document.querySelector(".result");
    console.log(resultElement);
    resultElement.textContent = "Druk op 🔒 om de GO🚀- knop te activeren!";
    computerCredi = 0; 
    playerCredi = 0; 
    computerCreditsv.textContent = ""; // Maak het computer krediet element leeg
    playerCreditsv.textContent = ""; // Maak het speler krediet element leeg
    
    doButton.disabled = true; 
    hogerButton.disabled = true; 
    lagerButton.disabled = true; 
    resetButton.disabled = true; 
    goButton.disabled = false; 
    lockButton(); 
});




const goButton = document.querySelector(".go");// Dit is de knop voor "🔒"
goButton.disabled = false;// Zet de "🔒" knop aan

goButton.addEventListener("click", function() {
    const resultElement = document.querySelector(".result");
    doButton.disabled = false; // Zet de "Dobbelsteen gooien" knop aan
    resetButton.disabled = true; // Zet de "Reset" knop uit
    goButton.disabled = true; // Zet de "🔒" knop uit
    resultElement.textContent = "Druk op GO🚀 om het spel te starten!";// Zet een startbericht
    lockButton();
});




function lockButton() { // Dit is de functie om de knop te vergrendelen
    if (goButton.disabled) { // Als de "🔒" knop uit is
        goButton.innerHTML = "🔓";
    } else {
        goButton.innerHTML = "🔒";
    }
}

lockButton();




const popup = document.querySelector('.popup'); // Dit is de HTML-element voor de popup
const quButton = document.querySelector('.question-mark'); // Dit is de knop voor de vraagteken

quButton.addEventListener("click", function() { // Wanneer de vraagteken knop wordt aangeklikt
    popup.style.display = "block"; // Toon de popup
});

const closeButton = document.querySelector('.close-btn');

closeButton.addEventListener("click", function() {
    popup.style.display = "none"; 
});
