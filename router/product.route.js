const express = require('express')
const router = express.Router()
const productController=require('../controllers/product.controller')
const { validationSchema } = require('../middleware/validation')
const authToken = require('../middleware/auth')
const userRoles = require('../utils/userRoles')
const allowedTo = require('../middleware/allowedTo')
const validateProduct = require('../middleware/JoiProductValidation')

router.route('/')
    .get(productController.getProducts)
    .post(authToken,allowedTo(userRoles.MANAGER),validationSchema(),validateProduct,productController.addProduct)

router.route('/:productId')
    .get(productController.getProduct)
    .patch(validateProduct,productController.updateProduct)
    .delete(authToken,allowedTo(userRoles.ADMIN,userRoles.MANAGER),productController.deleteProduct)

module.exports = router;