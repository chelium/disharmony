"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SimpleFileWriter = require("simple-file-writer");
class FileEventLogger {
    constructor(path) {
        this.logWriter = new SimpleFileWriter(path);
    }
    logEvent(action, parameters) {
        const logStr = JSON.stringify({ ts: new Date().getTime(), action, parameters }) + "\n";
        return new Promise(resolve => this.logWriter.write(logStr, resolve));
    }
}
exports.default = FileEventLogger;
//# sourceMappingURL=file-event-logger.js.map