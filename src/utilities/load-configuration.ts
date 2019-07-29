// tslint:disable: no-console
import * as Joi from "@hapi/joi"
import { existsSync } from "fs"
import { resolve } from "path"
import Config from "../models/internal/config"
import { ExitCodes } from "./exit-codes"

export default function (configPath: string = "./config.json")
{
    let config: Config = null as unknown as Config
    if (existsSync(configPath))
        config = require(resolve(process.cwd(), configPath))
    else
    {
        console.error("No config file found!")
        process.exit(ExitCodes.ConfigLoadError)
    }

    if (process.env.TOKEN)
        config.token = process.env.TOKEN

    if (process.env.DB_STRING)
        config.dbConnectionString = process.env.DB_STRING

    if (!isConfigValid(config!))
    {
        console.error("Invalid config!")
        process.exit(ExitCodes.ConfigLoadError)
    }

    return {
        config,
        isLocalDb: config!.dbConnectionString.startsWith("nedb://"),
        configPath,
    }
}

export function isConfigValid(config: Config)
{
    const schema = Joi.object().keys({
        dbConnectionString: Joi.string().required(),
        token: Joi.string().required(),
        serviceName: Joi.string().required(),
        requiredPermissions: Joi.number().required(),
        askTimeoutMs: Joi.number().required(),
        heartbeat: Joi.object().optional().keys({
            url: Joi.string().required(),
            intervalSec: Joi.number().required(),
        }),
        dbClientConfig: Joi.object().optional(),
    })

    const { error } = Joi.validate(config, schema)
    return !error
}