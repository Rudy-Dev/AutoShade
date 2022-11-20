# Thanks to:
# https://github.com/csqrl/codify-plugin/blob/main/.vscode/scripts/local-install.ps1

$PLUGIN_NAME = "auto_shade_dev"

Remove-Item -Force "$env:LOCALAPPDATA\Roblox\Plugins\$PLUGIN_NAME.rbxm" -ErrorAction Ignore
rojo build .\default.project.json --watch -o "$env:LOCALAPPDATA\Roblox\Plugins\$PLUGIN_NAME.rbxm"