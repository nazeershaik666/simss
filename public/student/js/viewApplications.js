const token=localStorage.getItem('token')
const jobbody=document.getElementById('job-body')
let usersContainer = document.getElementById("jobs");
//const base64 = require('base64topdf');


console.log(localStorage.getItem('studentid'),localStorage.getItem('token'))
window.onload=async()=>{
    console.log("onload")
    const result = await fetch(`/studentviewapplications?studentid=${localStorage.getItem('studentid')}`, {
        method: 'GET',
        headers: {
           
            'Authorization':'Bearer '+token
        },
        
    }).then((res) => res.json())
    const result1 = await fetch(`/studentqualifiedapplications?studentid=${localStorage.getItem('studentid')}`, {
        method: 'GET',
        headers: {
           
            'Authorization':'Bearer '+token
        },
        
    }).then((res) => res.json())
    const result2 = await fetch(`/studentselectedapplications?studentid=${localStorage.getItem('studentid')}`, {
        method: 'GET',
        headers: {
           
            'Authorization':'Bearer '+token
        },
        
    }).then((res) => res.json())
    const result3 = await fetch(`/studentrejectedapplications?studentid=${localStorage.getItem('studentid')}`, {
        method: 'GET',
        headers: {
           
            'Authorization':'Bearer '+token
        },
        
    }).then((res) => res.json())
     
    const mappedUsers1 = result.applications.map((application, index) => {
        
        return `<div class="job">
        <p >First name: ${application.firstname} </p>
        <p>Last Name: ${application.lastname}</p>
        <p> Applied Company: ${result.newResults[index].companyname}</p>
        <p>Applied job Title: ${result.newResults[index].title}</p>
        <p>Email: <a href="mailto:${application.email}">${application.email}</a> </p>
        <p>age: ${application.age} years</p>
        <p>gender: ${application.gender} </p>
        <p>university Id: ${application.universityid}</p>
        <p>mobile: ${application.phone} </p>
        <p><strong>Status: </strong><span style="text-transform: uppercase; font-weight: bolder;"> Applied</span></p>
        <button class="btns"><i class="fa-solid fa-download fa-1x"></i><a innerHtml="download resume"  download="resume.pdf" href="data:application/octet-stream;base64,${application.resume.resumeData.toString('base64')}"> Download resume</a></button><br/>       
      </div>`;
      });
    const mappedUsers2 = result1.applications.map((application, index) => {

        return `<div class="job">
        <p >First name: ${application.firstname} </p>
        <p>Last Name: ${application.lastname}</p>
        <p> Applied Company: ${result1.newResults[index].companyname}</p>
        <p>Applied job Title: ${result1.newResults[index].title}</p>
        <p>Email: ${application.email} </p>
        <p>age: ${application.age} years</p>
        <p>gender: ${application.gender} </p>
        <p>university Id: ${application.universityid}</p>
        <p>mobile: ${application.phone} </p>
        <p><strong>Status: </strong> <span style="text-transform: uppercase; font-weight: bolder;">Qualified</span></p>
        <button class="btns"><i class="fa-solid fa-download fa-1x"></i><a innerHtml="download resume"  download="resume.pdf" href="data:application/octet-stream;base64,${application.resume.resumeData.toString('base64')}"> Download resume</a></button><br/>       
      </div>`;
      });
    const mappedUsers3 = result2.applications.map((application, index) => {

        return `<div class="job">
        <p >First name: ${application.firstname} </p>
        <p>Last Name: ${application.lastname}</p>
        <p> Applied Company: ${result2.newResults[index].companyname}</p>
        <p>Applied job Title: ${result2.newResults[index].title}</p>
        <p>Email: ${application.email} </p>
        <p>age: ${application.age} years</p>
        <p>gender: ${application.gender} </p>
        <p>university Id: ${application.universityid}</p>
        <p>mobile: ${application.phone} </p>
        <p><strong>Status: </strong> <span style="text-transform: uppercase; font-weight: bolder;">Selected</span></p>
        <button class="btns"><i class="fa-solid fa-download fa-1x"></i><a innerHtml="download resume"  download="resume.pdf" href="data:application/octet-stream;base64,${application.resume.resumeData.toString('base64')}"> Download resume</a></button><br/>       
      </div>`;
      });
    const mappedUsers4 = result3.applications.map((application, index) => {

        return `<div class="job">
        <p >First name: ${application.firstname} </p>
        <p>Last Name: ${application.lastname}</p>
        <p> Applied Company: ${result3.newResults[index].companyname}</p>
        <p>Applied job Title: ${result3.newResults[index].title}</p>
        <p>Email: ${application.email} </p>
        <p>age: ${application.age} years</p>
        <p>gender: ${application.gender} </p>
        <p>university Id: ${application.universityid}</p>
        <p>mobile: ${application.phone} </p>
        <p><strong>Status: </strong> <span style="text-transform: uppercase; font-weight: bolder;">Rejected</span></p>
        <button class="btns"><i class="fa-solid fa-download fa-1x"></i><a innerHtml="download resume"  download="resume.pdf" href="data:application/octet-stream;base64,${application.resume.resumeData.toString('base64')}"> Download resume</a></button><br/>       
      </div>`;
      });
      
    
      if(mappedUsers1.length >0 || mappedUsers2.length>0 || mappedUsers3.length>0 || mappedUsers4.length>0){
        usersContainer.innerHTML = [...mappedUsers1,...mappedUsers2,...mappedUsers3,...mappedUsers4]
    }
      else{
        alert("Applications Empty") 
        //    usersContainer.innerHTML = "<h1>There are no pending applications to review, Please comeback later!</h1>"
           location.href="/student/studentindex.html"
      }

}
 

  






