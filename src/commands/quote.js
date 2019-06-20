module.exports = {
  name: 'quote',
  description: "Provides a random quote from the specified character.",
  arguments: "ripred gregor boots luxa general",
	execute(message, args, Discord) {
    const content = require("../json/content.json"), random = require("drbracewell-random-tools")
    if (typeof(content.quotes[args[0]]) == 'undefined') {
      message.reply(`Hmm, I'm not sure I know them. Maybe Vikus knows?`);
    } else {
      message.reply(`\`\`\`${random.randomFromArray(content.quotes[args[0]])}\`\`\``);
    }  
	}
};