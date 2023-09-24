const mongoose = require("mongoose");

const adminWithdrawSchema = new mongoose.Schema({
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

module.exports = mongoose.model("adminWithdraw", adminWithdrawSchema);
