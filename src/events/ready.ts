import { REST } from "@discordjs/rest"
import { Routes } from "discord-api-types"
import { client } from "../main"
import * as logger from "../logger"
import fs from "fs"
import { env } from "process"

export async function execute() {
    logger.info(`${client.user.tag} is online!`)

    client.application.fetch().then(application => {
        application.commands.fetch().then(commands => {
            commands.each(command => {
                const permissions = require(`./commands/${command.name}`).permissions
                client.guilds.cache.each(guild => command.permissions.set({ guild, permissions }))
            })
        })
    })

    // Slash commands
    const commands = []
    const commandFiles = fs.readdirSync(__dirname + "/commands")

    for (const file of commandFiles) {
        const command = require(`./commands/${file}`)
        commands.push(command.data.toJSON())
    }

    const rest = new REST({ version: '9' }).setToken(env.WEOW_BOT_TOKEN);

    try {
        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: commands },
        )
    } catch (error) {
        logger.error(error)
    }
}