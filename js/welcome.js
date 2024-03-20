
document.addEventListener('DOMContentLoaded', function() {
    const input = document.querySelector('.input');
    const saveButton = document.getElementById('save');
    const changeNameButton = document.getElementById('but');
    const startButton = document.getElementById('start');
    
   

    saveButton.addEventListener('click', function() {
        const name = input.value.trim();
        if (name) {
            localStorage.setItem('name', name);
            alert(`Ім'я ${name} збережено!`);
            input.value = ''; // Очищаємо поле вводу
        } else {
            alert('Будь ласка, введіть своє ім\'я перед збереженням.');
        }
    });

    changeNameButton.addEventListener('click', function() {
        input.value = localStorage.getItem('name') || '';
        input.focus(); 
    });

    startButton.addEventListener('click', function() {
        const name = localStorage.getItem('name');
        if (name) {
            alert(`Вітаємо, ${name}! Гра розпочинається.`);
            window.open("load.html");
            
        } else {
            alert('Будь ласка, збережіть своє ім\'я перед стартом гри.');
        }
    });

    
});

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

