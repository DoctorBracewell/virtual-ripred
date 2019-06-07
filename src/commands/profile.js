module.exports = {
    name: 'profile',
    description: "Provides the specified character profile",
    arguments: "list (name)",
	execute(message, args, Discord) {
        const content = require("../json/content.json"), random = require("drbracewell-random-tools")

        let profile = new Discord.RichEmbed()
            .setColor(random.randomColour())
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
            message.reply(profile);
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
                message.reply("Oops, I don't recognise that character. Check below for a list of all our current characters: ")
            }
            message.reply("```\n" + characters() + "```");
        }
	}
};