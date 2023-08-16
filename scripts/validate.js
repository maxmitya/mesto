const enableValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active'
};

// Функция вывода сообщения об ошибке в инпуте
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(enableValidationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(enableValidationConfig.errorClass);
};

// Функция удаления сообщения об ошибке в инпуте
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(enableValidationConfig.inputErrorClass);
  errorElement.classList.remove(enableValidationConfig.errorClass);
  errorElement.textContent = '';
};

// Проверка на наличие невалидных инпутов
const hasInvalidInput = inputList => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};

// Функция переключения состояния кнопки submit
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(enableValidationConfig.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(enableValidationConfig.inactiveButtonClass);
  }
};

// Функция проверки валидности полей и форм с выводом сообщения об ошибке
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// Функция добавления слушателей на все инпуты + работа кнопки submit
const setEventListeners = formElement => {
  const inputList = Array.from(formElement.querySelectorAll(enableValidationConfig.inputSelector));
  const buttonElement = formElement.querySelector(enableValidationConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// Функция включения валидации на формах
const enableValidation = () => {
  formList = Array.from(document.querySelectorAll(enableValidationConfig.formSelector));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault;
    });

    const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));

    fieldsetList.forEach(fieldSet => {
      setEventListeners(fieldSet);
    });

    setEventListeners(formElement);
  });
};

enableValidation();
