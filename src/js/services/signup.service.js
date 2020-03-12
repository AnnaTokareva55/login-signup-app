import axios from "../plugins/axios";
import { notify } from "../views/notifications";

/**
 * Запрос к серверу на регистрацию нового пользователя.
 * @param {string} nickname - значение из поля формы регистрации.
 * @param {string} first_name - значение из поля формы регистрации.
 * @param {string} last_name - значение из поля формы регистрации.
 * @param {string} gender_orientation - значение из поля формы регистрации.
 * @param {string} date_of_birth_day - значение из поля формы регистрации.
 * @param {string} date_of_birth_month - значение из поля формы регистрации.
 * @param {string} date_of_birth_year - значение из поля формы регистрации.
 * @param {string} country - значение из поля формы регистрации.
 * @param {string} city - значение из поля формы регистрации.
 * @param {string} phone - значение из поля формы регистрации.
 * @param {string} email - значение из поля формы регистрации.
 * @param {string} password - значение из поля формы регистрации.
 * @returns {object} - объект ответа или ошибки.
 */
export async function signup(
  nickname,
  first_name,
  last_name,
  gender_orientation,
  date_of_birth_day,
  date_of_birth_month,
  date_of_birth_year,
  country,
  city,
  phone,
  email,
  password
) {
  try {
    const response = await axios.post(
      `/auth/signup`,
      JSON.stringify({
        nickname,
        first_name,
        last_name,
        gender_orientation,
        date_of_birth_day,
        date_of_birth_month,
        date_of_birth_year,
        country,
        city,
        phone,
        email,
        password
      })
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
