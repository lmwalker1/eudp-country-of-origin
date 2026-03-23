import { describe, it, expect } from 'vitest'
import { importTypeSchema } from '../../src/server/what-are-you-importing/schema.js'

describe('Import Type Schema', () => {
  it('should accept live-animals', () => {
    const { error } = importTypeSchema.validate({ importType: 'live-animals' })
    expect(error).toBeUndefined()
  })
  it('should reject empty value', () => {
    const { error } = importTypeSchema.validate({ importType: '' })
    expect(error).toBeDefined()
    expect(error.details[0].message).toBe('Select what you are importing')
  })
  it('should reject missing field', () => {
    const { error } = importTypeSchema.validate({})
    expect(error).toBeDefined()
  })
  it('should reject invalid value', () => {
    const { error } = importTypeSchema.validate({ importType: 'cheese' })
    expect(error).toBeDefined()
  })
})
