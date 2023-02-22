const mongoose = require("mongoose");
require("dotenv").config();

const mongoConnect = async () => {
  mongoose.set("strictQuery", false);
  return mongoose.connect(
    "mongodb+srv://oleksandr482:oleksandrqwe@cluster0.39kpeak.mongodb.net/db-contacts?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
};

module.exports = { mongoConnect };
