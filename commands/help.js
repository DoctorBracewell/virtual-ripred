module.exports = {
	name: 'help',
	description: 'Displays this message.',
	execute(message, args, Discord) {
        const commands = require("../json/commands.json");
		const helpString = () => {
            let finishedString = "- ";
            let arguments = [];
            let list = [];
            let commandCopy = commands.slice();
          
            commandCopy.forEach(element => {
              element.name = `- **vr!${element.name}** `;
              list.push(element.name);
          
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
            })
          
            finishedString = list.join("\n")
            return finishedString;
          };

        const help = new Discord.RichEmbed()
            .setColor("#14851b")
            .setAuthor("Virtual Ripred", "https://i.imgur.com/bpLpnfX.png")
            .setTitle("**Hello!**")
            .setDescription("I am Virtual Ripred, a custom discord bot coded by DrBracewell. I listen out for tumblr blog posts, give you random quotes and have a database of TUC information. Check below for some commands you can use.")
            .addField("__Commands__", helpString())
            .addField("\u200b", "**Have Fun!**")
            .setFooter("I only work in #command-room")
            .setTimestamp();
        
        message.channel.send(help);
	},
};