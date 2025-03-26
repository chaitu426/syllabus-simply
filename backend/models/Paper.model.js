import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["mcq", "fillblanks", "truefalse", "matching", "longAnswer", "shortAnswer"],
    required: true,
    
  },
  options: {
    type: [String], // Used for MCQ, True/False, Matching
    validate: {
      validator: function (v) {
        if (this.type === "mcq") return v.length >= 2;
        if (this.type === "truefalse") return Array.isArray(v) && v.length === 2 && v.includes("True") && v.includes("False");
        if (this.type === "matching") return v.length % 2 === 0; // Matching must have even pairs
        return true; // Other question types don't require options
      },
      message: "Invalid options for the question type.",
    },
    default: function () {
      return this.type === "truefalse" ? ["true", "false"] : undefined; // Automatically set for True/False
    },
  },
  answer: {
    type: mongoose.Schema.Types.Mixed, // Can store String (MCQ, T/F, Fill in the Blank) or Array (Matching)
    required: true,
    validate: {
      validator: function (v) {
        if (this.type === "truefalse") return v === "True" || v === "False"; // Ensures answer is correct for True/False
        if (this.type === "matching") return Array.isArray(v) && v.every(pair => pair.key && pair.value);
        return typeof v === "string"; // Other types expect a string answer
      },
      message: "Invalid answer format for the question type.",
    },
  },
});

const QuestionPaperSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  generateQuestionPaper: {
    type: [QuestionSchema], // Array of questions
    validate: {
      validator: function (v) {
        return v.length > 0;
      },
      message: "Question paper must have at least one question.",
    },
  },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Creator (User) is required"],
    },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const QuestionPaper = mongoose.model("QuestionPaper", QuestionPaperSchema);
export default QuestionPaper;
