"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageFilter = exports.wait = void 0;
const discord_js_1 = require("discord.js");
const messageDelete_1 = require("./events/messageDelete");
/**
 * Just waits
 *
 * @param time time in milliseconds
 */
exports.wait = require('util').promisify(setTimeout);
/**
 * Filters message
 * @param msg Message
 * @param client Client (for event emit)
 * @returns Did message passed filter
 */
function messageFilter(msg) {
    // Anti-spam
    if (msg.content.toLowerCase().includes("discord.gg/")) {
        (0, messageDelete_1.setAutoAction)();
        (0, messageDelete_1.setReason)("Link to discord server");
        if (msg.deletable)
            msg.delete();
        return false;
    }
    if (msg.content.toLowerCase().includes("http")) {
        msg.guild.systemChannel.send({
            embeds: [
                new discord_js_1.MessageEmbed()
                    .setTitle("Suspicious message detected")
                    .setColor("#ff6d00")
                    .addField("Content", `> ${msg.content}`, false)
                    .addField("Author", `> ${msg.author}`, true)
                    .addField("Channel", `> ${msg.channel}`, true)
                    .addField("Why", "> Contains link-like text", true)
                    .setTimestamp()
            ],
            components: [
                new discord_js_1.MessageActionRow()
                    .addComponents(new discord_js_1.MessageButton()
                    .setLabel("Message")
                    .setStyle("LINK")
                    .setURL(msg.url))
            ]
        });
    }
    // Anti-Flood
    const lastMsg = msg.channel.messages.cache.filter(m => m.author == msg.author).last(2)[0];
    const timeElapsed = msg.createdTimestamp - lastMsg?.createdTimestamp;
    if (lastMsg == msg)
        return;
    if (timeElapsed < 500 && timeElapsed > 0) {
        (0, messageDelete_1.setAutoAction)();
        (0, messageDelete_1.setReason)("Flood");
        msg.delete();
        return false;
    }
    if (msg.content == lastMsg?.content) {
        (0, messageDelete_1.setAutoAction)();
        (0, messageDelete_1.setReason)("Flood");
        msg.delete();
        return false;
    }
    return true;
}
exports.messageFilter = messageFilter;
exports.default = {
    messageFilter: messageFilter,
    wait: exports.wait,
};
