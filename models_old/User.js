const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phoneNumber: {
            type: String, required: true, min: [11, "Phone number incomplete or invalid"], validate: {
                validator: function (val) {
                    return /\d{11}/.test(val)
                },
                message: props => `${props.value} is not a valid phone number`
            }
        },
    }, { timestamps: true }
)


module.exports = mongoose.model("User", UserSchema)
