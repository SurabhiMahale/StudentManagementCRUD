// collegeController.js

import express from "express";
import College from "../models/College.js";

const router = express.Router();

router
  .route("/")
  .get(async (req,res) => {
    const data = await College.find()
    res.status(200).send({
      msg:data
    })
  })
  .post(async (req, res) => {
    try {
      const { name } = req.body;

      // Create a new college with the provided name
      await College.create({
        name,
      });

      res.status(200).send({
        msg: "College successfully added!",
      });
    } catch (e) {
      console.log("Error: ", e);
      res.status(400).send({
        msg: e.message,
      });
    }
  })
  .put(async (req, res) => {
    const { id, name } = req.body;
    try {
      // Find the college by ID and update its name
      const college = await College.findOneAndUpdate(
        { _id: id },
        { name },
        { new: true } // To get the updated college document
      );

      if (!college) {
        res.status(404).send({
          msg: "College not found!",
        });
        return;
      }

      res.status(200).send({
        msg: "College updated successfully!",
      });
    } catch (e) {
      console.log("Error: ", e);
      res.status(400).send({
        msg: e.message,
      });
    }
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.query;

      const result = await College.deleteOne({ _id: id });
      if (result.deletedCount > 0) {
        res.status(200).send({
          msg: "College data deleted successfully!",
        });
      } else {
        res.status(400).send({
          msg: "College data not deleted!",
        });
      }
    } catch (e) {
      console.log("Error: ", e);
      res.status(400).send({
        msg: e.message,
      });
    }
  });

export default router;
