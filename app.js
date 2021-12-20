const express = require('express');
const fs = require('fs');
const { exit } = require('process');
var api = express();

api.use(express.static(__dirname))

api.listen(1522, () => {
    console.log("API Connected! Listening on port 1522. url: https://localhost:1522.")
})

api.post('/help', (req,res) => {
    res.send("localhost://1522, its the localhosted website for your game's data. it will be saved in files. to save data you send a post request that looks like this: 'https://localhost:1522/save?name=thenameofyourfile&data='somedata'")
})
api.get('/', (req, res) => {
    res.send("e");
})
api.post('/save', (req,res) => {
    const data = req.query.data;
    const name = req.query.name;
    fs.writeFile("data/"+name+".txt",data, function(){
        res.send("Data saved!")
    })
})
api.post("/getsave", (req, res) => {
    const name = req.query.name;
    fs.readFile("data/"+name+".txt", 'utf8', function(err,data){
        res.send(data)
    })
    
})
api.post("/cleardata", (req,res) => {
    const name = req.query.name;
    fs.unlink("data/"+name+".txt", (err) =>{
        if(err){
            throw err;
        }

        res.send("Data has been deleted!")
    })
})
api.post("/stop", (req, res) => {
    res.send("ended port.");
    exit(1);
})