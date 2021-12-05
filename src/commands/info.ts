import { SlashCommandBuilder } from "@discordjs/builders"
import { ApplicationCommandPermissionData, CategoryChannel, CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } from "discord.js"
import moment from "moment"
import { client } from "../main"
import { makeRTimestamp } from "../utils"

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
                            .setDescription(`Was created ${makeRTimestamp(guild.createdTimestamp)}`)
                            .addField("Members", `Total: ${guild.memberCount}\nHumans: ${members.filter(m => !m.user.bot).size}\nBots: ${members.filter(m => m.user.bot).size}`, true)
                            .addField("Owner", `Tag: ${members.get(guild.ownerId)}\nID: ${guild.ownerId}`, true)
                            .addField("Channels", `Total: ${guild.channels.cache.size}\nCategories: ${guild.channels.cache.filter(c => c.type == "GUILD_CATEGORY").size}\nText: ${guild.channels.cache.filter(c => c.isText()).size}\nVoice: ${guild.channels.cache.filter(c => c.isVoice()).size}`, true)
                            .addField("Special channels", `Rules: ${guild.rulesChannel}\nAFK: ${guild.afkChannel}\nSystem: ${guild.systemChannel}`, true)
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
