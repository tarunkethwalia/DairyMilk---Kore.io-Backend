const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { env } = require('./env');
const companyRoute = require('./routes/company-routes');
const userRoute = require('./routes/user-routes');
const orderRoute = require('./routes/order-routes');
const orderStatusRoute = require('./routes/order-status-routes');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect(env.mongoUrl).then(() => {
    console.log('Mongoose connection extablished successfully..!!');
}).catch(err => {
    console.log(err);
});

app.use('/api/v1/company/', companyRoute);
app.use('/api/v1/user/', userRoute);
app.use('/api/v1/order/', orderRoute);
app.use('/api/v1/orderStatus/', orderStatusRoute);

app.get('/', (req, res) => {
    res.status(200).sendFile('index.html', {root: __dirname + '/public'});
});

module.exports = app;