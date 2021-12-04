"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.permissions = exports.data = void 0;
const builders_1 = require("@discordjs/builders");
const registerHandlers_1 = require("../registerHandlers");
exports.data = new builders_1.SlashCommandBuilder()
    .setDefaultPermission(false)
    .setName("dev")
    .setDescription("Root command for dev-only commands")
    .addSubcommand(sub => sub.setName("reload-events")
    .setDescription("Reloads events"));
exports.permissions = [
    {
        id: "768078647734173696",
        type: "USER",
        permission: true
    }
];
function execute(interaction) {
    if (interaction.options.getSubcommand() == "reload-events")
        (0, registerHandlers_1.updateHandlers)();
    interaction.editReply("Successfully");
}
exports.execute = execute;
