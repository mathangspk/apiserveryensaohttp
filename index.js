const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');
const orders = require('./routes/api/orders')
const userRoute = require('./routes/user');
const product = require('./routes/api/products');
const customer = require('./routes/api/customer');
const path = require('path');

const app = express();


app.use(cors());

//body parser 
app.use(bodyParser.json());
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
//   });
//DB config
const db = require('./config/keys').mongoURI;
//mongoose.connect('mongodb://localhost/test',{useNewUrlParser:true})
// 
//connect to mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log('MogoDB Connected!')
    })
    .catch((err) => console.log(err))

//use route
app.use('/api/orders',orders);
app.use('/users',userRoute);
app.use('/api/products',product);
app.use('/api/customers',customer);


// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

const port = process.env.PORT || 5000 
app.listen(port, () => {
    console.log(`server running.... at ${port}`)
})
console.log('run')