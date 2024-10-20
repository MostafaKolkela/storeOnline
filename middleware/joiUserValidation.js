const joi = require('joi')
const appError = require('../utils/appError')
const httpStatusText = require('../utils/httpStatusText')

const userSchema = joi.opject({
    firstName : joi.string().required(),
    lastName : joi.string().required(),
    email : joi.string().email().required(),
    password : joi.string().alphanum().min(6).max(30).pattern(new RegExp('^[a-zA-Z0-9]')).required()
})

const validateUser = (req,res,next)=>{
    const {error,value} = userSchema.validate(req.body)
    if(error){
        return next(new appError(`${error.details[0].message,400,httpStatusText.ERROR}`))
    }
    return next()
}

module.exports = validateUser