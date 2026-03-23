import Joi from 'joi'
import { EU_COUNTRY_CODES } from '../common/constants/countries.js'

export const originSchema = Joi.object({
  countryOfOriginCode: Joi.string()
    .empty('')
    .required()
    .valid(...EU_COUNTRY_CODES)
    .messages({
      'any.required': 'Select a country of origin',
      'any.only': 'Select a country from the list'
    }),
  regionOfOriginRequired: Joi.string()
    .empty('')
    .required()
    .valid('yes', 'no')
    .messages({
      'any.required': 'Select yes if this consignment requires a region of origin code',
      'any.only': 'Select yes if this consignment requires a region of origin code'
    }),
  regionOfOriginCode: Joi.when('regionOfOriginRequired', {
    is: 'yes',
    then: Joi.string().max(5).required().messages({
      'string.empty': 'Enter a region of origin code',
      'any.required': 'Enter a region of origin code',
      'string.max': 'Region of origin code must be 5 characters or fewer'
    }),
    otherwise: Joi.string().allow('').optional()
  }),
  internalReference: Joi.string()
    .max(100)
    .allow('')
    .optional()
    .messages({
      'string.max': 'Your internal reference number must be 100 characters or fewer'
    })
})
