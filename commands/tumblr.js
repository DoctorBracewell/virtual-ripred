module.exports = {
	name: 'tumblr',
	description: 'Provides a list of the most active tumblr blogs.',
	execute(message, args, Discord) {
        const tumblrList = new Discord.RichEmbed()
            .setColor("#2C4762")
            .setAuthor("Virtual Ripred", "https://i.imgur.com/bpLpnfX.png")
            .setThumbnail("https://is2-ssl.mzstatic.com/image/thumb/Purple114/v4/c0/4b/9a/c04b9a48-7cf1-83aa-83c3-284307c18bd3/TumblrIcon-0-1x_U007emarketing-0-0-GLES2_U002c0-512MB-sRGB-0-0-0-85-220-0-0-0-7.png/246x0w.jpg")
            .setTitle("**Tumblr Blogs**")
            .setDescription("Here is a list of the most active Tumblr Blogs:\n\n- **One Unexpected** (Andielion) **:** https://oneunexpected.tumblr.com\n- **Run Like the Motherfucking River** (DrBracewell) **:** https://tumblr.drbracewell.co.uk\n- **Bring Us Back Light** (AvianAnalyst) **:** https://bring-us-back-light.tumblr.com\n- **Underlined Chronicles** (Miapro) **:** https://underlinedchronicles.tumblr.com\n- **Remedy and Wrong Entwine** (Nellyfish) **:** https://the-what-but-not-the-when.tumblr.com\n")
            .addField("\u200b", "**Have Fun!**")
            .setFooter("I only work in #bot-channel")
            .setTimestamp();
		message.channel.send(tumblrList);
	},
};