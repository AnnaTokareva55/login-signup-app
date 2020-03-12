import axios from "../plugins/axios";
import { notify } from "../views/notifications";

/**
 * Запрос к серверу на аутентификацию пользователя.
 * @param {string} email - значение из поля формы аутентификации.
 * @param {string} password - значение из поля формы аутентификации.
 * @returns {object} - объект с ответом или ошибкой.
 */
export async function login(email, password) {
  try {
    const response = await axios.post(
      `/auth/login`,
      JSON.stringify({ email, password })
    );
    return response.data;
  } catch (error) {
    notify({
      msg: error,
      className: "alert-danger"
    });
    return Promise.reject(error);
  }
}
