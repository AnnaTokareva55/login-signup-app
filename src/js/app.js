import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/js/dist/tab";
import "../css/style.css";
import UI from "./config/ui.config";
import { validate } from "./helpers/validate";
import { setPhoneMask, setDateMask } from "./plugins/inputmask";
import { setAutocomplete } from "./plugins/autocomplete";
import { showInputError, removeInputError } from "./views/form";
import { notify } from "./views/notifications";
import { login } from "./services/auth.service";
import { signup } from "./services/signup.service";
import { getCountries, getCities } from "./services/location.service";

const {
  formLogin,
  inputEmailLogin,
  inputPasswordLogin,
  formSignup,
  inputNicknameSignup,
  inputFirstnameSignup,
  inputLastnameSignup,
  inputGenderSignup,
  inputBirthdaySignup,
  inputCountrySignup,
  inputCitySignup,
  inputPhoneSignup,
  inputEmailSignup,
  inputPasswordSignup
} = UI;

const inputsLogin = [inputEmailLogin, inputPasswordLogin];
const inputsSignup = [
  inputNicknameSignup,
  inputFirstnameSignup,
  inputLastnameSignup,
  inputGenderSignup,
  inputBirthdaySignup,
  inputCountrySignup,
  inputCitySignup,
  inputPhoneSignup,
  inputEmailSignup,
  inputPasswordSignup
];

initInputMask();
initInputCountry();
initInputsEvents();
initFormsEvents();

/**
 * Установка масок в поля формы.
 */
function initInputMask() {
  setPhoneMask(inputPhoneSignup);
  setDateMask(inputBirthdaySignup);
}

/**
 * Настройка удаления сообщения об ошибке для поля формы при получении фокуса.
 */
function initInputsEvents() {
  inputsLogin.forEach(input =>
    input.addEventListener("focus", () => removeInputError(input))
  );

  inputsSignup.forEach(input =>
    input.addEventListener("focus", () => removeInputError(input))
  );
}

/**
 * Добавление формам обработчиков события отправки.
 */
function initFormsEvents() {
  formLogin.addEventListener("submit", event => {
    event.preventDefault();
    onSubmitLogin();
  });

  formSignup.addEventListener("submit", event => {
    event.preventDefault();
    onSubmitSignup();
  });
}

/**
 * Обработчик отправки формы аутентификации.
 */
async function onSubmitLogin() {
  const isValidForm = inputsLogin.every(input => {
    const isValidInput = validate(input);
    if (!isValidInput) {
      showInputError(input);
    }
    return isValidInput;
  });

  if (!isValidForm) return;

  try {
    await login(inputEmailLogin.value, inputPasswordLogin.value);
    formLogin.reset();
    notify({
      msg: "Login success",
      className: "alert-success"
    });
  } catch (error) {
    notify({
      msg: "Login failed",
      className: "alert-danger"
    });
  }
}

/**
 * Обработчик отправки формы регистрации.
 */
async function onSubmitSignup() {
  const isValidForm = inputsSignup.every(input => {
    const isValidInput = validate(input);
    if (!isValidInput) {
      showInputError(input);
    }
    return isValidInput;
  });

  if (!isValidForm) return;

  try {
    const nickname = inputNicknameSignup.value || "unknown";
    const first_name = inputFirstnameSignup.value || "unknown";
    const last_name = inputLastnameSignup.value || "unknown";
    const gender_orientation = inputGenderSignup.value || "unknown";
    const date_of_birth_day =
      inputBirthdaySignup.value.slice(0, 2) || "unknown";
    const date_of_birth_month =
      inputBirthdaySignup.value.slice(3, 5) || "unknown";
    const date_of_birth_year = inputBirthdaySignup.value.slice(6) || "unknown";
    const country = inputCountrySignup.value || "unknown";
    const city = inputCitySignup.value || "unknown";
    const phone = inputPhoneSignup.value || "unknown";
    const email = inputEmailSignup.value || "unknown";
    const password = inputPasswordSignup.value || "unknown";
    await signup(
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
    );
    formSignup.reset();
    notify({
      msg: "Signup success",
      className: "alert-success"
    });
  } catch (error) {
    notify({
      msg: "Signup failed",
      className: "alert-danger"
    });
  }
}

/**
 * Инициация автокомплита для поля ввода страны.
 */
async function initInputCountry() {
  try {
    const countries = [];
    const response = await getCountries();
    Object.keys(response).forEach(item => {
      countries.push({ id: item, label: response[item] });
    });
    setAutocomplete(countries, inputCountrySignup);
    inputCountrySignup.addEventListener("change", event => {
      const selectedCountry = event.target.value;
      const selectedCountryObj = countries.find(
        country => country.label === selectedCountry
      );
      const selectedCountryId = selectedCountryObj.id;
      initInputCity(selectedCountryId);
    });
  } catch (error) {
    inputCountrySignup.addEventListener("focus", () => {
      notify({
        msg:
          "The list of countries could not be loaded. You must enter the country manually.",
        className: "alert-danger"
      });
    });
  }
}

/**
 * Инициация автокомплита для поля ввода города.
 * @param {string} idCountry - индекс выбранной пользователем страны, полученный от сервера.
 */
async function initInputCity(idCountry) {
  try {
    const cities = [];
    const response = await getCities(idCountry);
    Object.keys(response).forEach(item => {
      cities.push({ id: item, label: response[item] });
    });
    setAutocomplete(cities, inputCitySignup);
  } catch (error) {
    inputCitySignup.addEventListener("focus", () => {
      notify({
        msg:
          "The list of cities could not be loaded. You must enter the city manually.",
        className: "alert-danger"
      });
    });
  }
}
