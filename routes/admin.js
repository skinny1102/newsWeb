const express = require('express')
const router= express.Router()
const adminController = require('../controller/adminController')
/// Load model
const Post = require('../model/Post')
/// Load controller
const upload = require('../middleware/mullter')
const auth = require('../middleware/auth')


router.get('',adminController.indexpost)
router.post('',adminController.postusser)
router.get('/logout',auth, (req,res,next)=>{
    req.session.isAuth=false
    res.redirect('/admin')
})
router.get('/doimatkhau',auth,adminController.doimatkhat)
router.post('/doimatkhau',auth,adminController.postdoimatkhat)
router.get('/post',auth,adminController.indexadminpost)
router.post('/post/edit',auth,adminController.editpostadmin)
router.post('/post/edit/update',auth,adminController.updatepostadmin)
router.get('/post/add',auth,adminController.addposst)
router.post('/post/add',auth,upload.single('file-input'),adminController.adminaddposst)

router.get('/post/:tag',auth,adminController.postadmin)
router.post('/post/delete/:id',auth,adminController.deleteadmin)



module.exports=router