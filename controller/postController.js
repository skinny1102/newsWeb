
//Load Model
const PostModel = require('../model/Post')

const cloudinary = require('../untils/cloudinary');
const multer =require('multer')
// const upload = require('../midlleware/multer')
const storage = multer.diskStorage({})
const upload = multer({storage:storage})

class postController{
        //[GET] '' home 
         async index (req,res,next){
            const postsTinhoatdong  = await PostModel.find({tag:"Tin hoạt động"}).limit(5).lean().sort({date:-1});
            const postsThongbao  = await PostModel.find({tag:"Thông báo"}).limit(5).lean().sort({date:-1});
            const postsTindaotao  = await PostModel.find({tag:"Tin đào tạo"}).limit(4).lean().sort({date:-1});
            const postsKehoach  = await PostModel.find({tag:"Kế hoạch"}).limit(3).lean().sort({date:-1});
            const postsTotnghiep  = await PostModel.find({tag:"Tốt nghiệp"}).limit(4).lean().sort({date:-1});
            const postsOTSC  = await PostModel.find({tag:"Bản tin OTSC"}).limit(4).lean().sort({date:-1});
            res.render("home",{postsTinhoatdong,postsThongbao,postsTindaotao,postsKehoach,postsTotnghiep,postsOTSC});
        }
        //[GET] /:id
        async chitiet(req,res,next){
            const id =req.params.id
            const postsID = await PostModel.find({_id:id}).limit(1).lean().sort({date:-1});
            res.render('post/details',{postsID})
         }
        //[GET] '/add' 
        async indexaddpost(req,res,next){
            res.render("post/addpost");
        }
        //[POST] '/add'
        async addpost(req,res,next){
         res.json(req.body)
            // try{   
            
            //      if(typeof(req.file)=='undefined'){
                   
            //          const imgurl = "https://res.cloudinary.com/vutuananh/image/upload/v1634463454/959124456_dohzim.jpg"
            //         const {title,description,tag,noiDung} = req.body
            //             const newPostData = {title,description,tag,imgurl,noiDung}
            //             const newPost = new PostModel(newPostData)
            //             await newPost.save();
            //             res.redirect('add')

            //      }else{
            //     const result = await cloudinary.v2.uploader.upload(req.file.path,{use_filename:true})
            //     const imgurl = result.url
            //      const {title,description,tag,noiDung} = req.body
            //         const newPostData = {title,description,tag,imgurl,noiDung}
            //         const newPost = new PostModel(newPostData)
            //         await newPost.save();
            //         res.redirect('add')
            //      } 
            // }
            // catch(err){
            //     console.log(err)
            // }
           
        }
}

module.exports = new postController();