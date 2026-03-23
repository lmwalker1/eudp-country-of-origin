import { EU_MEMBER_STATES } from '../common/constants/countries.js'
import { getSessionValue, setSessionValue } from '../common/helpers/session.js'
import { formatErrors } from '../common/helpers/errors.js'
import { getNotification, updateNotification } from '../common/store/notifications.js'
import { originSchema } from './schema.js'

function buildCountryItems(selectedCode) {
  return [
    { value: '', text: '' },
    ...EU_MEMBER_STATES.map((c) => ({
      value: c.code,
      text: c.name,
      selected: c.code === selectedCode
    }))
  ]
}

export const controller = {
  get: {
    handler(request, h) {
      const { id } = request.params
      const notification = getNotification(id)

      if (!notification) {
        return h.redirect('/dashboard')
      }

      const saved = getSessionValue(request, `${id}.origin`) || {}

      return h.view('country-of-origin/index', {
        pageTitle: 'Origin of the import',
        backLink: `/notifications/${id}/what-are-you-importing`,
        countryOfOriginCode: saved.countryOfOriginCode || '',
        regionOfOriginRequired: saved.regionOfOriginRequired || '',
        regionOfOriginCode: saved.regionOfOriginCode || '',
        internalReference: saved.internalReference || '',
        countryItems: buildCountryItems(saved.countryOfOriginCode),
        errorList: [],
        fieldErrors: {}
      })
    }
  },

  post: {
    handler(request, h) {
      const { id } = request.params
      const notification = getNotification(id)

      if (!notification) {
        return h.redirect('/dashboard')
      }

      const payload = request.payload
      const { value, error } = originSchema.validate(payload, {
        abortEarly: false
      })

      if (error) {
        const { errorList, fieldErrors } = formatErrors(error)
        return h
          .view('country-of-origin/index', {
            pageTitle: 'Error: Origin of the import',
            backLink: `/notifications/${id}/what-are-you-importing`,
            countryOfOriginCode: payload.countryOfOriginCode || '',
            regionOfOriginRequired: payload.regionOfOriginRequired || '',
            regionOfOriginCode: payload.regionOfOriginCode || '',
            internalReference: payload.internalReference || '',
            countryItems: buildCountryItems(payload.countryOfOriginCode),
            errorList,
            fieldErrors
          })
          .code(400)
      }

      setSessionValue(request, `${id}.origin`, value)
      updateNotification(id, 'origin', value)

      return h.redirect(`/notifications/${id}/reason-for-importing`)
    }
  }
}
