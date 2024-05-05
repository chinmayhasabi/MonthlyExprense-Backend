const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Person',
      required: false,
    },
    Expenses: [
      {
        month: {
          type: String,
        },
        year: {
          type: Number,
        },
        Data: [
          {
            category: {
              type: String,
            },
            amount: {
              type: String,
            },
          },
        ],
      },
    ],
  });
const expenseData = mongoose.model("ExpenseData", expenseSchema);
module.exports = expenseData;