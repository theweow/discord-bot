import { ButtonInteraction, GuildMemberRoleManager, MessageEmbed } from "discord.js"
import { roles } from "../config.json"

export function execute(interaction: ButtonInteraction) {
    (interaction.member.roles as GuildMemberRoleManager).add(roles.announcements_notify)
    interaction.update({})
}
