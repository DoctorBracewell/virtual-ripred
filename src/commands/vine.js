module.exports = {
	name: 'vine',
	description: "Provides a random TUC-Themed vine, **MAY CONTAIN PROFANITY**.",
    arguments: "",
	execute(message, args, Discord, randomBetween, randomColour) {
        const content = require("../json/content.json")
		message.reply(`\`\`\`${content.misc.vines[randomBetween(0, content.misc.vines.length - 1)]}\`\`\``);
	}
};