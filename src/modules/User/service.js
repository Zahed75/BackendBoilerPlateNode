const jwt = require('jsonwebtoken');

const User = require('./model');

const {
  sendSetPasswordEmail,
  setPasswordEmailOutlet,
} = require('../../utility/email');
const { NotFound, BadRequest, Forbidden } = require('../../utility/errors');
const { BASIC_USER,
CELEBRITY_VIP,
CHRUCH_LEADER,
CHRUCH_PAGE,
SUPER_ADMIN,
 } = require('../../config/constants');
const { generateOTP } = require('../../utility/common');
const { SendEmailUtility } = require('../../utility/email');
const { all } = require('axios');

const addUser = async (user) => {
  const newUser = await User.create(user);
  return newUser;
};



const updateUser = async (userId, updatedValue) => {
  const updatedUser = await User.findByIdAndUpdate(
    {
      _id: userId,
    },
    updatedValue,
    {
      new: true,
    }
  );

  if (!updateUser) {
    throw new NotFound('User not found');
  }

  await Brand.updateMany(
    {
      ownerId: userId,
    },
    {
      ownerName: updatedUser.name,
    }
  );

  return updatedUser;
};



const deleteUserById = (userId) => {};

const getUsers = (limit, skip) => {};

const getUserById = async (id) => {
  const user = await User.findById({ _id: id });

  if (!user) throw new NotFound('User not found');

  return user;
};



const updateEmail = async (id, values) => {
  const { changedEmail } = values;
  const isUser = await User.findById({ _id: id });
  if (!isUser) throw new NotFound('User not found');

  const otp = generateOTP();

  isUser.emailChangeOTP = otp;
  isUser.changedEmail = changedEmail;

  isUser.emailChangeOTP = otp;
  isUser.changedEmail = changedEmail;

  await isUser.save();

  const emailBody = `Verification OTP: ${otp}`;
  await SendEmailUtility(changedEmail, emailBody, 'OTP');

  return isUser;
};




const verifyChangedEmail = async (id, otp) => {
  const isUser = await User.findById({ _id: id });

  if (!isUser) throw new NotFound('User not found');

  if (isUser.emailChangeOTP !== Number(otp))
    throw new BadRequest('Invalid OTP');

  const updatedUser = await User.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        email: isUser.changedEmail,
      },
      $unset: {
        changedEmail: 1,
        emailChangeOTP: 1,
      },
    },
    { new: true }
  ).select('name phoneNumber email password isActive isVerified role brands');

  return updatedUser;
};



// Admin Set Password
const updatePassword = async (id, body) => {
  const { currentPassword, newPassword, confirmPassword } = body;
  const user = await User.findById({ _id: id });
  if (!user) throw new NotFound('User not found');

  const isPassword = await user.authenticate(currentPassword);

  if (!isPassword) throw new BadRequest('Current password did not match');

  if (newPassword !== confirmPassword)
    throw new BadRequest('New password does not match');

  user.password = newPassword;

  await user.save();

  return user;
};





//for resending reset password email to managers(brand/outlet)
const resendResetPasswordEmail = async (managerId) => {
  const user = await User.findById({ _id: managerId });
  if (!user) throw new NotFound('User not found');

  if (user.role === BRAND_MANAGER) {
    await sendSetPasswordEmail(user.email, user);
  } else if (user.role === OUTLET_MANAGER) {
    await setPasswordEmailOutlet(user.email, user);
  }

  return user;
};






module.exports = {
  addUser,
  updateUser,
  deleteUserById,
  getUsers,
  getUserById,
  updateEmail,
  verifyChangedEmail,
  updatePassword,
  resendResetPasswordEmail,



};
