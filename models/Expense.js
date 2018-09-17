var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ExpenseSchema   = new Schema({
    name: String,
    description: String,
    date_creation: { type: Date, default: Date.now },
    // Check if decimal is allowed
    amount: { type: Number, min: 0.1 }
});

module.exports = mongoose.model('Expense', ExpenseSchema);