import { SlashCommandBuilder } from "@discordjs/builders"
import { ChannelType } from "discord-api-types/v9"
import { ApplicationCommandPermissionData, CommandInteraction, GuildTextBasedChannel, MessageActionRow, MessageButton } from "discord.js"

export const data = new SlashCommandBuilder()
    .setDefaultPermission(false)
    .setName("dev")
    .setDescription("Root command for dev-only commands")
    .addSubcommand(sub =>
        sub.setName("reload")
            .setDescription("Reloads events"))
    .addSubcommand(sub =>
        sub.setName("rolegiver")
            .setDescription("Generates rolegiver")
            .addChannelOption(option =>
                option.setName("channel")
                    .setDescription("Channel")
                    .setRequired(true)
                    .addChannelType(ChannelType.GuildText)))

export const permissions: ApplicationCommandPermissionData[] = [
    {
        id: "768078647734173696",
        type: "USER",
        permission: true
    }
]

export async function execute(interaction: CommandInteraction) {
    switch (interaction.options.getSubcommand()) {
        case "reload":
            process.exit(0)

        case "rolegiver":
            (interaction.options.getChannel("channel") as GuildTextBasedChannel).send({
                content: "**Select role:**",
                components: [
                    new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setStyle("SECONDARY")
                                .setCustomId("role_announcements_notify")
                                .setLabel("Announcements notification"))
                        .addComponents(
                            new MessageButton()
                                .setStyle("SECONDARY")
                                .setCustomId("role_news_notify")
                                .setLabel("News notification"))
                ]
            })
            break
    }
    interaction.editReply("Successfully")
}
