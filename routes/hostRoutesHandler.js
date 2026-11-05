const express = require('express');
const hostRouterHandler = express.Router();
const homesController  = require('../controller/homes');


hostRouterHandler.get('/register-home',homesController.getHomes);

hostRouterHandler.post('/register-home',homesController.postHomes);


exports.hostRouterHandler = hostRouterHandler;
