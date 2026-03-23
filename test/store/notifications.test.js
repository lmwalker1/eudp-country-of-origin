import { describe, it, expect, beforeEach } from 'vitest'
import { createNotification, getNotification, updateNotification, listNotifications, clearStore } from '../../src/server/common/store/notifications.js'

describe('Notifications Store', () => {
  beforeEach(() => clearStore())

  it('should create a notification with draft status', () => {
    const n = createNotification()
    expect(n.id).toBeDefined()
    expect(n.status).toBe('draft')
    expect(n.origin).toEqual({})
  })
  it('should retrieve a notification by ID', () => {
    const n = createNotification()
    expect(getNotification(n.id)).toEqual(n)
  })
  it('should update notification origin data', () => {
    const n = createNotification()
    updateNotification(n.id, 'origin', { countryOfOriginCode: 'FR' })
    const updated = getNotification(n.id)
    expect(updated.origin.countryOfOriginCode).toBe('FR')
  })
  it('should list all notifications newest first', () => {
    const n1 = createNotification()
    const n2 = createNotification()
    const list = listNotifications()
    expect(list).toHaveLength(2)
    expect(list[0].id).toBe(n2.id)
  })
  it('should return undefined for unknown ID', () => {
    expect(getNotification('nonexistent')).toBeUndefined()
  })
})
