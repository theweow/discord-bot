import { Client, Message, MessageActionRow, MessageButton, MessageEmbed, MessageOptions } from "discord.js"

const defaultReason = "No reason provided"
var reason: string = defaultReason
var isAutoAction: boolean = false

export function setReason(newReason: string) {
    reason = newReason
}

export function setAutoAction() {
    isAutoAction = true
}

export function execute(client: Client) {
    return (msg: Message) => {
        if (msg.content == "") return

        const logMsgData: MessageOptions = {
            embeds: [
                new MessageEmbed()
                    .setColor("#d50000")
                    .setTitle("Message was deleted")
                    .addField("Content", `> ${msg.content}`, false)
                    .addField("Author", `> ${msg.author}`, true)
                    .addField("Channel", `> ${msg.channel}`, true)
                    .addField("Reason", `> ${reason}`, true)
                    .setTimestamp()
            ]
        }

        if (isAutoAction)
            logMsgData.components = [
                new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setLabel("Ban")
                            .setStyle("DANGER")
                    )
            ]

        msg.guild.systemChannel.send(logMsgData)

        reason = defaultReason
        isAutoAction = false
    }
}
