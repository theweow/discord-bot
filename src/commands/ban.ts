import { SlashCommandBuilder } from "@discordjs/builders"
import { ApplicationCommandPermissionData, CommandInteraction, GuildMember } from "discord.js"

export const data = new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bans member from guild")
    .addUserOption(option =>
        option.setName("member")
            .setDescription("Member to be banned")
            .setRequired(true))
    .addStringOption(option =>
        option.setName("reason")
            .setDescription("Reason")
            .setRequired(false))
    .setDefaultPermission(false)

export const permissions: ApplicationCommandPermissionData[] = [
    {
        id: "908769573141106718",
        type: "ROLE",
        permission: true
    }
]

export function execute(interaction: CommandInteraction) {
    const member = interaction.options.getMember("member") as GuildMember

    if (member == undefined) {
        interaction.editReply("Unable to ban user")
        return
    }

    if (member.kickable == false) {
        interaction.editReply(`Unable to ban ${member}`)
        return
    }

    member.kick(interaction.options.getString("reason"))
    interaction.editReply(`Successfully banned ${member}`)
}
