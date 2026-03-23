import {
  createNotification,
  listNotifications
} from '../common/store/notifications.js'
import { getCountryName } from '../common/constants/countries.js'

export const controller = {
  get: {
    handler(request, h) {
      const notifications = listNotifications().map((n) => ({
        ...n,
        reference: `IMP.GB.2026.${n.id.slice(-4).toUpperCase()}`,
        countryName: n.origin?.country
          ? getCountryName(n.origin.country)
          : null,
        statusTag:
          n.status === 'submitted'
            ? { text: 'Submitted', classes: 'govuk-tag--green' }
            : { text: 'Draft', classes: 'govuk-tag--grey' }
      }))

      return h.view('dashboard/index', {
        pageTitle: 'Import notification service',
        activePage: 'dashboard',
        notifications
      })
    }
  },

  post: {
    handler(request, h) {
      const notification = createNotification()
      return h.redirect(
        `/notifications/${notification.id}/what-are-you-importing`
      )
    }
  }
}
