const Router = require('express');

const router = new Router();
const userRouter = require('./userRouter');
const historiesRouter = require('./historiesRouter');

router.use('/user', userRouter);
router.use('/histories', historiesRouter);

module.exports = router;