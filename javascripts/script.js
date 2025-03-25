const overlay = document.querySelector(".overlay");
const textContainer = document.querySelector(".text-container");
const hands = document.getElementById("hands");
const mouth = document.getElementById("mouth");
const face = document.querySelector(".face");

const page1 = document.querySelector(".page-1");
const page2 = document.querySelector(".page-2");
const page3 = document.querySelector(".page-3");
const page4 = document.querySelector(".page-4");

let textAnimation;

// Функция для показа определенной страницы
function showPage(page) {
  // Скрываем все страницы
  [page1, page2, page3, page4].forEach((p) => p.classList.remove("active"));

  // Показываем выбранную страницу
  if (page) {
    page.classList.add("active");
  }
}

setTimeout(() => {
  //  руки неклик
  hands.style.pointerEvents = "none";
  hands.style.cursor = "pointer";

  overlay.style.opacity = "1";

  textContainer.style.opacity = "1";

  const text = "помоги избавиться от фобий...";
  let index = 0;

  textAnimation = setInterval(() => {
    const typedText = document.querySelector(".typed-text");
    if (typedText) {
      typedText.textContent += text[index];
      index++;

      if (index === text.length) {
        clearInterval(textAnimation);

        // убрать через 2 секунды
        setTimeout(() => {
          overlay.style.opacity = "0";
          textContainer.style.opacity = "0";

          hands.classList.add("pulse");

          //  руки клик
          hands.style.pointerEvents = "auto";
        }, 2000);
      }
    } else {
      console.error("Элемент .typed-text не найден!");
    }
  }, 150);
}, 3000);

// переход на страницу 2
hands.addEventListener("click", () => {
  hands.classList.add("dimmed");
  hands.classList.remove("pulse");
  mouth.classList.add("pulse-mouth");

  // Показываем страницу 2
  showPage(page2);

  mouth.addEventListener("click", () => {
    hands.classList.add("dimmed");
    mouth.classList.add("dimmed");
    mouth.classList.remove("pulse-mouth");
    face.classList.add("pulse-face");

    showPage(page3);

    face.addEventListener("click", () => {
      hands.classList.add("dimmed");
      mouth.classList.add("dimmed");
      face.classList.add("dimmed");
      face.classList.remove("pulse-face");

      // Показываем страницу 4
      showPage(page4);
    });
  });
});

const faces = document.querySelectorAll(".emoji");
const centerBox = document.querySelector(".center-box");
const backButton_2 = document.querySelector(".back-button-2");

let globalAngle = 0;
let stoppedFaceIndex = null;

//  обновление вращения лиц
function updateFaceRotations() {
  globalAngle += 9; // увеличиваем скорость вращения

  faces.forEach((face, index) => {
    // Если эмодзи не остановлен, продолжаем его вращать
    if (index !== stoppedFaceIndex) {
      // вращаем обратно
      face.style.transform = `rotate(${globalAngle}deg)`;
    }
  });

  requestAnimationFrame(updateFaceRotations);
}

centerBox.addEventListener("click", () => {
  if (stoppedFaceIndex === null) {
    // рандом эмодзи
    stoppedFaceIndex = Math.floor(Math.random() * faces.length);

    const randomFace = faces[stoppedFaceIndex];
    randomFace.classList.add("stopped");

    //  анимация возврата
    randomFace.classList.add("return-to-origin");

    centerBox.classList.add("stopped");

    backButton_2.classList.add("visible");
  }
});

backButton_2.addEventListener("click", () => {
  page2.classList.remove("active");

  page1.classList.add("active");

  hands.classList.add("dimmed");

  mouth.classList.add("pulse-mouth");

  hands.classList.remove("pulse");
});

//  загрузка всех изображений
Promise.all(
  Array.from(faces).map((face) => {
    if (!face.complete) {
      return new Promise((resolve) => (face.onload = resolve));
    }
  })
).then(() => {
  updateFaceRotations();
});

// ----------- Page 3 ----------------

const input = document.querySelector(".username-input");
const hearts = document.querySelectorAll(".heart");
const likeIcon = document.querySelector('.icon-group img[alt="Like"]');
const likeCount = document.querySelector(".icon-group .icon-text");
const centerBoxPost = document.querySelector(".center-box-post");
const backButton_3 = document.querySelector(".back-button-3");

let isUsernameEntered = false;
let heartsClicked = 0;
let blinkInterval;

function blinkPlaceholder() {
  blinkInterval = setInterval(() => {
    input.placeholder =
      input.placeholder === "Введите никнейм" ? "" : "Введите никнейм";
  }, 500);
}

input.addEventListener("input", () => {
  if (input.value.trim() !== "") {
    isUsernameEntered = true;
    input.style.color = "black";
    clearInterval(blinkInterval);
    input.placeholder = "";
    enableHearts(); // разрешаем взаимодействие с сердцами
  }
});

function enableHearts() {
  hearts.forEach((heart) => {
    heart.style.pointerEvents = "auto";
    heart.style.cursor = "pointer";

    heart.addEventListener("click", () => {
      console.log("Heart clicked");
      if (!heart.classList.contains("repaired")) {
        heart.src = "./images/heart_repaired.png";
        heart.classList.add("repaired");
        heartsClicked++;

        const screenWidth = window.innerWidth;

        // Проверяем, все ли сердца нажаты
        if (screenWidth < 480 && heartsClicked === 12) {
          showPost();
        } else if (heartsClicked === hearts.length) {
          showPost();
        }
      }
    });
  });
}
//  показать пост и обновить интерфейс
function showPost() {
  const centerContainer = document.querySelector(".center-container");

  const postImage = document.createElement("img");
  postImage.src = "./images/post.png";
  postImage.alt = "Post";

  // картинка на пост
  centerContainer.appendChild(postImage);

  const avatarSpan = document.querySelector(".avatar");

  // заменяем аватар
  if (avatarSpan && avatarSpan.tagName === "SPAN") {
    const avatarImage = document.createElement("img");
    avatarImage.src = "./images/profile.jpg";
    avatarImage.alt = "Profile";
    avatarImage.className = "avatar";

    avatarSpan.replaceWith(avatarImage);
  }

  // меняем лайк
  likeIcon.src = "./images/liked.png";
  likeIcon.style.filter =
    "brightness(0) saturate(100%) invert(19%) sepia(79%) saturate(7427%) hue-rotate(3deg) brightness(96%) contrast(125%)";

  // счетчик
  likeCount.textContent = parseInt(likeCount.textContent) + 1;

  backButton_3.classList.add("visible");
}

backButton_3.addEventListener("click", () => {
  page3.classList.remove("active");
  page2.classList.remove("active");

  page1.classList.add("active");

  hands.classList.add("dimmed");
  mouth.classList.add("dimmed");

  mouth.classList.remove("pulse-mouth");

  hands.classList.remove("pulse");

  face.classList.add("pulse");
});

blinkPlaceholder();

// ---------- Page 4 ----------------------

const exImage = document.querySelector(".ex-image");
const backButton_4 = document.querySelector(".back-button-4");

const exImages = [
  "./images/ex_1.png",
  "./images/ex_2.png",
  "./images/ex_3.png",
  "./images/ex_4.png",
  "./images/ex_5.png",
  "./images/ex_6.png",
];

let currentImageIndex = 0; // индекс текущего изображения

//  обработчик кликов для изображения EX
exImage.addEventListener("click", () => {
  console.log("Изображение EX нажато");

  currentImageIndex++;

  // проверяем, не вышли ли за пределы массива ( кол-во изображени)
  if (currentImageIndex < exImages.length) {
    exImage.src = exImages[currentImageIndex];
  } else {
    // если достигли последнего изображения (ex_6.png), скрываем изображение и показываем крестик
    exImage.style.display = "none";
    backButton_4.classList.add("visible");
  }
});

const finalOverlay = document.querySelector(".final-overlay");
const finalText = document.querySelector(".final-text");

backButton_4.addEventListener("click", () => {
  // скрываем все страницы
  page3.classList.remove("active");
  page2.classList.remove("active");
  page4.classList.remove("active");

  page1.classList.add("active");

  hands.classList.add("dimmed");
  mouth.classList.add("dimmed");
  face.classList.add("dimmed");

  mouth.classList.remove("pulse-mouth");
  hands.classList.remove("pulse");
  face.classList.remove("pulse");

  setTimeout(() => {
    finalOverlay.classList.add("visible");

    const text = "ТЫ ПОБЕДИЛ ФОБИИ...";
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index < text.length) {
        finalText.textContent += text[index];
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    finalText.classList.add("visible");
  }, 500);
});
