import { SlashCommandBuilder } from "@discordjs/builders"
import { ApplicationCommandPermissionData, ColorResolvable, CommandInteraction, GuildTextBasedChannel, MessageEmbed } from "discord.js"

export const data = new SlashCommandBuilder()
    .setName("post")
    .setDescription("Posts to news channel")
    .addStringOption(option =>
        option.setName("title")
            .setDescription("Title of article")
            .setRequired(true))
    .addStringOption(option =>
        option.setName("content")
            .setDescription("Content to be posted")
            .setRequired(true))
    .addStringOption(option =>
        option.setName("color")
            .setDescription("Embed color")
            .setRequired(false))
    .setDefaultPermission(false)

export const permissions: ApplicationCommandPermissionData[] = [
    {
        id: "916055079310733322",
        type: "ROLE",
        permission: true
    }
]

export function execute(interaction: CommandInteraction) {
    const news = interaction.guild.channels.cache.get("908772616775532544") as GuildTextBasedChannel
    news.send({
        embeds: [
            new MessageEmbed()
                .setColor(interaction.options.getString("color") as ColorResolvable || "#000000")
                .setTitle(interaction.options.getString("title"))
                .setDescription(interaction.options.getString("content"))
                .setAuthor(interaction.user.username, interaction.user.avatarURL())
                .setTimestamp()
        ]
    })
    interaction.editReply({
        embeds: [
            new MessageEmbed()
                .setTitle("Successfully posted!")
                .setTimestamp()
        ]
    })
}
