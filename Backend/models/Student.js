import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    //required: true,
    lowercase: true,
  },
  phone: {
    type: Number,
    required: true,
    validate: {
      validator: function (val) {
        return val.toString().length === 10;
      },
      message: (val) => `${val.value} has to be 10 digits`,
    },
  },
  age: {
    type: Number,
    // required:true,
    min: 18,
  },
  created: {
    type: Date,
    // required: true,
    default: () => new Date().getTime(),
    immutable: true,
  },
  address: {
    type: String,
    // required:true,
    
  },
});
export default mongoose.model("Student", studentSchema);
