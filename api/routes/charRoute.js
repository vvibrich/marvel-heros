const express = require('express');

const charController = require('../controllers/charController.js');

const router = express.Router();

router.route('/')
  .get(charController.findHeros)

router.route('/:name')
  .get(charController.findStories)

module.exports = router;
