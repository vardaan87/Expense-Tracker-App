const express = require("express");
const cors = require("cors");
const { connectDb, sequelize } = require("./utils/db");
const expenseRouter = require("./route/expenseRoute.js");
const Expense = require("./model/expenseModel.js");

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.get("/", (req, res) => {
  res.send("<h1>Server is Running Good</h1>");
});

app.use("/expense", expenseRouter);

const startServer = async () => {
  try {
    await connectDb();
    await Expense.sync();

    app.listen(3000, () =>
      console.log("Server is running on http://localhost:3000/"),
    );
  } catch (error) {
    console.error(error);
  }
};

startServer();
