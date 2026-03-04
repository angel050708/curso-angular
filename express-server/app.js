var express = require("express");
var app = express();
app.use(express.json());
app.listen(3000, ()=> console.log("Servidor iniciado en el puerto 3000"));

app.get("/url", (req,res,next)=> res.json(["Paris", "New York", "Tokyo", "London", "Sydney"]));

var misDestinos = [];
app.get("/my", (req,res,next)=> res.json(misDestinos));

app.post("/my", (req,res,next)=>{
    console.log(req.body);
    misDestinos.push(req.body);
    res.json(misDestinos);
});