const $postjob=document.getElementById("post-job")

const $postedby=localStorage.getItem('companyid')

const $logoutbtn=document.querySelector('.logout-btn')

const token=localStorage.getItem('token')

$logoutbtn.addEventListener('click',async(e)=>{
    const confirmLogout=confirm("Are you sure you want to logout?");
    if(confirmLogout){
    const result = await fetch('/company/logout', {
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
      //  alert("success")
        return res.json()
    })
    console.log(result)
}
})

  
$postjob.addEventListener("submit",async(e)=>{
    e.preventDefault()
    console.log("clicked post button")
    const $companyid=document.getElementById("cid").value
    const $companyname=document.getElementById("cname").value
    const $requirements=document.getElementById("requirements").value
    const $title=document.getElementById("title").value
    const $yoe=document.getElementById("yoe").value
    const $emptype=document.getElementById("emptype").value
    const $worktype=document.getElementById("worktype").value
    const $aboutcompany = document.querySelector('#aboutcompany')
    const $salary = document.getElementById("salary").value
    const $empbenefits=document.getElementById("empbenifits").value
    console.log($companyid,$companyname,$postedby,$requirements,$title,$yoe)
    const formData = new FormData()
    formData.append("companyid",$companyid)
    formData.append("companyname",$companyname)
    formData.append("requirements",$requirements)
    formData.append("title",$title)
    formData.append("yoe",$yoe)
    formData.append("emptype",$emptype)
    formData.append("worktype",$worktype)
    formData.append("salary",$salary)
    formData.append("empbenefits",$empbenefits)
    formData.append("aboutcompany",$aboutcompany.files[0])
    formData.append("postedby",$postedby)
    const result = await fetch('/company/addjob', {
        method: 'POST',
        headers: {
            
            'Authorization':'Bearer '+token
        },
        body: formData
    })
     //console.log(result,"result")
    if (!result.error) {
        alert("Job Posted")
        location.href="/company/companyindex.html"
    } else {
        alert("unable to post job")
    }

})
