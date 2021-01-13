/**
 * Neccessary Includes
 */
const express = require('express');
const app = express();
const Helmet = require('helmet');
const Logger = require('./middlewares/logger');
const Auth = require('./middlewares/authentication');


/**
 * Routes
 */
const Courses = require('./routes/Courses');
app.use('/api/courses', Courses);

const Home = require('./routes/Home');
app.use('/', Home);



/**
 * Input validation
 * using Joi npm package
 */
const Joi = require('joi');
const morgan = require('morgan');


/**
 * Register the middleware
 * express.json() check for json request data
 * express.urlencoded() check for url encoded form data
 * express.static() for using static files
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Third party middlewares
app.use(Helmet());

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('Morgan is running...');
}

//custome Middlewares
app.use(Logger);
app.use(Auth);



//check the app env
// console.log(`Current environment is ${process.env.NODE_ENV}`);
// console.log(`App environment: ${app.get('env')}`);



// Setting up environment port
const port = process.env.PORT || 3000;
// create the server
app.listen(port, () => console.log(`server is listening to port ${port}...`));
