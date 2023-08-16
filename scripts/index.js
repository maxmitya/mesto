//Переменная попапа редактирования профиля
const editPopup = document.querySelector('#edit-popup');

//Переменная попапа добавления карточки
const addPopup = document.querySelector('#add-popup');

//Переменная формы попапа редактирования профиля
const editForm = document.querySelector('#edit-form');

//Переменная формы попапа добавления карточки
const addForm = document.querySelector('#add-form');

//Переменная имени профиля
const profileName = document.querySelector('.profile__name');

//Переменная проффесии профиля
const profileProfession = document.querySelector('.profile__profession');

//Переменная поля ввода имени попапа редактирования
const nameInput = editForm.querySelector('#name-input');

//Переменная поля ввода проффессии попапа редактирования
const professionInput = editForm.querySelector('#profession-input');

//Переменная поля ввода заголовка попапа добавления карточки
const titleInput = addForm.querySelector('#title-input');

//Переменная поля ввода ссылки на изображение попапа добавления карточки
const imageInput = addForm.querySelector('#image-input');

//Переменная заготовки (template) новой карточки
const cardTemplate = document.querySelector('#card-template').content;

//Переменная карточки из template
const cardFromTemplate = cardTemplate.querySelector('.card');

//Переменная секции с карточками
const cards = document.querySelector('.cards');

//Переменная попапа увеличенной картинки
const imagePopup = document.querySelector('#image-popup');

// Переменная увеличенной картинки
const bigPopupImage = imagePopup.querySelector('.popup__img');

// Переменная заголовка увеличенной картинки
const bigPopupTitle = imagePopup.querySelector('.popup__title');

//Переменная кнопки открытия попапа редактирования профиля
const openPopupEdit = document.querySelector('#open-popup-edit');

//Переменная кнопки закрытия попапа редактирования профиля
const closePopupEdit = document.querySelector('#close-popup-edit');

//Переменная кнопки открытия попапа добавления карточки
const openPopupAdd = document.querySelector('#open-popup-add');

//Переменная кнопки закрытия попапа добавления карточки
const closePopupAdd = document.querySelector('#close-popup-add');

//Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Функция закрытия попапа кликом по заливке
function initClosePopupByOverlay(popup) {
  popup.addEventListener('click', function (event) {
    if (event.target == event.currentTarget) {
      closePopup(popup);
    }
  });
}

// Функция закрытия попапа кликом на Esc
function initClosePopupByEscape(popup) {
  window.addEventListener('keydown', function (event) {
    if (event.code == 'Escape') {
      closePopup(popup);
    }
  });
}

//Слушатель нажатия на кнопку открытия попапа редактирования
openPopupEdit.addEventListener('click', function () {
  openPopup(editPopup);
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
});

initClosePopupByOverlay(editPopup);
initClosePopupByEscape(editPopup);

//Слушатель нажатия на кнопку закрытия попапа редактирования
closePopupEdit.addEventListener('click', function () {
  closePopup(editPopup);
});

//Слушатель нажатия на кнопку Enter в форме попапа редактирования
editForm.addEventListener('submit', function (event) {
  event.preventDefault();
  profileProfession.textContent = professionInput.value;
  profileName.textContent = nameInput.value;
  closePopup(editPopup);
});

//Слушатель нажатия на кнопку открытия попапа добавления
openPopupAdd.addEventListener('click', function () {
  openPopup(addPopup);
});

initClosePopupByOverlay(addPopup);
initClosePopupByEscape(addPopup);

//Слушатель нажатия на кнопку закрытия попапа добавления
closePopupAdd.addEventListener('click', function () {
  closePopup(addPopup);
});

//Слушатель нажатия на кнопку Enter в форме попапа создания новой карточки
addForm.addEventListener('submit', function (event) {
  event.preventDefault();

  createCard(titleInput.value, imageInput.value);

  const newCard = createCard(titleInput.value, imageInput.value);
  cards.prepend(newCard);

  addForm.reset();

  closePopup(addPopup);
});

// Массив с новыми карточками
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Метод перебора массива для создания карточек
initialCards.forEach(function (object) {
  const newCard = createCard(object.name, object.link);
  cards.prepend(newCard);
});

// Функция создания карточек из массива
function createCard(title, link) {
  const newCard = cardFromTemplate.cloneNode(true);
  const cardTitle = newCard.querySelector('.card__title');
  const cardImg = newCard.querySelector('.card__image');

  cardTitle.textContent = title;
  cardImg.src = link;
  cardImg.alt = cardTitle.textContent;

  const delButton = newCard.querySelector('.card__trash');
  delButton.addEventListener('click', function (event) {
    newCard.remove();
  });

  const likeButton = newCard.querySelector('.card__button');
  likeButton.addEventListener('click', function (event) {
    event.target.classList.toggle('card__button_active');
  });

  cardImg.addEventListener('click', function () {
    openPopup(imagePopup);
    bigPopupTitle.textContent = cardTitle.textContent;
    bigPopupImage.src = cardImg.src;
    bigPopupImage.alt = cardImg.alt;
  });

  initClosePopupByOverlay(imagePopup);
  initClosePopupByEscape(imagePopup);

  // cards.prepend(newCard);

  return newCard;
}

const closeImagePopup = imagePopup.querySelector('#close-popup-image');
closeImagePopup.addEventListener('click', function () {
  closePopup(imagePopup);
});
