const Products = require('../model/product.model')
const service = require('../service/productService')
const httpStausText = require('../../utils/httpStatusText')
const asyncWrapper = require('../../middleware/asyncWraper')
const appError = require('../../utils/appError')


const getProducts = asyncWrapper(
    async (req,res)=>{
        const products = await service.getProducts()
        res.status(200).json({status:httpStausText.SUCCESS,data:{products}});
    }
)


const getProduct = asyncWrapper(
    async (req,res,next)=>{
        const product = await service.getProduct(req.params.productId)
        res.status(200).json({status:httpStausText.SUCCESS,data:{product}})
    }
)

const addProduct = asyncWrapper(
    async (req,res,next)=>{
        const newProduct = await service.addProduct(req.body)
        res.status(201).json({status:httpStausText.SUCCESS,data:{newProduct}})
    }
)

const updateProduct = asyncWrapper(
    async (req,res,next)=>{
        const updatedProduct = await service.updateProduct(req.params.productId,req.body)
        res.status(200).json({status:httpStausText.SUCCESS,data:{updatedProduct}});
    }
)

const deleteProduct = asyncWrapper(
    async (req,res)=>{
        await service.deleteProduct(req.params.productId)
        res.status(200).json({success:httpStausText.SUCCESS,data:null});
    }
    
)
module.exports={
    deleteProduct,
    updateProduct,
    addProduct,
    getProduct,
    //getProducts
}