const { mongoose } = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const messageModel = mongoose.model("messageModel", messageSchema);

module.exports = messageModel;
