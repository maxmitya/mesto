const openPopup = document.querySelector('#open-popup');
const editPopup = document.querySelector('#edit-popup');
const closePopup = document.querySelector('#close-popup');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const nameInput = document.querySelector('#name-input');
const professionInput = document.querySelector('#profession-input');
const editForm = document.querySelector('#edit-form');

const cardButton1 = document.querySelector('#like-button-1');
const cardButton2 = document.querySelector('#like-button-2');
const cardButton3 = document.querySelector('#like-button-3');
const cardButton4 = document.querySelector('#like-button-4');
const cardButton5 = document.querySelector('#like-button-5');
const cardButton6 = document.querySelector('#like-button-6');

cardButton1.addEventListener('click', function () {
  cardButton1.classList.add('card__button_active');
});

cardButton2.addEventListener('click', function () {
  cardButton2.classList.add('card__button_active');
});

cardButton3.addEventListener('click', function () {
  cardButton3.classList.add('card__button_active');
});

cardButton4.addEventListener('click', function () {
  cardButton4.classList.add('card__button_active');
});

cardButton5.addEventListener('click', function () {
  cardButton5.classList.add('card__button_active');
});

cardButton6.addEventListener('click', function () {
  cardButton6.classList.add('card__button_active');
});

openPopup.addEventListener('click', function () {
  openPopupFunction(editPopup);
});

closePopup.addEventListener('click', function () {
  closePopupFunction(editPopup);
});

nameInput.value = profileName.textContent;

editForm.addEventListener('submit', function (event) {
  event.preventDefault();

  profileName.textContent = nameInput.value;

  closePopupFunction(editPopup);
});

professionInput.value = profileProfession.textContent;

editForm.addEventListener('submit', function (event) {
  event.preventDefault();

  profileProfession.textContent = professionInput.value;

  closePopupFunction(editPopup);
});

function openPopupFunction(popup) {
  popup.classList.add('popup_opened');
}

function closePopupFunction(popup) {
  popup.classList.remove('popup_opened');
}
