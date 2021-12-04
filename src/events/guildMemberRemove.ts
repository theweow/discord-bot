import { GuildMember, MessageEmbed } from "discord.js"

export function execute(member: GuildMember) {
    member.guild.systemChannel.send({
        embeds: [
            new MessageEmbed()
                .setTitle("Member left")
                .setColor("#d50000")
                .setThumbnail(member.user.avatarURL())
                .addField("Username", member.user.username, true)
                .addField("ID", member.id, true)
                .addField("Tag", member.user.toString(), true)
                .setTimestamp()
        ]
    })
}