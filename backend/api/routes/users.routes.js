const express = require("express");

const router = express.Router();
const DUMMY_USERS = [
  {
    id: "u1",
    name: "Max Schwarz",
    image:
      "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    places: 3,
  },
];

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  const user = DUMMY_USERS.find((p) => p.id === id);

  res.status(200).json({ ...user });
});

module.exports = router;
