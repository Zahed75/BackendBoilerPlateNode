// const bcrypt = require('bcryptjs');
// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema(
//   {
//     brands: [
//       {
//         beneficiary: {
//           type: Boolean,
//           default: false,
//         },
//         brandName: {
//           type: String,
//           required: [true, 'Brand name is required'],
//         },
//         banner: {
//           type: String,
//           required: [true, 'Banner is required'],
//         },
//         logo: {
//           type: String,
//           required: [true, 'Logo is required'],
//         },
//         brandColor: {
//           type: String,
//           default: '#f1604a',
//         },
//         textColor: {
//           type: String,
//           default: '#ffff',
//         },
//         subdomain: {
//           type: String,
//           required: [true, 'Sub Domain is required'],
//         },
//         outlets: [
//           {
//             _id: {
//               type: mongoose.Schema.Types.ObjectId,
//               required: [true, 'Outlet id is required'],
//             },
//             outletName: {
//               type: String,
//               max: [15, 'Your Outlet Should be less then 16 character'],
//               required: [true, 'Outlet name is required'],
//             },
//             deliveryArea: [
//               {
//                 type: String,
//                 required: [true, 'Must be selected one area please'],
//               },
//             ],
//           },
//         ],
//       },
//     ],



//     outlets: [
//       {
//         _id: {
//           type: mongoose.Schema.Types.ObjectId,
//           required: [true, 'Outlet id is required'],
//         },
//         brandId: {
//           type: mongoose.Schema.Types.ObjectId,
//           required: [true, 'Must be select a brand'],
//         },
//         brandName: {
//           type: String,
//           required: [true, 'Brand name required'],
//         },
//         outletName: {
//           type: String,
//           max: [15, 'Your Outlet Should be less then 16 character'],
//           required: [true, 'Must included'],
//         },
//         logo: {
//           type: String,
//           required: [true, 'Logo is required'],
//         },
//       },
//     ],
//     name: {
//       type: String,
//       max: [30, 'Please Input Your Name'],
//       required: [true, 'Must be required your name'],
//     },
//     profilePic: {
//       type: String,
//     },
//     ownerId: {
//       type: mongoose.Schema.Types.ObjectId,
//     },
//     address: {
//       type: String,
//     },
//     //createdBy -> to indicate created by another manager
//     creatorId: {
//       type: mongoose.Schema.Types.ObjectId,
//     },
//     managers: [
//       {
//         managerId: {
//           type: mongoose.Schema.Types.ObjectId,
//           required: [true, 'Manager id is required'],
//         },
//         managerName: {
//           type: String,
//           required: [true, 'Manager name is required'],
//         },
//       },
//     ],
//     email: {
//       type: String,
//       unique: [true, 'your email must be unique/used already'],
//       required: [true, 'email must be required'],
//     },
//     phoneNumber: {
//       type: String,
//       max: [13, 'Phone Number must be less then 14'],
//       required: [true, 'Your phone number is required'],
//     },

//     password: {
//       type: String,
//       max: [6, 'Your Password must be in 6 digits'],
      
//     },
//     otp: {
//       type: Number,
//     },
//     emailChangeOTP: {
//       type: Number,
//     },
//     changedEmail: {
//       type: String,
//     },
//     role: {
//       type: String,
//       //  ACO -> Account Owner
//       // BM -> Brand Manager
//       // OM -> Outlet Manager
//       //SA -> Super Admin
//       enum: ['ACO', 'BM', 'OM', 'SA'],
//       require: [true, 'Role must be selected'],
//     },
//     isActive: {
//       type: Boolean,
//       default: false,
//     },
//     isVerified: {
//       type: Boolean,
//       default: false,
//     },
//     refreshToken: [String],
//   },

//   { timestamps: true }
// );

// // Password Hash Function using Bycryptjs

// UserSchema.pre('save', async function hashPassword(next) {
//   if (this.isModified('password')) {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   }
//   next();
// });

// UserSchema.methods = {
//   async authenticate(password) {
//     return await bcrypt.compare(password, this.password);
//   },
// };

// //Validations
// UserSchema.path('phoneNumber').validate(function (value) {
//   const regex = /^\d{13}$/; // regular expression to match 11 digits
//   return regex.test(value);
// }, 'Must be a valid phone number');

// const UserModel = mongoose.model('user', UserSchema);

// module.exports = UserModel;
