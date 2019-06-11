var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
let mongoose = require('mongoose');

let guestRoute = require('./routes/guest');
let facilityRoute = require('./routes/facility');
let occupiedRoomRoute = require('./routes/occupiedroom');
let metaRoute = require('./routes/meta');
let uiRoute = require('./routes/ui');
let utilsRoute = require('./routes/utils');
let reservationRoute = require('./routes/reservation');

mongoose.connect('mongodb://localhost:27017/unorooms', {useNewUrlParser: true});

var app = express();
// TODO: Configure this properly when domain name is registered.
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/guest', guestRoute);
app.use('/facility', facilityRoute);
app.use('/occupiedroom', occupiedRoomRoute);
app.use('/meta', metaRoute);
app.use('/ui', uiRoute);
app.use('/utils', utilsRoute);
app.use('/reservation', reservationRoute);



// Catch 404 error
app.use((req, res, next) => {
    res.status(404).send('Resource not found');
});

//Handle for error 500
app.use((err, req, res, next) => {
    console.log("PRINTING THIS ERRPR", err);
    res.status(err.status).json(err);
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.info(`Server listening on port ${PORT}.`));
