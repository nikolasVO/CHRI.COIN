// Логотип и лист с информацией
const logo = document.getElementById('logo');
const infoSheet = document.getElementById('info-sheet');

// Открываем лист с информацией при клике на логотип
logo.addEventListener('click', () => {
    infoSheet.style.display = 'flex';
});

// Закрываем лист с информацией при клике вне его
window.addEventListener('click', (event) => {
    if (event.target === infoSheet) {
        infoSheet.style.display = 'none';
    }
});

// Функция для создания падающего пирога
function createFallingPie() {
    const pie = document.createElement('img');
    pie.src = 'png.png'; // Путь к изображению пирога
    pie.classList.add('falling-pie');

    // Случайная позиция по горизонтали
    const randomX = Math.random() * window.innerWidth;
    pie.style.left = `${randomX}px`;

    // Случайная скорость падения
    const randomDuration = Math.random() * 5 + 3; // От 3 до 8 секунд
    pie.style.animationDuration = `${randomDuration}s`;

    // Добавляем пирог на страницу
    document.body.appendChild(pie);

    // Проверка столкновения с логотипом
    const checkCollision = () => {
        const logoRect = logo.getBoundingClientRect();
        const pieRect = pie.getBoundingClientRect();

        if (
            pieRect.left < logoRect.right &&
            pieRect.right > logoRect.left &&
            pieRect.top < logoRect.bottom &&
            pieRect.bottom > logoRect.top
        ) {
            // Пирог сталкивается с логотипом
            pie.style.animation = 'none'; // Останавливаем анимацию
            pie.remove(); // Удаляем пирог
        }
    };

    // Проверяем столкновение каждые 50 мс
    const collisionInterval = setInterval(checkCollision, 50);

    // Удаляем пирог после завершения анимации
    pie.addEventListener('animationend', () => {
        clearInterval(collisionInterval);
        pie.remove();
    });
}

// Создаём пироги каждые 500 миллисекунд
setInterval(createFallingPie, 500);