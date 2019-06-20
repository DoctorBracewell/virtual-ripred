module.exports = {
    name: 'anagram',
    description: "Starts a anagram contenst",
    arguments: "easy hard",
    execute(message, args, Discord) {
        const randomWord = require("random-word"), random = require("drbracewell-random-tools");
        let word = randomWord();

        if (args === [] || !["easy", "hard"].includes(args[0])) {
          message.channel.send("Please send a valid anagram type; `easy` or `hard`.");
          return;
        }

        if (args[0] === "easy") {
          while (word.length >= 6) {
            word = randomWord();
          }
        }

        if (args[0] === "hard") {
          while (word.length <= 6) {
            word = randomWord();
          }
        }

        let embed = new Discord.RichEmbed()
          .setColor(random.randomColour())
          .setAuthor("Virtual Ripred", "https://i.imgur.com/bpLpnfX.png")
          .setTitle("**Race to see who can unscramble the word below first!**")
          .setDescription("If no-one guess the word, the contest will disband after 1 minute.")
          .addField("__Your scrambled word is__:", word.split('').sort(function(){return 0.5-Math.random()}).join(''))
          .setFooter("Use vr!anagram to start another contest!")
          .setTimestamp();

        message.channel.send(embed);

        let finished = false;
        let filter = m => !m.author.bot;
        let collector = message.channel.createMessageCollector(filter, { time: 60000 });

        collector.on("collect", message => {
          if (message.content.toLowerCase() === word.toLowerCase()) {
            message.channel.send(`<@${message.author.id}> correctly unscrambled the word!`);
            finished = true;
            collector.stop();
          }
        })

        collector.on("end", () => {
          if (finished === false) {
            finished = true;
            message.channel.send(`No-one answered correctly, the word was __${word}__!`);
            collector.stop();
          }
        })
    }
}