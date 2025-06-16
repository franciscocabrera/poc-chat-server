const express = require("express");

const {
  getUserChats,
  getChat,
  createChat,
  updateChat,
  deleteChat,
} = require("./chat.controller");

const router = express.Router();

router.get("/", getUserChats);

router.get("/:id", getChat);

router.post("/", createChat);

router.put("/:id", updateChat);

router.delete("/:id", deleteChat);

module.exports = router;
