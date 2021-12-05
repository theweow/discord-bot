import { SlashCommandBuilder } from "@discordjs/builders"
import { ApplicationCommandPermissionData, CommandInteraction, GuildMember } from "discord.js"

export const data = new SlashCommandBuilder()
    .setDefaultPermission(false)
    .setName("kick")
    .setDescription("Kicks member from guild")
    .addUserOption(option =>
        option.setName("member")
            .setDescription("Member to be banned")
            .setRequired(true))
    .addStringOption(option =>
        option.setName("reason")
            .setDescription("Reason")
            .setRequired(false))

export const permissions: ApplicationCommandPermissionData[] = [
    {
        id: "908769573141106718",
        type: "ROLE",
        permission: true
    }
]

export async function execute(interaction: CommandInteraction) {
    const member = interaction.options.getMember("member") as GuildMember

    if (member == undefined) {
        interaction.editReply("Unable to get user")
        return
    }

    if (member.kickable == false) {
        interaction.editReply(`Unable to kick ${member}`)
        return
    }

    member.kick(interaction.options.getString("reason"))
    interaction.editReply(`Successfully kicked ${member}`)
}
