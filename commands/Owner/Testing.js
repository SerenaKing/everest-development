const config = require("../../config/config.json")

module.exports = {
    name: "Testing",
    description: "Testing Command",
    aliases: ["test"],
    cateogry: "Owner",
    usage: "!test [args]",
    run: (client, message, args) => {

        if (!message.author.id === config.botOwner) {
            message.delete()
            return
        } else {
            message.channel.send(`Bot can respond to commands!`)
        }
    }
}