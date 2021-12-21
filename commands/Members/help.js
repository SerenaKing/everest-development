const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "help",
    description: "Shows all commands!",
    aliases: ["h"],
    category: "ALL",
    usage: "!help",
    run: (client, message, args) => {
        message.delete()

        const embed = new MessageEmbed()
            .setTitle(`Everest Development | Help Embed`)
            .setColor(`#53a28f`)
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`
**Member Commands**
Help - Shows this embed.

**Staff Commands**


**Bot Owner Commands**
Testing - Tests the responsiveness of the bot.
Embed - Tests the responsiveness of the embeds.
Image - Tests the resonsiveness of the images.
(These are related to discord API)
            `)
            .setFooter(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp()
        message.channel.send(`<@!${message.author.id}> Requested help!`, embed)
    }
}