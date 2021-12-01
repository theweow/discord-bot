import { SlashCommandBuilder } from "@discordjs/builders"
import { ApplicationCommandPermissionData, CommandInteraction } from "discord.js"
import { updateHandlers } from "../registerHandlers"

export const data = new SlashCommandBuilder()
    .setDefaultPermission(false)
    .setName("dev")
    .setDescription("Root command for dev-only commands")
    .addSubcommand(sub =>
        sub.setName("reload-events")
            .setDescription("Reloads events")
    )

export const permissions: ApplicationCommandPermissionData[] = [
    {
        id: "768078647734173696",
        type: "USER",
        permission: true
    }
]

export function execute(interaction: CommandInteraction) {
    if (interaction.options.getSubcommand() == "reload-events")
        updateHandlers()
    interaction.editReply("Successfully")
}
