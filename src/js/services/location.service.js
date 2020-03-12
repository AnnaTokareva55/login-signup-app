import axios from "../plugins/axios";
import { notify } from "../views/notifications";

/**
 * Запрос списка стран для автокомлита в форме.
 * @returns {object} - объект с ответом или с ошибкой.
 */
export async function getCountries() {
  try {
    const response = await axios.get("/location/get-countries");
    return response;
  } catch (error) {
    notify({
      msg: error,
      className: "alert-danger"
    });
    return Promise.reject(error);
  }
}

/**
 * Запрос списка городов переданной страны для автокомлита в форме.
 * @param {number} indexCountry - индекс страны, полученный от сервера.
 * @returns {object} - объект с ответом или с ошибкой.
 */
export async function getCities(indexCountry) {
  try {
    const response = await axios.get(`/location/get-cities/${indexCountry}`);
    return response;
  } catch (error) {
    notify({
      msg: error,
      className: "alert-danger"
    });
    return Promise.reject(error);
  }
}
