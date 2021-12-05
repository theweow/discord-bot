import { Interaction, MessageEmbed } from "discord.js"
import * as logger from "../logger"

export async function execute(interaction: Interaction) {
    if (interaction.isCommand()) {
        try {
            await interaction.deferReply({ ephemeral: true })
            require(`../commands/${interaction.commandName}`).execute(interaction)
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
        return
    }

    if (interaction.isButton()) {
        try {
            await interaction.deferReply({ ephemeral: true })
            require(`../components/${interaction.customId}`).execute(interaction)
        } catch (err) {
            logger.error(err)
        }
        return
    }
}