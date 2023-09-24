const app = require("./app");
const dotenv = require("dotenv");
const conncetDatabase = require("./backend/config/database");


//DOT ENV
dotenv.config({ path: "./backend/config/config.env" });

//Database Connection
conncetDatabase();



// Server Run
app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

//Unhandled Promise Rejection Error
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to Unhandled Promise Rejection");
  process.exit(1);
});

//Uncaught Error
process.on("uncaughtException", (err, req, res) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to Unhandled Promise Rejection");
  process.exit(1);
});