import { Client, Message } from "discord.js"
import utils from "../utils"

export function execute(client: Client) {
    return (msg: Message) => {
        if (msg.author == client.user) return
        utils.messageFilter(msg)
    }
}
