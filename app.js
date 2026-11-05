//External module 
const express = require('express');
const path = require('path');
const app = express();
const port = 3900;
const handleController = require('./controller/error.js'); 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.locals.favourites = [];

//local module
const userRouterHandler = require('./routes/userRoutesHandler');
const { hostRouterHandler } = require('./routes/hostRoutesHandler');

app.use('/users', userRouterHandler); 
app.use('/hosts', hostRouterHandler);

app.use(handleController.errorPage);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/users`);
});

