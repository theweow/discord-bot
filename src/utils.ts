import { GuildTextBasedChannel, Message } from "discord.js"
import { setAutoAction, setReason } from "./events/messageDelete"
import * as logger from "./logger"

/**
 * Generates channel link
 * @param channel Channel
 * @returns Channel link
 */
export const generateChannelLink = (channel: GuildTextBasedChannel): string => `https://discord.com/channels/${channel.guildId}/${channel.id}/`

/**
 * Filters message
 * @param msg Message
 * @param client Client (for event emit)
 * @returns Did message passed filter
 */
export function messageFilter(msg: Message): boolean {
    // Anti-piar
    if (msg.content.toLowerCase().includes("discord.gg/")) {
        setReason("Link to discord server")
        if (msg.deletable) msg.delete()
        return false
    }

    // Anti-Flood
    const lastMsg = msg.channel.messages.cache.filter(m => m.author == msg.author).last(2)
    const timeElapsed = msg.createdTimestamp - lastMsg[0]?.createdTimestamp
    if (timeElapsed < 500 && timeElapsed > 0) {
        setAutoAction()
        setReason("Flood")
        msg.delete()
        return false
    }

    if (lastMsg[1]?.content == lastMsg[0]?.content) {
        setAutoAction()
        setReason("Flood")
        lastMsg[1].delete()
        return false
    }

    return true
}

export default {
    generateChannelLink: generateChannelLink,
    messageFilter: messageFilter,
}
