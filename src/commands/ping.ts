import { SlashCommandBuilder } from "@discordjs/builders"
import { ApplicationCommandPermissionData, CommandInteraction, MessageActionRow, MessageButton } from "discord.js"
import { client } from "../main"

export const data = new SlashCommandBuilder()
    .setDefaultPermission(true)
    .setName("ping")
    .setDescription("Pings bot")

export const permissions: ApplicationCommandPermissionData[] = []

export async function execute(interaction: CommandInteraction) {
    interaction.editReply(`Ping: ${client.ws.ping}ms`)
}
