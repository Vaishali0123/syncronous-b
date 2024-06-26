const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const teamSchema = new mongoose.Schema({
	admin: { type: ObjectId, ref: "User" },
	email: { type: String, required: true },
	code: { type: String },
	teamname: String,
	members: Number,
	orgname: String,
});
module.exports = mongoose.model("team", teamSchema);
