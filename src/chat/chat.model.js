const mongoose = require("mongoose");
let Schema = mongoose.Schema;

module.exports = (mongoose) => {
  const Chat = mongoose.model(
    "chats",
    mongoose.Schema(
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "users",
        },
        messages: {
          type: [
            {
              role: { type: String, require: true },
              timestamp: { type: Date, require: true },
              content: { type: String, require: true },
            },
          ],
        },
      },
      { timestamps: true }
    )
  );

  return Chat;
};
