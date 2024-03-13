// кнопка для start(відкриває файл js) і після цього починається загрузочне меню 
// коли прогрузилось меню нам показується поле грядків для нашищ тварин чи рослин 

const preloadTime = document.getElementById("count");
const bodyImg = document.getElementsByTagName("BODY")[0];
const chikenAnimation = document.getElementsByClassName("chiken")[0];
const insideLine = document.getElementById("inside_line");
const preloadLine = document.getElementById("preload_line");
let count = 0;
let countInsideLine = 0;
// функ яка викликається кожну секунду і обновлює процент загрузки і загрузочну полоску 
const interval = setInterval(() => {
    
    countInsideLine += 16.5;
    count += 16.5;
    // 
    if (count >= 100) {
        preloadTime.textContent = '100%';
        
        insideLine.style.width = '100%'; 

        clearInterval(interval);
        preloadTime.style.display="none";
        chikenAnimation.style.display="none";
        document.body.style.backgroundImage = "url('./img/farm_base.jpg')";
        preloadLine.style.display="none";
    } else {
        preloadTime.textContent = `${count}%`;
        insideLine.style.width = `${countInsideLine}%`;
    }
}, 1000);

