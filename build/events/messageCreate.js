"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const utils_1 = __importDefault(require("../utils"));
function execute(client) {
    return (msg) => {
        if (msg.author == client.user)
            return;
        utils_1.default.messageFilter(msg);
        if (msg.content.includes(client.user.id)) {
            if (msg.content.toLowerCase().includes("что делаешь")) {
                msg.reply("Читаю фанфик со шкафом");
            }
            else {
                msg.channel.send("Кто осмелился отвлечь меня от чтения фанфиков со Шкафом? :eyes:");
            }
        }
    };
}
exports.execute = execute;
