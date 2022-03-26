const fs = require('fs')
const express  =require('express')
const app = express()
const port = process.env.PORT||80;

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(express.static('public'))
app.get('/data',(req,res)=>{
    let data = fs.readFileSync('data.json')
    res.send(data)
})
app.post('/data',(req,res)=>{
    let data = fs.readFileSync('data.json')
    data = JSON.parse(data);
    console.log(req.body)
    data.push({lat:req.body.lat,lng:req.body.lng})
    fs.writeFileSync('data.json',JSON.stringify(data))
    res.redirect('admin.html')
})
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});