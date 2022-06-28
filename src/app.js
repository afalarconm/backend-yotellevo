const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();


const routes = require('./routes/index');

const errorHandler = require('./middlewares/errors/errorHandler.js');
const notFound = require('./middlewares/errors/notFound.js');
const createAdmin = require('./utils/admin.js');

app.use(cors());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(routes);
app.use(createAdmin);

app.use(errorHandler);
app.use(notFound);


module.exports = app;