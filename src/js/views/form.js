/**
 * Формирование разметки сообщения об ошибке для поля формы.
 * @param {string} msg - текст сообщения.
 * @returns {string} - разметка сообщения.
 */
function inputErrorTemplate(msg) {
  return `<div class="invalid-feedback">${msg}</div>`;
}

/**
 * Вывод на страницу сообщения об ошибке в поле формы.
 * @param {object} el - поле формы.
 */
export function showInputError(el) {
  const parent = el.parentElement;
  const msg = el.dataset.invalidMessage || "Invalid input";
  const template = inputErrorTemplate(msg);
  el.classList.add("is-invalid");
  parent.insertAdjacentHTML("beforeend", template);
}

/**
 * Удаление сообщения об ошибке в поле формы.
 * @param {object} el - поле формы.
 */
export function removeInputError(el) {
  const parent = el.parentElement;
  const error = parent.querySelector(".invalid-feedback");
  if (!error) return;
  el.classList.remove("is-invalid");
  parent.removeChild(error);
}
