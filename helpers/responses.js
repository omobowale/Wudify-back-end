// Successful and failed network requests are properly formatted here.

const { ERROR_OCCURED, SUCCESS } = require("./texts")


const getErrorData = (statusCode, errors, customMessage = ERROR_OCCURED) => {
    return {
        error: true,
        statusCode,
        data: null,
        errors,
        message: customMessage
    }
}

const getSuccessData = (statusCode, data, customMessage = SUCCESS) => {
    return {
        error: false,
        statusCode,
        data,
        errors: null,
        message: customMessage
    }
}


module.exports = { getErrorData, getSuccessData }