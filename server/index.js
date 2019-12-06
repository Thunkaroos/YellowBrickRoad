const express = require('express');
const app = express();
const path = require('path');

// app.use(express.static(path.join(__dirname, '../public')));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', require('./api')); // matches all requests to /api
app.use('/auth', require('./auth')); // matches all requests to /api

// app.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname, '../public/index.html'));
// });

app.use(function(err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const port = process.env.PORT || 3001; // this can be very useful if you deploy to Heroku!
app.listen(port, function() {
  console.log('Knock, knock');
  console.log("Who's there?");
  console.log(`Your server, listening on port ${port}`);
});
