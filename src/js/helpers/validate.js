const regExpDic = {
  email: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/,
  password: /^[0-9a-zA-Z]{8,}$/,
  nickname: /./,
  firstname: /./,
  lastname: /./,
  gender: /male/,
  birthday: /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.(19|20)\d\d$/,
  country: /./,
  city: /./,
  phone: /^(\+7)\-\(\d{3}\)\-\d{3}\-\d{2}\-\d{2}$/
};

/**
 * Валидация значения переданного поля формы в соответствии с регулярным выражением из словаря.
 * @param {object} el - поле формы.
 * @returns {boolean}
 */
export function validate(el) {
  const regExpName = el.dataset.required;
  if (!regExpName) return true;
  return regExpDic[regExpName].test(el.value);
}
