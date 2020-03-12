/**
 * Получение html-контейнера для оповещений.
 * @returns {object} - элемент контейнера.
 */
function getContainer() {
  return document.querySelector(".notify-container");
}

/**
 * Формирование разметки контейнера для оповещений.
 * @returns {string} - разметка контейнера для оповещений.
 */
function getNotifyContainerTemplate() {
  return `<div class="notify-container" 
  style="position: fixed; top: 10px; right: 10px; z-index:99;">
  </div>`;
}

/**
 * Формирование разметки элемента оповещения.
 * @param {string} msg - текст оповещения.
 * @param {string} className - класс html-элемента.
 * @param {number} index - индекс оповещения.
 * @returns {string} - разметка элемента оповещения.
 */
function getAlertTemplate(msg, className, index) {
  return `<div class="alert ${className}" data-index="${index}">${msg}</div>`;
}

/**
 * Вставка html-контейнера для оповещений в DOM.
 */
function createNotifyContainer() {
  const template = getNotifyContainerTemplate();
  document.body.insertAdjacentHTML("afterbegin", template);
}

/**
 * Определение индекса нового оповещения.
 * @returns {number} - длина списка узлов.
 */
function getAlertIndex() {
  return document.querySelectorAll(".notify-container .alert").length;
}

/**
 * Удаление оповещения из DOM.
 * @param {number} index - индекс оповещения.
 */
function closeNotify(index) {
  let alert;

  if (index === undefined) {
    alert = document.querySelector(".notify-container .alert");
  } else {
    alert = document.querySelector(
      `.notify-container .alert[data-index="${index}"]`
    );
  }

  if (!alert) {
    console.warn("Alert not found");
    return;
  }

  const container = getContainer();
  container.removeChild(alert);
}

/**
 * Формирование и вывод оповещений на страницу.
 * @param {object} param0 - объект с параметрами оповещения (текст, класс элемента, длительность отображения).
 */
export function notify({
  msg = "Info message",
  className = "alert-info",
  timeout = 2000
}) {
  if (!getContainer()) {
    createNotifyContainer();
  }

  const index = getAlertIndex();
  const template = getAlertTemplate(msg, className, index);
  const container = getContainer();
  container.insertAdjacentHTML("beforeend", template);
  setTimeout(() => closeNotify(index), timeout);
}
