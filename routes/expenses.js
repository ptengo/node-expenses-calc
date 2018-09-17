var l = require('debug')('expcalc:routes:expenses');

module.exports = function (router) {
  var Expense = require('../models/Expense');

  router.route('/expenses')
    .post(function (req, res, next) {
      l('New Turn registration');
      var expense = new Expense();
      var missingPropsLocale = 'Missing props: ';
      var missingProps = [];

      if (req.body.description) {
        expense.description = req.body.description;
      }

      if (req.body.name) {
        expense.name = req.body.name;
      } else {
        missingProps.push('name');
      }

      if (req.body.amount) {
        expense.amount = req.body.amount;
      } else {
        missingProps.push('amount');
      }

      if (missingProps.length > 0) {
        return next({ message: missingPropsLocale.concat(missingProps) })
      }

      expense.save(function (err) {
        if (err) {
          l('Expense creation failed %s', err);
          next(err);
        }
        res.json(expense);
      });
    })
    .get(function (req, res, next) {
      l('GET /expenses (get list of outgoings)')
      Expense.find(function (err, expenses) {
        if (err) {
          l('Expense find failed: %s', err);
          next(err);
        }

        res.json(expenses);
      });
    });

  router.route('/expenses/:expense_id')
    .get(function (req, res, next) {
      var id = req.params.expense_id;
      l('GET /expense/%s', id);
      Expense.findById(id, function (err, expense) {
        if (err) {
          l('Expense with id %s not found', req.params.expense_id, err);
          next(err);
          // return res.send(err);
        }

        res.json(expense);
      });
    })
    .delete(function (req, res, next) {
      var id = req.params.expense_id;
      l('DELETE /expenses/%s', id)
      Expense.remove({
        _id: id
      }, function (err, expense) {
        if (err) {
          l('Expense removal failed id: %s', id, err)
          next(err);
          // return res.send(err);
        }

        l('Expense successfully removed (%s)', id);
        res.json({ message: 'Successfully deleted' });
      });
    })
    .put(function (req, res, next) {
      var id = req.params.expense_id;
      l('PUT /expenses/%s', id)
      Expense.remove({
        _id: id
      }, function (err, expense) {
        if (err) {
          l('Expense removal failed id: %s', id, err)
          next(err);
          // return res.send(err);
        }

        l('Expense successfully removed (%s)', id);
        res.json({ message: 'Successfully deleted' });
      });
    })
}