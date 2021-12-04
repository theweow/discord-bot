"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const discord_js_1 = require("discord.js");
function execute(client) {
    return (member) => {
        member.guild.systemChannel.send({
            embeds: [
                new discord_js_1.MessageEmbed()
                    .setColor("#64dd17")
                    .setTitle("New member")
                    .setThumbnail(member.user.avatarURL())
                    .addField("Username", member.user.username, true)
                    .addField("ID", member.id, true)
                    .addField("Tag", member.user.toString(), true)
                    .addField("Account creation date", member.user.createdAt.toDateString(), false)
                    .setTimestamp()
            ]
        });
        member.send("**Добро пожаловать на сервер!**\nНастоятельно рекомендую сначала прочитать правила, а потом писать что-либо.");
    };
}
exports.execute = execute;
