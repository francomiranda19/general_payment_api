import Joi from 'joi'

export const bodySchema = Joi.object({
  transferCode: Joi.string().email().required(),
  amount: Joi.number().integer().required()
})
