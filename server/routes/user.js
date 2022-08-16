const express = require('express');
const router = express.Router();
const user = require('../controllers/user');

router
  .post('/', user.createUser)
  .delete('/:id', user.deleteUser)
  .post('/deleteMany', user.deleteMany);

module.exports = router;
