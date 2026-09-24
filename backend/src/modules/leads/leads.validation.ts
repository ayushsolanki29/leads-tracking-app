import Joi from 'joi';

export const createLeadSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  status: Joi.string().valid('new', 'contacted', 'qualified', 'lost').optional(),
});

export const updateLeadSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  status: Joi.string().valid('new', 'contacted', 'qualified', 'lost').optional(),
}).min(1);

export const createNoteSchema = Joi.object({
  content: Joi.string().trim().min(1).required(),
});
