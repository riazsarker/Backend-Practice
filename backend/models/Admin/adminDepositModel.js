const mongoose = require("mongoose");

const adminDepositSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
  },
  amount: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("adminDeposit", adminDepositSchema);
