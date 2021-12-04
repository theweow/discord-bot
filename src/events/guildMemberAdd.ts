import { GuildMember, MessageEmbed } from "discord.js"
import moment from "moment"

export function execute(member: GuildMember) {
    member.guild.systemChannel.send({
        embeds: [
            new MessageEmbed()
                .setColor("#64dd17")
                .setTitle("New member")
                .setThumbnail(member.user.avatarURL())
                .addField("Username", member.user.username, true)
                .addField("ID", member.id, true)
                .addField("Tag", member.user.toString(), true)
                .addField("Account age", moment(member.user.createdAt).fromNow(true), false)
                .setTimestamp()
        ]
    })
    member.send("**Добро пожаловать на сервер!**\nНастоятельно рекомендую сначала прочитать правила, а потом писать что-либо.")
}
