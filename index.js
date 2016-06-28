const express = require('express');
const engine = require('ejs-mate');
const chuckNorris = require('./lib/chucknorris');
const app = express();

// my server port number
const PORT = 3000;

//change my view engine in express to be ejs file type
app.engine('ejs', engine);
// app.set('view',__dirname + '/views');
app.set('view engine', 'ejs');

//my routes
app.get('/', function(request, response){
    //render ejs file out to response
    response.render('home');
});

app.get('/resume', function(request, response){
    //render ejs file out to response
    response.render('resume');
});

app.get('/about', function(request, response){
    //render ejs file out to response
    response.render('about');
});

app.get('/joke', function(request, response){
    const url = 'http://api.icndb.com/jokes/random';
    chuckNorris.getJoke(url)
        .then(function(res) {
            // Promise gets json data and sends it to next then
            return res.json()
        })
        .then(function(data){
            const jokeObject = data.value
            // resder ejs file out to response with joke object
            response.render('joke', jokeObject)

        });
    //render ejs file out to response
    
});

//tell the server to run port 3000 || whatever I change PORT
app.listen(PORT, function () {
    console.log(`ap running on http://localhost:${PORT}/`)
});