import { ButtonInteraction, GuildMemberRoleManager, MessageEmbed } from "discord.js"
import { roles } from "../config.json"

export function execute(interaction: ButtonInteraction) {
    const rm = interaction.member.roles as GuildMemberRoleManager
    const role = roles.announcements_notify
    rm.resolve(role) ? rm.remove(role) : rm.add(role)
    interaction.update({})
}
