const Expense = require("../model/expenseModel.js");

const addExpense = async (req, res) => {
  try {
    const { amount, description, category } = req.body;

    const expense = await Expense.create({
      amount,
      description,
      category,
    });

    res
      .status(201)
      .json({ message: `Expense added for ${category} category`, expense });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editExpense = async (req, res) => {
  try {
    const { amount, description, category } = req.body;
    const { id } = req.params;
    const [updatedRows] = await Expense.update(
      {
        amount,
        description,
        category,
      },
      {
        where: {
          id: id,
        },
      },
    );

    if (updatedRows === 0) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Expense updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const destroyExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRows = await Expense.destroy({
      where: {
        id: id,
      },
    });

    if (deletedRows === 0) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addExpense,
  getAllExpenses,
  getExpenseById,
  editExpense,
  destroyExpense,
};
