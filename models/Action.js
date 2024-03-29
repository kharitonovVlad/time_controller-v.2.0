const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const actionSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	user: {
		ref: "users",
		type: Schema.Types.ObjectId,
	},
});

module.exports = mongoose.model("actions", actionSchema);
