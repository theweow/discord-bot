import { SlashCommandBuilder } from "@discordjs/builders"
import { ApplicationCommandPermissionData, CategoryChannel, CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } from "discord.js"
import moment from "moment"
import { client } from "../main"

export const data = new SlashCommandBuilder()
    .setDefaultPermission(true)
    .setName("info")
    .setDescription("Root command for info commands")
    .addSubcommand(sub =>
        sub.setName("server")
            .setDescription("Info about server"))
    .addSubcommand(sub =>
        sub.setName("bot")
            .setDescription("Info about bot"))

export const permissions: ApplicationCommandPermissionData[] = []

export async function execute(interaction: CommandInteraction) {
    const guild = interaction.guild
    switch (interaction.options.getSubcommand()) {
        case "server":
            var comps: MessageActionRow[] = []
            if (interaction.guild.rulesChannel.lastMessage)
                comps = [
                    new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setStyle("LINK")
                                .setLabel("Rules channel")
                                .setURL(guild.rulesChannel.lastMessage.url)
                        )
                ]

            guild.members.fetch().then(members => {
                interaction.editReply({
                    embeds: [
                        new MessageEmbed()
                            .setTitle(guild.name)
                            .setThumbnail(guild.iconURL())
                            .setDescription(`Age: ${moment(guild.createdAt).fromNow(true)}\nID: ${guild.id}`)
                            .addField("Total members", guild.memberCount.toString(), true)
                            .addField("Bots", members.filter(m => m.user.bot).size.toString(), true)
                            .addField("Humans", members.filter(m => m.user.bot == false).size.toString(), true)
                            .addField("Owner", members.get(guild.ownerId).toString(), false)
                            .addField("Channel count", guild.channels.cache.filter(c => c.type != "GUILD_CATEGORY").size.toString(), true)
                            .addField("Rules", guild.rulesChannel?.toString() || "Unset", true)
                            .addField("AFK", guild.afkChannel?.toString() || "Unset", true)
                            .setTimestamp()
                    ],
                    components: comps
                })
            })
            break
        case "bot":
            interaction.editReply({
                embeds: [
                    new MessageEmbed()
                        .setTitle(client.user.username)
                        .setThumbnail(client.user.avatarURL())
                        .setDescription(`Was created ${moment(client.user.createdAt).fromNow()}\nID: ${client.user.id}`)
                        .addField("Ping", `${client.ws.ping}ms`, false)
                        .addField("Status", client.ws.status.toString(), false)
                        .addField("Uptime", moment().subtract(client.uptime, "ms").fromNow(true))
                        .setTimestamp()
                ]
            })
    }
}
