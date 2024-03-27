// Routes for all user activities
const router = require("express").Router()
const User = require("../models_old/User")
const CryptoJS = require("crypto-js")
const { userCreationValidator, validateDateRange } = require("../helpers/validators")
const { validationResult } = require("express-validator")
const { EMAIL_ALREADY_EXISTS } = require("../helpers/constants")
const { getErrorData, getSuccessData } = require("../helpers/responses")


// Endpoint to return all users
router.get("/", async (req, res) => {

    // get filters (query parameters)
    let { startDate, endDate, pageSize, pageNumber } = req.query

    let fetchQuery = {}

    if (startDate || endDate) {
        if (startDate && endDate) {
            const errors = validateDateRange(startDate, endDate);
            if (Object.keys(errors).length > 0) {
                return res.status(500).json(getErrorData(500, errors))
            } else {

                fetchQuery = {
                    dateOfBirth: { $gte: new Date(startDate), $lte: new Date(endDate) },
                }
            }
        }
        else if (startDate && !endDate) {
            fetchQuery = {
                dateOfBirth: { $gte: new Date(startDate) },
            }

        } else if (endDate && !startDate) {
            fetchQuery = {
                dateOfBirth: { $lte: new Date(endDate) },
            }
        }
    }

    try {
        const users = await User.aggregate(
            [

                {
                    $project: { "password": 0 }
                },
                {
                    $match: fetchQuery
                },
                {
                    $facet: {
                        metaData: [
                            {
                                $count: "totalRecords"
                            }
                        ],
                        users: [
                            (pageSize && pageNumber) ? {
                                $skip: pageSize * (pageNumber - 1)
                            } : { $skip: 0 },
                            (pageSize && pageNumber) ? {
                                $limit: parseInt(pageSize)
                            } : { $limit: Number.MAX_SAFE_INTEGER }
                        ]
                    },
                }
            ]
        )
        return res.status(200).json(getSuccessData(200, users));
    } catch (err) {
        console.log(err)
        return res.status(500).json(getErrorData(500, err))
    }


})

// Endpoint to create a new user
router.post("/", userCreationValidator, async (req, res) => {

    //extract form details
    const { firstName, lastName, email, phoneNumber, password, dateOfBirth } = req.body

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
        dateOfBirth
    })

    try {
        const savedUser = await newUser.save()
        res.status(201).json(getSuccessData(201, { id: savedUser._id, email: savedUser.email, phoneNumber: savedUser.phoneNumber, firstName: savedUser.firstName, lastName: savedUser.lastName, dateOfBirth: savedUser.dateOfBirth }))
    } catch (err) {
        res.status(500).json(getErrorData(500, err));
    }
})


module.exports = router