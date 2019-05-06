import { IClient } from "../core/client"
import BotMessage from "../models/discord/message"

// allow any type messages so implementers can override Message as for some reason derived types aren't allowed
type InvokeFunc = (params: string[], message: BotMessage | any, client: IClient) => Promise<string | void>

export enum PermissionLevel
{
    Anyone = 0,
    Admin = 1,
    HostOwner = 2,
}

export default class Command
{
    public invokeDependency?: any
    constructor(
        public name: string,
        public description: string,
        public syntax: string,
        public permissionLevel: PermissionLevel,
        public invoke: InvokeFunc) { }
}