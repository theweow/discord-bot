import { SlashCommandBuilder } from "@discordjs/builders"
import { ApplicationCommandPermissionData, CommandInteraction } from "discord.js"

export const data = new SlashCommandBuilder()
    .setDefaultPermission(false)
    .setName("dev")
    .setDescription("Root command for dev-only commands")
    .addSubcommand(sub =>
        sub.setName("reload")
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
        process.exit(0)
    interaction.editReply("Successfully")
}
