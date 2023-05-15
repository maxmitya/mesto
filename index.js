const openPopup = document.querySelector('#open-popup');
const editPopup = document.querySelector('#edit-popup');
const closePopup = document.querySelector('#close-popup');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const nameInput = document.querySelector('#name-input');
const professionInput = document.querySelector('#profession-input');
const editForm = document.querySelector('#edit-form');
const cardButton = document.querySelector('#like-button');

cardButton.addEventListener('click', function () {
  cardButton.classList.add('card__button_active');
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
