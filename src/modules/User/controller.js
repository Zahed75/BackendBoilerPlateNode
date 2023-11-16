// const express = require('express');
// const router = express.Router();

// const userService = require('./service');

// const {
//   brandManagerValidate,
//   changeUserDetailsValidate,
//   changePasswordValidate,
// } = require('./request');

// const authMiddleware = require('../../middlewares/authMiddleware');
// const handleValidation = require('../../middlewares/schemaValidation');



// // Account Owner Create
// const createUser = async (req, res, next) => {
//   try {
//     const user = await userService.addUser(req.body);
//     res.status(201).json({
//       message: 'User created successfully',
//       user,
//     });
//   } catch (err) {
//     next(err, req, res);
//   }
// };







// router.post(
//   '/add-brand-manager',
//   brandManagerUpload.single('profilePic'),
//   handleValidation(brandManagerValidate),
//   addBrandManager
// );



// module.exports = router;
