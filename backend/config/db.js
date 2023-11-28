const mongoose = require("mongoose");

const connection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("Server connected to DB");
  } catch (error) {
    console.log("Server cannot connect to database");
    process.exit(1);
  }
};

module.exports = connection;
