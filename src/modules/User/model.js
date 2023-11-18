const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');


const UserSchema=new mongoose.Schema({
    userName:{
    type:String,
     max:[30,'Please Input Your Name'],
    required:[true,'Must Be required your name']
    },

    profilePic:{
        type:String,
    },
    phoneNumber:{
        type:String,
        max:[12,'Please Input Your Number'],
        required:[true,"Must be input Phone Number"]
    },
    email: {
        type: String,
        unique: [true, 'your email must be unique/used already'],
        required: [true, 'email must be required'],
      },

      password: {
        type: String,
        max: [6, 'Your Password must be in 6 digits'],
        
      },
      otp: {
        type: Number,
      },
      emailChangeOTP: {
        type: Number,
      },
      changedEmail: {
        type: String,
      },
      isActive: {
        type: Boolean,
        default: false,
      },
    
      isVerified: {
        type: Boolean,
        default: false,
      },
      refreshToken: [String],

      
},{ timestamps: true }
);

// Password Hash Function using Bycryptjs

UserSchema.pre('save', async function hashPassword(next) {
    if (this.isModified('password')) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
  });
  
  UserSchema.methods = {
    async authenticate(password) {
      return await bcrypt.compare(password, this.password);
    },
  };
  
  //Validations
  UserSchema.path('phoneNumber').validate(function (value) {
    const regex = /^\d{13}$/; // regular expression to match 11 digits
    return regex.test(value);
  }, 'Must be a valid phone number');
  
  const UserModel = mongoose.model('user', UserSchema);
  
  module.exports = UserModel;
