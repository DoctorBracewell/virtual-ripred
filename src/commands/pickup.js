module.exports = {
	name: 'pickup',
	description: "Provides a random TUC pickup line.",
    arguments: "",
	execute(message, args, Discord) {
		const content = require("../json/content.json"), random = require("drbracewell-random-tools")
		message.reply(`\`\`\`${content.misc.pickups[random.randomBetween(0, content.misc.pickups.length - 1)]}\`\`\``);
	}
};