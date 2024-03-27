// Routes for all user activities
const router = require("express").Router()
const User = require("../models_old/User")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")
const { userCreationValidator, validateDateRange } = require("../helpers/validators")
const { validationResult } = require("express-validator")
const { EMAIL_ALREADY_EXISTS } = require("../helpers/constants")
const { getErrorData, getSuccessData } = require("../helpers/responses")


// Endpoint to login user
router.post("/login", async (req, res) => {

    // get form inputs 
    const { email, password } = req.body

    try {

        const user = await User.findOne({ email });

        if (!user) {
            res.status(401).json(getErrorData(401, ["User not found"]));
            return;
        }

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);

        const retrievedPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if (retrievedPassword !== password) {
            res.status(401).json(getErrorData(401, ["Invalid credentials"]));
            return;
        }

        const accessToken = jwt.sign({
            id: user._id,

        }, process.env.JWT_SECRET_KEY,
            {
                expiresIn: "3d"
            })

        res.status(201).json(getSuccessData(201, { accessToken, id: user._id, email: user.email, phoneNumber: user.phoneNumber, firstName: user.firstName, lastName: user.lastName }))

    } catch (e) {
        res.status(500).json(getErrorData(500, ["Something went wrong. Please try again later"]));
    }


    //


});

// Endpoint to create a new user
router.post("/register", userCreationValidator, async (req, res) => {

    //extract form details
    const { firstName, lastName, email, phoneNumber, password } = req.body

    //validate inputs
    const errors = validationResult(req)


    // send errors back
    if (!errors.isEmpty()) {
        res.status(500).json(getErrorData(500, errors.array()));
        return;
    }

    // Check if email already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
        res.status(403).json(getErrorData(403, [{ errorMessage: EMAIL_ALREADY_EXISTS(email) }]));
        return;
    }

    //encrypt password
    const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString()


    const newUser = new User({
        firstName,
        lastName,
        email,
        phoneNumber,
        password: encryptedPassword,
    })

    try {
        const savedUser = await newUser.save()
        res.status(201).json(getSuccessData(201, { id: savedUser._id, email: savedUser.email, phoneNumber: savedUser.phoneNumber, firstName: savedUser.firstName, lastName: savedUser.lastName }))
    } catch (err) {
        res.status(500).json(getErrorData(500, err));
    }
})


module.exports = router