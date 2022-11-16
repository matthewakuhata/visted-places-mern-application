const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("getplaces");
  res.json({ message: "works" });
});

module.exports = router;
