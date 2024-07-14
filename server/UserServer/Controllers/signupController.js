const User = require("../Schemas/UserSchema");

const signupController = async ({ name, email, password }) => {
    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) 
            return {msg:"Email Already exist please Login"};
        
        const newUser = new User({
            name: name,
            email: email,
            password: password,
        });

        await newUser.save();
        
        return {msg:"You are registered. Please login."};
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyValue) {
            return `Duplicate key error: ${error.keyValue.email} already exists.`;
        }
        return error.message;
    }
};

module.exports = signupController;