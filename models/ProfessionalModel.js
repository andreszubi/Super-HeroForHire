const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const proSchema = new Schema(
  {
    name: {
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
      type: String,
      required: true
    },
    services: {
        type: String,
        required: true
    },
    specialties: {
        type: String,
        required: true
    }

  }
);

const Professional = model("User", proSchema);

module.exports = Professional;