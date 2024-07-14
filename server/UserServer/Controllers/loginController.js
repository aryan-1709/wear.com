const User = require("../Schemas/UserSchema");

const loginController = async ({email, password}) => {
    const user = await User.findOne({email:email});
    if(!user)    
        return {msg:"The given gmail was not Regitered", state:3};
    if(user.password !== password)
        return {msg:"Incorrect Password", state:2};
    return {msg:"Login Success", user:user, state:1};
}

module.exports = loginController;