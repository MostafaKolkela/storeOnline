const joi = require('joi')
const appError = require('../utils/appError')
const httpStatusText = require('../utils/httpStatusText')

const productSchema = joi.object({
    title : joi.string().min(6).required(),
    price : joi.number().greater(0).required()
})

const validateProduct = (req,res,next)=>{
    const {error,value} = productSchema.validate(req.body)
    if(error){
        return next(new appError(`${error.details[0].message,400,httpStatusText.ERROR}`))
    }
    return next()
}

module.exports = validateProduct