"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.permissions = exports.data = void 0;
const builders_1 = require("@discordjs/builders");
exports.data = new builders_1.SlashCommandBuilder()
    .setDefaultPermission(false)
    .setName("admin")
    .setDescription("Root of admin commands")
    .addSubcommand(sub => sub.setName("ban")
    .setDescription("Bans member from guild")
    .addUserOption(option => option.setName("member")
    .setDescription("Member to be banned")
    .setRequired(true))
    .addStringOption(option => option.setName("reason")
    .setDescription("Reason")
    .setRequired(false)))
    .addSubcommand(sub => sub.setName("kick")
    .setDescription("Kicks member from guild")
    .addUserOption(option => option.setName("member")
    .setDescription("Member to be kicked")
    .setRequired(true))
    .addStringOption(option => option.setName("reason")
    .setDescription("Reason")
    .setRequired(false)));
exports.permissions = [
    {
        id: "908769573141106718",
        type: "ROLE",
        permission: true
    }
];
function execute(interaction) {
    const member = interaction.options.getMember("member");
    if (member == undefined) {
        interaction.editReply("Unable to get user");
        return;
    }
    if (interaction.options.getSubcommand() == "kick") {
        if (member.kickable == false) {
            interaction.editReply(`Unable to kick ${member}`);
            return;
        }
        member.kick(interaction.options.getString("reason"));
        interaction.editReply(`Successfully kicked ${member}`);
        return;
    }
    if (interaction.options.getSubcommand() == "ban") {
        if (member.kickable == false) {
            interaction.editReply(`Unable to ban ${member}`);
            return;
        }
        member.ban({ reason: interaction.options.getString("reason") });
        interaction.editReply(`Successfully banned ${member}`);
        return;
    }
}
exports.execute = execute;
