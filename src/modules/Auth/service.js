const jwt= require('jsonwebtoken');
const User=require('../User/model');

const {
    BadRequest,
    Unauthorized,
    Forbidden,
    NoContent,
}=require('../../utility/errors');

const {generateOTP}=require('../../utility/common');

const{SendEmailUtility}=require('../../utility/email');
const createToken = require('../../utility/createToken');
const bcrypt = require('bcryptjs');
const { decrypt } = require('dotenv');






// Admin Register a new user

const UserRegister = async (email, phoneNumber, password, role) => {
  try {
    // Generate OTP
    const otp = generateOTP(); 


    const user = new User({
      email,
      phoneNumber,
      role,
      otp,
      password,
    });
    await user.save();

    // Send OTP to email
    await SendEmailUtility(email, 'OTP for registration', `Your OTP for registration: ${otp}`);

    // Return user
    return user;
  } catch (error) {
    console.error(error); 
    throw new BadRequest('Failed to register user.');
  }
};





// Verify OTP
const verifyOTP = async (email, otp) => {
  try {
      const user = await User.findOne({ email, otp });
      if (!user) {
          throw new BadRequest('Invalid OTP.');
      }

      // Update user
      user.isActive = true;
      user.isVerified = true;
      user.otp = undefined; // Clear OTP after verification
      await user.save();
  } catch (error) {
      throw new BadRequest('Failed to verify OTP.');
  }
};



// Resend OTP

const resendOTP=async (email) =>{
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        throw new BadRequest('User not found.');
    }

    // Generate new OTP
    const newOTP = generateOTP();
    user.otp = newOTP;
    await user.save();

    // Send OTP to email
    await SendEmailUtility(email, 'New OTP', `Your new OTP: ${newOTP}`);

    return { message: 'New OTP sent successfully.' };
} catch (error) {
    throw new BadRequest('Failed to resend OTP.');
}};




// Expire OTP
const expireOTP = async (data) => {
  const { email } = data;
  await User.updateOne(
    { email },
    { $unset: { otp: 1, changedEmail: 1, emailChangeOTP: 1 } }
  );
  return;
};






//SignIn Admin

const signinUser = async (email,password) => {
  try {
    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      throw new BadRequest("Invalid email or password.");
    }

    // Validate password using bcrypt.compare
    const isMatch = await bcrypt.compare(password, user.password);

    // Check password match
    if (!isMatch) {
      throw new BadRequest("Invalid email or password.");
    }
 // Generate JWT token with user data payload
 const accessToken = jwt.sign({ user }, 'SecretKey12345', { expiresIn: '3d' });
    // User is authenticated, return sanitized user data (excluding sensitive fields)
    const sanitizedUser = {
      accessToken,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      isActive: user.isActive,
      isVerified: user.isVerified,
      
    };

    return sanitizedUser;
  } catch (error) {
    console.error(error);
    throw error; 
  }
};











module.exports = {
  UserRegister,
  verifyOTP,
  resendOTP,
  expireOTP,
  signinUser
};


  
 



