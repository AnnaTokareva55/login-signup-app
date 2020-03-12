import autocomplete from "autocompleter";

/**
 * Преобразование инпута формы в автокомплит.
 * @param {array} data - массив с данными для автозаполнения.
 * @param {object} input - поле формы.
 */
export function setAutocomplete(data, input) {
  autocomplete({
    input: input,
    fetch: function(text, update) {
      text = text.toLowerCase();
      const suggestions = data.filter(n =>
        n.label.toLowerCase().startsWith(text)
      );
      update(suggestions);
    },
    onSelect: function(item) {
      input.value = item.label;
    }
  });
}
