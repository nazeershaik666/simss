const $companyRegForm=document.getElementById("company-register")
const $companyVerify=document.getElementById("verify")
const $enterOtp = document.getElementById("enterOtp")
const $checkOtp = document.getElementById("checkOtp")
var $otpstatus = false

$companyVerify.addEventListener('click',async (e) => {
    e.preventDefault()
    console.log("Mail verification initiated")
    const $mailVerify = document.getElementById("email").value;
    
    console.log($mailVerify)
    $companyVerify.style.display = "none"
    $enterOtp.style.display = "block"
    $checkOtp.style.display = "block"
    if($mailVerify){
        const result1 = await fetch('/otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email:$mailVerify
            })
        }).then((res) => res.json())
        console.log(result1.msg)
        if(!result1.error){
            alert("OTP sent to mail")
        }else{
            alert("OTP Failed! due to error :",result1.error)
        }
    }
})

$checkOtp.addEventListener('click',async (e) =>{
    e.preventDefault()
    console.log("OTP verification initiated")
    const $maillVerify = document.getElementById("email").value;
    const $otp = $enterOtp.value
    console.log($otp)
    if($otp.length == 6){
        const result2 = await fetch('/otpp',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email:$maillVerify,
            otp:$otp
          })
        }).then((res) => res.json())
        console.log(result2.msg)
        if(result2.msg){
           // console.log(result2.msg,"frontend")
            $otpstatus = true
            alert("OTP Verified")
        }
        else if(result2.err){
            alert("Wrong OTP")
        }
        else{
            alert("OTP Failed! due to error :",result2.error)
            location.href="/student/register.html"
        }
    }else{
        alert("Wrong OTP")
    }
})



function verifyPassword(password1,password2) {  
    if(password1!==password2){
        document.getElementById("message").innerHTML = "password and confirm password should be same";
        return false
    }
    if(password1.length < 8){
        document.getElementById("message").innerHTML = "password length should be longer than or equal to 8 characters";
        return false
    }
    return true
   
  }  


$companyRegForm.addEventListener('submit',async (e)=>{
    e.preventDefault()
    console.log("data validated")
    const $firstname=document.getElementById("first-name").value
    const $lastname=document.getElementById("last-name").value
    const $email=document.getElementById("email").value
    const $password=document.getElementById("password").value
    const $confirmPassword=document.getElementById("password2").value
    const $gender= document.getElementById("gender").value
    const $month = document.getElementById("month").value
    const $year = document.getElementById("year").value
    const $age = $month > 04 ? 2023 - $year  : 2023 - $year
    const $companyid=document.getElementById("companyid").value
    const $phone=document.getElementById("phone").value

    if(verifyPassword($password,$confirmPassword) && $otpstatus == true ){
        const result = await fetch('/company', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstname:$firstname,
                lastname:$lastname,
                email:$email,
                password:$password,
                month : $month,
                year: $year,
                age:$age,
                gender:$gender,
                phone:$phone,
                companyid:$companyid
            })
        }).then((res) => res.json())
        console.log(result)
        if (!result.error) {
            localStorage.setItem('token', result.token)
            localStorage.setItem('name',result.user.firstname)
            localStorage.setItem('companyid',result.user._id)
            localStorage.setItem('usertype','company')
            location.href="/company/companyLogin.html"
            alert("success")
        } else {
            alert(result.error)
            location.href="/company/companyLogin.html"
        }
    }else{
        alert("Please enter all required fields")
    }
})

