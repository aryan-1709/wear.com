const User = require("../Schemas/UserSchema");

const getItems = async (userId) => {
    await User.findById(userId).then((user) => {
        try {
            return user.cart;
        } catch (error) {
            return {"cannot get cart Items": error};
        }
    });
}

module.exports = getItems;