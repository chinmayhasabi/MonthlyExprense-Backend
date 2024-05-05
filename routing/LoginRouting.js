const express = require('express');
const personModel = require('../schemas/LoginSchema.js')
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.route('/login').post(async(req,res)=>{
    try{
        const existingUser = await personModel.findOne({email:req.body.email});
        if(!existingUser){
            return res.status(404).json({mssg:"User is not Present Please Singup"});
        }
        isPasswordMatch = await bcrypt.compare(req.body.password,existingUser.password);
        if(!isPasswordMatch){
            return res.status(401).json({mssg:"Password is incorrect!"})
        }
        const jwtToken = jwt.sign({username:existingUser.username}, process.env.secretKey, {expiresIn:'1min'});
        res.status(200).json({mssg:"User Found!!", jwtToken,userId:existingUser._id})
    }
    catch(error){
        res.status(500).json({mssg:"Internal Server Error",error});
    }
});
router.route('/signUp').post(async(req,res)=>{
    try{
        const existingUser = await personModel.findOne({email:req.body.email});
        if(existingUser){
            return res.status(400).json({mssg:"User is already Present Please Login"});
        }
        req.body.password = await bcrypt.hash(req.body.password,10);
        const newuser = await personModel.create(req.body);
        res.status(201).json({mssg:"User signedup", newuser})
    }
    catch(error){
        console.log(error);
        res.status(500).json({mssg:"Internal Server Error",error})
    }
});
router.route('/jwt').post(async(req,res)=>{
    try{
        const existingUser = await personModel.findOne({_id:req.body.userId});  
        const jwtToken = jwt.sign({username:existingUser.username}, process.env.secretKey, {expiresIn:'1min'});
        res.status(200).json({mssg:"token sent", jwtToken})
    }   
    catch(error){
        console.log(error);
        res.status(500).json({mssg:"Internal Server Error",error});
    }
});
module.exports = router