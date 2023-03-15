const nodemailer = require("nodemailer");
var mailStatus

/*
const { MailtrapClient } = require("mailtrap");

const TOKEN = "82bc5abcc46929231dcc93949027783b";
const ENDPOINT = "https://send.api.mailtrap.io/";

const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

const sender = {
  email: "mailtrap@naveenrio.me",
  name: "Mailtrap Test",
};
const recipients = [
  {
    email: "vasileveva.ap@gmail.com",
  }
];

client
  .send({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(console.log, console.error);


  */


const sendWelcomeEmail =(email)=>{
    const welcomeMsg={
        from:"mailtrap@naveenrio.me",
        to:email,
        subject:"Welcome To Internship Recuritment Portal",
        html:"<div><h1>welcome to intership portal</h1><br/><p>Thanks for creating the account in our portal we hope that you will like our services.Fell free to email us if you need any help</p></br><h3>Thank you!</h3></div>"
      }


  /*  nodemailer.createTransport({
        service:"gmail",
        auth:{
        user:"studentinternship1234@gmail.com",
        pass:"cbotfjartbjbebta"
        },
        port:465,
        host:"smtp.gmail.com"
    }) */
    
    
    nodemailer.createTransport({
      host: "live.smtp.mailtrap.io",//sandbox.smtp.mailtrap.io",
      port: 587,
      auth: {
        user: "api",//86207576053cfe",
        pass: "82bc5abcc46929231dcc93949027783b"//df87b6e5a6cb1d"
        }
      }).sendMail(welcomeMsg,(err)=>{
        if(err){
        return console.log("error occurs",err)
        }else{
        return console.log("emai sent")
        }
    })
}

const sendPasswordEmail=(email,link)=>{    
    const passwordMsg={
        from:"mailtrap@naveenrio.me",
        to:email,
        subject:"Password reset mail",
        html:`<div><h4>Hi, Here is the link for reset password for your account in student internship portal\n kindly reset the password\n Note:The link is only vaild for fifteen minutes after that the link expries</h4><a href=${link}>Password reset link</a>`
    }

    nodemailer.createTransport({
        host: "live.smtp.mailtrap.io",//sandbox.smtp.mailtrap.io",
        port: 587,
        auth: {
          user: "api",//86207576053cfe",
          pass: "82bc5abcc46929231dcc93949027783b"//df87b6e5a6cb1d"
        }
      }).sendMail(passwordMsg,(err)=>{
        if(err){
         return console.log("error occurs",err)
         
        }else{
        return console.log("emai sent")
        }
    })
}



const sendOtp=(otpemail,randomdigit)=>{  
  let ok = true
  const otp={
      from:"mailtrap@naveenrio.me",
      to:otpemail,
      subject:`${randomdigit} is the OTP`,
      html:`<div><h4>Hi, Here is the One Time Password : <b>${randomdigit}</b> to login into your account in student internship portal <br> \n kindly enter the OTP\n <br> <br> Note:The OTP is only vaild for fifteen minutes after that the OTP expries</h4>`
  }

function a1(){  
      nodemailer.createTransport({
      host: "live.smtp.mailtrap.io",//sandbox.smtp.mailtrap.io",
      port: 587,
      auth: {
        user: "api",//86207576053cfe",
        pass: "82bc5abcc46929231dcc93949027783b"//df87b6e5a6cb1d"
      }
    }).sendMail(otp,(err)=>{
      if(err){
      console.log("error occurs",err)
      return ok
      }else{
      ok = true
      return ok
      }
  })
 return (ok) ? true : false 
}
return a1()
}

const sendReview=(name,mail,msg,rating)=>{
  let ok = true
  const rvw={
    from:"mailtrap@naveenrio.me",
    to:"chennushashank509@gmail.com",
    subject:`New review from ${name}`,
    html:`<div><h4>Hi, Here is the new review from : <b>${name} with mail ${mail}, <br> <br> Message: ${msg} </b> <br><br> \n <b>Rating: ${rating}</b> \n <br> <br> </h4>`
} 

function a2(){  
  nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",//sandbox.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "api",//86207576053cfe",
    pass: "82bc5abcc46929231dcc93949027783b"//df87b6e5a6cb1d"
  }
}).sendMail(rvw,(err)=>{
  if(err){
  console.log("error occurs",err)
  return ok
  }else{
  ok = true
  return ok
  }
})
return (ok) ? true : false 
}
return a2()
}

const sendStudentBlockEmail=(email)=>{    
    
    const passwordMsg={
        from:"studentinternship1234@gmail.com",
        to:email,
        subject:"Account blocked",
        html:`<div><h2>Account Blocked</h2><h4><h4>Your Account is blocked in student internship portal due to fake information provided while creating account or while appling for a job in a company.</h4><p>Kindly contact admin</P>`
    }

    nodemailer.createTransport({
        service:"gmail",
        auth:{
        user:"studentinternship1234@gmail.com",
        pass:"cbotfjartbjbebta"
        },
        port:465,
        host:"smtp.gmail.com"
    }).sendMail(passwordMsg,(err)=>{
        if(err){
        return console.log("error occurs",err)
        }else{
        return console.log("emai sent")
        }
    })
}


const sendCompanyBlockEmail=(email)=>{    
    
    const passwordMsg={
        from:"studentinternship1234@gmail.com",
        to:email,
        subject:"Account blocked",
        html:`<div><h2>Account Blocked</h2><h4>Your Account is blocked due to fake information provided while creating account or while posting a job</h4><p>Kindly contact admin</P>`
    }

    nodemailer.createTransport({
        service:"gmail",
        auth:{
        user:"studentinternship1234@gmail.com",
        pass:"cbotfjartbjbebta"
        },
        port:465,
        host:"smtp.gmail.com"
    }).sendMail(passwordMsg,(err)=>{
        if(err){
        return console.log("error occurs",err)
        }else{
        return console.log("emai sent")
        }
    })
}



module.exports={
    sendPasswordEmail,
    sendWelcomeEmail,
    sendCompanyBlockEmail,
    sendStudentBlockEmail,
    sendOtp,
    sendReview
}
