let _ = require('lodash');
let helper = require('../helper');

let todos = [];

const todoController = {
  getAll: getAll,
  getById: getById,
  search: search,
  create: create,
  update: update,
  remove: remove,
  toggleDone: toggleDone
};

function getAll(req, res) {
  res.status(200).json(todos);
}

function getById(req, res) {
  const id = +req.params.id;
  const todo = todos[_.findIndex(todos, {id: id})];

  if (todo) {
    res.status(200).json(todo);
  } else {
    res.status(404).json({msg: 'Todo not found.'});
  }
}

function search(req, res) {
  const text = req.query.text;

  const result = todos.filter(todo => todo.text.includes(text));

  res.status(200).json(result);
}

function create(req, res) {
  const modelProperties = ['text', 'done'];
  const todo = req.body;

  if (helper.validateModelStructure(todo, modelProperties)) {
    todo.id = helper.generateUniqueId();

    todos.push(todo);
    res.status(200).json({msg: 'Successfully added todo.'});
  } else {
    res.status(400).json({msg: 'Bad request'});
  }
}

function update(req, res) {
  const modelProperties = ['id', 'text', 'done'];

  if (helper.validateModelStructure(req.body, modelProperties)) {
    const id = +req.body.id;
    const index = _.findIndex(todos, {id: id});

    if (index !== undefined) {
      todos[index] = req.body;
      res.status(200).json(todos[index]);
    } else {
      res.status(404).json({msg: 'Todo not found'});
    }
  } else {
    res.status(400).json({msg: 'Bad request'});
  }

}

function remove(req, res) {
  const id = +req.params.id;
  const index = _.findIndex(todos, {id: id});

  if (index !== undefined) {
    todos.splice(index, 1);
    res.status(200).json(todos);
  } else {
    res.status(404).json({msg: 'Todo not found'});
  }
}

function toggleDone(req, res) {
  const id = +req.params.id;
  const index = _.findIndex(todos, {id: id});

  if (index !== undefined) {
    todos[index].done = !todos[index].done;
    res.status(200).json(todos[index]);
  } else {
    res.status(404).json({msg: 'Todo not found'});
  }

}



module.exports = todoController;