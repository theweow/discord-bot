import fs from "fs"
import path from "path"
import * as logger from "./logger"
import { client } from "./main"

function _baseLoad() {
    const eventFiles = fs.readdirSync(__dirname + "/events")
    for (const eventFile of eventFiles) {
        const basename = path.basename(eventFile, path.extname(eventFile))
        logger.progress("Register event:", basename)
        client.removeAllListeners(basename)
        client.on(basename, require(`./events/${eventFile}`).execute)
        logger.success()
    }
}

export default function registerHandlers() {
    _baseLoad()
}

export function updateHandlers() {
    logger.info("Started reloading handlers")
    _baseLoad()
}
