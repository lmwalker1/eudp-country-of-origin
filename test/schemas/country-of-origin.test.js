import { describe, it, expect } from 'vitest'
import { originSchema } from '../../src/server/country-of-origin/schema.js'

describe('Origin Schema', () => {
  const validPayload = {
    countryOfOriginCode: 'FR',
    regionOfOriginRequired: 'no',
    regionOfOriginCode: '',
    internalReference: ''
  }

  it('should accept valid payload', () => {
    const { error } = originSchema.validate(validPayload)
    expect(error).toBeUndefined()
  })
  it('should require country of origin', () => {
    const { error } = originSchema.validate({ ...validPayload, countryOfOriginCode: '' })
    expect(error.details[0].message).toBe('Select a country of origin')
  })
  it('should reject non-EU country code', () => {
    const { error } = originSchema.validate({ ...validPayload, countryOfOriginCode: 'US' })
    expect(error.details[0].message).toBe('Select a country from the list')
  })
  it('should require region radio selection', () => {
    const { error } = originSchema.validate({ ...validPayload, regionOfOriginRequired: '' })
    expect(error.details[0].message).toBe('Select yes if this consignment requires a region of origin code')
  })
  it('should require region code when region required is yes', () => {
    const { error } = originSchema.validate({ ...validPayload, regionOfOriginRequired: 'yes', regionOfOriginCode: '' })
    expect(error.details[0].message).toBe('Enter a region of origin code')
  })
  it('should reject region code over 5 characters', () => {
    const { error } = originSchema.validate({ ...validPayload, regionOfOriginRequired: 'yes', regionOfOriginCode: 'TOOLONG' })
    expect(error.details[0].message).toBe('Region of origin code must be 5 characters or fewer')
  })
  it('should allow empty region code when not required', () => {
    const { error } = originSchema.validate({ ...validPayload, regionOfOriginRequired: 'no', regionOfOriginCode: '' })
    expect(error).toBeUndefined()
  })
  it('should reject internal reference over 100 characters', () => {
    const { error } = originSchema.validate({ ...validPayload, internalReference: 'x'.repeat(101) })
    expect(error.details[0].message).toBe('Your internal reference number must be 100 characters or fewer')
  })
  it('should allow empty internal reference', () => {
    const { error } = originSchema.validate({ ...validPayload, internalReference: '' })
    expect(error).toBeUndefined()
  })
  it('should collect all errors with abortEarly false', () => {
    const { error } = originSchema.validate(
      { countryOfOriginCode: '', regionOfOriginRequired: '', regionOfOriginCode: '', internalReference: '' },
      { abortEarly: false }
    )
    expect(error.details.length).toBeGreaterThanOrEqual(2)
  })
})
