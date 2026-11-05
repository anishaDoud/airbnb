const express = require('express');
const userRouterHandler = express.Router();
const controller = require('../controller/homes');

userRouterHandler.use((req, res, next) => {
    console.log(req.url, req.method);
    next();
});

userRouterHandler.get('/', controller.getHomePage);
userRouterHandler.get('/store/favourites', controller.getFavourites);
userRouterHandler.get('/store/favourites/add', controller.postAddToFavourite);
userRouterHandler.get('/store/home-details/:id', controller.getHomeDetails);

module.exports = userRouterHandler;