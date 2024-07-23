const express=require('express')
const cors=require('cors')
require('./db/config')
const User=require('./db/User')
const Product=require('./db/Product')
const app=express()
app.use(express.json())
app.use(cors( ))

app.post('/register',async(req,res)=>{
    const user=new User(req.body)
    let result=await user.save()
    result=result.toObject()
    delete result.password
    res.send(result)
})
app.post('/login',async(req,res)=>{
    const user=await User.findOne(req.body).select('-password')
    if(user){
        res.send({
            success:true,
            data:user
        })
    }else{
        res.send({
        message:'User does not exist',
        success:false
        })
    }
    console.log("user",user);
 
})

// ADD PRODUCT API

app.post('/add-product',async(req,res)=>{
    const product=new Product(req.body)
    let result=await product.save()
    res.send(result)
})

// Get All Product

app.get('/products',async (req,res)=>{
    let products=await Product.find()
    { products.length !=0 ? 
        res.send(products) :
        res.send({
            message:'No data found',
            data:null
        })
    }
})

// DELETE API

app.delete('/product/:id',async(req,res)=>{
    let result=await Product.deleteOne({_id:req.params.id})
    res.send(result)
})

// GET SPECIFIC PRODUCT API

app.get('/product/:id',async(req,res)=>{
    let result=await Product.findOne({_id:req.params.id})
    if(result){
        res.send(result)
    }else{
        res.send({
            message:'Product not found',
            data:null
        })
    }
 
})

// UPDATE SPECIFIC PRODUCT API

app.put('/update/:id',async(req,res)=>{
    let result=await Product.updateOne({_id:req.params.id},{$set:req.body})
    if(result){
        res.send(result)
    }else{
        res.send({
            message:'Product not found',
            data:null
        })
    }
 
})


//SEARCH API

app.get('/search/:key',async(req,res)=>{
    let result=await Product.find({
        '$or':[
            {name:{$regex:req.params.key}},
            {brand:{$regex:req.params.key}}
        ]
    })
    res.send(result)
})









app.listen(5000)