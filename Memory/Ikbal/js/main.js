const inputNickname = document.querySelector("input.input-nickname");
const sendButton = document.querySelector(".button-send");


let nickname = "Player1"; // Dit is de standaard bijnaam
sendButton.addEventListener("click", function () {
  // Wanneer de send knop wordt aangeklikt
  nickname = inputNickname.value; // Verkrijg de bijnaam van het invoerveld
  console.log(nickname);

  const playerCr1 = document.querySelector(".player1");
  console.log(playerCr1);
  playerCr1.textContent = nickname + "`s Score:";
  document.querySelector(".nicknamesc").style.display = "none"; // Verberg het invoerveld voor de bijnaam
});




const inputNickname2 = document.querySelector("input.input-nickname2");
const sendButton2 = document.querySelector(".button-send2");


let nickname2 = "Player2"; // Dit is de standaard bijnaam
sendButton2.addEventListener("click", function () {
  // Wanneer de send knop wordt aangeklikt
  nickname2 = inputNickname2.value; // Verkrijg de bijnaam van het invoerveld
  console.log(nickname2);

  const playerCr2 = document.querySelector(".player2");
  console.log(playerCr2);
  playerCr2.textContent = nickname2 + "`s Score:";
  document.querySelector(".nicknamesc2").style.display = "none"; // Verberg het invoerveld voor de bijnaam
});



// Verkrijg het logo element met id "chrome"
const logoChrome = document.getElementById("chrome");

// Voeg een click event listener toe aan het logo
logoChrome.addEventListener("click", function () {
  // Log een bericht naar de console wanneer het logo wordt aangeklikt
  console.log("Logo Chrome geklikt");

  // Verander de inhoud van het logo naar een nieuw Chrome plaatje
  logoChrome.innerHTML = `<img src="img/chrome.png" alt="">`;
});


const logoChrome2 = document.getElementById("chrome2");

logoChrome2.addEventListener("click", function () {
  console.log("Logo Chrome2 geklikt");
  logoChrome2.innerHTML = `<img src="img/chrome.png" alt="">`;
});



const logoGoogle = document.getElementById("google");

logoGoogle.addEventListener("click", function () {
  console.log("Logo Google geklikt");
  logoGoogle.innerHTML = `<img src="img/google.png" alt="">`;
});

const logoGoogle2 = document.getElementById("google2");

logoGoogle2.addEventListener("click", function () {
  console.log("Logo Google2 geklikt");
  logoGoogle2.innerHTML = `<img src="img/google.png" alt="">`;
});



const logoSafari = document.getElementById("safari");

logoSafari.addEventListener("click", function () {
  console.log("Logo Safari geklikt");
  logoSafari.innerHTML = `<img src="img/safari.png" alt="">`;
});

const logoSafari2 = document.getElementById("safari2");

logoSafari2.addEventListener("click", function () {
  console.log("Logo Safari2 geklikt");
  logoSafari2.innerHTML = `<img src="img/safari.png" alt="">`;
});



const logoYahooi = document.getElementById("yahooi");

logoYahooi.addEventListener("click", function () {
  console.log("Logo Yahooi geklikt");
  logoYahooi.innerHTML = `<img src="img/yahooi.png" alt="">`;
});

const logoYahooi2 = document.getElementById("yahooi2");

logoYahooi2.addEventListener("click", function () {
  console.log("Logo Yahooi2 geklikt");
  logoYahooi2.innerHTML = `<img src="img/yahooi.png" alt="">`;
});



const logoBing = document.getElementById("bing");

logoBing.addEventListener("click", function () {
  console.log("Logo Bing geklikt");
  logoBing.innerHTML = `<img src="img/bing.png" alt="">`;
});

const logoBing2 = document.getElementById("bing2");

logoBing2.addEventListener("click", function () {
  console.log("Logo Bing2 geklikt");
  logoBing2.innerHTML = `<img src="img/bing.png" alt="">`;
});



const logoFirefox = document.getElementById("firefox");

logoFirefox.addEventListener("click", function () {
  console.log("Logo Firefox geklikt");
  logoFirefox.innerHTML = `<img src="img/firefox.png" alt="">`;
});

const logoFirefox2 = document.getElementById("firefox2");

logoFirefox2.addEventListener("click", function () {
  console.log("Logo Firefox2 geklikt");
  logoFirefox2.innerHTML = `<img src="img/firefox.png" alt="">`;
});



const logoOpera = document.getElementById("opera");

logoOpera.addEventListener("click", function () {
  console.log("Logo Opera geklikt");
  logoOpera.innerHTML = `<img src="img/opera.png" alt="">`;
});

const logoOpera2 = document.getElementById("opera2");

logoOpera2.addEventListener("click", function () {
  console.log("Logo Opera2 geklikt");
  logoOpera2.innerHTML = `<img src="img/opera.png" alt="">`;
});



const logoEdge = document.getElementById("edge");

logoEdge.addEventListener("click", function () {
  console.log("Logo Edge geklikt");
  logoEdge.innerHTML = `<img src="img/edge.png" alt="">`;
});

const logoEdge2 = document.getElementById("edge2");

logoEdge2.addEventListener("click", function () {
  console.log("Logo Edge2 geklikt");
  logoEdge2.innerHTML = `<img src="img/edge.png" alt="">`;
});



const popup = document.querySelector('.popup'); // Dit is de HTML-element voor de popup
const quButton = document.querySelector('.questionbutton'); // Dit is de knop voor de vraagteken





quButton.addEventListener("click", function() { // Wanneer de vraagteken knop wordt aangeklikt
    popup.style.display = "block"; // Toon de popup
});

const closeButton = document.querySelector('.close-btn');

closeButton.addEventListener("click", function() {
    popup.style.display = "none"; 
});



let cards = document.querySelectorAll('.card');  // Selecteer de kaarten

// Shuffle de kaarten
function shuffleCards() {
    // Zet alle kaarten in een array
    const allCards = Array.from(cards);

    // Schud de kaarten
    allCards.sort(() => 0.5 - Math.random());

    // Zet de geschudde kaarten op het scherm
    allCards.forEach((card, index) => {
        card.style.order = index;  // Zet de volgorde van de kaarten met CSS
        card.innerHTML = `<img src="img/logo2.jpg" alt="gesloten">`;  // Zet de kaarten op gesloten
    });
}

// Schud de kaarten wanneer de pagina geladen wordt
shuffleCards();



let player1Score = 0;
let player2Score = 0;
let currentPlayer = 1;
let flippedCards = []; // De geopende kaarten
let moves = 0; // Zet het aantal zetten


// Voeg een klikgebeurtenis toe voor elke kaart
for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', function() {
        // Als er al twee kaarten zijn geopend, geen nieuwe kaarten openen
        if (flippedCards.length === 2) {
            return; // Stop de functie als er al twee kaarten geopend zijn
        }

        // Open de aangeklikte kaart
        flippedCards.push(cards[i]);
        cards[i].querySelector('img').style.display = "block"; // Laat de afbeelding zien

        // Verhoog het aantal zetten
        moves++;
        document.querySelector('.move-counter').textContent = moves;

        // Als er twee kaarten zijn geopend, controleer dan of ze overeenkomen
        if (flippedCards.length === 2) {
            setTimeout(() => {
                // Haal de eerste en tweede kaart
                const card1 = flippedCards[0];
                const card2 = flippedCards[1];
        
                // Vergelijk de afbeeldingen van de kaarten
                const img1 = card1.querySelector('img').src;
                const img2 = card2.querySelector('img').src;
        
                // Als ze overeenkomen, verhoog de score
                if (img1 === img2) {
                    if (currentPlayer === 1) {
                        player1Score++; // Verhoog de score van speler 1
                        document.querySelector('.player1').textContent = nickname + "'s Score: " + player1Score;
                    } else {
                        player2Score++; // Verhoog de score van speler 1
                        document.querySelector('.player2').textContent = nickname2 + "'s Score: " + player2Score;
                    }
                } else {
                    // Als ze niet overeenkomen, zet de afbeeldingen terug naar gesloten
                    card1.innerHTML = `<img src="img/logo2.jpg" alt="gesloten">`;
                    card2.innerHTML = `<img src="img/logo2.jpg" alt="gesloten">`;
                    // Verander de speler
                    currentPlayer = currentPlayer === 1 ? 2 : 1;
                }
        
                // Reset de geopende kaarten
                flippedCards = [];
            }, 800); // Wacht 0,8 seconden en controleer
        }
    });
}


const resetButton = document.querySelector('.reset-button');


resetButton.addEventListener('click', function () {
    location.reload(); // Herlaad de pagina om het spel opnieuw te starten
});