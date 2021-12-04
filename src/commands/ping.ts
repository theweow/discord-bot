import { SlashCommandBuilder } from "@discordjs/builders"
import { ApplicationCommandPermissionData, CommandInteraction, MessageEmbed } from "discord.js"
import { client } from "../main"

export const data = new SlashCommandBuilder()
    .setDefaultPermission(true)
    .setName("ping")
    .setDescription("Pings bot")

export const permissions: ApplicationCommandPermissionData[] = []

export function execute(interaction: CommandInteraction) {
    interaction.editReply(`Ping: ${client.ws.ping}ms`)
}
