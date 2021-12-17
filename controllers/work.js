const moment = require("moment");
const Work = require("../models/Work");
const errorHandler = require("../utils/errorHandler");

module.exports.getAll = async function (req, res) {
	try {
		const works = await Work.find({ user: req.user.id, date: moment().utc().format("YYYY-MM-DD") });
		res.status(200).json(works);
	} catch (e) {
		errorHandler(res, e);
	}
};

module.exports.create = async function (req, res) {
	const startTime = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 8);
	const lastWork = await Work.find({ user: req.user.id, date: moment().utc().format() });
	const work = new Work({
		from: lastWork.length > 0 ? lastWork[lastWork.length - 1].to : moment(startTime).utc().format(),
		to: req.body.to,
		date: moment().utc().format("YYYY-MM-DD"),
		action: req.body.actionId,
		user: req.user.id,
	});
	try {
		await work.save();
		res.status(201).json(work);
	} catch (e) {
		errorHandler(res, e);
	}
};

module.exports.delete = async function (req, res) {
	try {
		await Work.deleteOne({ _id: req.params.id });
		res.status(200).json({
			message: "Занятие удалено.",
		});
	} catch (e) {
		errorHandler(res, e);
	}
};

module.exports.update = async function (req, res) {
	try {
		const candidate = await Work.findById({ _id: req.params.id });
		const updated = {
			action: req.body.actionId,
			to: req.body.to ? req.body.to : candidate.to,
		};
		const work = await Work.findOneAndUpdate({ _id: req.params.id }, { $set: updated }, { new: true });
		res.status(200).json(work);
	} catch (e) {
		errorHandler(res, e);
	}
};
