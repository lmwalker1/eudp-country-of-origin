import { initAll } from 'govuk-frontend'
import accessibleAutocomplete from 'accessible-autocomplete'

initAll()

// Enhance any select elements with accessible-autocomplete
const autocompleteSelects = document.querySelectorAll(
  '[data-module="accessible-autocomplete"]'
)
autocompleteSelects.forEach((selectElement) => {
  const selectedOption = selectElement.querySelector('option[selected]')
  const defaultValue = selectedOption ? selectedOption.textContent.trim() : ''

  accessibleAutocomplete.enhanceSelectElement({
    selectElement,
    minLength: 1,
    showAllValues: false,
    autoselect: true,
    defaultValue,
    confirmOnBlur: true,
    showNoOptionsFound: true,
    placeholder: '',
    onConfirm: (value) => {
      // Close the menu by blurring after a short delay
      // This allows the accessible-autocomplete to finish its internal state update
      setTimeout(() => {
        const input = selectElement.parentElement.querySelector('.autocomplete__input')
        if (input) {
          input.blur()
        }
      }, 100)
    }
  })
})
