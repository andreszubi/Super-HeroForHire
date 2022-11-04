const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const clientSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    postalcode: {
      type: String,
      required: true
    },
    phone: {
      type: Number,
      required: true
    },

  }
);

const Client = model("Client", clientSchema);

module.exports = Client;
