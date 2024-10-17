const joi = require('joi')

const userSchema = joi.opject({
    firstName : joi.string().required(),
    lastName : joi.string().required(),
    email : joi.string().email().required(),
    password : joi.string().alphanum().min(6).max(30).pattern(new RegExp('^[a-zA-Z0-9]')).required()
})

const productSchema = joi.object({
    title : joi.string().min(6).required(),
    price : joi.number().greater(0).required()
})

module.exports={
    userSchema,
    productSchema
}