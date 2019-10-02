"use strict";

let FlakeIdGen = require('flake-idgen');
let intformat = require('biguint-format');
let generator = new FlakeIdGen();


const helper = {
  generateUniqueId: generateUniqueId,
  validateModelStructure: validateModelStructure
}


function validateModelStructure(model, properties) {
  return properties.every(prop => model.hasOwnProperty(prop));
}

function generateUniqueId() {
  const id1 = generator.next();

  return +intformat(id1, 'dec');
}



module.exports = helper;