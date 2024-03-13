const myButton=document.getElementById("but");
// кнопка для фокус на поле ввода 
 const myCallback=(e)=>{
    if(e.target===myButton){
        document.getElementsByClassName("input")[0].focus();
    }

 }
 document.addEventListener("click",myCallback);



// кнопка для сохр user і потом передати для вітаняя user після того як сохранили очищуємо поле
 const saveBut = document.getElementById("save");
 const myInp =document.getElementsByClassName("input")[0];
 let user ="";
 const saveButton =(e)=>{
    if(e.target===saveBut){
        
        user+=`${myInp.value}`
        myInp.value="";



    }
 }
 document.addEventListener("click",saveButton);
 const volumeSilent = document.getElementById("silent");
const audio = document.getElementById("audio");

// кнопка для переключання звука
 const silentCallback = () => {
    // Перевіряємо, яке зараз зображення встановлено, і змінюємо його
    if (volumeSilent.src.includes('volume.png')) {
        volumeSilent.src = './img/silent.png'; // Якщо зараз volume, змінюємо на silent
        audio.pause();



    } else {
        volumeSilent.src = './img/volume.png'; // Інакше змінюємо на volume
        audio.play();
    }
}
 volumeSilent.addEventListener("click",silentCallback);

// кнопка для start(відкриває файл game)
const starGame = document.getElementById("start");
const openCallback =(e)=>{
    if(e.target===starGame){
        window.open("game.html");
    }
}
document.addEventListener("click",openCallback);
