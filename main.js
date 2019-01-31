const express = require('express');
const joi = require('joi');

var apk = express();
apk.use(express.json());

// create variable contain itshare coursses:
var itCourses=[
    {id:1,name:'MEAN Stack'},
    {id:2,name:'Oracle'},
    {id:3,name:'Java'}
]

// Read Home Page
apk.get('/',(req,res)=>{
    res.send("Welcome To HomePage");
})

//Read All Itcourses
apk.get('/itshare/',(req,res)=>{
    res.send(itCourses);
})

//Read Product in /itshare resourses
apk.get('/itshare/:id/',(req,res)=>{
    let itcourse= itCourses.find((productId)=>productId.id === parseInt(req.params.id));
    if (!itcourse){res.status(404).send("page not found");}
    res.send(itcourse);
})

//post method
apk.post('/itshare/:id/',(req,res)=>{
    // Validation:
    const schema = {
        name: joi.string().min(5).required()
    };
    const result= joi.validate(req.body.schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
    }
    //1-take an obj
    let itcourse = 
        {
           id :  itCourses.length+1,
           name: req.body.name
        };
    itCourses.push(itcourse);
    res.send();
})

//put method
apk.put('/itshare/:id/',(req,res)=>{
    //1-Check if it found or not
    let itcourse= itCourses.find((productId)=>productId.id === parseInt(req.params.id));
    if (!itcourse){res.status(404).send("page not found");}


    // 2-Validation of update:
    const result= valChecker(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
    }
    //2-Update
    itcourse.name = req.body.name;
    
    //3- Send response
    res.send(itcourse);
})

//Func Val
function valChecker(itcourse){
    const schema = {
        name: joi.string().min(5).required()
    };
    return joi.validate(itcourse.schema);
}

//Delete Method
apk.delete('/itshare/:id/',(req,res)=>{

    //Check and Read ourse
    let itcourse= itCourses.find((productId)=>productId.id === parseInt(req.params.id));
    if (!itcourse){res.status(404).send("page not found");}
    res.send(itcourse);
    //del course
    let index= itCourses.indexOf(itcourse);
    itCourses.splice(index,1);
    res.send(itcourse);
})

//Port And listen
let port = process.env.port || 5000;
apk.listen(port);