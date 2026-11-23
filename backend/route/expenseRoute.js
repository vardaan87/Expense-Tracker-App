const express = require("express");
const {
  addExpense,
  getAllExpenses,
  editExpense,
  getExpenseById,
  destroyExpense,
} = require("../controller/expenseController.js");

const router = express.Router();

router.post("/add", addExpense);
router.get("/", getAllExpenses);
router.get("/:id", getExpenseById);
router.put("/edit/:id", editExpense);
router.delete("/delete/:id", destroyExpense);

module.exports = router;
