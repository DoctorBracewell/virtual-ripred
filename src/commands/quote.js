module.exports = {
  name: 'quote',
  description: "Provides a random quote from the specified character.",
  arguments: "ripred gregor boots luxa general",
	execute(message, args, Discord) {
        const content = require("../json/content.json"), random = require("drbracewell-random-tools")
        switch (args[0]) {
            case "ripred":
              message.reply(`\`\`\`${content.quotes.ripred[random.randomBetween(0, content.quotes.ripred.length - 1)]}\`\`\``);
              break;
    
            case "gregor":
              message.reply(`\`\`\`${content.quotes.gregor[random.randomBetween(0, content.quotes.gregor.length - 1)]}\`\`\``);
              break;
    
            case "boots":
              message.reply(`\`\`\`${content.quotes.boots[random.randomBetween(0, content.quotes.boots.length - 1)]}\`\`\``);
              break;
            
            case "luxa":
              message.reply(`\`\`\`${content.quotes.luxa[random.randomBetween(0, content.quotes.luxa.length - 1)]}\`\`\``);
              break;
            
            case "general":
              message.reply(`\`\`\`${content.quotes.general[random.randomBetween(0, content.quotes.general.length - 1)]}\`\`\``);
              break;
            
            default:
              message.reply("Are you sure that's a real character?");
              break;
        }
	}
};