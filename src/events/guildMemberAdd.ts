import { GuildMember, MessageEmbed } from "discord.js"

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
                .addField("Account creation date", member.user.createdAt.toDateString(), false)
                .setTimestamp()
        ]
    })
    member.send("**Добро пожаловать на сервер!**\nНастоятельно рекомендую сначала прочитать правила, а потом писать что-либо.")
}
