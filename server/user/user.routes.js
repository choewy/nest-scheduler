'use strict';

const { Router } = require("express");
const { auth } = require("./user.auth");
const { UserController } = require("./user.controller");

const UserRoutes = Router();
const userController = new UserController();

UserRoutes.get("/", auth, userController.auth);
UserRoutes.post("/signup", userController.signUp);
UserRoutes.post("/signin", userController.signIn);
UserRoutes.delete("/signout", auth, userController.signOut);

module.exports = { UserRoutes };