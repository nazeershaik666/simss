const contact=require("../models/contacts.js")
const express=require("express")
const {sendReview}=require("../emails/account.js")

const router = new express.Router()


router.post("/contact",async (req,res)=>{
    const user = new contact(req.body)
    try{
     await user.save() 
     res.status(201).send({success:"success"})
    }catch(e){
     res.status(400).send({error:"error"})
    }
})

router.post("/review",async (req,res)=>{
    const name = req.body.name
    const mail = req.body.email
    const msg = req.body.message
    const rating = req.body.rating
    try{
        const res1 = sendReview(name,mail,msg,rating)
        if(res1){ 
            res.send({
               msg:"Your review sent"
           })
       }
       else{
           res.send({msg: "Error review not sent"})
       }

    }catch(e){

    }
})

module.exports = router