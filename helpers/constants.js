const EMAIL_ALREADY_EXISTS = (email) => {
    return `User with email - ${email} - already exists.`
}

const CATEGORY_ALREADY_EXISTS = () => {
    return `Category with already exists.`
}

const DATE_FORMAT = "DD-MM-YYYY"

const BEARER_TEXT = "Bearer"


module.exports = { EMAIL_ALREADY_EXISTS , CATEGORY_ALREADY_EXISTS, BEARER_TEXT, DATE_FORMAT}