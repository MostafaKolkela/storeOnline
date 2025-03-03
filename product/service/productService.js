const httpStausText = require('../../utils/httpStatusText')
const asyncWrapper = require('../../middleware/asyncWraper')
const appError = require('../../utils/appError')
const productRepo = require('../repo/productRepo')


const getProducts = async (query)=>{
        const query = req.query
        const limit = query.limit || 10
        const page = query.page || 1
        const skip = (page-1)*limit
        const products = await productRepo.findAllProducts({},{"__v":false}).limit(limit).skip(skip)
        res.status(200).json({status:httpStausText.SUCCESS,data:{products}});
}


const getProduct = async (id)=>{
        const product = await productRepo.findById(id).select('-__v')
        if(!product){
            const error = appError.create('product not found',404,httpStausText.FAIL)
            return next(error)
        }
        return product
}

const addProduct = async (PD)=>{
        const newProduct = new Products(...PD)
        await productRepo.saveProduct(newProduct)
        return newProduct
}


const updateProduct = async (id,updateProduct)=>{
    return await productRepo.updatedProductById(id,updateProduct)
}

const deleteProduct = async (id)=>{
        return await productRepo.deleteProduct(id)
}
    
module.exports={
    deleteProduct,
    updateProduct,
    addProduct,
    getProduct,
    getProducts
}