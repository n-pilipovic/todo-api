"use strict";

let  config = require('../../config/passport');
let jwt = require('jsonwebtoken');
let _ = require('lodash');

const authController = {
  signup: signup,
  auth: auth
};


function signup(req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({ msg: 'Please pass username and password.' });
  } else {
    const newUser = {
      id: config.users.length + 1,
      username: req.body.username,
      password: req.body.password
    };
    // try to find existing user with same username (do not allow duplicates)
    const alreadyPresentUser = config.users[_.findIndex(config.users, {username: newUser.username})];

    if (alreadyPresentUser) {
      res.status(409).json({ msg: 'Username already exists.' });
    } else {
      config.users.push(newUser);
      res.json({msg: 'User created'});
    }
  }
}

function auth(req, res) {
  let user;
  if(req.body.username && req.body.password){
    const username = req.body.username;
    const password = req.body.password;

    // usually this would be a database call:
    user = config.users[_.findIndex(config.users, {username: username})];
    if( !user ){
      return res.status(401).json({message:"no such user found"});
    }

    if(user.password === req.body.password) {
      // from now on we'll identify the user by the id and ttodoshe id is the only personalized value that goes into our token
      const payload = {id: user.id};
      const token = jwt.sign(payload, config.jwtOptions.secretOrKey);

      const response = {
        message: "ok",
        token: token
      };
      res.json(response);
    } else {
      res.status(401).json({message:"passwords did not match"});
    }

  }
}

module.exports = authController;
