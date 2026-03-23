import { getSessionValue } from '../common/helpers/session.js'
import { getCountryName } from '../common/constants/countries.js'
import { getNotification } from '../common/store/notifications.js'

export const controller = {
  get: {
    handler(request, h) {
      const { id } = request.params
      const notification = getNotification(id)

      if (!notification) {
        return h.redirect('/dashboard')
      }

      const origin = getSessionValue(request, `${id}.origin`) || {}

      const countryName = origin.countryOfOriginCode
        ? getCountryName(origin.countryOfOriginCode)
        : null

      const summaryRows = [
        {
          key: { text: 'Country of origin' },
          value: { text: countryName || origin.countryOfOriginCode || 'Not provided' }
        },
        {
          key: { text: 'Region of origin required' },
          value: {
            text:
              origin.regionOfOriginRequired === 'yes'
                ? 'Yes'
                : origin.regionOfOriginRequired === 'no'
                  ? 'No'
                  : 'Not provided'
          }
        }
      ]

      if (origin.regionOfOriginRequired === 'yes') {
        summaryRows.push({
          key: { text: 'Region of origin code' },
          value: { text: origin.regionOfOriginCode || 'Not provided' }
        })
      }

      if (origin.internalReference) {
        summaryRows.push({
          key: { text: 'Internal reference' },
          value: { text: origin.internalReference }
        })
      }

      return h.view('reason-for-importing/index', {
        pageTitle: 'Reason for importing',
        backLink: `/notifications/${id}/origin`,
        notificationId: id,
        summaryRows
      })
    }
  }
}
