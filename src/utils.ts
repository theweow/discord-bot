import { Message, MessageActionRow, MessageButton, MessageEmbed } from "discord.js"
import { setAutoAction, setReason } from "./events/messageDelete"

/**
 * Just waits
 * 
 * @param time time in milliseconds
 */
export const wait: (time: number) => void = require('util').promisify(setTimeout)

/**
 * Filters message
 * 
 * @param msg Message
 * @returns Did message passed filter
 */
export function messageFilter(msg: Message): boolean {
    // Anti-spam
    if (msg.content.toLowerCase().includes("discord.gg/")) {
        setAutoAction()
        setReason("Link to discord server")
        if (msg.deletable) msg.delete()
        return false
    }

    if (msg.content.toLowerCase().includes("http")) {
        msg.guild.systemChannel.send({
            embeds: [
                new MessageEmbed()
                    .setTitle("Suspicious message detected")
                    .setColor("#ff6d00")
                    .addField("Content", `> ${msg.content}`, false)
                    .addField("Author", `> ${msg.author}`, true)
                    .addField("Channel", `> ${msg.channel}`, true)
                    .addField("Why", "> Contains link-like text", true)
                    .setTimestamp()
            ],
            components: [
                new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setLabel("Message")
                            .setStyle("LINK")
                            .setURL(msg.url)
                    )
            ]
        })
    }

    // Anti-Flood
    const lastMsg = msg.channel.messages.cache.filter(m => m.author == msg.author).last(2)[0]
    const timeElapsed = msg.createdTimestamp - lastMsg?.createdTimestamp
    if (lastMsg == msg) return

    if (timeElapsed < 500 && timeElapsed > 0) {
        setAutoAction()
        setReason("Flood")
        msg.delete()
        return false
    }

    // if (msg.content == lastMsg?.content) {
    //     setAutoAction()
    //     setReason("Flood")
    //     msg.delete()
    //     return false
    // }

    return true
}

export default {
    messageFilter: messageFilter,
    wait: wait,
}
