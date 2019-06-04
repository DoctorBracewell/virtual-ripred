// =-=-=-=-=-=-=-=-=-=-=-=- Requires + Assigns =-=-=-=-=-=-=-=-=-=-=-=- \\
const content = require("./json/content.json"), prefix = content.misc.prefix, tokens = require("./json/tokens.json"), commands = require("./json/commands.json"), fs = require("fs");
const Discord = require('discord.js'), discordClient = new Discord.Client();
discordClient.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const tumblr = require('tumblr.js'), tumblrClient = tumblr.createClient(tokens.tumblr);
const axios = require("axios");

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	discordClient.commands.set(command.name, command);
}

// =-=-=-=-=-=-=-=-=-=-=-=- Helper Functions =-=-=-=-=-=-=-=-=-=-=-=- \\
const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const randomColour = () => {
  let hexGenerator = "0123456789ABCDEF"
  let colour = "";
  for (i=0;i<6;i++) {
    colour += hexGenerator[(Math.floor(Math.random() * 16))];
  }
  return colour;
}

// =-=-=-=-=-=-=-=-=-=-=-=- Startup =-=-=-=-=-=-=-=-=-=-=-=- \\
// Set activity
discordClient.on('ready', () => {
  console.log('Starting Virtual Ripred');
  discordClient.user.setActivity('>> vr!help <<');
});
// Welcome Message
discordClient.on('guildMemberAdd', member => {
  member.channel.send('Welcome ! Check out <#545677818780975104> to have fun with me, and feel free to send whatever you want in the other channels.'); 
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
  if (!message.content.startsWith(prefix) || message.author.bot || content.misc.channels.includes(message.channel)) return;
  let args = message.content.toLowerCase().slice(prefix.length).split(/ +/);
  let command = args.shift().toLowerCase();

  // ========= Commands ==========

  // --- Trivia ---
  if (command === "trivia") {
    if (args.length === 0) {
      message.channel.send("Please provide either which type of trivia contest, `tuc` or `general` and a difficulty, `easy`, `medium` or `hard`.");
      return;
    }
    if (!(["general","tuc"].includes(args[0]))) {
      message.channel.send("That is not a valid contest type, use `tuc` or `general`.");
      return;
    }

    // Setup
    let questionNumber = 0, contestants = [], questionEmbed, randomQuestion = {}, randomChoices = [], 
        shuffledAnswer = 0, choicesString = ``, leaderboard = [], list = []

    if (args[0] === "tuc") {
      questionsArray = content.trivia.slice();
    }
    if (args[0] === "general") {
      if (!(["easy","medium","hard"].includes(args[1])) || args.length < 2) {
        message.channel.send("That is not a valid contest difficulty, use `easy`, `medium` or `hard`.");
        return;
      }
      let url = "https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986";
      if(args.length === 2) {
        switch (args[1]) {
          case "easy":
            url += "&difficulty=easy";
            break;
          case "medium":
              url += "&difficulty=medium";
              break;
          case "hard":
              url += "&difficulty=hard";
              break;
        }
      }
        // Get api trivia
        axios.get(url)
          .then(function (res) {
            questionsArray = res.data.results.slice();
            questionsArray.forEach(element => {
              element.question = decodeURIComponent(element.question);
              element.incorrect_answers.unshift(element.correct_answer);
              for (i = 0; i < element.incorrect_answers.length; i++) {
                element.incorrect_answers[i] = decodeURIComponent(element.incorrect_answers[i]);
              };
              let obj = element;
              obj.answers = obj.incorrect_answers;
              delete obj.incorrect_answers;
            })
          })
          .catch(function (error) {
            console.log(error);
            message.channel.send("Something went when trying to recieve the questions from the API, please try again.");
            return;
          });
    }
    
    // incorrect/correct answers
    let correctAnswers = () => {
      if (leaderboard.some(element => element.correct === true)) {
        list = [];
        leaderboard.forEach(element => {
          if (element.correct === true) {
            list.push(element.id);
          }
        })
        return `<@${list.join(">, <@")}> answered the question correctly.`;
      } else return "No one answered the question correctly."
    }
    let incorrectAnswers = () => {
      if (leaderboard.some(element => element.correct === false)) {
        list = [];
        leaderboard.forEach(element => {
          if (element.correct === false) { 
            list.push(element.id);
          }
        })
        return `<@${list.join(">, <@")}> did not answer the question correctly.`;
      } else return "No one answered the question incorrectly.";
    }

    // sort leaderboard
    let sortContestants = () => {
      let orderedBoard = leaderboard.slice();
      let returnString = "";
      let number = 0;
      orderedBoard.sort((a, b) => b.score - a.score)
      for (i = 0; i < orderedBoard.length; i++) {
        number++;
        returnString += `${number}) <@${orderedBoard[i].id}> with **${orderedBoard[i].score}** points.\n`;
      }
      return returnString;
    }

    // Question Generator
    function questions() {
      // Question Template
      questionNumber++;
      questionEmbed = new Discord.RichEmbed()
        .setColor(randomColour())
        .setAuthor("Virtual Ripred", "https://i.imgur.com/bpLpnfX.png")
        .setTitle(`**Question ${questionNumber}**:`);

      // Question Generation + Shuffling
      leaderboard.forEach((element) => {
        element.correct = false;
      })

      // Duplicate question + inject
      randomQuestion = questionsArray[randomBetween(0, questionsArray.length - 1)];
      randomChoices = randomQuestion.answers.slice().sort(() => Math.random() - 0.5);
      shuffledAnswer = randomChoices.indexOf(randomQuestion.answers[0]);
      shuffledAnswer === 0 ? shuffledAnswer = "🇦" : 
        shuffledAnswer === 1 ? shuffledAnswer = "🇧" :
        shuffledAnswer === 2 ? shuffledAnswer = "🇨" :
        shuffledAnswer === 3 ? shuffledAnswer = "🇩" :
          null;
      choicesString = `A) ${randomChoices[0]} \nB) ${randomChoices[1]} \nC) ${randomChoices[2]} \nD) ${randomChoices[3]}`;

      // Embed in question.
      questionEmbed.addField(randomQuestion.question, "React to this message with your answer!").addField("Choices:", choicesString);
      questionsArray.splice(questionsArray.indexOf(randomQuestion), 1);

      // Send + React
      message.channel.send(questionEmbed).then(message => {
        let abcd = ["🇦", "🇧", "🇨", "🇩"];
        
        message.react(abcd[0])
          .then(m => message.react(abcd[1]))
          .then(m => message.react(abcd[2]))
          .then(m => message.react(abcd[3]))
          .then(m => message.channel.send("You have 15 seconds to answer the question!"))
          .then(m => {
            // Listen for reactions
            let filter = (reaction, user) => abcd.includes(reaction.emoji.name) && !user.bot;
            let collector = message.createReactionCollector(filter, { time: 15000 });
            let alreadyReacted = [];
            collector.on("collect", reaction => {
              // If contestant + not reacted continue
              if (contestants.includes(reaction.users.keyArray().splice(-1, 1)[0]) && !alreadyReacted.includes(reaction.users.last().id)) {
                for (i = 0;i < leaderboard.length; i++) {
                  if (leaderboard[i].id === reaction.users.last().id  && reaction.emoji.name == shuffledAnswer) {
                    leaderboard[i].score += 1;
                    leaderboard[i].correct = true;
                  }
                }
                alreadyReacted.push(reaction.users.last().id);
              } else {
                // remove emoji
                switch (reaction.emoji.name) {
                  case abcd[0]:
                    message.reactions.get(abcd[0]).remove(reaction.users.last());
                    break;

                  case abcd[1]:
                    message.reactions.get(abcd[1]).remove(reaction.users.last());
                    break;
                
                  case abcd[2]:
                    message.reactions.get(abcd[2]).remove(reaction.users.last());
                    break;
                  
                  case abcd[3]:
                    message.reactions.get(abcd[3]).remove(reaction.users.last());
                    break;
                }
              }
            })
            // On end send answer
            collector.on("end", reaction => {
              message.channel.send(`${correctAnswers()}\n${incorrectAnswers()}`);
              message.channel.send(`The correct answer was ${shuffledAnswer}, ${randomQuestion.answers[0]}`);
              // If finish send leaderboard.
              if (questionNumber === 5) {
                setTimeout(() => {
                  message.channel.send(
                    new Discord.RichEmbed()
                    .setColor("#1a8892")
                    .setAuthor("Virtual Ripred", "https://i.imgur.com/bpLpnfX.png")
                    .setTitle(`**Contest Results**`)
                    .setDescription("Thanks for participating!")
                    .setFooter("Use vr!trivia to start another contest.")
                    .setTimestamp()
                    .addField("Leaderboard:", sortContestants())
                  );
                }, 5000)
              } else {
                // Next question
                setTimeout(() => {
                  questions();
                }, 3000)  
              }
            })
          })
      });
    };

    // Message Detection
    try {
      message.channel.send(`${message.author} has started a __${(args[0] === "general") ? `${args[1].toUpperCase()} ` : ''}${args[0].toUpperCase()} TRIVIA CONTEST__! React to this message to join in. The contest will start in 20 seconds, or disband if there are not enough players.`).then(message => {
        message.react("❓");
        let filter = (reaction, user) => reaction.emoji.name === '❓' && !user.bot;
        // Player collection
        message.awaitReactions(filter, { time: 20000 })
          .then(collected => {
            if (collected.get("❓").count >= 3) {
              // Set up contestants + leaderboard and start 1st question
              contestants = collected.get("❓").users.keyArray();
              contestants.shift();
              message.channel.send(`Contest has started! The contestants are: <@${contestants.join(">, <@")}>!`);
              message.channel.send(`**Please do not react to questions until the '15 seconds' message has been sent!**`);
              for (i=0; i < contestants.length; i++) {
                leaderboard.push({
                  "id": contestants[i],
                  "score": 0,
                  "correct": false
                });
              }
              questions();
            } else {
              // Not enough players
              message.channel.send(`The contest has been disbanded because there weren't enough players!`);
            }
          })
          .catch(console.error);
      });
    }
    catch (err) {
      console.log(err);
      message.channel.send(`Something went wrong, please try again!`);
    }
  }

  switch (command) {
    // --- Quotes --- \\
    case "quote":
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
    break;

    // --- Prophecies --- \\
    case "prophecy":
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
    break;

    // --- Help --- \\
    case "help":
      discordClient.commands.get('help').execute(message, args, Discord);
      break;
    // --- Tumblr --- \\
    case "tumblr":
      discordClient.commands.get('tumblr').execute(message, args, Discord);
      break;
    // --- Map --- \\
    case "map":
      message.reply("Be sure to thank Presly for this amazing map: ", {files: ["https://imgur.com/7pVpL9n.png"]});
      break;
    // --- Pickups --- \\
    case "pickup":
      message.reply(`\`\`\`${content.misc.pickups[randomBetween(0, content.misc.pickups.length - 1)]}\`\`\``);
      break;
    // --- Vines --- \\
    case "vine":
      message.reply(`\`\`\`${content.misc.vines[randomBetween(0, content.misc.vines.length - 1)]}\`\`\``);
      break;
    // --- Vines --- \\
    case "profile":
      let profile = new Discord.RichEmbed()
        .setColor(randomColour())
        .setAuthor("Virtual Ripred", "https://i.imgur.com/bpLpnfX.png")
        .setTimestamp();
      try {
        let character = args[0].toLowerCase();
        character = character.charAt(0).toUpperCase() + character.slice(1);
        let object = content.profiles.find(x => x.name === character)
        profile.setTitle(`Character Profile.`)
        .addField("Name: ", object.name)
        .addField("Species: ", object.species)
        .addField("Age: ", object.age)
        .addField("Bond: ", object.bond)
        .addField("Significant Other: ", object.SO)
        .addField("About: ", object.about)
        .setImage(object.reference.link)
        .setFooter(`Thanks to ${object.reference.author} for the image!`)
        message.channel.send(profile);
      } 
      catch (error) {
        function characters() {
          let finishedString = "";
          content.profiles.forEach(element => {
            finishedString += `${element.name}\n`;
          })
          return finishedString;
        }
        if (args[0] !== "list") {
          message.channel.send("Oops, I don't recognise that character. Check below for a list of all our current characters: ")
        }
        message.channel.send("```\n" + characters() + "```");
      }
      break;
  }
})

// --- Login --- \\hhh
discordClient.login(tokens.discord);