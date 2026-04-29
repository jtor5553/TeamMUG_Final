const express = require("express");
const router = express.Router();
const Assignment = require("../models/Assignment");

router.get("/", async (req, res) => {
    const assignments = await Assignment.find();
    res.json(assignments);
});

router.post("/", async (req, res) => {
    const assignment = new Assignment(req.body);
    await assignment.save();
    res.json(assignment);
});

router.put("/:id", async (req, res) => {
    const updatedAssignment = await Assignment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(updatedAssignment);
});

router.delete("/:id", async (req, res) => {
    await Assignment.findByIdAndDelete(req.params.id);
    res.json({ message: "Assignment deleted" });
});

module.exports = router;