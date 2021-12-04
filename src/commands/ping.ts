import { SlashCommandBuilder } from "@discordjs/builders"
import { ApplicationCommandPermissionData, CommandInteraction, MessageEmbed } from "discord.js"

export const data = new SlashCommandBuilder()
    .setDefaultPermission(true)
    .setName("ping")
    .setDescription("Pings bot")

export const permissions: ApplicationCommandPermissionData[] = []

export function execute(interaction: CommandInteraction) {
    interaction.editReply(`Pong: ${Date.now() - interaction.createdTimestamp}ms`)
}
