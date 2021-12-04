import { Message, MessageActionRow, MessageButton, MessageEmbed, TextChannel } from "discord.js"
import { client } from "../main"
import utils from "../utils"

export function execute(oldMsg: Message, newMsg: Message) {
    const msg = newMsg
    if (msg.author == client.user || oldMsg.content == "" || oldMsg.content == newMsg.content) return

    msg.guild.systemChannel.send({
        embeds: [
            new MessageEmbed()
                .setColor("#2962ff")
                .setTitle("Message was edited")
                .addField("Old content", `> ${oldMsg.content}`, false)
                .addField("New content", `> ${newMsg.content}`, false)
                .addField("Author", `> ${msg.author}`, true)
                .addField("Channel", `> ${msg.channel}`, true)
                .setTimestamp()
        ],
        components: [
            new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setStyle("LINK")
                        .setLabel("Message")
                        .setURL(msg.url)
                )
        ]
    })

    utils.messageFilter(newMsg)
}