const mongoose = require('mongoose')
const slugify = require('slugify')

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    slug:{type:String},
    price:{
        type:Number,
        required:true
    }
})

productSchema.pre('save',function(next){
    this.slug = slugify(this.title,{lower:true})
    next()
})

module.exports = mongoose.model('Product',productSchema)