const PostModel = require('../model/Post')
const moment = require('moment')
const UserModel = require('../model/User')
class adminController{
        /// [GET] get/admin/post
        indexpost(req,res,next){
          res.render('admin/login',{layout:false})
        }

        async postusser(req,res,next){
        
                const { username, password } = req.body;
               const user = await UserModel.find({username:username, password:password}).lean();
             
                    if (user == null || user == '') {
                        // res.json('Tài Khoản hoặc mật khẩu không đúng');
                        req.session.isAuth = false;
                        res.render('admin/login',{layout:false ,error:'Sai tài khoản hoặc mật khẩu'})
                    } else {
                        delete user[0].password;
                        req.session.isAuth = true;
                        req.session.User = user[0];
                        res.redirect('/admin/post');
                    }
           
        }
        indexadminpost(req,res,next){
            res.render('admin/adminpost',{layout:false})
        }
      async  postadmin (req,res,next){
            const tag =req.params.tag
            var abctag = '';
            switch(tag){
                    case 'Tb':
                        abctag = 'Thông báo'
                        break;
                    case 'Thd':
                        abctag = 'Tin hoạt động'
                        break;
                    case 'Tdt':
                        abctag = 'Tin đào tạo'
                     break;
                     case 'Khdt':
                        abctag = 'Kế hoạch'
                     break;
                     case 'Tn':
                        abctag = 'Tốt nghiệp'
                     break;
                     case 'OTSC':
                        abctag = 'Bản tin OTSC'
                     break;
                    default:
                        break;
                 }
            const postsTag = await PostModel.find({tag:abctag}).lean().sort({date:-1});
            postsTag.forEach((post)=>{
               post.date =moment(post.date, "YYYY-MM-DD[T00:00:00.000Z]").format('DD-MM-YYYY')
            
            })
            res.render('admin/adminpost',{layout:false,postsTag})
        }
        async deleteadmin (req,res,next){
               await PostModel.findOneAndDelete({_id:req.params.id}).lean();
               res.redirect('/admin/post')
               
        }
        async addposst (req,res,next){
            res.render('admin/adminaddpost',{layout:false})
        }
        async adminaddposst(req,res,next){
        const {title,description,tag,noiDung} = req.body
          if(title=='' || description==''|| tag==''|| noDung==''){
            res.render('admin/adminaddpost', {layout:false,error:"Hãy nhập đủ các thông tin"})
          }
            try{   
            
                if(typeof(req.file)=='undefined'){
                  
                    const imgurl = "https://res.cloudinary.com/vutuananh/image/upload/v1634463454/959124456_dohzim.jpg"
                  
                       const newPostData = {title,description,tag,imgurl,noiDung}
                       const newPost = new PostModel(newPostData)
                       await newPost.save();
                       res.redirect('/admin/post')

                }else{
               const result = await cloudinary.v2.uploader.upload(req.file.path,{use_filename:true})
               const imgurl = result.url
                const {title,description,tag,noiDung} = req.body
                   const newPostData = {title,description,tag,imgurl,noiDung}
                   const newPost = new PostModel(newPostData)
                   await newPost.save();
                   res.redirect('/admin/post')
                } 
           }
           catch(err){
               console.log(err)
           }
        }
        ///[POST] admin/post/edit
         async editpostadmin(req,res,next){
            const idproduct = req.body.id;
            const postsID = await PostModel.find({_id:idproduct}).lean().sort({date:-1});
            res.send({postsID:postsID})
         }
          async updatepostadmin(req,res,next){
            const {title,description,tag,noiDung} = req.body
            await PostModel.findByIdAndUpdate({_id:req.body.id},{title,description,tag,noiDung} )
            res.redirect('/admin/post')
          }
          ///[GET] DOi mat khau
          async doimatkhat(req,res,next){
              res.render('admin/doimatkhau',{layout :false})
          }
          ///[POST] doi mat khai
          async postdoimatkhat(req,res,next){
            const {password} = req.body
            await UserModel.findOneAndUpdate({username:'admin'},{password}).lean()
            res.redirect('/admin/post')
        }


}
module.exports = new adminController();