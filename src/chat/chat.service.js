const db = require("../_db");
const Chat = db.Chat;

exports.getUserChats = async (userId) => {
  return await Chat.find({ userId: userId });
};

exports.getChat = async (_id) => {
  return await Chat.findById(_id);
};

exports.createChat = async (userId, messages) => {
  const chat = new Chat({
    userId: userId,
    messages: messages,
  });
  return await chat.save(chat);
};

exports.updateChat = async (_id, body) => {
  return await Chat.findOneAndUpdate({ _id }, body, { new: true });
};

exports.addMessage = async (_id, messages) => {
  return await Chat.findOneAndUpdate({ _id }, { messages: messages });
};

exports.deleteChat = async (_id) => {
  return await Chat.findOneAndDelete({ _id });
};
