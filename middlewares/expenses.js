module.exports = function (router) {

  router.use('/expenses/:expense_id', function (req, res, next) {

    if (req.method !== 'GET' && req.method !== 'DELETE' && req.method !== 'PUT')
      return res.status(405).send('Method Not Allowed');

    next();
  });

  router.use('/expenses', function (req, res, next) {

    if (req.method !== 'GET' && req.method !== 'POST')
      return res.status(405).send('Method Not Allowed');

    next();
  });

}