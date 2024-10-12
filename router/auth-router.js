// express router
// class to create modular ,mountable route handler.  A router instance is a complete middleware and routing system for this reason, it  is often referred to as a mini app
const express = require("express");
const router = express.Router();
const authcontrollers = require("../controllers/auth-controller");
router.get("/", authcontrollers.home);
router.post("/register", authcontrollers.register);
module.exports = router;
