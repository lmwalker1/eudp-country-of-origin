import { describe, it, expect } from 'vitest'
import { formatErrors } from '../../src/server/common/helpers/errors.js'

describe('formatErrors', () => {
  const mockJoiError = {
    details: [
      { message: 'Select a country', path: ['countryOfOriginCode'] },
      { message: 'Select yes or no', path: ['regionOfOriginRequired'] }
    ]
  }

  it('should create errorList with text and href', () => {
    const { errorList } = formatErrors(mockJoiError)
    expect(errorList).toHaveLength(2)
    expect(errorList[0]).toEqual({ text: 'Select a country', href: '#countryOfOriginCode' })
  })

  it('should create fieldErrors keyed by field name', () => {
    const { fieldErrors } = formatErrors(mockJoiError)
    expect(fieldErrors.countryOfOriginCode).toEqual({ text: 'Select a country' })
    expect(fieldErrors.regionOfOriginRequired).toEqual({ text: 'Select yes or no' })
  })

  it('should handle single error', () => {
    const singleError = { details: [{ message: 'Required', path: ['field1'] }] }
    const { errorList, fieldErrors } = formatErrors(singleError)
    expect(errorList).toHaveLength(1)
    expect(Object.keys(fieldErrors)).toHaveLength(1)
  })
})
