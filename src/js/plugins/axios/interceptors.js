const lsTokenKey = "my_app_token";

/**
 * Запись полученного от сервера токена в localStorage.
 * @param {object} res - ответ сервера.
 * @returns {object}
 */
function setTokenOnLogin(res) {
  const isLoginUrl = res.config.url.includes("login");
  if (isLoginUrl) {
    const token = res.data.token;
    localStorage.setItem(lsTokenKey, token);
  }
  return res;
}

/**
 * Очистка полученного от сервера ответа до объекта с данными.
 * @param {object} res - ответ сервера.
 * @returns {object}
 */
function getClearResponse(res) {
  return res.data;
}

/**
 * Добавление токена из localStorage к запросу клиента.
 * @param {object} req - запрос к серверу.
 * @returns {object}
 */
function setToken(req) {
  const isAuthUrl = req.url.includes("auth");
  if (!isAuthUrl) {
    const token = localStorage.getItem(lsTokenKey);
    req.headers["x-access-token"] = token;
  }
  return req;
}

/**
 * Обработка ошибки.
 * @param {object} error - ошибка при запросе.
 */
function onError(error) {
  console.dir(error);
  return Promise.reject(error);
}

export default function(axios) {
  axios.interceptors.request.use(setToken);
  axios.interceptors.response.use(setTokenOnLogin);
  axios.interceptors.response.use(getClearResponse, onError);
}
