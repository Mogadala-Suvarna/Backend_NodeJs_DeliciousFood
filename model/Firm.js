//to create firm as a token for to add restarents to the database

const mongoose=require('mongoose');
const firmSchema=new mongoose.Schema({    //to create schema
    firmName:{
        type:String,
        required:true,
        unique:true
    },
    area:{
        type:String,
        required:true,
    },
    category:{
        type:[  //here multiple values are defined so we declare like this
            {
                type:String,
                enum:['veg','non-veg']
            }
        ]
    },
    region:{
        type:[
            {
                type:String,
                enum:['south-indian','north-indian','chinese','bakery']
            }
        ]
    },
    offer:{
        type:String
    },
    image:{
        type:String
    },
    vendor:[{   
        
            type:mongoose.Schema.Types.ObjectId,   //this is main to relate with vendor
            ref:'Vendor'
    }],
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ]
});
const Firm=mongoose.model('Firm',firmSchema);  //model name firm so we use firm
module.exports=Firm