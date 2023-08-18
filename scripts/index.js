const editPopup = document.querySelector('#edit-popup');
const addPopup = document.querySelector('#add-popup');
const editForm = document.querySelector('#edit-form');
const addForm = document.querySelector('#add-form');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const nameInput = editForm.querySelector('#name-input');
const professionInput = editForm.querySelector('#profession-input');
const titleInput = addForm.querySelector('#title-input');
const imageInput = addForm.querySelector('#image-input');
const cardTemplate = document.querySelector('#card-template').content;
const cardFromTemplate = cardTemplate.querySelector('.card');
const cards = document.querySelector('.cards');
const imagePopup = document.querySelector('#image-popup');
const bigPopupImage = imagePopup.querySelector('.popup__img');
const bigPopupTitle = imagePopup.querySelector('.popup__title');
const openPopupEdit = document.querySelector('#open-popup-edit');
const closePopupEdit = document.querySelector('#close-popup-edit');
const openPopupAdd = document.querySelector('#open-popup-add');
const closePopupAdd = document.querySelector('#close-popup-add');

//Функция открытия попа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  window.addEventListener('keydown', initClosePopupByEscape);
}

//Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  window.removeEventListener('keydown', initClosePopupByEscape);
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
function initClosePopupByEscape(event) {
  if (event.code == 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

//Слушатель нажатия на кнопку открытия попапа редактирования
openPopupEdit.addEventListener('click', function () {
  openPopup(editPopup);
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
});

initClosePopupByOverlay(editPopup);

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

  disableButton(event.submitter);

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

  // cards.prepend(newCard);

  return newCard;
}

const closeImagePopup = imagePopup.querySelector('#close-popup-image');
closeImagePopup.addEventListener('click', function () {
  closePopup(imagePopup);
});
