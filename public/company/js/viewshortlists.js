const token=localStorage.getItem('token')
const jobbody=document.getElementById('job-body');
const search=document.getElementById('searchbox')
const $searchbutton=document.querySelector('.searchbutton')
let usersContainer = document.getElementById("jobs");


 
window.onload=async()=>{
    console.log("onload")
    const result = await fetch(`/viewshortlists?companyid=${localStorage.getItem('companyid')}`, {
        method: 'GET',
        headers: {
           
            'Authorization':'Bearer '+token
        },
        
    }).then((res) => res.json())
     console.log(result)
    const mappedUsers = result.map((application, index) => {
        return `<div class="job">
        <h1>Application details</h1>
        <p>Student Name: ${application.firstname} ${application.lastname}</p>
        <p>Email: <a href="mailto:${application.email}" target="_blank">${application.email}</a></p> 
        <p>DOB (MM/Year) : ${application.month} / ${application.year} </p>
        <p>Phone: ${application.phone}</p>
        <p>Gender: ${application.gender}</p>
        <button class="btns"><i class="fa-solid fa-download fa-1x"></i><a innerHtml="Download resume"  download="resume.pdf" href="data:application/octet-stream;base64,${application.resume.resumeData.toString('base64')}"> Download Resume</a></button><br />
        <br />
        <button class="btns"  onclick="window.location.href='shortlistqualify.html?applicationid=${application._id}'" type="submit" value="Submit" > Accept </button>    
        <button class="btns"  onclick="window.location.href='shortlistreject.html?applicationid=${application._id}'" type="submit" value="Submit" > Reject </button> 
          
      </div>`;
      });
      if(mappedUsers.length>0)
      usersContainer.innerHTML = mappedUsers;
      if(mappedUsers.length < 3){
        const  ab = document.getElementById("footer")
        ab.classList.add("foot")
      }
      else{
        alert("Applications Empty") 
        //    usersContainer.innerHTML = "<h1>There are no pending applications to review, Please comeback later!</h1>"
           location.href="/company/companyindex.html"
      }
}
 

$searchbutton.addEventListener('click',async (e)=>{
  const studentName = document.getElementById('studentName').value
  const mail = document.getElementById('mail').value
  
  const searchterm = search.value.toLowerCase();
  //console.log(searchterm);
  const result1 = await fetch(`/viewshortlists?companyid=${localStorage.getItem('companyid')}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
    }
  }).then((res) => res.json())

  console.log(result1)

  const filterTitleFunction = (application)=>{
    // console.log(document.getElementById("filtertype").value)
   // const filtertype = document.getElementById("filtertype").value
   // console.log(job)
  // return filtertype == 1 ? job.companyname.toLowerCase().includes(searchterm) : filtertype == 2 ? job.title.toLowerCase().includes(searchterm) : filtertype == 3 ? job.yoe.toString().includes(searchterm) : job.worktype.toLowerCase().includes(searchterm)
  if(searchterm) {
   return  application.firstname.toLowerCase().includes(searchterm) || application.lastname.toLowerCase().includes(searchterm) || application.email.includes(searchterm) // || job.empbenefits.toString().includes(searchterm)
  }
  
  let b = {
      c1 : application.firstname,
      c2 : application.lastname,
      c3 : application.email
  }
  
  console.log(b)
  let flag , a
  let arr = []
  let a1 = studentName , a2 = mail
  if(a1)
   arr.push(a1.toLowerCase())
  if(a2)
   arr.push(a2.toLowerCase())
  
  
  a = arr.length     
  for(let i=0; i< a ; i++){
  let c = Object.values(b)
  if(c.toString().toLowerCase().includes(arr[i].toString().toLowerCase())){
   flag = true
   
  }
  else{
   flag = false
   break
      }
    }
  if(flag == true){
   console.log(b.c1)
   return b.c1
    }
  
  
  }

  const filteredResult = result1.filter(filterTitleFunction)

  const mappedUsers = filteredResult.map((application, index) => {
    return `<div class="job">
    <h1>Application details</h1>
    <p>Student Name: ${application.firstname} ${application.lastname} </p>
    <p>Email: <a href="mailto:${application.email}" target="_blank">${application.email}</a></p> 
    <p>DOB (MM/Year) : ${application.month} / ${application.year} </p>
    <p>Phone: ${application.phone}</p>
    <p>Gender: ${application.gender}</p>
    <button class="btns"><i class="fa-solid fa-download fa-1x"></i><a innerHtml="Download resume"  download="resume.pdf" href="data:application/octet-stream;base64,${application.resume.resumeData.toString('base64')}"> Download Resume</a></button><br />
    <br />
    <button class="btns"  onclick="window.location.href='shortlistqualify.html?applicationid=${application._id}'" type="submit" value="Submit" > Accept </button>    
    <button class="btns"  onclick="window.location.href='shortlistreject.html?applicationid=${application._id}'" type="submit" value="Submit" > Reject </button> 
      
  </div>`;
  });
  if(mappedUsers.length>0)
  usersContainer.innerHTML = mappedUsers;
  if(mappedUsers.length < 3){
    const  ab = document.getElementById("footer")
    ab.classList.add("foot")
  }
  else{
    alert("Applications Empty") 
    //    usersContainer.innerHTML = "<h1>There are no pending applications to review, Please comeback later!</h1>"
       location.href="/company/companyindex.html"
  }





})
 





