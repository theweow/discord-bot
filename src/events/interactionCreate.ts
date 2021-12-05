import { MessageEmbed } from "discord.js"
import * as logger from "../logger"

export async function execute(interaction) {
    if (interaction.isCommand())
        try {
            await interaction.deferReply({ ephemeral: true })
            require(`./commands/${interaction.commandName}`).execute(interaction)
        } catch (err) {
            interaction.editReply({
                embeds: [
                    new MessageEmbed()
                        .setColor("#d50000")
                        .setTitle("Error!")
                        .setTimestamp()
                ]
            })
            logger.error(err.toString())
        }
}