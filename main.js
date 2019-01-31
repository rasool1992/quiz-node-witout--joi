const express = require('express');
// const joi = require('joi');
var app = express();
app.use(express.json());

//1- get / method
app.get('/', (req, res) => {
    res.send('HomePage');
})

var courses = [
    { id: 1, name: 'Java' },
    { id: 2, name: 'C#' },
    { id: 3, name: 'Oracle' }
]

//2-get all courses of it share:
app.get('/itshare', (req, res) => {
    res.send(courses);
})

//3-get specific route of courses:
app.get('/itshare/:id', (req, res) => {
    var course = courses.find(p => p.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("Page Not Found");
    res.send(course);
})

//4- post method it use to write 
app.post('/itshare/:id', (req, res) => {
    //a- take an object from user:
    var course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send();
})

//5-Update Metod with Put
app.put('/itshare/:id', (req, res) => {
    //a- lock up an object and validate if it 404.
    var course = courses.find(p => p.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("Page Not Found");

    //b- update the obj
    course.name = req.body.name;
    res.send(course);
})

// 6- Delete Method:
app.delete('/itshare/:id', (req, res) => {
    //a-Check Whick Course want to delete>
    var course = courses.find(p => p.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("Page Not Found");

    //b- get index of course and splice from 1:
    var index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send();
})

const port = process.env.port || 5000;
app.listen(port);
