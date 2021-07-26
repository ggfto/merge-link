var express = require('express');

var app = express();

var PORT = 7030;

app.use(express.static('public'));

app.listen(PORT, function() {
    console.log('Server is running on PORT:',PORT);
});