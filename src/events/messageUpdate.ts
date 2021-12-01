import { Client, Message, MessageEmbed, TextChannel } from "discord.js"
import utils from "../utils"

export function execute(client: Client) {
    return (oldMsg: Message, newMsg: Message) => {
        const msg = newMsg
        if (msg.author == client.user || oldMsg.content == "" || oldMsg.content == newMsg.content) return

        msg.guild.systemChannel.send({
            embeds: [
                new MessageEmbed()
                    .setColor("#2962ff")
                    .setTitle("Message was edited")
                    .setURL(utils.generateChannelLink(msg.channel as TextChannel))
                    .addField("Old content", `> ${oldMsg.content}`, false)
                    .addField("New content", `> ${newMsg.content}`, false)
                    .addField("Author", `> ${msg.author}`, true)
                    .addField("Channel", `> ${msg.channel}`, true)
                    .setTimestamp()
            ]
        })

        utils.messageFilter(newMsg)
    }
}