const openPopup = document.querySelector('#open-popup');
const editPopup = document.querySelector('#edit-popup');
const closePopup = document.querySelector('#close-popup');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const nameInput = document.querySelector('#name-input');
const professionInput = document.querySelector('#profession-input');
const editForm = document.querySelector('#edit-form');

function openPopupFunction(popup) {
  popup.classList.add('popup_opened');
}

function closePopupFunction(popup) {
  popup.classList.remove('popup_opened');
}

openPopup.addEventListener('click', function () {
  openPopupFunction(editPopup);

  nameInput.value = profileName.textContent;

  professionInput.value = profileProfession.textContent;
});

closePopup.addEventListener('click', function () {
  closePopupFunction(editPopup);
});

editForm.addEventListener('submit', function (event) {
  event.preventDefault();

  profileProfession.textContent = professionInput.value;

  profileName.textContent = nameInput.value;

  closePopupFunction(editPopup);
});
