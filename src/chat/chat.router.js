const express = require("express");

const {
  getUserChats,
  getChat,
  createChat,
  updateChat,
  deleteChat,
  addMessage,
} = require("./chat.controller");

const router = express.Router();

router.get("/", getUserChats);

router.get("/:id", getChat);

router.post("/", createChat);

router.put("/:id", updateChat);

router.delete("/:id", deleteChat);

router.post("/:id/message", addMessage);

module.exports = router;
