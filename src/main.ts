import { env } from "process"
import Discord from "discord.js"
import fs from "fs"
import * as logger from "./logger"
import path from "path"

// Init
export const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
    ]
})

const eventFiles = fs.readdirSync(__dirname + "/events")
for (const eventFile of eventFiles) {
    const basename = path.basename(eventFile, path.extname(eventFile))
    logger.progress("Register event:", basename)
    client.removeAllListeners(basename)
    client.on(basename, require(`./events/${eventFile}`).execute)
    logger.success()
}

// Login
client.login(env.WEOW_BOT_TOKEN)
