module.exports = {
	name: 'pickup',
	description: "Provides a random TUC pickup line.",
    arguments: "",
	execute(message, args, Discord, randomBetween, randomColour) {
		const content = require("../json/content.json")
		message.reply(`\`\`\`${content.misc.pickups[randomBetween(0, content.misc.pickups.length - 1)]}\`\`\``);
	}
};