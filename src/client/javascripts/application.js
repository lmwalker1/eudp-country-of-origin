import { initAll } from 'govuk-frontend'
import accessibleAutocomplete from 'accessible-autocomplete'

initAll()

// Enhance any select elements with accessible-autocomplete
const autocompleteSelects = document.querySelectorAll(
  '[data-module="accessible-autocomplete"]'
)
autocompleteSelects.forEach((selectElement) => {
  // Get the currently selected value to preserve it after enhancement
  const selectedOption = selectElement.querySelector('option[selected]')
  const defaultValue = selectedOption ? selectedOption.textContent.trim() : ''

  accessibleAutocomplete.enhanceSelectElement({
    selectElement,
    minLength: 1,
    showAllValues: false,
    autoselect: false,
    defaultValue,
    confirmOnBlur: true,
    showNoOptionsFound: true,
    placeholder: ''
  })
})
