import { $env } from "rbxts-transform-env";

export const Version = $env.string("VERSION", "1.0.0");
export const Dev = $env.boolean("DEV", false);
export const DefaultValue = $env.number("DEFAULT_VALUE", 0.05);
export const Icon = $env.string("ICON", "rbxassetid://11621392294");
export const Name = $env.string("NAME", "AutoShade");
