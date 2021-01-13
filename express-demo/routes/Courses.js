const express = require('express');
const router = express.Router();

const courses = [
    { id: 1, name: 'Course01' },
    { id: 2, name: 'Course02' },
    { id: 3, name: 'Course03' },
];


/**
 * Calling Api
 * [GET]
 */
router.get('/', (req, res) => {
    res.send(courses);
});


/**
 * [GET:id]
 */
router.get('/:id', (req, res)=>{
    const course = courses.find(
        c => c.id === parseInt(req.params.id)
    );

    if(!course) res.status(404).send('The course with the given id was not found!');
    res.status(200).send(course);
})



/**
 * [POST]
 */
router.post('/', (req, res) => {
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
    
    courses.push(course);
    res.status(200).send(course);
})



/**
 * [PUT:id]
 */
router.put('/:id', (req, res) => {
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

    res.status(200).send(course);
})



/**
 * [DELETE:id]
 */
router.delete('/:id', (req, res) => {
    const course = courses.find(
        c => c.id === parseInt(req.params.id)
    );

    if(!course) res.status(404).send('The course with the given id was not found!');

    //get the index
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    //return the same course
    res.status(200).send(course);
})



/**
 * [GET:year/:month?name=something]
 */
router.get('/:year/:month', (req, res)=>{
    // to get route parameters
    // res.send(req.params);

    // to get query string parameters
    res.send(req.query);
});

//Http inputs validation
function inputValidation(inputBody) {
    const schema = Joi.object({
        name: Joi.string().min(4).required(),
    });

    return schema.validate(inputBody);
}

module.exports = router;
