const request = require("request");


const forecast=(latitude,longtitude,callback)=>{
const url="http://api.weatherapi.com/v1/current.json?key=b03e1c66ba9d41209d4161241241607&q="+latitude+","+longtitude+"&aqi=no"
request({url , json: true},(error,response)=>{
    if(error){
        callback("error has occured",undefined)
    }
    else if(response.body.error){
        callback(response.body.error.message, undefined)
    }
    else{
        callback(undefined,response.body.location.name + " its "+ response.body.current.condition.text)
    }
})
}
module.exports=forecast