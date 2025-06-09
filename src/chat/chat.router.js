const express = require("express");

const {
  getUserChats,
  createChat,
  updateChat,
  deleteChat,
} = require("./chat.controller");

const router = express.Router();

router.get("/", getUserChats);

router.post("/", createChat);

router.put("/:id", updateChat);

router.delete("/:id", deleteChat);

module.exports = router;
