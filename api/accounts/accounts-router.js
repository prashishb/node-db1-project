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

// [GET] /api/accounts/:id
router.get('/:id', checkAccountId, async (req, res) => {
  res.json(req.account);
});

// [POST] /api/accounts
router.post(
  '/',
  checkAccountPayload,
  checkAccountNameUnique,
  async (req, res, next) => {
    try {
      const newAccount = await Account.create({
        ...req.body,
        name: req.body.name.trim(),
      });
      res.status(201).json(newAccount);
    } catch (error) {
      next(error);
    }
  }
);

// [PUT] /api/accounts/:id
router.put(
  '/:id',
  checkAccountId,
  checkAccountPayload,
  async (req, res, next) => {
    try {
      const updatedAccount = await Account.updateById(req.account.id, req.body);
      res.json(updatedAccount);
    } catch (error) {
      next(error);
    }
  }
);

// [DELETE] /api/accounts/:id
router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    await Account.deleteById(req.params.id);
    res.json(req.account);
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
