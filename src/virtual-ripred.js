// Setup \\
const content = require("./json/content.json"), config = require("./json/config.json"), prefix = config.prefix, tokens = require("./json/tokens.json")
const fs = require("fs"), random = require("drbracewell-random-tools");
const tumblr = require('tumblr.js'), tumblrClient = tumblr.createClient(tokens.tumblr);

const Discord = require('discord.js'), discordClient = new Discord.Client();
discordClient.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	let command = require(`./commands/${file}`);
	discordClient.commands.set(command.name, command);
}

// Set Activity \\
discordClient.on('ready', () => {
  console.log('Starting Virtual Ripred');
  discordClient.user.setActivity('>> vr!help <<');
});

// =-=-=-=-=-=-=-=-=-=-=-=- Blog Listening =-=-=-=-=-=-=-=-=-=-=-=- \\
let listenForPosts = blog => {
  // Get OG post number
  tumblrClient.blogPosts((blog + '.tumblr.com'), function(err, resp) {
    if (err === null) {
      let postCount = resp.total_posts;
      let listenShort = () => {
        // Target every 2m for new posts
        tumblrClient.blogPosts((blog + '.tumblr.com'), function(err1, resp1) {
          if (err1 === null) {
            let newPostCount = resp1.total_posts;
            if (newPostCount > postCount) {
              // If not reblogged send to channel.
              if (resp1.posts[0].source_url === undefined || resp1.posts[0].reblog.tree_html === "") {
                discordClient.channels.get("555129709495582745").send(
                  `<:tumblr:555483626175987712>  **New Tumblr Post**\n\n__${blog.toUpperCase()}__ has created a post! Check it out here:\n\n${resp1.posts[0].post_url}`
                  );
                discordClient.channels.get("565841408146145280").send(
                  `<:tumblr:565841585300832256>  **New Tumblr Post**\n\n__${blog.toUpperCase()}__ has created a post! Check it out here:\n\n${resp1.posts[0].post_url}`
                  );
                postCount++;
              } else {
                postCount++;
              }
            }
          } else {
            if (typeof blogLoop != 'undefined') {
              clearInterval(blogLoop);
            }
          }
        });
      };
      // Call once + start interval.
      listenShort();
      let blogLoop = setInterval(function(){listenShort()}, 120000);
    } else {
        clearInterval(blogLoop);
    };
  });
};

// Do for all blogs.
for (i = 0; i < content.misc.blogs.length; i++) {
  listenForPosts(content.misc.blogs[i]);
};

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
  for (i = 0; i < content.misc.wDD.length; i++) {
    if (message.content.includes(content.misc.wDD[i]) && !message.author.bot) {
      message.channel.send("**Happy Weef Dad Day!**");
    }
  }

  // Check if command + split into args
  if (!message.content.startsWith(prefix) || message.author.bot || !content.misc.channels.includes(message.channel)) return;
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