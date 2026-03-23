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
    showAllValues: true,
    autoselect: true,
    defaultValue,
    confirmOnBlur: true,
    showNoOptionsFound: true,
    onConfirm: (value) => {
      // When a value is confirmed, update the hidden select
      // The accessible-autocomplete should do this automatically,
      // but we ensure the select value is synced
      const options = Array.from(selectElement.options)
      const match = options.find(
        (opt) => opt.textContent.trim() === value
      )
      if (match) {
        selectElement.value = match.value
      }
    }
  })
})
