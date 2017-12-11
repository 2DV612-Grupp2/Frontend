const controller = require('./controller');
const Router = require('express').Router;
const router = new Router();

router.route('/')
  .get((...args) => controller.find(...args))
  .post((...args) => controller.createThread(...args));

router.route('/:id')
  .get((...args) => controller.findById(...args));

module.exports = router;
