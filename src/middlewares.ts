import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

export const validateRequestBody = (schema: Joi.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body)
    if (error) {
      return res.status(400).json({ error: error.details.map((e) => e.message) })
    }
    next()
  }
}
