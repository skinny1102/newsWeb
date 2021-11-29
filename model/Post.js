const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    title:{
        type:String , 
        required:true
    },
    description:{
        type:String , 
        required:true
    }
    ,
    tag:{
        type:String , 
        required:true
    },
    imgurl:{
        type:String ,   
        default:"https://res.cloudinary.com/vutuananh/image/upload/v1634463454/959124456_dohzim.jpg"
    }
    ,
    noiDung:{
        type:String,
        required:true
    },date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('post', postSchema)