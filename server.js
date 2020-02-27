const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');  
const indexRouter = require('./routes/index.js');
const authorRouter = require('./routes/authors');

// Connect to mongoose
const db = require('./config/keys').mongoURI;
mongoose.connect(db)
  .then(() => console.log('MongoDB connected...'))
  .catch(error => console.log(error))

app.set('view engine', 'ejs');
var path = require ('path');
app.use(express.static(path.join(__dirname + '/views')));
app.set('layout', 'layouts/layout.ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false })) 

app.use('/', indexRouter);
app.use('/authors', authorRouter);

app.listen(PORT);

