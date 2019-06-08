module.exports = {
	name: 'vine',
	description: "Provides a random TUC-Themed vine, **MAY CONTAIN PROFANITY**.",
    arguments: "",
	execute(message, args, Discord) {
        const content = require("../json/content.json"), random = require("drbracewell-random-tools")
		message.reply(`\`\`\`${random.randomFromArray(content.misc.vines)}\`\`\``);
	}
};