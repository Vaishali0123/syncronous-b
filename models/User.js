const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  organization: [String],
  email: String,
  username: String,
  jobrole: String,
  password: String,
  name: { type: String },
  orgid: [
    {
      type: ObjectId,
      ref: "Organization",
    },
  ],
  dp: { type: String },
  admin: Boolean,
  tasks: [{ type: ObjectId, ref: "Tasks" }],
  storage: [{ type: ObjectId, ref: "Storage" }],
  storageused: { type: Number }, //in Gbs
});

module.exports = mongoose.model("User", userSchema);
