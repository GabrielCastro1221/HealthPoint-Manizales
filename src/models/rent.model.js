const { Schema, model } = require("mongoose");

const schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  dimension: { type: String, required: true },
  img: { type: String, required: true },
  photo: [{ type: String }],
  owner: { type: String, required: true },
  owner_phone: { type: String, required: true },
  owner_email: { type: String, required: true },
  address: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  isApproved: {
    type: String,
    enum: ["pending", "approved", "cancelled"],
    default: "pending",
  },
  status: {
    type: String,
    enum: ["alquilado", "disponible"],
    default: "disponible",
  },
});

module.exports = model("rent", schema);
