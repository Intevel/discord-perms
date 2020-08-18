const mongoose = require("mongoose");

const PermissionModel = new mongoose.Schema({
	userID: String,
	guildID: String,
	permissions: Array
});

module.exports = mongoose.model('permissions', PermissionModel);