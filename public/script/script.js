let form=document.getElementById("form1");
const titlef1=document.getElementById("titlef1")
const titlef2=document.getElementById("titlef2")
const errorf=document.getElementById("error")
const locationf=document.getElementById("location")
const longtutidef=document.getElementById("longtitude")
const latitudef=document.getElementById("latitude")
const forecastf=document.getElementById("forecast")
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    titlef1.style.display="none"
    titlef2.style.display="none"
    // console.log(address.value)
    weatherFun()
    form.reset()

})

let weatherFun= async ()=>{
    try{
        const address=document.getElementById("address").value
        const res=await fetch("http://localhost:3000/weather?address="+address)
        const data=await res.json()
        console.log(data)
        if(data.error){
            errorf.innerText="Error : " +data.error
            locationf.innerText=""
            forecastf.innerText=""
            longtutidef.innerText=""
            latitudef.innerText=""
        }else{
            setTimeout(()=>{locationf.innerText="Country is : "+ data.location}, 1000);
            setTimeout(()=>{forecastf.innerText="Forecast is : "+ data.forecast}, 2000);
            setTimeout(()=>{longtutidef.innerText="Longtitude is : "+ data.longtitude}, 3000);  
            setTimeout(()=>{latitudef.innerText="Latitude is : "+ data.latitude}, 4000); 
            errorf.innerText=""

        }
    }
    catch(e){
        console.log(e)
    }
}