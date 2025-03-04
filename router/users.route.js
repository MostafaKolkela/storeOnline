const express = require('express')
const router = express.Router()
const usersController=require('../controllers/users.controller')
const authToken = require('../middleware/auth')
const multer = require('multer')
const appError = require('../utils/appError')
const diskStorage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads')
    },
    filename:function(req,file,cb){
        const ext = file.mimetype.split('/')[1]
        const fileName = `user-${Date.now()}.${ext}`
        cb(null,fileName)
    }
})

const fileFilter = (req,file,cb)=>{
    const imgType = file.mimetype.split('/')[0]
    if(imgType === 'image'){
       return cb(null,true)
    }else{
        return cb(appError.create('file must be an img',400))
    }
}

const upload = multer({storage:diskStorage,fileFilter})

router.route('/').get(authToken,usersController.getUsers)

router.route('/login').post(usersController.login)

router.route('/register').post(upload.single('avatar'),usersController.register)


module.exports = router; 