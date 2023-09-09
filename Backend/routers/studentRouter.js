import express from "express";
import Student from "../models/Student.js";

const router = express.Router();

router
  .route("/")
  .post(async (req, res) => {
    try {
      const { name, email, phone, age } = req.body;

      await Student.create({
        name,
        email,
        phone,
        age,
        address,
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
      const students = await Student.find({});
      res.status(200).send(students);
    } catch (e) {
      console.log("Error : ", e);
      res.status(400).send({
        msg: e.message,
      });
    }
  })
  .put(async (req, res) => {
    const { name, email, age, phone , address} = req.body;
    try {
      const { id } = req.query;
      const student = await Student.findOne({
        _id: id,
      });
      if (name) {
        student.name = name;
      } else {
        student.name = undefined;
      }
      if (address) {
        student.address = address;
      } else {
        student.address = undefined;
      }


      if (email) {
        student.email = email;
      } else {
        student.email = undefined;
      }
      if (age) {
        student.age = age;
      } else {
        student.age = undefined;
      }

      if (phone) {
        student.phone = phone;
      } else {
        student.phone = phone;
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
          msg: "Student data deleted succesfully!",
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
