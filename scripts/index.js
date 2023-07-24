const openPopupEdit = document.querySelector('#open-popup-edit'); //Переменная кнопки открытия попапа редактирования профиля

const openPopupAdd = document.querySelector('#open-popup-add'); //Переменная кнопки открытия попапа добавления карточки

const closePopupEdit = document.querySelector('#close-popup-edit'); //Переменная кнопки закрытия попапа редактирования профиля

const closePopupAdd = document.querySelector('#close-popup-add'); //Переменная кнопки закрытия попапа добавления карточки

const editPopup = document.querySelector('#edit-popup'); //Переменная попапа редактирования профиля

const addPopup = document.querySelector('#add-popup'); //Переменная попапа добавления карточки

const profileName = document.querySelector('.profile__name'); //Переменная имени профиля

const profileProfession = document.querySelector('.profile__profession'); //Переменная проффесии профиля

const cardTitle = document.querySelector('.card-title'); //Переменная заголовка карточки

const cardImage = document.querySelector('.card__image'); //Переменная изображения карточки

const nameInput = document.querySelector('#name-input'); //Переменная поля ввода имени попапа редактирования

const professionInput = document.querySelector('#profession-input'); //Переменная поля ввода проффессии попапа редактирования

const titleInput = document.querySelector('#title-input'); //Переменная поля ввода заголовка попапа добавления карточки

const imageInput = document.querySelector('#image-input'); //Переменная поля ввода ссылки на изображение попапа добавления карточки

const editForm = document.querySelector('#edit-form'); //Переменная формы попапа редактирования профиля

const addForm = document.querySelector('#add-form'); //Переменная формы попапа добавления карточки

const cardTemplate = document.querySelector('#card-template'); //Переменная заготовки (template) новой карточки

const cardTemplateContent = cardTemplate.content; //Переменная контента заготовки (template) новой карточки

const card = cardTemplateContent.querySelector('.card'); //Переменная карточки из template

const cards = document.querySelector('.cards'); //Переменная секции с карточками

function openPopupFunction(popup) {
  //Функция открытия попапа
  popup.classList.add('popup_opened');
}

function closePopupFunction(popup) {
  //Функция закрытия попапа
  popup.classList.remove('popup_opened');
}

openPopupEdit.addEventListener('click', function () {
  //Слушатель нажатия на кнопку открытия попапа редактирования
  openPopupFunction(editPopup);

  nameInput.value = profileName.textContent;

  professionInput.value = profileProfession.textContent;
});

openPopupAdd.addEventListener('click', function () {
  //Слушатель нажатия на кнопку открытия попапа добавления
  openPopupFunction(addPopup);
});

closePopupEdit.addEventListener('click', function () {
  //Слушатель нажатия на кнопку закрытия попапа редактирования
  closePopupFunction(editPopup);
});

closePopupAdd.addEventListener('click', function () {
  //Слушатель нажатия на кнопку закрытия попапа добавления
  closePopupFunction(addPopup);
});

editForm.addEventListener('submit', function (event) {
  //Слушатель нажатия на кнопку Enter в форме попапа редактирования
  event.preventDefault();

  profileProfession.textContent = professionInput.value;

  profileName.textContent = nameInput.value;

  closePopupFunction(editPopup);
});

addForm.addEventListener('submit', function (event) {
  //Слушатель нажатия на кнопку Enter в форме попапа создания новой карточки
  event.preventDefault();

  const newCard = card.cloneNode(true);
  const cardTitle = newCard.querySelector('.card__title');
  const cardImg = newCard.querySelector('.card__image');
  cardTitle.textContent = titleInput.value;
  cardImg.src = imageInput.value;

  cards.prepend(newCard);

  closePopupFunction(addPopup);
});

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

initialCards.forEach(function (item) {
  const newCard = createCard(item);
  cards.prepend(newCard);
});

function createCard(item) {
  const newCard = card.cloneNode(true);
  const cardTitle = newCard.querySelector('.card__title');
  const cardImg = newCard.querySelector('.card__image');
  cardTitle.textContent = item.name;
  cardImg.src = item.link;

  return newCard;
}

const likeButtons = document.querySelectorAll('.card__button');
likeButtons.forEach(function (item) {
  item.addEventListener('click', function () {
    item.classList.toggle('card__button_active');
  });
});
