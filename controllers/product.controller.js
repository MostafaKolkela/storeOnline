const { validationResult } = require('express-validator');
const Products = require('../models/product.model')
const httpStausText = require('../utils/httpStatusText')
const asyncWrapper = require('../middleware/asyncWraper')
const appError = require('../utils/appError')


const getProducts = asyncWrapper(
    async (req,res)=>{
        const query = req.query
        const limit = query.limit || 10
        const page = query.page || 1
        const skip = (page-1)*limit
        const products = await Products.find({},{"__v":false}).limit(limit).skip(skip)
        res.status(200).json({status:httpStausText.SUCCESS,data:{products}});
    }
)

const getProduct = asyncWrapper(
    async (req,res,next)=>{
        const product = await Products.findById(req.params.productId).select('-__v')
        if(!product){
            const error = appError.create('product not found',404,httpStausText.FAIL)
            return next(error)
        }
        res.status(200).json({status:httpStausText.SUCCESS,data:{product}})
    }
)
const addProduct = asyncWrapper(
    async (req,res,next)=>{
        const error = validationResult(req)
        if(!error.isEmpty()){
            const error = appError.create(error.array(),400,httpStausText.FAIL)
            return next(error)
        }
        const newProduct = new Products(req.body)
        await newProduct.save()
        res.status(201).json({status:httpStausText.SUCCESS,data:{newProduct}});
    }
)
//highhj
const updateProduct = asyncWrapper(
    async (req,res,next)=>{
        const productId = req.params.productId;
        const updatedProduct = await Products.updateOne(productId,{$set:{...req.body}})
        res.status(200).json({status:httpStausText.SUCCESS,data:{updatedProduct}});
    }
)

const deleteProduct = asyncWrapper(
    async (req,res)=>{
        await Products.deleteOne({_id:req.params.productId})
        res.status(200).json({success:httpStausText.SUCCESS,data:null});
    }
    
)
module.exports={
    deleteProduct,
    updateProduct,
    addProduct,
    getProduct,
    getProducts
}