const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usersCollection = require('../model/usersCollection');

const middleware = async (req,res,next) => {
    try{
        if(req.cookies.jwt){
            const {_id} = jwt.verify(req.cookies.jwt,process.env.JWT_SECRET_KEY);
            const user = await usersCollection.findOne({_id,"tokens.token":req.cookies.jwt},{_id:1,full_name:1,email:1,mobile:1,profession:1});
            if(!user){
                res.status(401).send({status:false,message:"Something is wrong or token is expired! please login again."});
            }
            req.user = user;
            next();
        }else{
            res.status(401).send({status:false,message:"Token not available."});
        }
    }catch(err){
        console.log(err);
        res.status(500).send({status:false,message:"Internal server error."});
    }
}

router.get("/getAuthUser",middleware, async (req,res) => {
    try{
        res.status(200).send({status:true,user:req.user});
    }catch(err){
        console.log(err);
        res.status(500).send({status:false,message:"Internal server error."});
    }
});

router.get("/logoutUser",middleware,async (req,res) => {
    try{
        const result = await usersCollection.findByIdAndUpdate(req.user._id,{tokens:[]});
        result ? res.clearCookie('jwt').status(200).send({status:true,message:"Logout successfully."}):res.status(200).send({status:false,message:"Logout failed."});
    }catch(err){
        console.log(err);
        res.status(500).send({status:false,message:"Internal server error."});
    }
});

router.post("/getInTouch",middleware, async (req,res) => {
    try{
        let {msg} = req.body;
        if(!msg){
            return res.status(400).send({status:false,message:"Bad Request - Missing required fields."});
        }
        const user = await usersCollection.findOne({_id:req.user._id});
        const result = await user.addMessage(msg);
        res.status(201).send({status:true,message:result});
    }catch(err){
        console.log(err);
        res.status(500).send({status:false,message:"Internal server error."});
    }
});

router.post("/signin", async (req,res) => {
    try{
        let {email,password} = req.body;
        if(!email || !password){
            return res.status(400).send({status:false,message:"Bad Request - Missing required fields."});
        }
        const user = await usersCollection.findOne({email});
        if(!user){
            return res.status(401).send({status:false,message:"Invalid Login Credentials."});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            const token = await user.generateAuthToken();
            res.cookie("jwt",token,{expires:new Date(Date.now() + (24*60*60*1000)),httpOnly:true});
            res.status(200).send({status:true,message:"Login Successful."});
        }else{
            res.status(401).send({status:false,message:"Invalid Login Credentials"});
        }
    }catch(err){
        console.log(err);
        res.status(500).send({status:false,message:"Internal server error."});
    }
});
router.post("/signup", async (req,res) => {
    try{
        let {full_name,email,mobile,profession,password} = req.body;
        if(!full_name || !email || !mobile || !profession || !password){
            return res.status(400).send({status:false,message:"Bad Request - Missing required fields."});
        }
        const isExists = await usersCollection.findOne({email});
        if(isExists){
            return res.status(409).send({status:false,message:"User already exists"});
        }
        const result = await usersCollection(req.body).save();
        // const result = await usersCollection.create(req.body); alternative way.
        res.status(201).send({status:true,message:result});
    }catch(err){
        console.log(err);
        res.status(500).send({status:false,message:"Internal server error."});
    }
});

module.exports = router;