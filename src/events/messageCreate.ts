import { Client, Message } from "discord.js"
import utils from "../utils"

export function execute(client: Client) {
    return (msg: Message) => {
        if (msg.author == client.user) return
        utils.messageFilter(msg)

        if (msg.content.includes(client.user.id)) {
            if (msg.content.toLowerCase().includes("что делаешь")) {
                msg.reply("Читаю фанфик со шкафом")
            } else {
                msg.channel.send("Кто осмелился отвлечь меня от чтения фанфиков со Шкафом? :eyes:")
            }
        }
    }
}
