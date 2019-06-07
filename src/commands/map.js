module.exports = {
    name: 'map',
    description: "Provides Presly's Underland map.",
    arguments: "",
    execute(message, args, Discord) {
        message.reply("Be sure to thank Presly for this amazing map: ", {files: ["https://imgur.com/7pVpL9n.png"]});
    }
};