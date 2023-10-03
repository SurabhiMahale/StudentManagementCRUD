import express from "express";
import Student from "../models/Student.js";

const router = express.Router();

router
  .route("/")
  .post(async (req, res) => {
    try {
      const { name, email, phone, age, address, college } = req.body;

      await Student.create({
        name,
        email,
        phone,
        age,
        address,
        college, // Assuming 'college' is the ID of the associated college
      });

      res.status(200).send({
        msg: "Student successfully added!",
      });
    } catch (e) {
      console.log("Error : ", e);
      res.status(400).send({
        msg: e.message,
      });
    }
  })
  .get(async (req, res) => {
    try {
      const students = await Student.find().populate("college"); // Populate 'college' field with 'collegeName'

      res.status(200).send(students);
    } catch (e) {
      console.log("Error : ", e);
      res.status(400).send({
        msg: e.message,
      });
    }
  })
  .put(async (req, res) => {
    const { name, email, age, phone, address, college } = req.body;
    try {
      const { id } = req.query;
      const student = await Student.findOne({
        _id: id,
      });
      if (name) {
        student.name = name;
      }
      if (address) {
        student.address = address;
      }
      if (email) {
        student.email = email;
      }
      if (age) {
        student.age = age;
      }
      if (phone) {
        student.phone = phone;
      }
      if (college) {
        student.college = college; // Assuming 'college' is the ID of the associated college
      }

      await student.save();
      res.status(200).send({
        msg: "Student updated successfully!",
      });
    } catch (e) {
      console.log("Error : ", e);
      res.status(400).send({
        msg: e.message,
      });
    }
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.query;

      const result = await Student.deleteOne({ _id: id });
      if (result.deletedCount > 0) {
        res.status(200).send({
          msg: "Student data deleted successfully!",
        });
      } else {
        res.status(400).send({
          msg: "Student data not deleted!",
        });
      }
    } catch (e) {
      console.log("Error : ", e);
      res.status(400).send({
        msg: e.message,
      });
    }
  });

export default router;
