const mongoose = require("mongoose");

const PollSchema = new mongoose.Schema({
  title: { type: String, required: true },
  options: [
    {
      text: { type: String, required: true },
      votes: { type: Number, default: 0 },
    },
  ],
  image: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  anonymous: { type: Boolean, default: false },
});

module.exports = mongoose.model("Poll", PollSchema);
