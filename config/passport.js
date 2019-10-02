"use strict";

let _ = require('lodash');
let passportJWT = require('passport-jwt');

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

let users = [
  {
    "id": 1,
    "username": "nortal",
    "password": "nortal"
  }
];

const jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'nortal-todo';

const strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
  console.log('payload received ', jwt_payload);

  const user = users[_.findIndex(users, {id: jwt_payload.id})];

  if(user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

module.exports = {
  strategy: strategy,
  jwtOptions: jwtOptions,
  users: users
};