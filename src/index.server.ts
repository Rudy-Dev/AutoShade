import Roact from "@rbxts/roact";
import app from "app";
import { Icon, Name } from "config";
import { $env } from "rbxts-transform-env";
if (game.GetService("RunService").IsEdit()) {
	const toolbar = plugin.CreateToolbar(Name);
	const button = toolbar.CreateButton(Name, "Toggle AutoShade", Icon);
	const widget = plugin.CreateDockWidgetPluginGui(
		Name,
		new DockWidgetPluginGuiInfo(Enum.InitialDockState.Float, false, false, 150, 250, 150, 250),
	);
	const IS_DEV = $env.boolean("DEV");

	widget.Name = Name;
	widget.Title = Name;

	let enabled = false;
	button.Click.Connect(() => {
		enabled = !enabled;
		widget.Enabled = enabled;
	});

	if (!IS_DEV) {
		widget.BindToClose(() => {
			enabled = false;
			//hacky way to get the button to update
			plugin.Activate(true);
			plugin.Activate(false);
		});
	}

	Roact.mount(Roact.createElement(app, { Plugin: plugin }), widget);
}
