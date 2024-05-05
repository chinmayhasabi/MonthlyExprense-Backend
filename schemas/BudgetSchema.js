const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Person',
      required: false,
    },
    Budgets: [
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
const budgetData = mongoose.model("PersonBudget", budgetSchema);
module.exports = budgetData;