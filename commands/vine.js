module.exports = {
	name: 'vine',
	execute(message, args, Discord, randomBetween, randomColour) {
        const content = require("../json/content.json")
		message.reply(`\`\`\`${content.misc.vines[randomBetween(0, content.misc.vines.length - 1)]}\`\`\``);
	}
};