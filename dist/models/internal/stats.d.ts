import { Client as DjsClient } from "discord.js";
export default class Stats {
    private dClient;
    get guildCount(): number;
    get userCount(): number;
    get uptime(): number;
    get uptimeStr(): string;
    private toHHMMSS;
    constructor(dClient: DjsClient);
}
