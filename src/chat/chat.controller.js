const chatServices = require("./chat.service");
const { e400, e404, e500 } = require("../_constants/errors");

exports.getUserChats = async (req, res, next) => {
  try {
    if (!req.query.userId) return next(e400);

    const chats = await chatServices.getUserChats(req.query.userId);

    res.json(chats);
  } catch (error) {
    next({ ...e500, message: error.message || error });
  }
};

exports.getChat = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) return next(e400);

    const chat = await chatServices.getChat(id);

    if (!chat) return next(e404);

    res.json(chat);
  } catch (error) {
    next({ ...e500, message: error.message || error });
  }
};

exports.createChat = async (req, res, next) => {
  try {
    if (
      !req.body.userId ||
      !req.body.messages ||
      req.body.messages.length == 0
    ) return next(e400);

    const chats = await chatServices.createChat(req.body.userId, req.body.messages);
    res.json(chats);
  } catch (error) {
    next({ ...e500, message: error.message || error });
  }
};

exports.updateChat = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id || !req.body.userId || !req.body.messages) return next(e400);

    const chat = await chatServices.updateChat(id, req.body);

    if (!chat) return next(e404);
    res.json(chat);
  } catch (error) {
    next({ ...e500, message: error.message || error });
  }
};

exports.addMessage = async (req, res, next) => {
  try {

    const id = req.params.id;
    if (!id) return next({ ...e400, message: "Id is missing" });

    const message = req.body.message
    if (!message) return next({ ...e400, message: "Some params in the body are missing" });

    const newChat = await chatServices.addMessage(id, message);
    if (!newChat) return next(e404);

    res.json(newChat);
  } catch (error) {
    next({ ...e500, message: error.message || error });
  }
};

exports.deleteChat = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) return next(e400);

    const chat = await chatServices.deleteChat(id);

    if (!chat) return next(e404);

    res.json(chat);
  } catch (error) {
    next({ ...e500, message: error.message || error });
  }
};
