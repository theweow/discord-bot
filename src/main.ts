import { env } from "process"
import Discord from "discord.js"
import { REST } from "@discordjs/rest"
import { Routes } from "discord-api-types/v9"
import * as fs from "fs"
import config from "./config.json"
import * as logger from "./logger"
import registerHandlers from "./registerHandlers"

// Init
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
    ]
})

// Slash commands
const commands = []
const commandFiles = fs.readdirSync(__dirname + "/commands")

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    commands.push(command.data.toJSON())
}

const rest = new REST({ version: '9' }).setToken(env.WEOW_BOT_TOKEN);

(async () => {
    try {
        await rest.put(
            Routes.applicationCommands(config.clientId),
            { body: commands },
        )
    } catch (error) {
        logger.error(error)
    }
})()

client.on('interactionCreate', async interaction => {
    if (interaction.isCommand())
        try {
            await interaction.deferReply()
            require(`./commands/${interaction.commandName}.ts`).execute(interaction)
        } catch (err) {
            interaction.editReply(err.toString() || "Unable to get error")
            logger.error(err.toString())
        }
})

// Ready event
client.once("ready", () => {
    logger.info(`${client.user.tag} is online!`)
    client.user.setActivity({
        type: "WATCHING",
        name: "for the server"
    })

    client.application.fetch().then(application => {
        application.commands.fetch().then(commands => {
            commands.each(command => {
                const permissions = require(`./commands/${command.name}.ts`).permissions
                client.guilds.cache.each(guild => command.permissions.set({ guild, permissions }))
            })
        })
    })
})

registerHandlers(client)

// Login
client.login(env.WEOW_BOT_TOKEN)
