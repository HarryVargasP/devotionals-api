const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const { MONGO_URI } = require('./config');
const app = express();
const devotionalRoutes = require('./api/devotionals');

//Setting
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

mongoose.connect(MONGO_URI, {useNewUrlParser:true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

// Routes
app.use('/api/devotional', devotionalRoutes);

// Start Serve
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});