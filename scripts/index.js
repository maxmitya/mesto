import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './initialCards.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
};

const cardSection = document.querySelector('.cards');
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
export const imagePopup = document.querySelector('#image-popup');
export const bigPopupImage = imagePopup.querySelector('.popup__img');
export const bigPopupTitle = imagePopup.querySelector('.popup__title');
const openEditPopupButton = document.querySelector('#open-popup-edit');
const closeEditPopupButton = document.querySelector('#close-popup-edit');
const openAddPopupButton = document.querySelector('#open-popup-add');
const closeAddPopupButton = document.querySelector('#close-popup-add');
const closeImagePopupButton = imagePopup.querySelector('#close-popup-image');

closeImagePopupButton.addEventListener('click', function () {
  closePopup(imagePopup);
});

//Функция открытия попа
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  window.addEventListener('keydown', closePopupByEsc);
}

//Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  window.removeEventListener('keydown', closePopupByEsc);
}

// Функция закрытия попапа кликом по заливке
function setClosePopupByOverlayListeners(popup) {
  popup.addEventListener('click', function (event) {
    if (event.target === event.currentTarget) {
      closePopup(popup);
    }
  });
}

// Функция закрытия попапа кликом на Esc
function closePopupByEsc(event) {
  if (event.code === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

const handleOpenEditPopupButtonClick = () => {
  openPopup(editPopup);
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
};

//Слушатель нажатия на кнопку открытия попапа редактирования
openEditPopupButton.addEventListener('click', handleOpenEditPopupButtonClick);

setClosePopupByOverlayListeners(editPopup);

//Слушатель нажатия на кнопку закрытия попапа редактирования
closeEditPopupButton.addEventListener('click', function () {
  closePopup(editPopup);
});

//Слушатель нажатия на кнопку Enter в форме попапа редактирования
editForm.addEventListener('submit', function (event) {
  event.preventDefault();
  profileProfession.textContent = professionInput.value;
  profileName.textContent = nameInput.value;
  closePopup(editPopup);
});

const addFormValidation = new FormValidator(validationConfig, addForm);
addFormValidation.enableValidation();

const editFormValidation = new FormValidator(validationConfig, editForm);
editFormValidation.enableValidation();

//Слушатель нажатия на кнопку открытия попапа добавления
openAddPopupButton.addEventListener('click', function () {
  openPopup(addPopup);
});

setClosePopupByOverlayListeners(addPopup);

//Слушатель нажатия на кнопку закрытия попапа добавления
closeAddPopupButton.addEventListener('click', function () {
  closePopup(addPopup);
});

const generateCard = (data, templateSelector) => {
  const newCard = new Card(data, templateSelector);
  const cardElement = newCard.generateCard();
  return cardElement;
};

//Слушатель нажатия на кнопку Enter в форме попапа создания новой карточки
addForm.addEventListener('submit', function (event) {
  event.preventDefault();
  cardSection.prepend(
    generateCard({ name: titleInput.value, link: imageInput.value }, '#card-template')
  );
  addForm.reset();
  addFormValidation.disableButton();
  closePopup(addPopup);
});

setClosePopupByOverlayListeners(imagePopup);

initialCards.forEach(item => {
  cardSection.prepend(generateCard(item, '#card-template'));
});
