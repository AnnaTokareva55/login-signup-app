import Inputmask from "inputmask";

/**
 * Установка маски в поле для ввода номера телефона.
 * @param {object} el - поле формы.
 */
export function setPhoneMask(el) {
  const im = new Inputmask("+7-(999)-999-99-99");
  im.mask(el);
}

/**
 * Установка маски в поле для ввода даты рождения.
 * @param {object} el - поле формы.
 */
export function setDateMask(el) {
  const im = new Inputmask("99.99.9999");
  im.mask(el);
}
