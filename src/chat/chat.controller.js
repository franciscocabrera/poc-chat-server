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

    if (!user) return next(e404);

    res.json(chat);
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

exports.addMessage = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id || !req.body.userId || !req.body.message) return next(e400);

    const chat = await chatServices.getChat(id);

    if (!chat) return next(e404);

    const messages = [...chat.messages, req.body.message];

    const newChat = await chatServices.addMessage(id, messages);

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
