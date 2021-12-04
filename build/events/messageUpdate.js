"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const discord_js_1 = require("discord.js");
const utils_1 = __importDefault(require("../utils"));
function execute(client) {
    return (oldMsg, newMsg) => {
        const msg = newMsg;
        if (msg.author == client.user || oldMsg.content == "" || oldMsg.content == newMsg.content)
            return;
        msg.guild.systemChannel.send({
            embeds: [
                new discord_js_1.MessageEmbed()
                    .setColor("#2962ff")
                    .setTitle("Message was edited")
                    .addField("Old content", `> ${oldMsg.content}`, false)
                    .addField("New content", `> ${newMsg.content}`, false)
                    .addField("Author", `> ${msg.author}`, true)
                    .addField("Channel", `> ${msg.channel}`, true)
                    .setTimestamp()
            ],
            components: [
                new discord_js_1.MessageActionRow()
                    .addComponents(new discord_js_1.MessageButton()
                    .setStyle("LINK")
                    .setLabel("Message")
                    .setURL(msg.url))
            ]
        });
        utils_1.default.messageFilter(newMsg);
    };
}
exports.execute = execute;
