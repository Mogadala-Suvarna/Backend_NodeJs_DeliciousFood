//write logic that we preform in vendor and it is used to store the data in database

const Vendor=require('../model/Vendor');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const dotEnv=require('dotenv');

dotEnv.config();

const secretKey=process.env.WhatIsYourName




const vendorRegister=async(req,res)=>{
    const{username,email,password}=req.body;
    try{
        const vendorEmail=await Vendor.findOne({email});  //await is used compulsory when we use async
        if(vendorEmail){
            return res.status(400).json("Email already taken");
        }
        const hashedpassword= await bcrypt.hash(password,10) //it is an algorithm
        const newVendor=new Vendor({
            username,
            email,
            password:hashedpassword
        });
        await newVendor.save();  //to save in database
        res.status(201).json({message:"vendor registered successfully"});
        console.log("registered")
    }catch(error){
        console.error(error);
        res.status(500).json({error:"internal server error"})
    }  
}

const vendorLogin=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const vendor=await Vendor.findOne({email}); //to get the email from vendor database and store in vendor variable we use findone method
        if(!vendor || !(await bcrypt.compare(password,vendor.password))){
            return res.status(401).json({error:"invalid username or password"})
        }
        //convert id into token for security purpose
        const token=jwt.sign({vendorId:vendor._id},secretKey,{expiresIn:"1h"})  
        res.status(200).json({success:"Login Successful",token})
        console.log(email,"this is token",token);
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }
}




const getAllVendors=async(req,res)=>{
    try{

        const vendors=await Vendor.find().populate('firm');
        res.json({vendors})
    }catch(error){

        console.log(error);
        res.status(500).json({error:"Internal server error"})
    }
}



const getVendorById=async(req,res,)=>{
    const vendorId=req.params.id;
    try{
        const vendor=await Vendor.findById(vendorId).populate('firm');
        if(!vendor){
            return res.status(404).json({error:"vendor not found"})
        }
        res.status(200).json({vendor})
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Internal server error"});

    }

}
module.exports={vendorRegister,vendorLogin,getAllVendors,getVendorById}
