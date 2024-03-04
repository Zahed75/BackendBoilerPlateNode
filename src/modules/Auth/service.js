const jwt = require('jsonwebtoken');

const User=require('../User/model');

const {
  BadRequest,
  Unauthorized,
  Forbidden,
  NoContent,
} = require('../../utility/errors');
const { generateOTP } = require('../../utility/common');
const { SendEmailUtility } = require('../../utility/email');
const createToken = require('../../utility/createToken');
const bcrypt = require('bcryptjs');



// Admin account register

const registerUser = async (userData) => {
  const { email, password } = userData;

  let isUser = await User.findOne({ email }).select(
    'email isVerified isActive role'
  );

  if (isUser && isUser.isVerified) {
    throw new BadRequest('You already have an account with this email');
  }

  const otp = generateOTP();
  const emailBody = `Verification OTP: ${otp}`;

  if (isUser) {
    isUser.otp = otp;
    isUser.password = password;
    await isUser.save();
  } else {
    const newUSer = await User.create({ ...userData, otp });

    isUser = {
      email: newUSer.email,
      isVerified: newUSer.isVerified,
      isActive: newUSer.isActive,
      role: newUSer.role,
    };
  }

  SendEmailUtility(email, emailBody, 'OTP');

  return isUser;
};



// Sign In User>Brand Manager>
const signinUser = async (data) => {
  const { email, password } = data;

  const isUser = await User.findOne({ email }).select(
    'name phoneNumber email password isActive isVerified role brands ownerId address'
  );

  if (!isUser) {
    throw new BadRequest('Invalid credentials');
  }

  const isPassword = await isUser.authenticate(password);

  if (!isPassword) {
    throw new BadRequest('Invalid credentials');
  }

  if (!isUser.isActive) {
    throw new BadRequest('User is not active');
  }

  if (!isUser.isVerified) {
    throw new BadRequest('User is not verified');
  }

  const accessToken = createToken(
    {
      userId: isUser._id,
      role: isUser.role,
    },
    { expiresIn: '3d' }
  );

  const refreshToken = createToken(
    {
      userId: isUser._id,
      role: isUser.role,
    },
    { expiresIn: '30d' }
  );

  isUser.refreshToken = refreshToken;
  await isUser.save();
  isUser.password = undefined;
  isUser.refreshToken = undefined;

  return { user: isUser, accessToken, refreshToken };
};








// User OTP Verification
const otpVerification=async(data)=>{
  const{email,otp}=data;
  const user=await User.findOne({
    email,
  });

  if (user.otp !==Number(otp)){

   throw new BadRequest("OTP did not match");
  }

  user.isActive=true;
  user.isVerified=true;
  user.otp=undefined;
  await user.save();

  return user;
};





// Resend OTP
const resendOtp = async (data) => {
  const { email } = data;

  const otp = generateOTP();

  await User.updateOne({ email }, { otp });

  const emailBody = `Verification OTP: ${otp}`;
  await SendEmailUtility(email, emailBody, 'OTP');

  return;
};



// Expire OTP
const expireOTP = async (data) => {
  const { email } = data;
  await User.updateOne(
    { email },
    { $unset: { otp: 1, changedEmail: 1, emailChangeOTP: 1 } }
  );
  return;
};



// User Access Token

const getAccessToken = async (cookies, clearJWTCookie) => {
  if (!cookies && !cookies.jwt) throw new Unauthorized('User not authorized');
  const refreshToken = cookies.jwt;

  clearJWTCookie;

  const isUser = await User.findOne({ refreshToken }).exec();

//detected refresh token reuse
  if (!isUser) {
    jwt.verify(
      refreshToken,
      process.env.AUTH_SECRET_KEY,
      async (err, decoded) => {
        if (err) throw new Forbidden('User access forbidden');
        const hackedUser = await User.findById({ _id: decoded.userId });
        hackedUser.refreshToken = [];
        await hackedUser.save();
      }
    );

    throw new Forbidden('User access forbidden');
  }

  const newRefreshTokenArray = isUser?.refreshToken.filter(
    (rt) => rt !== refreshToken
  );

  let accessToken;
  let newRefreshToken;

  jwt.verify(
    refreshToken,
    process.env.AUTH_SECRET_KEY,
    async (err, decoded) => {
      if (err) {
        isUser.refreshToken = [...newRefreshTokenArray];
        await isUser.save();
      }
      if (err || JSON.parse(JSON.stringify(isUser?._id)) !== decoded.userId) {
        throw new Forbidden('User access forbidden');
      }
      accessToken = createToken(
        {
          userId: isUser._id,
          role: isUser.role,
        },
        { expiresIn: '1d' }
      );

      newRefreshToken = createToken(
        {
          userId: isUser._id,
          role: isUser.role,
        },
        { expiresIn: '30d' }
      );

      const refreshTokens = [...newRefreshTokenArray, newRefreshToken];
      await User.findOneAndUpdate(
        { refreshToken },
        { refreshToken: refreshTokens }
      );
    }
  );

  return { accessToken, refreshToken: newRefreshToken };
};










// Find User By Cookie
const findUserByCookie = async (cookies) => {
  if (!cookies?.jwt) throw new NoContent();
  const refreshToken = cookies.jwt;

  const isUser = await User.findOne({ refreshToken });

  return isUser;
};

const removeRefreshToken = async (token) => {
  const user = await User.updateOne(
    { refreshToken: token },
    { refreshToken: '' }
  );

  return user;
};



// getUserInfoById


const getUserInfoById = async (userId) => {
  try {
      const user = await User.findById({ _id: userId });
 
      return user;
  } catch (error) {
      throw new Error(error);
  }
}

// updateUserByID

const updateUserProfileById = async (id, value) => {

  const users=await User.findByIdAndUpdate({ _id: id},value,{
    new:true
  });
  if(!users){
    throw new BadRequest("User Not Found");
  };
  return users
};




//get all Users


const getAllUsers=async()=>{
  const allUsers=User.find();
  return allUsers;
}



module.exports = {
  registerUser,
  signinUser,
  otpVerification,
  resendOtp,
  expireOTP,
  getAccessToken,
  findUserByCookie,
  removeRefreshToken,
  getUserInfoById,
  updateUserProfileById,
  getAllUsers
  

};
