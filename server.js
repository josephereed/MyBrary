const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index.js');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');

// Connect to mongoose
const db = require('./config/keys').mongoURI;
mongoose.connect(db)
  .then(() => console.log('MongoDB connected...'))

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layouts', '/layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

app.use('/', indexRouter);

app.listen(PORT);