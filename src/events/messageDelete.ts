import { Message, MessageEmbed, MessageOptions } from "discord.js"

const defaultReason = "No reason provided"
var reason: string = defaultReason
var isAutoAction: boolean = false

export function setReason(newReason: string) {
    reason = newReason
}

export function setAutoAction() {
    isAutoAction = true
}

export async function execute(msg: Message) {
    if (msg.content == "") return

    const logMsgData: MessageOptions = {
        embeds: [
            new MessageEmbed()
                .setColor("#d50000")
                .setTitle("Message was deleted")
                .addField("Content", `> ${msg.content}`, false)
                .addField("Author", msg.author.toString(), true)
                .addField("Channel", msg.channel.toString(), true)
                .addField("Reason", reason, true)
                .setTimestamp()
        ]
    }
    msg.guild.systemChannel.send(logMsgData)

    reason = defaultReason
    isAutoAction = false
}
