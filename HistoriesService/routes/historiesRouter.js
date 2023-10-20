const Router = require('express');

const router = new Router();

const historiesController = require('../controllers/historiesController');

router.get('/', historiesController.getAll);
router.post('/', historiesController.create);

module.exports = router;