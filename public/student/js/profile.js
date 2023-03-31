const token=localStorage.getItem('token')
const jobbody=document.getElementById('job-body')
let usersContainer = document.getElementById("profiles");
//const base64 = require('base64topdf');



window.onload=async()=>{
    console.log("onload")
    const result = await fetch(`/studentprofile?studentid=${localStorage.getItem('studentid')}`, {
        method: 'GET',
        headers: {
           
            'Authorization':'Bearer '+token
        },
        
    }).then((res) => res.json())
    
     
    const mappedUsers = `<div class="profile">
        <p>First Name: ${result.firstname} </p>
        <p>Last Name: ${result.lastname}</p>
        <p>Email: <a href="mailto:${result.email}" target="_blank">${result.email}</a></p> 
        <p>DOB (MM/Year) : ${result.month} / ${result.year} </p>
        <p>SSN: ${result.ssn} </p>
        <p>Gender: ${result.gender} </p>
        <p>University Id: ${result.universityid}</p>
        <p>Mobile: ${result.phone} </p>
        
        <button class="btns"> <a href="editprofile.html"> Edit Profile</a></button><br/>       
      </div>`
    
    console.log(mappedUsers)
     
      usersContainer.innerHTML = mappedUsers
}
 

  






