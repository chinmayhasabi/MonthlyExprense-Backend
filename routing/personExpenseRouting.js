const expenseData = require('../schemas/ExpenseSchema.js');
const express = require('express');
const router = express.Router();


router.route('/getExpense/:id').get(async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Find the budget data for the specified user
      const expense = await expenseData.findOne({ user: userId });
  
      res.status(200).json({ data: expense });
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: 'Internal Server Error',error });
    }
  })
router.route('/addExpense').post(async (req,res)=>{
    try {
        const userexpense = await expenseData.findOne({user:req.body.user});
        if(!userexpense){
            const createUserExpense = await expenseData.create(req.body);
            return res.status(201).json({mssg:"Expense Added successfully",createUserExpense});
        }
        userexpeseexistingIndex = userexpense.Expenses.findIndex((items)=>
            items.month==req.body.Expenses[0].month && items.year==req.body.Expenses[0].year
        )
        if(userexpeseexistingIndex!=-1){
            // userexpense.Expenses[userexpeseexistingIndex] = req.body.Expenses[0];
            userexpense.Expenses[userexpeseexistingIndex].Data = [...userexpense.Expenses[userexpeseexistingIndex].Data,...req.body.Expenses[0].Data];
            const updateexpense = await userexpense.save();
            return res.status(202).json({mssg:'Expense updated successfully',updateexpense});
        }
        else{
            userexpense.Expenses.push(req.body.Expenses[0]);
            const saveExpense = await userexpense.save();
            return res.status(202).json({mssg:'Expense updated successfully',saveExpense});
        }
        } catch (error) {
            console.log(error);
      res.status(500).json({ mssg: 'Internal Server Error',error });
    }
});
module.exports = router;