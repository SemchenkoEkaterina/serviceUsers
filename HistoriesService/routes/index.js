const Router = require('express');

const router = new Router();
const historiesRouter = require('./historiesRouter');

router.use('/histories', historiesRouter);

module.exports = router;