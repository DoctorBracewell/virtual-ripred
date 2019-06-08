module.exports = {
  name: 'quote',
  description: "Provides a random quote from the specified character.",
  arguments: "ripred gregor boots luxa general",
	execute(message, args, Discord) {
        const content = require("../json/content.json"), random = require("drbracewell-random-tools")
        switch (args[0]) {
            case "ripred":
              message.reply(`\`\`\`${random.randomFromArray(content.quotes.ripred)}\`\`\``);
              break;
    
            case "gregor":
              message.reply(`\`\`\`${random.randomFromArray(content.quotes.gregor)}\`\`\``);
              break;
    
            case "boots":
              message.reply(`\`\`\`${random.randomFromArray(content.quotes.boots)}\`\`\``);
              break;
            
            case "luxa":
              message.reply(`\`\`\`${random.randomFromArray(content.quotes.luxa)}\`\`\``);
              break;
            
            case "general":
              message.reply(`\`\`\`${random.randomFromArray(content.quotes.general)}\`\`\``);
              break;
            
            default:
              message.reply("Are you sure that's a real character?");
              break;
        }
	}
};