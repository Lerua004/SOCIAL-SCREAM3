// Находим элементы
const overlay = document.querySelector('.overlay');
const textContainer = document.querySelector('.text-container');
const hands = document.getElementById('hands');
const mouth = document.getElementById('mouth');
const face = document.querySelector('.face');

let textAnimation;

// Получаем параметры из URL
const urlParams = new URLSearchParams(window.location.search);
const visitedPage2 = urlParams.get('visitedPage2') === 'true';
const visitedPage3 = urlParams.get('visitedPage3') === 'true';

if (visitedPage3) {
    // Если пользователь вернулся с третьей страницы
    hands.classList.add('dimmed'); // Затемняем руки
    mouth.classList.add('dimmed');
    mouth.classList.remove('pulse-mouth'); // Убираем пульсацию рта
    face.classList.add('pulse-face'); // Добавляем пульсацию голове
    // Делаем рот кликабельным
    face.addEventListener('click', () => {
        window.location.href = 'page4.html?visitedPage4=true'; // Переход на третью страницу
    });
} else if (visitedPage2) {
    // Если пользователь вернулся со второй страницы
    hands.classList.add('dimmed'); // Затемняем руки
    hands.classList.remove('pulse'); // Убираем пульсацию рук
    mouth.classList.add('pulse-mouth'); // Добавляем пульсацию рту

    // Делаем рот кликабельным
    mouth.addEventListener('click', () => {
        window.location.href = 'page3.html?visitedPage2=true'; // Переход на третью страницу
    });
} else {
    // Начальное состояние
    setTimeout(() => {
        // Показываем оверлей
        overlay.style.opacity = '1';

        // Делаем текст видимым
        textContainer.style.opacity = '1';

        // Анимация текста
        const text = 'помоги избавиться от фобий...';
        let index = 0;

        textAnimation = setInterval(() => {
            const typedText = document.querySelector('.typed-text');
            if (typedText) {
                typedText.textContent += text[index];
                index++;

                if (index === text.length) {
                    clearInterval(textAnimation);

                    // Скрываем через 2 секунды
                    setTimeout(() => {
                        overlay.style.opacity = '0';
                        textContainer.style.opacity = '0';

                        // Запускаем пульсацию рук
                        hands.classList.add('pulse');
                    }, 2000);
                }
            } else {
                console.error('Элемент .typed-text не найден!');
            }
        }, 150);

    }, 3000);

    // Обработчик клика на руки
    hands.addEventListener('click', () => {
        window.location.href = 'page2.html?visitedPage2=true'; // Переход на вторую страницу
    });
}