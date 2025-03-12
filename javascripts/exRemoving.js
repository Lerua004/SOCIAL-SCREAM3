// Находим изображение EX
const exImage = document.querySelector('.ex-image');
const backButton = document.querySelector('.back-button');

if (!exImage) {
    console.error("Изображение EX не найдено. Проверьте селектор.");
}

let opacity = 1; // Начальная прозрачность изображения EX (полностью видимо)
const opacityStep = 0.08; // Шаг уменьшения прозрачности

// Добавляем обработчик кликов для изображения EX
exImage.addEventListener('click', () => {
    console.log("Изображение EX нажато"); // Отладка

    // Уменьшаем прозрачность изображения EX
    opacity -= opacityStep;

    // Ограничиваем минимальную прозрачность (не ниже 0)
    opacity = Math.max(opacity, 0);

    // Применяем новую прозрачность к изображению EX
    exImage.style.opacity = opacity;

    // Если изображение полностью исчезло, выводим сообщение
    if (opacity === 0) {
        // Показываем крестик
        backButton.classList.add('visible');
    }
});

// Обработчик клика на крестик
backButton.addEventListener('click', () => {
    window.location.href = 'index.html?visitedPage4=true'; // Возвращаемся на первую страницу
});