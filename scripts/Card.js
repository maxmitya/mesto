import { initialCards } from './initialCards.js';
import { openPopup } from './index.js';
import { imagePopup } from './index.js';

export class Card {
  constructor(data, templateElement) {
    this._name = data.name;
    this._link = data.link;
    this._templateElement = templateElement;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector('#card-template')
      .content.querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__button').addEventListener('click', () => {
      this._handleLikeButton();
    });

    this._element.querySelector('.card__trash').addEventListener('click', () => {
      this._handleDeleteButton();
    });

    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleImage();
    });
  }

  _handleDeleteButton() {
    this._element.closest('.card').remove();
  }

  _handleLikeButton() {
    this._element.querySelector('.card__button').classList.toggle('card__button_active');
  }

  _handleImage() {
    const cardTitle = this._element.querySelector('.card__title');
    const cardImg = this._element.querySelector('.card__image');
    const bigPopupImage = imagePopup.querySelector('.popup__img');
    const bigPopupTitle = imagePopup.querySelector('.popup__title');
    openPopup(imagePopup);
    bigPopupTitle.textContent = cardTitle.textContent;
    bigPopupImage.src = cardImg.src;
    bigPopupImage.alt = cardImg.alt;
  }
}

initialCards.forEach(item => {
  const cardSection = document.querySelector('.cards');
  const card = new Card(item, '#card-template');
  const cardElement = card.generateCard();

  cardSection.prepend(cardElement);
});
