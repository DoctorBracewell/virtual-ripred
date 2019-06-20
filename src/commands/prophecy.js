module.exports = {
  name: 'prophecy',
  description: "Provides the specified prophecy",
  arguments: "gray bane blood secrets time peacemaker",
	execute(message, args, Discord) {
    const content = require("../json/content.json");
    if (typeof(content.misc.prophecies[args[0]]) == 'undefined') {
      message.reply(`Uh oh, I don't know that one. Perhaps you should try asking Nerissa?`);
    } else {
      message.reply(`\`\`\`${content.misc.prophecies[args[0]]}\`\`\``);
    }  
	}
};