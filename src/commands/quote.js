module.exports = {
	name: 'quote',
	execute(message, args, Discord, randomBetween, randomColour) {
        const content = require("../json/content.json")
        switch (args[0]) {
            case "ripred":
              message.reply(`\`\`\`${content.quotes.ripred[randomBetween(0, content.quotes.ripred.length - 1)]}\`\`\``);
              break;
    
            case "gregor":
              message.reply(`\`\`\`${content.quotes.gregor[randomBetween(0, content.quotes.gregor.length - 1)]}\`\`\``);
              break;
    
            case "boots":
              message.reply(`\`\`\`${content.quotes.boots[randomBetween(0, content.quotes.boots.length - 1)]}\`\`\``);
              break;
            
            case "luxa":
              message.reply(`\`\`\`${content.quotes.luxa[randomBetween(0, content.quotes.luxa.length - 1)]}\`\`\``);
              break;
            
            case "general":
              message.reply(`\`\`\`${content.quotes.general[randomBetween(0, content.quotes.general.length - 1)]}\`\`\``);
              break;
            
            default:
              message.reply("Are you sure that's a real character?");
              break;
        }
	}
};