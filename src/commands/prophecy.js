module.exports = {
  name: 'prophecy',
  description: "Provides the specified prophecy",
  arguments: "gray bane blood secrets time peacemaker",
	execute(message, args, Discord) {
        const content = require("../json/content.json")
        switch (args[0]) {
            case "gray":
              message.reply(`\`\`\`${content.misc.prophecies.gray}\`\`\``);
              break;
    
            case "bane":
              message.reply(`\`\`\`${content.misc.prophecies.bane}\`\`\``);
              break;
    
            case "blood":
              message.reply(`\`\`\`${content.misc.prophecies.blood}\`\`\``);
              break;
            
            case "secrets":
              message.reply(`\`\`\`${content.misc.prophecies.secrets}\`\`\``);
              break;
    
            case "time":
              message.reply(`\`\`\`${content.misc.prophecies.time}\`\`\``);
              break;
            
            case "peacemaker":
              message.reply(`\`\`\`${content.misc.prophecies.peacemaker}\`\`\``);
              break;
    
            default:
              message.reply("Uh oh, I don't know that one. Perhaps you should try asking Nerissa?");
              break;
          }
	}
};