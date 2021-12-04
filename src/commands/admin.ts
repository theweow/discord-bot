import { SlashCommandBuilder } from "@discordjs/builders"
import { ApplicationCommandPermissionData, CommandInteraction, GuildMember } from "discord.js"

export const data = new SlashCommandBuilder()
    .setDefaultPermission(false)
    .setName("admin")
    .setDescription("Root of admin commands")
    .addSubcommand(sub =>
        sub.setName("ban")
            .setDescription("Bans member from guild")
            .addUserOption(option =>
                option.setName("member")
                    .setDescription("Member to be banned")
                    .setRequired(true))
            .addStringOption(option =>
                option.setName("reason")
                    .setDescription("Reason")
                    .setRequired(false)))
    .addSubcommand(sub =>
        sub.setName("kick")
            .setDescription("Kicks member from guild")
            .addUserOption(option =>
                option.setName("member")
                    .setDescription("Member to be kicked")
                    .setRequired(true))
            .addStringOption(option =>
                option.setName("reason")
                    .setDescription("Reason")
                    .setRequired(false))
    )


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
        interaction.editReply("Unable to get user")
        return
    }

    if (interaction.options.getSubcommand() == "kick") {
        if (member.kickable == false) {
            interaction.editReply(`Unable to kick ${member}`)
            return
        }

        member.kick(interaction.options.getString("reason"))
        interaction.editReply(`Successfully kicked ${member}`)
        return
    }

    if (interaction.options.getSubcommand() == "ban") {
        if (member.kickable == false) {
            interaction.editReply(`Unable to ban ${member}`)
            return
        }

        member.ban({ reason: interaction.options.getString("reason") })
        interaction.editReply(`Successfully banned ${member}`)
        return
    }
}
