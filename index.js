require("dotenv").config()
const { Client, Collection, MessageEmbed } = require("discord.js")

const fs = require("fs")

const { prefix } = require("./config/config.json")

const client = new Client()

client.commands = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handler/${handler}`)(client);
});

client.on('ready', () => {

    const activities = [
        { name: `Everest Development`, type: `WATCHING` },
        { name: `Hartford, Connecticut`, type: `PLAYING` },
    ]

    client.user.setPresence({
        status: "dnd", activity: activities[0]
    })

    let activity = 1;

    setInterval(() => {
        activities[2] = { name: `Moderation Logs`, type: `WATCHING` }
        if (activity > 2) activity = 0;
        client.user.setActivity(activities[activity]);
        activity++;
    }, 10000);

    console.log(`Ready!`)
})

client.on("message", async (message) => {
    if (message.author.bot) return;
    if (!message.guild) return;

    if (!message.content.startsWith(prefix)) return;
    if (!message.member)
        message.member = await message.guild.fetchMember(message);
        
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
        
    if (cmd.length === 0) return;   
        
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
        
    if (command) command.run(client, message, args);
});

client.login(process.env.TOKEN);