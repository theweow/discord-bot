"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.permissions = exports.data = void 0;
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
exports.data = new builders_1.SlashCommandBuilder()
    .setDefaultPermission(true)
    .setName("info")
    .setDescription("Root command for info commands")
    .addSubcommand(sub => sub.setName("server")
    .setDescription("Info about server"));
exports.permissions = [];
function execute(interaction) {
    const guild = interaction.guild;
    if (interaction.options.getSubcommand() == "server")
        interaction.editReply({
            embeds: [
                new discord_js_1.MessageEmbed()
                    .setTitle(guild.name)
                    .setDescription("Info about guild")
                    .setImage(guild.iconURL())
                    .setTimestamp()
            ]
        });
    interaction.editReply("Error");
}
exports.execute = execute;
