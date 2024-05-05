const budgetData = require('../schemas/BudgetSchema.js');
const express = require('express');
const router = express.Router();


router.route('/getBudget/:id').get(async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Find the budget data for the specified user
      const budget = await budgetData.findOne({ user: userId });
  
      res.status(200).json({ data: budget });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error',error });
    }
  })
router.route('/addBudget').post(async (req,res)=>{
    try {
        const userbudget = await budgetData.findOne({user:req.body.user});
        if(!userbudget){
            const createUserBudget = await budgetData.create(req.body);
            return res.status(201).json({mssg:"Budget Added successfully",createUserBudget});
        }
        userbudgetexistingIndex = userbudget.Budgets.findIndex((items)=>
            items.month==req.body.Budgets[0].month && items.year==req.body.Budgets[0].year
        )
        if(userbudgetexistingIndex!=-1){
            console.log("in");
            // userbudget.Budgets[userbudgetexistingIndex] = req.body.Budgets[0];
            userbudget.Budgets[userbudgetexistingIndex].Data = [...userbudget.Budgets[userbudgetexistingIndex].Data,...req.body.Budgets[0].Data];
            const updatebudget = await userbudget.save();
            return res.status(202).json({mssg:'Budget updated successfully',updatebudget});
        }
        else{
            console.log("out");
            userbudget.Budgets.push(req.body.Budgets[0]);
            const savebudget = await userbudget.save();
            return res.status(202).json({mssg:'Budget updated successfully',savebudget});
        }
        } catch (error) {
      res.status(500).json({ mssg: 'Internal Server Error',error });
    }
});
module.exports = router;