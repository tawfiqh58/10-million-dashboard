const express = require('express');
const router = express.Router();
const fakerController = require('../controllers/faker');

router
  .post('/generate', fakerController.generateFakeUser)
  .post('/clean', fakerController.clearDatabase);

module.exports = router;
