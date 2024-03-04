const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');


const UserSchema=new mongoose.Schema({
    firstName:{
    type:String,
     max:[30,'Please Input Your Name'],
    required:[true,'Must Be required your name']
    },
    lastName:{
      type:String,
       max:[30,'Please Input Your Name'],
      required:[true,'Must Be required your name']
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
      profilePicture:{
        type: String,
        
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
      role: {
        type: String,
        //  BU -> Basic User
        // VIP -> CELERITY VIP
        // CL -> CHRUCH_LEADER
        // CP -> CHURCH_PAGE
        //SA -> Super Admin
        enum: ['BU', 'VIP', 'CL', 'CP','SA'],
        require: [true, 'Role must be selected'],
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

  
  const UserModel = mongoose.model('user', UserSchema);
  
  module.exports = UserModel;
