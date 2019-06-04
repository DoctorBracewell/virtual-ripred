module.exports = {
	name: 'pickup',
	execute(message, args, Discord, randomBetween, randomColour) {
		const content = require("../json/content.json")
		message.reply(`\`\`\`${content.misc.pickups[randomBetween(0, content.misc.pickups.length - 1)]}\`\`\``);
	}
};