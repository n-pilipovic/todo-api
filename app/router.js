"use strict";

let express = require('express');
let passport = require('passport');

let authController = require('./controllers/auth.controller');
let todoController = require('./controllers/todo.controller');

let authService = require('./services/auth.service');



// bundle routes
let apiRoutes = express.Router();

apiRoutes.post('/login', authController.auth);
apiRoutes.post('/signup', authController.signup);
apiRoutes.post('/validate', authController.validate);

// todos routes
apiRoutes.get('/todos', passport.authenticate('jwt', { session: false }), todoController.getAll);
apiRoutes.get('/todos/search', authService.checkAuthToken, todoController.search);
apiRoutes.get('/todos/:id', authService.checkAuthToken, todoController.getById);
apiRoutes.post('/todos', authService.checkAuthToken, todoController.create);
apiRoutes.put('/todos', authService.checkAuthToken, todoController.update);
apiRoutes.delete('/todos/:id', authService.checkAuthToken, todoController.remove);
apiRoutes.post('/todos/:id/toggle', authService.checkAuthToken, todoController.toggleDone);


module.exports = apiRoutes;