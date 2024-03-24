const express = require("express");
const app = express();
const port = 3000;

const User = require("./routes/User-routes.js");
const Quiz = require("./routes/Quiz-routes.js")
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mongoose = require("mongoose");

app.use(cors());

// Mount ToDo routes

app.use("/api/user", User);
app.use("/api/quiz",Quiz)

async function main() {
  await mongoose.connect(
    "mongodb+srv://chayachugh9:zXces4uVyBgRFlny@quiz-app.wvo6wqr.mongodb.net/mydb"
  );
  console.log("Successfully connected to the database");
}

main().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});

