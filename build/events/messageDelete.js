"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.setAutoAction = exports.setReason = void 0;
const discord_js_1 = require("discord.js");
const defaultReason = "No reason provided";
var reason = defaultReason;
var isAutoAction = false;
function setReason(newReason) {
    reason = newReason;
}
exports.setReason = setReason;
function setAutoAction() {
    isAutoAction = true;
}
exports.setAutoAction = setAutoAction;
function execute(client) {
    return (msg) => {
        if (msg.content == "")
            return;
        const logMsgData = {
            embeds: [
                new discord_js_1.MessageEmbed()
                    .setColor("#d50000")
                    .setTitle("Message was deleted")
                    .addField("Content", `> ${msg.content}`, false)
                    .addField("Author", `> ${msg.author}`, true)
                    .addField("Channel", `> ${msg.channel}`, true)
                    .addField("Reason", `> ${reason}`, true)
                    .setTimestamp()
            ]
        };
        msg.guild.systemChannel.send(logMsgData);
        reason = defaultReason;
        isAutoAction = false;
    };
}
exports.execute = execute;
