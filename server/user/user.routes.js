'use strict';

const { Router } = require("express");
const { auth } = require("./user.auth");
const { UserController } = require("./user.controller");

const UserRoutes = Router();

UserRoutes.get("/", auth, UserController.auth);
UserRoutes.post("/signup", UserController.signUp);
UserRoutes.post("/signin", UserController.signIn);
UserRoutes.delete("/signout", auth, UserController.signOut);

module.exports = { UserRoutes };