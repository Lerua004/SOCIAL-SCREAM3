// Находим элементы
const overlay = document.querySelector('.overlay');
const textContainer = document.querySelector('.text-container');
const hands = document.getElementById('hands');
const mouth = document.getElementById('mouth');
const face = document.querySelector('.face');

// Находим все страницы
const page1 = document.querySelector('.page-1');
const page2 = document.querySelector('.page-2');
const page3 = document.querySelector('.page-3');
const page4 = document.querySelector('.page-4');

let textAnimation;

// Функция для показа определенной страницы
function showPage(page) {
    // Скрываем все страницы
    [page1, page2, page3, page4].forEach(p => p.classList.remove('active'));

    // Показываем выбранную страницу
    if (page) {
        page.classList.add('active');
    }
}

// Начальное состояние
setTimeout(() => {
    // Делаем руки некликабельными
    hands.style.pointerEvents = 'none';
    hands.style.cursor = "pointer";
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

                    // Делаем руки кликабельными
                    hands.style.pointerEvents = 'auto';
                }, 2000);
            }
        } else {
            console.error('Элемент .typed-text не найден!');
        }
    }, 150);

}, 3000);

// Обработчик клика на руки (переход на страницу 2)
hands.addEventListener('click', () => {
    hands.classList.add('dimmed'); // Затемняем руки
    hands.classList.remove('pulse'); // Убираем пульсацию рук
    mouth.classList.add('pulse-mouth'); // Добавляем пульсацию рту

    // Показываем страницу 2
    showPage(page2);
    // showPage(page4); // test

    // Делаем рот кликабельным
    mouth.addEventListener('click', () => {
        hands.classList.add('dimmed'); // Затемняем руки
        mouth.classList.add('dimmed'); // Затемняем рот
        mouth.classList.remove('pulse-mouth'); // Убираем пульсацию рта
        face.classList.add('pulse-face'); // Добавляем пульсацию голове

        // Показываем страницу 3
        showPage(page3);

        // Делаем голову кликабельной
        face.addEventListener('click', () => {
            hands.classList.add('dimmed'); // Затемняем руки
            mouth.classList.add('dimmed'); // Затемняем рот
            face.classList.add('dimmed'); // Затемняем голову
            face.classList.remove('pulse-face'); // Убираем пульсацию головы

            // Показываем страницу 4
            showPage(page4);
        });
    });
});


// Находим все лица
const faces = document.querySelectorAll('.emoji');
const centerBox = document.querySelector('.center-box');
const backButton_2 = document.querySelector('.back-button-2');

// Параметры анимации
let globalAngle = 0; // Общий угол для всех эмодзи
let stoppedFaceIndex = null; // Индекс остановленного эмодзи (изначально null)

// Функция для обновления вращения лиц
function updateFaceRotations() {
    // Увеличиваем общий угол
    globalAngle += 6; // Увеличиваем скорость вращения (быстрее)

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
        backButton_2.classList.add('visible');
    }
});

// Обработчик клика на крестик
backButton_2.addEventListener('click', () => {
    // Скрываем вторую страницу
    page2.classList.remove('active');

    // Показываем первую страницу
    page1.classList.add('active');

    // Затемняем руки
    hands.classList.add('dimmed');

    // Добавляем пульсацию рту
    mouth.classList.add('pulse-mouth');

    // Убираем пульсацию рук
    hands.classList.remove('pulse');
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


// ----------- Page 3 ----------------

// Находим элементы
const input = document.querySelector('.username-input');
const hearts = document.querySelectorAll('.heart');
const likeIcon = document.querySelector('.icon-group img[alt="Like"]');
const likeCount = document.querySelector('.icon-group .icon-text');
const centerBoxPost = document.querySelector('.center-box-post');
const backButton_3 = document.querySelector('.back-button-3');

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

    // Находим элемент span.avatar
    const avatarSpan = document.querySelector('.avatar');

    // Заменяем span на img с изображением профиля
    if (avatarSpan && avatarSpan.tagName === 'SPAN') {
        const avatarImage = document.createElement('img');
        avatarImage.src = './images/profile.jpg';
        avatarImage.alt = 'Profile';
        avatarImage.className = 'avatar'; // Присваиваем тот же класс для стилей

        // Заменяем span на img
        avatarSpan.replaceWith(avatarImage);
    }

    // Меняем иконку лайка на красную
    likeIcon.src = './images/liked.png';
    likeIcon.style.filter = "brightness(0) saturate(100%) invert(19%) sepia(79%) saturate(7427%) hue-rotate(3deg) brightness(96%) contrast(125%)";

    // Увеличиваем счетчик лайков
    likeCount.textContent = parseInt(likeCount.textContent) + 1;

    // Показываем крестик
    backButton_3.classList.add('visible');
}

// Обработчик клика на крестик
backButton_3.addEventListener('click', () => {
    // Скрываем вторую страницу
    page3.classList.remove('active');
    page2.classList.remove('active');

    // Показываем первую страницу
    page1.classList.add('active');

    // Затемняем руки
    hands.classList.add('dimmed');
    mouth.classList.add('dimmed');

    // Добавляем пульсацию рту
    mouth.classList.remove('pulse-mouth');

    // Убираем пульсацию рук
    hands.classList.remove('pulse');

    face.classList.add('pulse');
});


// Запускаем мигание placeholder
blinkPlaceholder();


// ---------- Page 4 ----------------------

// Находим изображение EX
const exImage = document.querySelector('.ex-image');
const backButton_4 = document.querySelector('.back-button-4');

if (!exImage) {
    console.error("Изображение EX не найдено. Проверьте селектор.");
}

// Массив с путями к изображениям
const exImages = [
    './images/ex_1.png',
    './images/ex_2.png',
    './images/ex_3.png',
    './images/ex_4.png',
    './images/ex_5.png',
    './images/ex_6.png'
];

let currentImageIndex = 0; // Индекс текущего изображения

// Добавляем обработчик кликов для изображения EX
exImage.addEventListener('click', () => {
    console.log("Изображение EX нажато"); // Отладка

    // Переходим к следующему изображению
    currentImageIndex++;

    // Проверяем, не вышли ли за пределы массива
    if (currentImageIndex < exImages.length) {
        // Заменяем изображение
        exImage.src = exImages[currentImageIndex];
    } else {
        // Если достигли последнего изображения (ex_6.png), показываем крестик
        backButton_4.classList.add('visible');
    }
});

// Находим элементы для затемнения и текста
const finalOverlay = document.querySelector('.final-overlay');
const finalText = document.querySelector('.final-text');

// Обработчик клика на крестик
backButton_4.addEventListener('click', () => {
    // Скрываем все страницы
    page3.classList.remove('active');
    page2.classList.remove('active');
    page4.classList.remove('active');

    // Показываем первую страницу
    page1.classList.add('active');

    // Затемняем руки, рот и голову
    hands.classList.add('dimmed');
    mouth.classList.add('dimmed');
    face.classList.add('dimmed');

    // Убираем пульсацию
    mouth.classList.remove('pulse-mouth');
    hands.classList.remove('pulse');
    face.classList.remove('pulse');

    // Показываем затемнение
    setTimeout(() => {
        finalOverlay.classList.add('visible');

        // Анимация текста "Ты победил все фобии..."
        const text = 'Ты победил все фобии...';
        let index = 0;

        const typingInterval = setInterval(() => {
            if (index < text.length) {
                finalText.textContent += text[index];
                index++;
            } else {
                clearInterval(typingInterval); // Останавливаем интервал
            }
        }, 100); // Интервал между буквами (в миллисекундах)

        // Показываем текст после небольшой задержки
        finalText.classList.add('visible');
    }, 500); // Задержка для плавного эффекта
});