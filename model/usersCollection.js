const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usersSchema = new mongoose.Schema({
    full_name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    mobile:{
        type:Number,
        required: true
    },
    profession:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    isAdmin:{
        type:Boolean,
        default: false
    },
    last_modify:{
        type:Date,
        default: Date.now()
    },
    messages:[
        {
            msg:{ type:String }
        }
    ],
    tokens:[
        {
            token:{ type:String }
        }
    ]
});
usersSchema.pre('save', async function(next){
    try{
        if(this.isModified('password')){
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
        next();
    }catch(error){
        console.log(error);
        next(error);
    }
});
usersSchema.methods.generateAuthToken = async function(){
    try{
        const token = jwt.sign({_id:this._id},process.env.JWT_SECRET_KEY,{ expiresIn: '1d' });
        this.tokens = this.tokens.concat({token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
        throw new Error('Error generating auth token');
    }
}
usersSchema.methods.addMessage = async function(msg){
    try{
        this.messages = this.messages.concat({msg});
        await this.save();
        return this.messages;
    }catch(err){
        console.log(err);
        throw new Error('Error during adding message.');
    }
}
const usersCollection = new mongoose.model("mern_user",usersSchema);
module.exports = usersCollection;