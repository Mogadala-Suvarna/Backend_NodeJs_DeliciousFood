const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true    //for validation
    },
    category:{
        type:[  //here multiple values are defined so we declare like this
            {
                type:String,
                enum:['veg','non-veg']
            }
        ]
    },
   image:{
    type:String
   },
   bestSeller:{
    type:Boolean
   },
   description:{
    type:String
   },
   firm:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Firm'
   }]
});
const Product=mongoose.model('product',productSchema);
module.exports=Product