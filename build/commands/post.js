"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.permissions = exports.data = void 0;
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
exports.data = new builders_1.SlashCommandBuilder()
    .setName("post")
    .setDescription("Posts to news channel")
    .addStringOption(option => option.setName("title")
    .setDescription("Title of article")
    .setRequired(true))
    .addStringOption(option => option.setName("content")
    .setDescription("Content to be posted")
    .setRequired(true))
    .addStringOption(option => option.setName("color")
    .setDescription("Embed color")
    .setRequired(false))
    .setDefaultPermission(false);
exports.permissions = [
    {
        id: "916055079310733322",
        type: "ROLE",
        permission: true
    }
];
function execute(interaction) {
    const news = interaction.guild.channels.cache.get("908772616775532544");
    news.send({
        embeds: [
            new discord_js_1.MessageEmbed()
                .setColor(interaction.options.getString("color") || "#000000")
                .setTitle(interaction.options.getString("title"))
                .setDescription(interaction.options.getString("content"))
                .setAuthor(interaction.user.username, interaction.user.avatarURL())
                .setTimestamp()
        ]
    });
    interaction.editReply({
        embeds: [
            new discord_js_1.MessageEmbed()
                .setTitle("Successfully posted!")
                .setTimestamp()
        ]
    });
}
exports.execute = execute;
