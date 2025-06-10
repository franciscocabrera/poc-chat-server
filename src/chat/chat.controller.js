const chatServices = require("./chat.service");
const { e400, e404, e500 } = require("../_constants/errors");

exports.getUserChats = async (req, res, next) => {
  try {
    if (!req.userId) return next(e400);

    const chats = await chatServices.getUserChats(req.userId);

    if (!chats) return next(e404);

    res.json(chats);
  } catch (error) {
    next({ ...e500, message: error.message || error });
  }
};

exports.createChat = async (req, res, next) => {
  try {
    if (!req.userId) return next(e400);

    const chats = await chatServices.createChat(req.userId);
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
