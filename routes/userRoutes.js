const express = require("express");

const {getAllUsers,
     createUser,
     login,
     getUser,
} = require("../controllers/userDetailsControllers");

const router = express.Router()

router.route("/").get(getAllUsers)

router.route("/createusers").post(createUser);

router.route("/login").post(login);

router.route("/:id").get(getUser);

module.exports = router;