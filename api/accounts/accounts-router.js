const router = require('express').Router();
const Account = require('./accounts-model');

const {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId,
} = require('./accounts-middleware');

// [GET] /api/accounts
router.get('/', async (req, res, next) => {
  try {
    const accounts = await Account.getAll();
    res.json(accounts);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.post('/', (req, res, next) => {
  // DO YOUR MAGIC
});

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // DO YOUR MAGIC
});

module.exports = router;
