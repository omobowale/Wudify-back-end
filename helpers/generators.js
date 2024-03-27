const { uuid } = require("uuidv4")

const generateRandomString = () => {
    return uuid()
}


module.exports = {generateRandomString}