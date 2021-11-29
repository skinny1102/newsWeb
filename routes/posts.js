const express = require('express')
const router= express.Router()


const upload = require('../middleware/mullter')


/// Load model
const Post = require('../model/Post')
/// Load controller
const postController = require('../controller/postController')

router.get('',postController.index)
router.get('/post/:id',postController.chitiet)
router.get('/add',postController.indexaddpost)
router.post('/add',upload.single('file-input'),postController.addpost)


/////
router.get('/gioithieu', (req,res)=>{
    res.render('res/gioithieu')
})
router.get('/tochuc', (req,res)=>{
    res.render('res/sodotochuc')
})
router.get('/cacbomon', (req,res)=>{
    res.render('res/cacbomon')
})

module.exports=router