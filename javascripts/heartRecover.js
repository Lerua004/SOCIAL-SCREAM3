// Находим элементы
const input = document.querySelector('.username-input');
const hearts = document.querySelectorAll('.heart');
const likeIcon = document.querySelector('.icon-group img[alt="Like"]');
const likeCount = document.querySelector('.icon-group .icon-text');
const centerBox = document.querySelector('.center-box-post');
const backButton = document.querySelector('.back-button');

let isUsernameEntered = false; // Флаг для проверки ввода никнейма
let heartsClicked = 0; // Счетчик нажатых сердец
let blinkInterval; // Переменная для хранения интервала

// 1. Мигание текста в input
function blinkPlaceholder() {
    blinkInterval = setInterval(() => {
        input.placeholder = input.placeholder === 'Введите никнейм' ? '' : 'Введите никнейм';
    }, 500);
}

// 2. Проверка ввода никнейма
input.addEventListener('input', () => {
    if (input.value.trim() !== '') {
        isUsernameEntered = true;
        input.style.color = 'black'; // Убираем мигание
        clearInterval(blinkInterval); // Останавливаем мигание
        input.placeholder = ''; // Убираем placeholder
        enableHearts(); // Разрешаем взаимодействие с сердцами
    }
});

// 3. Включение сердец для кликов
function enableHearts() {
    hearts.forEach(heart => {
        heart.style.pointerEvents = 'auto'; // Разрешаем клики
        heart.style.cursor = 'pointer'; // Добавляем указатель

        // Обработчик клика на сердце
        heart.addEventListener('click', () => {
            console.log("Heart clicked"); // Отладка
            if (!heart.classList.contains('repaired')) {
                heart.src = './images/heart_repaired.png'; // Меняем изображение
                heart.classList.add('repaired'); // Отмечаем как "починенное"
                heartsClicked++; // Увеличиваем счетчик

                // Проверяем, все ли сердца нажаты
                if (heartsClicked === hearts.length) {
                    showPost(); // Показываем пост
                }
            }
        });
    });
}

// 4. Показать пост и обновить интерфейс
function showPost() {
    // Находим центральный контейнер
    const centerContainer = document.querySelector('.center-container');

    // Создаем изображение post.png
    const postImage = document.createElement('img');
    postImage.src = './images/post.png';
    postImage.alt = 'Post';

    // Добавляем изображение в центральный контейнер
    centerContainer.appendChild(postImage);

    // Меняем иконку лайка на красную
    likeIcon.src = './images/liked.png';
    likeIcon.style.filter = "brightness(0) saturate(100%) invert(19%) sepia(79%) saturate(7427%) hue-rotate(3deg) brightness(96%) contrast(125%)";

    // Увеличиваем счетчик лайков
    likeCount.textContent = parseInt(likeCount.textContent) + 1;

    // Показываем крестик
    backButton.classList.add('visible');
}

// Обработчик клика на крестик
backButton.addEventListener('click', () => {
    window.location.href = 'index.html?visitedPage3=true'; // Возвращаемся на первую страницу
});


// Запускаем мигание placeholder
blinkPlaceholder();