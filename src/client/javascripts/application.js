import { initAll } from 'govuk-frontend'
import accessibleAutocomplete from 'accessible-autocomplete'

initAll()

// Enhance any select elements with accessible-autocomplete
const autocompleteSelects = document.querySelectorAll('[data-module="accessible-autocomplete"]')
autocompleteSelects.forEach((selectElement) => {
  accessibleAutocomplete.enhanceSelectElement({
    selectElement,
    minLength: 1,
    showAllValues: true,
    defaultValue: ''
  })
})
