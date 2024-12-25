const mongoose = require("mongoose");

const connect = async () => {
  try {
    const { connection } = await mongoose.connect(
      `${process.env.DATABASE_URI}/${process.env.DATABASE_NAME}`
    );
    console.log(`✅ Database Connection Success : ${connection.host}`);
  } catch (error) {
    console.log(`❌ Database Connection Failed : ${error.message}`);
  }
};

module.exports = { connect };
