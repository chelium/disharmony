import { GuildMember as DjsGuildMember, Role } from "discord.js";
import { PermissionLevel } from "../../commands/command";
import Document from "../document";
import DjsExtensionModel from "./djs-extension-model";
export default class DisharmonyGuildMember extends Document implements DjsExtensionModel<DjsGuildMember> {
    readonly djs: DjsGuildMember;
    get permissions(): import("discord.js").Permissions;
    get nickname(): string | null;
    get username(): string;
    addRole(snowflake: string | Role, reason?: string): Promise<DjsGuildMember>;
    removeRole(snowflake: string | Role, reason?: string): Promise<DjsGuildMember>;
    getPermissionLevel(): PermissionLevel;
    toString(): string;
    constructor(djs: DjsGuildMember);
}
