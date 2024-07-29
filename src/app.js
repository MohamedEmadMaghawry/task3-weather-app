const express=require("express")
const app=express()
const port=process.env.PORT||3000
const forecast=require("./tools/forecast")
const geocode=require("./tools/geocode")
const request=require("request")

const path=require("path")


////hbs

app.set("view engine","hbs")
const viewsDirectory=path.join(__dirname,"../templet1/views")
app.set("views",viewsDirectory)

//////
var hbs=require('hbs')
const { error } = require("console")
const partialPath=path.join(__dirname,"../templet1/partials")
hbs.registerPartials(partialPath)


app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.render('index',{
        title:"Home Page",
        desc:"This is Home Page",

    })
})
app.get("/weather",(req,res)=>{
    if(!req.query.address){
       return res.send({
        error: "You must write the address."
       })
    }
    geocode(req.query.address,(error,data)=>{
        if(error){
            return res.send({error})
        }
        forecast(data.longtitude,data.latitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                location: req.query.address,
                longtitude: data.longtitude,
                latitude:data.latitude
                ,forecast :forecastData

            })
        })
    })
})



app.get("*",(req,res)=>{
    res.send("404 page is not found")
})

app.listen(port,()=>{
    console.log(`app is listening on port ${port} http://localhost:3000/`)
})


