export class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector; //'.popup__form'
    this._inputSelector = config.inputSelector; //'.popup__input'
    this._submitButtonSelector = config.submitButtonSelector; //'.popup__submit'
    this._inactiveButtonClass = config.inactiveButtonClass; //'.popup__submit_disabled'
    this._inputErrorClass = config.inputErrorClass; //'.popup__input_type_error'
    this._errorClass = config.errorClass; //'.popup__error_active'
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  }

  _hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }

  disableButton(buttonElement) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(this._inactiveButtonClass);
  }

  _enableButton(buttonElement) {
    buttonElement.removeAttribute('disabled', true);
    buttonElement.classList.remove(this._inactiveButtonClass);
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this.disableButton(buttonElement);
    } else {
      this._enableButton(buttonElement);
    }
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._toggleButtonState(this._inputList, this._buttonElement);
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
