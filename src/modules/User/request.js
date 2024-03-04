const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const createBrandManagerSchema = Joi.object().keys({
  creatorId:Joi.string().required().messages({
      'any.required':' Creator ID required'
  }),
  creatorName:Joi.string().required().messages({
    'any.required':' Creator name required'
  }),


  name: Joi.string().required().messages({
    'any.required': 'Name is required',
  }),
  email: Joi.string().required().messages({
    'any.required': 'Email is required',
  }),
  phoneNumber: Joi.string().required().messages({
    'any.required': 'Phone number is required',
  }),
  role: Joi.string().required().messages({
    'any.required': 'Role is required',
  }),
  brands: Joi.array().items(
    Joi.objectId().required().messages({
      'any.required': 'Please select a brand',
    })
  ),
});



const brandManagerValidate = (data) => {
  const result = createBrandManagerSchema.validate(data);
  result.value = data;
  return result;
};






const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
  confirmPassword: Joi.string().required(),
});



const changeUserDetailsSchema = Joi.object({
  name: Joi.string().required(),
  phoneNumber: Joi.string().required(),
});

const changePasswordValidate = (data) => {
  const result = changePasswordSchema.validate(data);
  result.value = data;
  return result;
};

const changeUserDetailsValidate = (data) => {
  const result = changeUserDetailsSchema.validate(data);
  result.value = data;
  return result;
};

module.exports = {
  changePasswordValidate,
  changeUserDetailsValidate,
  brandManagerValidate,
};
