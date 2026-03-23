import Joi from 'joi'

export const importTypeSchema = Joi.object({
  importType: Joi.string()
    .valid('live-animals')
    .required()
    .messages({
      'any.required': 'Select what you are importing',
      'string.empty': 'Select what you are importing',
      'any.only': 'Select what you are importing'
    })
})
