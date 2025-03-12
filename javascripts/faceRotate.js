// Находим все лица
const faces = document.querySelectorAll('.emoji');
const centerBox = document.querySelector('.center-box');
const backButton = document.querySelector('.back-button');

// Параметры анимации
let globalAngle = 0; // Общий угол для всех эмодзи
let stoppedFaceIndex = null; // Индекс остановленного эмодзи (изначально null)

// Функция для обновления вращения лиц
function updateFaceRotations() {
    // Увеличиваем общий угол
    globalAngle += 2; // Увеличиваем скорость вращения (быстрее)

    faces.forEach((face, index) => {
        // Если эмодзи не остановлен, продолжаем его вращать
        if (index !== stoppedFaceIndex) {
            // Применяем вращение через transform
            face.style.transform = `rotate(${globalAngle}deg)`;
        }
    });

    // Зацикливаем анимацию
    requestAnimationFrame(updateFaceRotations);
}

// Обработчик клика на прямоугольник
centerBox.addEventListener('click', () => {
    if (stoppedFaceIndex === null) {
        // Выбираем рандомный эмодзи
        stoppedFaceIndex = Math.floor(Math.random() * faces.length);

        // Останавливаем его
        const randomFace = faces[stoppedFaceIndex];
        randomFace.classList.add('stopped');

        // Добавляем класс для анимации возврата
        randomFace.classList.add('return-to-origin');

        // Изменяем стиль прямоугольника
        centerBox.classList.add('stopped');

        // Показываем крестик
        backButton.classList.add('visible');
    }
});

// Обработчик клика на крестик
backButton.addEventListener('click', () => {
    window.location.href = 'index.html?visitedPage2=true'; // Возвращаемся на первую страницу
});

// Ждем загрузки всех изображений
Promise.all(Array.from(faces).map(face => {
    if (!face.complete) {
        return new Promise(resolve => face.onload = resolve);
    }
})).then(() => {
    // Запускаем анимацию после загрузки всех изображений
    updateFaceRotations();
});