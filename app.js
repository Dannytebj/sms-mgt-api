const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

const routes = require('./routes/routes');

dotenv.config();

const app = express();
const port  = process.env.PORT || 4040;

const config = require('./config');
// allow promises with mongoose.
mongoose.Promise = global.Promise;

// setup up database connection
if (process.env.NODE_ENV === 'test') {
    mongoose.connect(config.url_test);
} else {
    mongoose.connect(config.url);
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/index.html"));

app.use('/api/v1', routes);
//  catch all 500 error
app.use((err, req, res, next) => {
  return res.status(500)
    .send({ message: 'An error occured' })
});

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+'/index.html'))
  })

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});

module.exports = app;
