const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');  
const methodOverride = require('method-override');

const indexRouter = require('./routes/index.js');
const authorRouter = require('./routes/authors');
const bookRouter = require('./routes/books')

// Connect to mongoose
const db = require('./config/keys').mongoURI;
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true } )
  .then(() => console.log('MongoDB connected...'))
  .catch(error => console.log(error))

app.set('view engine', 'ejs');
var path = require ('path');
app.use(express.static(path.join(__dirname + '/views')));
app.set('layout', 'layouts/layout.ejs');
app.use(expressLayouts);
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false })) 

app.use('/', indexRouter);
app.use('/authors', authorRouter);
app.use('/books', bookRouter)

app.listen(PORT);

