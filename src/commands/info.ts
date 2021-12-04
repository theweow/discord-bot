import { SlashCommandBuilder } from "@discordjs/builders"
import { ApplicationCommandPermissionData, CommandInteraction, MessageEmbed } from "discord.js"

export const data = new SlashCommandBuilder()
    .setDefaultPermission(true)
    .setName("info")
    .setDescription("Root command for info commands")
    .addSubcommand(sub =>
        sub.setName("server")
            .setDescription("Info about server")
    )

export const permissions: ApplicationCommandPermissionData[] = []

export function execute(interaction: CommandInteraction) {
    const guild = interaction.guild
    if (interaction.options.getSubcommand() == "server")
        interaction.editReply({
            embeds: [
                new MessageEmbed()
                    .setTitle(guild.name)
                    .setDescription("Info about guild")
                    .setImage(guild.iconURL())
                    .setTimestamp()
            ]
        })
    interaction.editReply("Error")
}
