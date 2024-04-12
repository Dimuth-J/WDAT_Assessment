import Joi from 'joi';

// Joi schema for TrashTask validation
export const trashTaskJoiSchema = Joi.object({
  taskName: Joi.string().required(),
  message: Joi.string().required(),
  status: Joi.boolean().required(),
  date: Joi.string(), // Consider using Joi.date() if the format allows
  archivedDate: Joi.string(), // Consider using Joi.date() if the format allows
});