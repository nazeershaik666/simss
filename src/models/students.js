const mongoose = require("mongoose")
const validator=require("validator")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")


const userSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique: true,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid!")
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
            
    },
    month:{
        type:Number,
        default:1,
    },
    year:{
        type:Number,
        default:2000,
    },
    age:{
        type:Number,
        default:0,
    },
    ssn:{
        type:Number,
    },
    gender:{
        type:String,
        required:true,
        trim:true
    },
    universityid:{
        type:String,
        required:true,
        trim:true
    },
    phone:{
        type:String,
        required:true,
       
    },
    block: {
        type: Boolean,
        default: false
    },
    tokens:[
       {
           token:{
               type:String,
               required:true
           }
       }
    ]
})

//userdef function for hiding private data
userSchema.methods.toJSON = function(){
    const user = this
    const userObj = user.toObject()
    delete userObj.password
    delete userObj.tokens
    return userObj
} 

//userdef function for gen auth token
userSchema.methods.genAuthToken = async function(){
    const user=this
    const token = jwt.sign({_id:user._id.toString()},"thisisseceret",{ expiresIn:"7 days"})
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token

}

//userdef function for authentication
userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({ email })
    if(!user){
        throw new Error("Email is incorrect")
    }
    const isMatched = await bcrypt.compare(password,user.password)
    if(!isMatched){
        throw new Error("password is incorrect")
    }
    return user
}

//userdef function for authentication
userSchema.statics.findByEmail = async (email) => {
    // console.log("erwe")
    const user = await User.findOne({ email })
    console.log(user,"user")
    if(!user){
        throw new Error("unable to find")
    }
    return user
}

//userdef function for authentication
userSchema.statics.findUserById = async (id) => {
    console.log("reached schema")
    const user = await User.findById({_id : id})
    // console.log(user,"user")
    if(!user){
        throw new Error("unable to find")
    }
    return user
}

//using mongoose middleware for hashing passwords
userSchema.pre("save",async function (next) {
    const user =this
    console.log("user data received")
   if(user.isModified('password')){
       user.password=await bcrypt.hash(user.password,8)

   }
    next()
})

//creating a user model
const User = mongoose.model('Student',userSchema)

module.exports=User