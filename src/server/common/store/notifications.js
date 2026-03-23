const store = new Map()

export function createNotification() {
  const id = crypto.randomUUID()
  const now = new Date().toISOString()
  const notification = {
    id,
    status: 'draft',
    importType: null,
    origin: {},
    createdAt: now,
    updatedAt: now
  }
  store.set(id, notification)
  return notification
}

export function getNotification(id) {
  return store.get(id)
}

export function updateNotification(id, section, data) {
  const notification = store.get(id)
  if (!notification) return undefined
  notification[section] = { ...notification[section], ...data }
  notification.updatedAt = new Date().toISOString()
  store.set(id, notification)
  return notification
}

export function listNotifications() {
  return Array.from(store.values()).reverse()
}

export function clearStore() {
  store.clear()
}
