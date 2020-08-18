const mongoose = require("mongoose");
const permDB = require("./models/permissions.js");
var mongoURL;


class DiscordPermissions {

	constructor(props = {}) {
		if (!props.database) throw new TypeError("please specify a database")

		this.setmongoURL(props.database)
	}

	/**
	 * @param {string} [url] - Your mongodb database url
	 */

	static async setmongoURL(url) {
		if (!url) throw new TypeError("No database URL was specified.");
		mongoURL = url;
		return mongoose.connect(url, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
	}

	/**
	 * @param {string} [userId] - ID of the discord user.
	 * @param {string} [guildID] - Discord guild id.
	 */

	static async createUser(userID, guildID) {
		if (!userID) throw new TypeError("No user id was specified.");
		if (!guildID) throw new TypeError("No guild id was specified.");

		const isUser = await permDB.findOne({
			userID: userID,
			guildID: guildID
		});
		if (isUser) return false;

		const newUser = new permDB({
			userID: userID,
			guildID: guildID
		});

		await newUser.save().catch(e => console.log(`Error creating a user in the database: ${e}`));
		return newUser;
	}

	/**
	 * @param {string} [userID] - ID of the discord user.
	 * @param {string} [guildID] - Discord guild id.
	 */

	static async deleteUser(userID, guildID) {
		if (!userID) throw new TypeError("No user id was specified.");
		if (!guildID) throw new TypeError("No guild id was specified.");

		const user = await permDB.findOne({
			userID: userID,
			guildID: guildID
		});
		if (!user) return false;

		await permDB.findOneAndDelete({
			userID: userID,
			guildID: guildID
		}).catch(e => console.log(`Error deleting a user in the database: ${e}`));

		return user;
	}

	/**
	* @param {string} [userID] - Discord user id.
	* @param {string} [guildID] - Discord guild id.
	* @param {string} [permission] - The permission which you want add
	*/

	static async addPermission(userID, guildID, permission) {
		if (!userID) throw new TypeError("No user id was specified.");
		if (!guildID) throw new TypeError("No guild id was specified.");
		if (!permission) throw new TypeError("No permission was specified.");

		const user = await permDB.findOne({
			userID: userID,
			guildID: guildID
		});

		if (!user) {
			const permArray = user.permissions || [];
			permArray.push(permission)
			const newUser = new permDB({
				userID: userId,
				guildID: guildId,
				permission: permArray
			});

			await newUser.save().catch(e => console.log(`Error at saving a user in the database: ${e}`));
			return newUser;
		};
		const permArray2 = user.permissions || [];
		permArray2.push(permission)
		await user.save().catch(e => console.log(` ${e}`));
		return user.permissions;
	}

	/**
	* @param {string} [userID] - Discord user id.
	* @param {string} [guildID] - Discord guild id.
	* @param {string} [permission] - The permission which you want remove
	*/

	static async removePermission(userID, guildID, permission) {
		if (!userID) throw new TypeError("No user id was specified.");
		if (!guildID) throw new TypeError("No guild id was specified.");
		if (!permission) throw new TypeError("No permission was specified.");

		return await permDB.updateOne({ userID, guildID }, { $pull: { 'permissions': permission } }, { upsert: true }).catch(e => console.log(`${e}`));
	}

	/**
	* @param {string} [userID] - Discord user id.
	* @param {string} [guildID] - Discord guild id.
	* @param {string} [permission] - The permission which you want remove
	*/

	static async hasPermission(userID, guildID, permission) {
		if (!userID) throw new TypeError("No user id was specified.");
		if (!guildID) throw new TypeError("No guild id was specified.");
		if (!permission) throw new TypeError("No permission was specified.");

		const user = await permDB.findOne({
			userID: userID,
			guildID: guildID
		});

		const permArray = user.permissions || [];
		if (!user) {
			const newUser = new permDB({
				userID: userId,
				guildID: guildId,
				permission: permArray
			});

			await newUser.save().catch(e => console.log(`Error at saving a user in the database: ${e}`));
			return newUser;
		};

		return await permArray.includes(permission);
	}

	/**
	 * @param {string} [userId] - Discord user id.
	 * @param {string} [guildId] - Discord guild id.
	 */

	static async fetchGuildUser(userId, guildId) {
		if (!userId) throw new TypeError("An user id was not provided.");
		if (!guildId) throw new TypeError("A guild id was not provided.");

		const user = await permDB.findOne({
			userID: userId,
			guildID: guildId
		});
		if (!user) return false;
		return user;
	}

}

module.exports = DiscordPermissions;
