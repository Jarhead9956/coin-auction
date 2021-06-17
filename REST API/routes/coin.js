const controllers = require('../controllers/');
const router = require('express').Router();
const { auth } = require('../utils');

router.get('/', controllers.coin.get.getAll);
router.get('/:id', controllers.coin.get.getOne)

router.post('/buy/:coinId', auth(), controllers.coin.post.buy)

router.post('/', auth() , controllers.coin.post.create);

router.put('/:id', controllers.coin.put);

router.delete('/:id', controllers.coin.delete);

module.exports = router;