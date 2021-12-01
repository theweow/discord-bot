import { Client, Message, MessageEmbed } from "discord.js"

const defaultReason = "No reason provided"
var reason: string = defaultReason

export function setReason(newReason: string) {
    reason = newReason
}

export function execute(client: Client) {
    return (msg: Message) => {
        if (msg.content == "") return

        msg.guild.systemChannel.send({
            embeds: [
                new MessageEmbed()
                    .setColor("#d50000")
                    .setTitle("Message was deleted")
                    .addField("Content", `> ${msg.content}`, false)
                    .addField("Author", `> ${msg.author}`, true)
                    .addField("Reason", `> ${reason}`, true)
                    .setTimestamp()
            ]
        })
        reason = defaultReason
    }
}
