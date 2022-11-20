import Roact from "@rbxts/roact";
import { Background, MainButton, Checkbox, Label, Button } from "@rbxts/StudioComponents";
import Hooks from "@rbxts/roact-hooks";
import Selector from "Components/Selector";
import { DefaultValue, Version } from "config";

interface IAppProps {
	Plugin: Plugin;
}

const Selection = game.GetService("Selection");
const ChangeHistoryService = game.GetService("ChangeHistoryService");

const random = new Random();

function paint(part: BasePart, maxValue: number, minValue: number) {
	const color = part.Color;

	const shade = random.NextNumber(-minValue, maxValue);
	return new Color3(
		math.clamp(color.R + shade, 0, 1),
		math.clamp(color.G + shade, 0, 1),
		math.clamp(color.B + shade, 0, 1),
	);
}

function handlePaint(recursive: boolean, maxValue: number, minValue: number) {
	Selection.Get().forEach((obj) => {
		if (recursive)
			obj.GetDescendants().forEach((descendant) => {
				if (descendant.IsA("BasePart")) {
					descendant.Color = paint(descendant, maxValue, minValue);
				}
			});
		else
			obj.GetChildren().forEach((descendant) => {
				if (descendant.IsA("BasePart")) {
					descendant.Color = paint(descendant, maxValue, minValue);
				}
			});
	});
	ChangeHistoryService.SetWaypoint("AutoShade paint");
}

const App: Hooks.FC<IAppProps> = (props, { useState, useEffect }) => {
	const [recursive, setRecursive] = useState(false);

	const [maxValue, setMaxValue] = useState(DefaultValue);
	const [minValue, setMinValue] = useState(DefaultValue);

	useEffect(() => {
		props.Plugin.CreatePluginAction(
			"AutoShadePaint",
			"Paint",
			"Paint selected parts",
			"rbxassetid://11620912368",
			true,
		).Triggered.Connect(() => handlePaint(recursive, maxValue, minValue));
	}, []);

	return (
		<Background Size={UDim2.fromScale(1, 1)}>
			<uipadding PaddingTop={new UDim(0, 15)} PaddingBottom={new UDim(0, 10)} />
			<Selector LabelText="Min color range" Value={[minValue, setMinValue]} Position={new UDim(0, 0)} />
			<Selector LabelText="Max color range" Value={[maxValue, setMaxValue]} Position={new UDim(0, 75)} />
			<Checkbox
				Value={recursive}
				OnActivated={() => setRecursive(!recursive)}
				RichText={true}
				Label="<b>Recursive paint</b>"
				AnchorPoint={new Vector2(0, 1)}
				Position={new UDim2(0, 0, 1, -54)}
			/>
			<Button
				Text="Reset values"
				OnActivated={() => {
					setMaxValue(DefaultValue);
					setMinValue(DefaultValue);
				}}
				Size={new UDim2(0, 65, 0, 25)}
				AnchorPoint={new Vector2(0.5, 0)}
				Position={new UDim2(0.5, 0, 0, 141)}
			/>
			<MainButton
				Text="Paint"
				TextXAlignment={Enum.TextXAlignment.Center}
				OnActivated={() => {
					handlePaint(recursive, maxValue, minValue);
				}}
				TextScaled={true}
				Size={new UDim2(0, 70 + 20, 0, 34)}
				AnchorPoint={new Vector2(0.5, 1)}
				Position={new UDim2(0.5, 0, 1, 0)}
			/>
			<Label
				Text={Version}
				TextColorStyle={Enum.StudioStyleGuideColor.DimmedText}
				Size={new UDim2(0, 90, 0, 34)}
				AnchorPoint={new Vector2(1, 1)}
				Position={new UDim2(1, 30, 1, 15)}
			/>
		</Background>
	);
};

export = new Hooks(Roact)(App);
