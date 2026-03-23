import { getNotification, updateNotification } from '../common/store/notifications.js'
import { getSessionValue, setSessionValue } from '../common/helpers/session.js'
import { formatErrors } from '../common/helpers/errors.js'
import { importTypeSchema } from './schema.js'

export const controller = {
  get: {
    handler(request, h) {
      const { id } = request.params
      const notification = getNotification(id)

      if (!notification) {
        return h.redirect('/dashboard')
      }

      const importType =
        getSessionValue(request, `${id}.importType`) ||
        notification.importType

      return h.view('what-are-you-importing/index', {
        pageTitle: 'What are you importing?',
        id,
        importType
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

      const { importType } = request.payload
      const { error } = importTypeSchema.validate(
        { importType },
        { abortEarly: false }
      )

      if (error) {
        const { errorList, fieldErrors } = formatErrors(error)
        return h.view('what-are-you-importing/index', {
          pageTitle: 'Error: What are you importing?',
          id,
          importType,
          errorList,
          fieldErrors
        }).code(400)
      }

      setSessionValue(request, `${id}.importType`, importType)
      updateNotification(id, 'importType', importType)

      return h.redirect(`/notifications/${id}/origin`)
    }
  }
}
