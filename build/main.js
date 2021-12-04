"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const discord_js_1 = __importDefault(require("discord.js"));
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
const fs = __importStar(require("fs"));
const config = require("../config.json");
const logger = __importStar(require("./logger"));
const registerHandlers_1 = __importDefault(require("./registerHandlers"));
// Init
const client = new discord_js_1.default.Client({
    intents: [
        discord_js_1.default.Intents.FLAGS.DIRECT_MESSAGES,
        discord_js_1.default.Intents.FLAGS.GUILDS,
        discord_js_1.default.Intents.FLAGS.GUILD_MESSAGES,
        discord_js_1.default.Intents.FLAGS.GUILD_MEMBERS,
    ]
});
// Slash commands
const commands = [];
const commandFiles = fs.readdirSync(__dirname + "/commands");
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}
const rest = new rest_1.REST({ version: '9' }).setToken(process_1.env.WEOW_BOT_TOKEN);
(async () => {
    try {
        await rest.put(v9_1.Routes.applicationCommands(config.clientId), { body: commands });
    }
    catch (error) {
        logger.error(error);
    }
})();
client.on('interactionCreate', async (interaction) => {
    if (interaction.isCommand())
        try {
            await interaction.deferReply({
                ephemeral: true
            });
            require(`./commands/${interaction.commandName}`).execute(interaction);
        }
        catch (err) {
            interaction.editReply(err.toString() || "Unable to get error");
            logger.error(err.toString());
        }
});
// Ready event
client.once("ready", () => {
    logger.info(`${client.user.tag} is online!`);
    client.application.fetch().then(application => {
        application.commands.fetch().then(commands => {
            commands.each(command => {
                const permissions = require(`./commands/${command.name}`).permissions;
                client.guilds.cache.each(guild => command.permissions.set({ guild, permissions }));
            });
        });
    });
});
(0, registerHandlers_1.default)(client);
// Login
client.login(process_1.env.WEOW_BOT_TOKEN);
