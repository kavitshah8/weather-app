
var express = require('express');
var app = express();

var PORT = 3000;

app.use(`/`, express.static(__dirname + '/public/'));

app.listen(PORT, () => {
  console.log(`Server started: http://localhost: ${PORT}/`);
});
