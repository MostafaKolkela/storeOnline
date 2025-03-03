const Product = require('../model/product.model')

const findAllProducts = (pl)=>{
    return Product.find(pl)
}

const findById = async (id)=>{
    return await Product.findById(id)
}

const updatedProductById = async(id,PD)=>{
    return await Product.updateOne({_id:id},{$set:{...PD}},{new:true,runValidators:true})
}

const saveProduct = async(PD)=>{
    const product = new Product(PD)
    return await product.save({runValidators:true}) 
}

const deleteProduct = async(id)=>{
    return await Product.deleteOne({_id:id})
}

module.exports = {
    findAllProducts,
    findById,
    updatedProductById,
    saveProduct,
    deleteProduct
}