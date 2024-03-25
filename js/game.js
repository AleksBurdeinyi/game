

const buyAnimal = document.getElementById("buy");
const animal = document.getElementById("animal");
const aliveAnimal = document.getElementById("alive");
const playArea = document.getElementsByClassName("areagame")[0];
const dead = document.getElementById("dead");
const wolfSound = document.getElementById("audw");
let deadCount = 0;
const imgsrc = './img/animal.webp';
const imgsrcWolf = './img/wolf.png';
const inmSword = './img/sword.webp';
let aliveAnimalCount = 1;
let animalCount = 1;
const price = 60;
const coinElement = document.getElementById("coin");
let allmoney = parseInt(coinElement.textContent, 10); 

const increaseMoney = () => {
    allmoney += 4;
    coinElement.textContent = `${allmoney}`;
};
const moneyInterval = setInterval(increaseMoney, 5000);

const myCallback = (e) => {
    if (allmoney >= price) {
        allmoney -= price;
        coinElement.textContent = `${allmoney}`;

        // Створення контейнера для тварини
        let animalContainer = document.createElement("div");
        animalContainer.className = "animal-container";
        animalContainer.style.position = "relative";
        animalContainer.style.display = "inline-block";

        // Створення індикатора життя
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
        span.style.marginBottom="0.4rem"

        // Створення зображення тварини
        let animalChk = document.createElement("img");
        animalChk.src = imgsrc;
        animalChk.style.height = "8rem";
        animalChk.className="chk";

        // Додавання індикатора життя та зображення тварини до контейнера
        animalContainer.appendChild(span);
        animalContainer.appendChild(animalChk);

        // Додавання контейнера до ігрової зони
        playArea.appendChild(animalContainer);

        animal.textContent = `Animal: ${animalCount++}`;
        updateAliveAndDeadCount();

        // Переміщення контейнера тварини
        
        setInterval(() => moveAnimal(animalContainer), 2000);
        setInterval(()=>createWolf(),10000);
        
        

    } else {
        alert("Not enough coins!");
    }
};


const moveAnimal = (animalContainer) => {
    if(wolvesCount ===0){
        return
    }
    const maxX = playArea.offsetWidth - animalContainer.offsetWidth;
    const maxY = playArea.offsetHeight - animalContainer.offsetHeight;
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    animalContainer.style.left = `${newX}px`;
    animalContainer.style.top = `${newY}px`;
};


buyAnimal.addEventListener("click", myCallback);

function createWolf(){
    if(wolvesCount ===0){
        return
    }
    let wolfQuant = document.getElementsByClassName("wolf-container").length;
    if (wolfQuant <= 8|| wolvesCount===0) {
        makeSound(false); 
         
    } else {
        makeSound(true);
        return; 
    }

    let wolfContainer = document.createElement("div");
        wolfContainer.className = "wolf-container";
        wolfContainer.style.position = "relative";
        wolfContainer.style.display = "inline-block";
        wolfContainer.addEventListener("click", kickWolf);

    let wolfHP = document.createElement("span");
        wolfHP.className = "wolf-life";
        wolfHP.style.position = "absolute";
        wolfHP.style.bottom = "100%";
        wolfHP.style.left = "50%";
        wolfHP.style.transform = "translateX(-50%)";
        wolfHP.style.backgroundColor = "#879257";
        wolfHP.style.height = "10px";
        wolfHP.style.display = "block";
        wolfHP.style.borderRadius = "20px";
        wolfHP.style.width = "8rem";
        wolfHP.style.marginBottom="0.4rem"
        wolfHP.style.position="absolute";

        // Створення зображення вовка
        let wolf = document.createElement("img");
        wolf.src = imgsrcWolf;
        wolf.style.height = "8rem";

        wolfContainer.appendChild(wolfHP);
        wolfContainer.appendChild(wolf);
        playArea.appendChild(wolfContainer);
        
        function moveWolf() {
            
            const maxX = playArea.offsetWidth - wolfContainer.offsetWidth;
            const maxY = playArea.offsetHeight - wolfContainer.offsetHeight;
            const newX = Math.random() * maxX;
            const newY = Math.random() * maxY;
            wolfContainer.style.left = `${newX}px`;
            wolfContainer.style.top = `${newY}px`;
        }
    
        moveWolf();
        setInterval(moveWolf, 2000);
        killAnimal();
        setInterval(killAnimal,10000);

}

function killAnimal() {
    if(wolvesCount ===0){
        return
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

            // Якщо здоров'я тварини стало рівним 0, відзначаємо її як мертву
            if (newWidth === 0) {
                healthIndicator.classList.add("dead");
                
                updateAliveAndDeadCount();
                stopAnimal();
               
                    
            }   
        }
    }
}






function updateAliveAndDeadCount() {
    
    let totalAnimals = document.getElementsByClassName("animal-life").length; // Припустимо, що кожна тварина має індикатор здоров'я
    let deadAnimals = document.getElementsByClassName("dead").length;
    if(deadAnimals===2){
        document.getElementById("wolvesWinBlock").style.display = "block";
    }
    
    let aliveAnimals = totalAnimals - deadAnimals; // Обчислюємо кількість "живих" тварин

    
    
    aliveAnimal.textContent = `Alive: ${aliveAnimals}`;
    dead.textContent = `Dead: ${deadAnimals}`;

}

function stopAnimal() {
    if(wolvesCount ===0){
        return
    }
    let animalContainers = document.getElementsByClassName("animal-container");
    for (let container of animalContainers) {
        // Шукаємо всередині контейнера span з класом 'animal-life' 
        let liveAnimalSpan = container.querySelector("span.animal-life:not(.dead)");
        // Також шукаємо span з класами 'animal-life' та 'dead'
        let deadAnimalSpan = container.querySelector("span.animal-life.dead");
        
        // Якщо span з класом 'dead' знайдено
        if (deadAnimalSpan) {
           
            container.style.position = "unset";
            let imgElements = container.getElementsByClassName("chk"); // Переконаймося, що шукаємо в межах контейнера
            for (let img of imgElements) {
                img.style.transform = 'rotate(75deg)';
            }
        } else if (liveAnimalSpan) { // Якщо знайдено живу тварину
            let imgElements = container.getElementsByClassName("chk"); // Переконаймося, що шукаємо в межах контейнера
            for (let img of imgElements) {
                
                img.style.transform = 'rotate(0deg)';
            }
        }
    }
}
let wolvesCount = 9;
let wolfContainer = document.querySelector(".wolf-container");
function kickWolf(event) {

    const wolfLife = event.currentTarget.querySelector(".wolf-life");
    let healthWidth = parseFloat(wolfLife.style.width);

    healthWidth -= 3; // Зменшуємо ширину на 3rem
    event.currentTarget.style

    if (healthWidth <= 0) {
        event.currentTarget.style.display = 'none';
        createWolf()
        WolfDeath();
    } else {
        wolfLife.style.width = `${healthWidth}rem`; // Оновлюємо ширину індикатора здоров'я
    }
    
}
function WolfDeath() {
    wolvesCount -= 1; 
    if (wolvesCount === 0) {
        // Якщо всі вовки убиті, показуємо блок з кнопками
        document.getElementById("nextLevelBlock").style.display = "block";
    }
}
 


function makeSound(stop) {
    if (stop) {
        wolfSound.pause();
        wolfSound.currentTime = 0; 
    } else {
        wolfSound.play();
    }  
}

document.getElementById("retryButton").addEventListener("click", function() {
    location.reload(); 
});
;
document.getElementById("playAgainButton").addEventListener("click", function() {
    location.reload(); // Перезавантаження сторінки для нової гри
});
document.getElementById("nextLevelButton").addEventListener("click",function(){
   window.location.href = '/game/lvl2.html';

});

document.getElementById("mainMenuButton").addEventListener("click", function() {
    window.location.href = '/game/index.html'; // Перехід на  головне меню
});
document.getElementById("goMenubutton").addEventListener("click", function() {
    window.location.href = '/game/index.html'; // Перехід на  головне меню
});


//дані user
let user = localStorage.getItem('name');
let userBox = document.getElementById("user");
userBox.textContent=`${userBox.textContent} :${user} `;
