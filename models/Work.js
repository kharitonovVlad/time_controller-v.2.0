const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workSchema = new Schema({
	from: {
		type: Date,
		required: true,
	},
	to: {
		type: Date,
		required: true,
	},
	action: {
		ref: "actions",
		type: Schema.Types.ObjectId,
	},
});

module.exports = mongoose.model("works", workSchema);
