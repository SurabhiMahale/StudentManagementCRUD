import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model("College", collegeSchema);
