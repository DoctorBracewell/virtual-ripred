module.exports = {
	name: 'pickup',
	description: "Provides a random TUC pickup line.",
    arguments: "",
	execute(message, args, Discord) {
		const content = require("../json/content.json"), random = require("drbracewell-random-tools")
		message.reply(`\`\`\`${random.randomFromArray(content.misc.pickups)}\`\`\``);
	}
};