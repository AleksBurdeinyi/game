const buyAnimal = document.getElementById("buy");
const animal = document.getElementById("animal");
const aliveAnimal = document.getElementById("alive");
const playArea = document.getElementsByClassName("areagame")[0];
const dead = document.getElementById("dead");
const bearSound = document.getElementById("audw");
let deadCount = 0;
const imgsrc = './img/animal.webp';
const imgsrcBear = './img/bear.png';
let aliveAnimalCount = 1;
let animalCount = 1;
const price = 60;
const coinElement = document.getElementById("coin");
let allmoney = parseInt(coinElement.textContent, 10);
let killedBearsCount = 0; 

const increaseMoney = () => {
    allmoney += 4;
    coinElement.textContent = `${allmoney}`;
};
const moneyInterval = setInterval(increaseMoney, 5000);

const myCallback = (e) => {
    if (allmoney >= price) {
        allmoney -= price;
        coinElement.textContent = `${allmoney}`;

        let animalContainer = document.createElement("div");
        animalContainer.className = "animal-container";
        animalContainer.style.position = "relative";
        animalContainer.style.display = "inline-block";

        let span = document.createElement("span");
        span.className = "animal-life";
        span.style.position = "absolute";
        span.style.bottom = "100%";
        span.style.left = "50%";
        span.style.transform = "translateX(-50%)";
        span.style.backgroundColor = "red";
        span.style.height = "10px";
        span.style.display = "block";
        span.style.borderRadius = "20px";
        span.style.width = "8rem";
        span.style.marginBottom = "0.4rem";

        let animalChk = document.createElement("img");
        animalChk.src = imgsrc;
        animalChk.style.height = "8rem";
        animalChk.className = "chk";

        animalContainer.appendChild(span);
        animalContainer.appendChild(animalChk);

        playArea.appendChild(animalContainer);

        animal.textContent = `Animal: ${animalCount++}`;
        updateAliveAndDeadCount();

        setInterval(() => moveAnimal(animalContainer), 2000);
        setInterval(() => bearFactory.createBear(), 10000);

    } else {
        alert("Not enough coins!");
    }
};

const moveAnimal = (animalContainer) => {
    if (bearsCount === 0) {
        return;
    }
    const maxX = playArea.offsetWidth - animalContainer.offsetWidth;
    const maxY = playArea.offsetHeight - animalContainer.offsetHeight;
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    animalContainer.style.left = `${newX}px`;
    animalContainer.style.top = `${newY}px`;
};

buyAnimal.addEventListener("click", myCallback);

class BearFactory {
    constructor(playArea, imgsrcBear, bearSound, killAnimal) {
        this.playArea = playArea;
        this.imgsrcBear = imgsrcBear;
        this.bearSound = bearSound;
        this.killAnimal = killAnimal;
    }

    createBear() {
        if (bearsCount === 0) {
            return;
        }
        let bearQuant = document.getElementsByClassName("bear-container").length;
        if (bearQuant <= 11 || bearsCount === 0) {
            this.makeSound(false);
        } else {
            this.makeSound(true);
            return;
        }

        let bearContainer = document.createElement("div");
        bearContainer.className = "bear-container";
        bearContainer.style.position = "relative";
        bearContainer.style.display = "inline-block";
        bearContainer.addEventListener("click", this.kickBear);

        let bearHP = document.createElement("span");
        bearHP.className = "bear-life";
        bearHP.style.position = "absolute";
        bearHP.style.bottom = "100%";
        bearHP.style.left = "50%";
        bearHP.style.transform = "translateX(-50%)";
        bearHP.style.backgroundColor = "#879257";
        bearHP.style.height = "10px";
        bearHP.style.display = "block";
        bearHP.style.borderRadius = "20px";
        bearHP.style.width = "12rem";
        bearHP.style.marginBottom = "0.4rem";
        bearHP.style.position = "absolute";

        let bear = document.createElement("img");
        bear.src = this.imgsrcBear;
        bear.style.height = "8rem";

        bearContainer.appendChild(bearHP);
        bearContainer.appendChild(bear);
        this.playArea.appendChild(bearContainer);

        this.moveBear(bearContainer);
        setInterval(() => this.moveBear(bearContainer), 2000);
        this.killAnimal();
        setInterval(this.killAnimal, 8000);
    }

    moveBear(bearContainer) {
        const maxX = this.playArea.offsetWidth - bearContainer.offsetWidth;
        const maxY = this.playArea.offsetHeight - bearContainer.offsetHeight;
        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;
        bearContainer.style.left = `${newX}px`;
        bearContainer.style.top = `${newY}px`;
    }

    kickBear(event) {
        const bearLife = event.currentTarget.querySelector(".bear-life");
        let healthWidth = parseFloat(bearLife.style.width);
        healthWidth = Math.max(0, healthWidth - 2);

        if (healthWidth <= 0) {
            event.currentTarget.style.display = 'none';
            bearFactory.createBear();
            bearDeath();
        } else {
            bearLife.style.width = `${healthWidth}rem`;
        }

        const attackSound = document.getElementById("attackSound");
        attackSound.play();
    }

    makeSound(stop) {
        if (stop) {
            this.bearSound.pause();
            this.bearSound.currentTime = 0;
        } else {
            this.bearSound.play();
        }
    }
}

const bearFactory = new BearFactory(playArea, imgsrcBear, bearSound, killAnimal);

function killAnimal() {
    if (bearsCount === 0) {
        return;
    }
    let healthIndicators = document.getElementsByClassName("animal-life");
    let healthIndicLength = healthIndicators.length;

    if (healthIndicLength > 0) {
        let randomInd = Math.floor(Math.random() * healthIndicLength);
        let healthIndicator = healthIndicators[randomInd];
        let currentWidth = parseFloat(healthIndicator.style.width);

        if (isNaN(currentWidth)) {
            currentWidth = 8;
        }

        if (currentWidth > 0) {
            let newWidth = Math.max(0, currentWidth - 0.3);
            healthIndicator.style.width = `${newWidth}rem`;

            if (newWidth === 0) {
                healthIndicator.classList.add("dead");
                updateAliveAndDeadCount();
                stopAnimal();
            }
        }
    }
}

function updateAliveAndDeadCount() {
    let totalAnimals = document.getElementsByClassName("animal-life").length;
    let deadAnimals = document.getElementsByClassName("dead").length;
    if (deadAnimals === 2) {
        document.getElementById("bearsWinBlock").style.display = "block";
    }

    let aliveAnimals = totalAnimals - deadAnimals;
    aliveAnimal.textContent = `Alive: ${aliveAnimals}`;
    dead.textContent = `Dead: ${deadAnimals}`;
    localStorage.setItem('killedBears', bearsCount);
}

function loadKilledBearsCount() {
    const killedBears = localStorage.getItem('killedBears');
    if (killedBears) {
        bearsCount = parseInt(killedBears);
    }
}
loadKilledBearsCount();

document.getElementById("playAgainButton").addEventListener("click", function () {
    location.reload();
});

document.addEventListener('keydown', function (event) {
    if (event.code === 'Escape') {
        window.location.href = 'http://127.0.0.1:5500/game/welcome.html';
    }
});


function stopAnimal() {
    if (bearsCount === 0) {
        return;
    }
    let animalContainers = document.getElementsByClassName("animal-container");
    for (let container of animalContainers) {
        let liveAnimalSpan = container.querySelector("span.animal-life:not(.dead)");
        let deadAnimalSpan = container.querySelector("span.animal-life.dead");

        if (deadAnimalSpan) {
            container.style.position = "unset";
            let imgElements = container.getElementsByClassName("chk");
            for (let img of imgElements) {
                img.style.transform = 'rotate(75deg)';
            }
        } else if (liveAnimalSpan) {
            let imgElements = container.getElementsByClassName("chk");
            for (let img of imgElements) {
                img.style.transform = 'rotate(0deg)';
            }
        }
    }
}

let bearsCount = 12;
let bearContainer = document.querySelector(".bear-container");

function bearDeath() {
    bearsCount -= 1;
    updateKilledBearsCount();
    increaseCoins(10);
    if (bearsCount === 0) {
        document.getElementById("nextLevelBlock").style.display = "block";
    }
}

function increaseCoins(amount) {
    allmoney += amount;
    coinElement.textContent = `${allmoney}`;
}

function updateKilledBearsCount() {
    localStorage.setItem('killedBears', killedBearsCount); 
}

function loadKilledBearsCount() {
    const killedBears = localStorage.getItem('killedBears');
    if (killedBears) {
        killedBearsCount = parseInt(killedBears);
    }
}
loadKilledBearsCount();

document.getElementById("retryButton").addEventListener("click", function () {
    location.reload();
});

document.addEventListener('click', function () {
    const backgroundMusic = document.getElementById('backgroundMusic');
    if (backgroundMusic.paused) {
        backgroundMusic.play();
    }
});
document.getElementById("mainMenuButton").addEventListener("click", function() {
    window.location.href = '/game/welcome.html'; // Перехід на  головне меню
});
document.getElementById("goMenubutton").addEventListener("click", function() {
    window.location.href = '/game/welcome.html'; // Перехід на  головне меню
});
