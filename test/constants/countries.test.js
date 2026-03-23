import { describe, it, expect } from 'vitest'
import { EU_MEMBER_STATES, EU_COUNTRY_CODES, isValidEUCountry, getCountryName } from '../../src/server/common/constants/countries.js'

describe('EU Member States', () => {
  it('should contain exactly 27 countries', () => {
    expect(EU_MEMBER_STATES).toHaveLength(27)
  })
  it('should include France with code FR', () => {
    expect(EU_MEMBER_STATES).toContainEqual({ code: 'FR', name: 'France' })
  })
  it('should not include EFTA states', () => {
    expect(EU_COUNTRY_CODES).not.toContain('IS')
    expect(EU_COUNTRY_CODES).not.toContain('NO')
    expect(EU_COUNTRY_CODES).not.toContain('CH')
    expect(EU_COUNTRY_CODES).not.toContain('LI')
  })
  it('should validate known EU country', () => {
    expect(isValidEUCountry('DE')).toBe(true)
  })
  it('should reject non-EU country', () => {
    expect(isValidEUCountry('US')).toBe(false)
  })
  it('should return country name for valid code', () => {
    expect(getCountryName('RO')).toBe('Romania')
  })
  it('should return undefined for invalid code', () => {
    expect(getCountryName('XX')).toBeUndefined()
  })
})
