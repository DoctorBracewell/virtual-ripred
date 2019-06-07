module.exports = {
  name: 'help',
  description: "Provides this message.",
  arguments: "",
	execute(message, args, Discord) {
    const fs = require("fs"), commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')), random = require("drbracewell-random-tools")
    let commands = [];

    for (const file of commandFiles) {
	    let command = require(`./${file}`);
	    commands.push(command);
    }

		const helpString = () => {
      let finishedString = "- ";
      let arguments = [];
      let list = [];
      let name = ""
      
      for (var element of commands) {
        name = `- **vr!${element.name}** `;
        list.push(name);
    
        if (element.arguments != "") {
          if (element.arguments.includes("/")) {
            let seperateArguments = element.arguments.split("/");
            seperateArguments.forEach(element => {
              arguments = element.split(" ");
              list[list.length - 1] += `[${arguments.join("/")}] `
            })
          } else {
            arguments = element.arguments.split(" ");
            list[list.length - 1] += `[${arguments.join("/")}] `
          }
        }
    
        list[list.length - 1] += `= ${element.description}`;
      }
    
      finishedString = list.join("\n")
      return finishedString;
    };

    const help = new Discord.RichEmbed()
        .setColor(random.randomColour())
        .setAuthor("Virtual Ripred", "https://i.imgur.com/bpLpnfX.png")
        .setTitle("**Hello!**")
        .setDescription("I am Virtual Ripred, a custom discord bot coded by DrBracewell. I listen out for tumblr blog posts, give you random quotes and have a database of TUC information. Check below for some commands you can use.")
        .addField("__Commands__", helpString())
        .addField("\u200b", "**Have Fun!**")
        .setFooter("I only work in #command-room")
        .setTimestamp();
    
    message.reply(help);
	}
};