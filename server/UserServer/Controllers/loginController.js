const User = require("../Schemas/UserSchema");

const loginController = async ({email, password}) => {
    const user = await User.findOne({email:email});
    if(!user)
        return "The given gmail was not Regitered";
    if(user.password !== password)
        return "Incorrect Password";
    return "Logging in Sucess";
}

module.exports = loginController;