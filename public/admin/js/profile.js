const token=localStorage.getItem('token')
const jobbody=document.getElementById('job-body')
const $logoutbtn=document.querySelector('.logout-btn')
let usersContainer = document.getElementById("profiles");
//const base64 = require('base64topdf');



window.onload=async()=>{
    console.log("onload")
    const result = await fetch(`/adminprofile?adminid=${localStorage.getItem('adminid')}`, {
        method: 'GET',
        headers: {
           
            'Authorization':'Bearer '+token
        },
        
    }).then((res) => res.json())
    
     
    const mappedUsers = `<div class="profile">
        <p>First Name    : ${result.firstname} </p>
        <p>Last Name     : ${result.lastname}</p>
        <p>Email         : ${result.email} </p>
        <p>DOB (MM/Year) : ${result.month} / ${result.year} </p>
        <p>Gender        : ${result.gender} </p>
        <p>Mobile        : ${result.phone} </p>
        
        <button class="btns"> <a href="editprofile.html"> Edit Profile</a></button><br/>       
      </div>`
    
   // console.log(mappedUsers)
     
      usersContainer.innerHTML = mappedUsers
}
 
$logoutbtn.addEventListener('click',async(e)=>{

    const confirmLogout=confirm("Are you sure you want to logout?");
    if(confirmLogout){
    const result = await fetch('/admin/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
        },
        body: JSON.stringify({
           
        })
    }).then((res)=>{
        localStorage.clear()
        location.href="/"
       // alert("success")
       return res.json()
    })
}   
})


  






