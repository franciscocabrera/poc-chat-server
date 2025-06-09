module.exports = (mongoose) => {
  const Chat = mongoose.model(
    "chats",
    mongoose.Schema({
      userId: {
        type: Number,
      },
      messages: {
        type: [
          {
            role: { type: String },
            timestamp: { type: String },
            message: { type: String },
          },
        ],
      },
    })
  );

  return Chat;
};
