const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("workspace_db", "root", "Vardaan@870", {
  host: "localhost",
  dialect: "mysql",
});

const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
};

module.exports = { connectDb, sequelize };
