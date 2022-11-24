import Roact from "@rbxts/roact";
import { Label, Slider, TextInput } from "@rbxts/StudioComponents";
import Hooks from "@rbxts/roact-hooks";
import { DefaultValue } from "config";

interface ISelectorProps {
	LabelText: string;
	Position: UDim;
	Value: [number, (value: number) => void];
}

const Selector: Hooks.FC<ISelectorProps> = (props, { useState }) => {
	const [value, setValue] = props.Value;
	const [disabled, _] = useState(false);

	return (
		<frame Size={UDim2.fromScale(1, 1)} BackgroundTransparency={1}>
			<Label
				Text={props.LabelText}
				AnchorPoint={new Vector2(0.5, 0)}
				Size={new UDim2(1, 0, 0, 25)}
				Position={new UDim2(0.5, 0, 0 + props.Position.Scale, -10 + props.Position.Offset)}
			/>
			<TextInput
				OnFocusLost={(text) => {
					setValue(math.clamp(tonumber(text) ?? DefaultValue, 0, 1));
				}}
				PlaceholderText={props.LabelText}
				Text={string.format("%.2f", value)}
				AnchorPoint={new Vector2(0.5, 1)}
				Size={new UDim2(0.99, 0, 0, 21)}
				Position={new UDim2(0.5, -1, 0 + props.Position.Scale, 35 + props.Position.Offset)}
			/>
			<Slider
				Min={0}
				Max={1}
				OnChange={(v) => {
					setValue(v);
				}}
				Step={0.01}
				Value={value}
				Disabled={disabled}
				Size={new UDim2(1, 0, 0, 25)}
				AnchorPoint={new Vector2(0.5, 1)}
				Position={new UDim2(0.5, 0, 0 + props.Position.Scale, 63 + props.Position.Offset)}
			/>
		</frame>
	);
};
export = new Hooks(Roact)(Selector);
