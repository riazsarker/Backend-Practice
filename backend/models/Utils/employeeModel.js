const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  userName: {
    type: String,
    required: [true, "Please Enter admin name"],
  },
  avatar: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Please Enter admin password"],
    select: false,
  },
  role: {
    type: String,
    default: "Admin",
  },
  sallary: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("employee", employeeSchema);
