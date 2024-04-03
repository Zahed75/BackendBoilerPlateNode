const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./model');
const { NotFound, BadRequest } = require('../../utility/errors');






const resetPassword = async (email, newPassword) => {
    try {
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Construct the update object to set the new hashed password
        const update = { password: hashedPassword };

        console.log("Updating password for email:", email);

        // Find the user by email and update the password
        const user = await User.findOneAndUpdate(
            { email: email },
            update,
            { new: true } 
        );

        console.log("Updated user:", user);

        if (!user) {
            throw new BadRequest("User not found with this email");
        }

        return user;
    } catch (error) {
        throw new Error('Failed to reset password.');
    }
};


//getAllUser

const getAllUsers=async(data)=>{
    const user=await User.find();
    return user;
}







module.exports = {
  resetPassword,
  getAllUsers
 
};
