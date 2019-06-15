// Setup \\
const content = require("./json/content.json"), config = require("./json/config.json"), prefix = config.prefix, tokens = require("./json/tokens.json");
const fs = require("fs");
const tumblr = require('tumblr.js'), tumblrClient = tumblr.createClient(tokens.tumblr);

const Discord = require('discord.js'), discordClient = new Discord.Client();
discordClient.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./src/commands')

for (const file of commandFiles) {
	let command = require(`./commands/${file}`);
	discordClient.commands.set(command.name, command);
}

// Set Activity \\
discordClient.on('ready', () => {
  console.log('Starting Virtual Ripred');
  discordClient.user.setActivity('>> vr!help <<');
});

// =-=-=-=-=-=-=-=-=-=-=-=- Message Detection =-=-=-=-=-=-=-=-=-=-=-=- \\
discordClient.on('message', message => {
  // Test
  if (message.content.toLowerCase() === `${prefix}ping`) {
    message.channel.send("Pong!")
  }

  // --- Human Comfort --- \\
  if ((message.content.toLowerCase() === "human comfort" || message.content.toLowerCase() === "(human comfort)") && !message.author.bot) {
    message.channel.send("**__H U M A N   C O M F O R T__**");
  } else if (message.content.toLowerCase().includes("human") && message.content.toLowerCase().includes("comfort") && !message.author.bot) {
    message.channel.send("human comfort");
  } else if (message.content.toLowerCase().includes("human") && !message.author.bot) {
    message.channel.send("comfort");
  } else if (message.content.toLowerCase().includes("comfort") && !message.author.bot) {
    message.channel.send("human");
  }

  // --- Weef Dad Day --- \\
  for (let i of content.misc.wDD.length) {
    if (message.content.includes(content.misc.wDD[i]) && !message.author.bot) {
      message.channel.send("**Happy Weef Dad Day!**");
    }
  }

  // Check if command + split into args
  if (!message.content.startsWith(prefix) || message.author.bot || !content.misc.channels.includes(message.channel.id)) return;
  let args = message.content.toLowerCase().slice(prefix.length).split(/ +/);
  let command = args.shift().toLowerCase();
  if (!discordClient.commands.has(command)) return;

  try {
    discordClient.commands.get(command).execute(message, args, Discord);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
})

// --- Login --- \\
discordClient.login(tokens.discord);