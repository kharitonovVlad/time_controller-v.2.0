const Action = require("../models/Action");
const errorHandler = require("../utils/errorHandler");

module.exports.getAll = async function (req, res) {
	try {
		const actions = await Action.find({ user: req.user.id });
		res.status(200).json(actions);
	} catch (e) {
		errorHandler(res, e);
	}
};

module.exports.create = async function (req, res) {
	const candidate = await Action.findOne({ name: req.body.name, user: req.user.id });

	if (candidate) {
		res.status(409).json({
			message: "Занятие с таким названием уже существует.",
		});
	} else {
		const action = new Action({
			name: req.body.name,
			user: req.user.id,
		});

		try {
			await action.save();
			res.status(201).json(action);
		} catch (e) {
			errorHandler(res, e);
		}
	}
};

module.exports.delete = async function (req, res) {
	try {
		await Action.deleteOne({ _id: req.params.id });
		res.status(200).json({
			message: "Категория удалена.",
		});
	} catch (e) {
		errorHandler(res, e);
	}
};

module.exports.update = async function (req, res) {
	const updated = {
		name: req.body.name,
	};

	try {
		const action = await Action.findOneAndUpdate({ _id: req.params.id }, { $set: updated }, { new: true });
		res.status(200).json(action);
	} catch (e) {
		errorHandler(res, e);
	}
};
