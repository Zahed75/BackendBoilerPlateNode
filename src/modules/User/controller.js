const express = require('express');
const router = express.Router();

const userService = require('./service');

const {
  brandManagerValidate,
  changeUserDetailsValidate,
  changePasswordValidate,
} = require('./request');




const { 
  BASIC_USER,
  CELEBRITY_VIP,
  CHRUCH_LEADER,
  CHRUCH_PAGE,
  SUPER_ADMIN,
   } = require('../../config/constants');
const roleMiddleware = require('../../middlewares/roleMiddleware');

const authMiddleware = require('../../middlewares/authMiddleware');
const handleValidation = require('../../middlewares/schemaValidation');









module.exports=router;