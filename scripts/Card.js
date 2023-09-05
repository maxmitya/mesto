import { openPopup } from './index.js';
import { imagePopup } from './index.js';
import { bigPopupImage } from './index.js';
import { bigPopupTitle } from './index.js';

export class Card {
  constructor(data, templateElement) {
    this._name = data.name;
    this._link = data.link;
    this._templateElement = templateElement;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateElement)
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
    this._buttonElement = this._element.querySelector('.card__button');
    this._cardTitle = this._element.querySelector('.card__title');
    this._cardImg = this._element.querySelector('.card__image');

    this._buttonElement.addEventListener('click', () => {
      this._handleLikeButtonClick();
    });

    this._element.querySelector('.card__trash').addEventListener('click', () => {
      this._handleDeleteButtonClick();
    });

    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleImageClick();
    });
  }

  _handleDeleteButtonClick() {
    this._element.remove();
    this._element = null;
  }

  _handleLikeButtonClick() {
    this._buttonElement.classList.toggle('card__button_active');
  }

  _handleImageClick() {
    openPopup(imagePopup);
    bigPopupTitle.textContent = this._cardTitle.textContent;
    bigPopupImage.src = this._cardImg.src;
    bigPopupImage.alt = this._cardImg.alt;
  }
}
