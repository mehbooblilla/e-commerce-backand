const mongoose=require('mongoose')

const ProductSchema=new mongoose.Schema({
    name:String,
    price:String,
    brand:String,
    userId:String
})
module.exports=mongoose.model('products',ProductSchema)