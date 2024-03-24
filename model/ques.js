const mongoose = require("mongoose");
const { Schema } = mongoose;

/** question model */
const question = new Schema({
  topic: { type: String, required: true },
  questions: [
    {
      ques: {
        type: String,
      },
      options:{
        type:[String]
      },
      result: {
        type: String,
      },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Question", question);
