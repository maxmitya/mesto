import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const enableValidationConfig = {
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
const openPopupEdit = document.querySelector('#open-popup-edit');
const closePopupEdit = document.querySelector('#close-popup-edit');
const openPopupAdd = document.querySelector('#open-popup-add');
const closePopupAdd = document.querySelector('#close-popup-add');

//Функция открытия попа
export function openPopup(popup) {
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
  new FormValidator(enableValidationConfig, addForm);
});

initClosePopupByOverlay(addPopup);

//Слушатель нажатия на кнопку закрытия попапа добавления
closePopupAdd.addEventListener('click', function () {
  closePopup(addPopup);
});

//Слушатель нажатия на кнопку Enter в форме попапа создания новой карточки
addForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const newCard = new Card({ name: titleInput.value, link: imageInput.value }, '#card-template');
  const cardElement = newCard.generateCard();
  cardSection.prepend(cardElement);
  addForm.reset();
  disableButton(event.submitter, enableValidationConfig);
  closePopup(addPopup);
});

initClosePopupByOverlay(imagePopup);

const closeImagePopup = imagePopup.querySelector('#close-popup-image');
closeImagePopup.addEventListener('click', function () {
  closePopup(imagePopup);
});

const formList = Array.from(document.querySelectorAll('.popup__form'));

formList.forEach(form => {
  const formValidator = new FormValidator(enableValidationConfig, form);
  formValidator.enableValidation();
});
