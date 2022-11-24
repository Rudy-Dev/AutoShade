import { $env } from "rbxts-transform-env";

export const Version = $env.string("VERSION", "1.0.0") as string;
export const Dev = $env.boolean("DEV", false) as boolean;
export const DefaultValue = $env.number("DEFAULT_VALUE", 0.05) as number;
export const Icon = $env.string("ICON", "rbxassetid://11621392294") as string;
export const Name = $env.string("NAME", "AutoShade") as string;
