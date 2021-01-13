// Setting up environment port
const port = process.env.PORT || 3000;
// create the server
app.listen(port, () => console.log(`server is listening to port ${port}...`));
//include express
const express = require('express');
const Joi = require('joi'); //input validation package
const app = express();
// return middleware
app.use(express.json());

const courses = [
    { id: 1, name: 'Course01' },
    { id: 2, name: 'Course02' },
    { id: 3, name: 'Course03' },
];

//calling api
app.get('/', (req, res) => {
    res.send(courses);
});

app.get('/api/courses', (req, res) => {
    res.send(JSON.stringify([1,2,3]));
});


//Route parameter & query string
app.get('/api/course/:year/:month', (req, res)=>{
    // to get route parameters
    // res.send(req.params);

    // to get query string parameters
    res.send(req.query);
});

//Handling specific item Get request
app.get('/api/course/:id', (req, res)=>{
    const course = courses.find(
        c => c.id === parseInt(req.params.id)
    );

    if(!course) res.status(404).send('The course with the given id was not found!');
    return res.send(course);
})

// Handleing post requests
app.post('/api/course', (req, res) => {
    /**
     * using validation function
     * using object destructuring
     * const {property} = object
     */
    const {error} = inputValidation(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    return res.send(courses.push(course));
})

//Handling update requests
app.put('/api/course/:id', (req, res) => {
    /**
     * using validation function
     * using object destructuring
     * const {property} = object
    */
    const {error} = inputValidation(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const course = courses.find(
        c => c.id === parseInt(req.params.id)
    );

    if(!course) res.status(404).send('The course with the given id was not found!');

    course.name = req.body.name;

    return res.send(course);
})


//Handling http delete requests
app.delete('/api/course/:id', (req, res) => {
    const course = courses.find(
        c => c.id === parseInt(req.params.id)
    );

    if(!course) res.status(404).send('The course with the given id was not found!');

    //get the index
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    //return the same course
    return res.send(course);
})

//Http inputs validation
function inputValidation(inputBody) {
    const schema = Joi.object({
        name: Joi.string().min(4).required(),
    });

    return schema.validate(inputBody);
}
