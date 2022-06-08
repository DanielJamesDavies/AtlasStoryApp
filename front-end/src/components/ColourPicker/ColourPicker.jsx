// Packages
import { SketchPicker } from "react-color";

// Components

// Logic
import { ColourPickerLogic } from "./ColourPickerLogic";

// Context

// Services

// Styles
import "./ColourPicker.css";

// Assets

export const ColourPicker = ({ value, onChange, enableEdit }) => {
	const { colourBlockStyle, presetColours, onSketchPickerChange } = ColourPickerLogic({ value, onChange });

	return (
		<div className='colour-picker'>
			{!enableEdit ? null : (
				<SketchPicker className='colour-picker-sketch-picker' color={value} onChange={onSketchPickerChange} presetColors={presetColours} />
			)}
			<div className='colour-picker-colour-block' style={colourBlockStyle} />
			<div className='colour-picker-colour-text'>{value}</div>
		</div>
	);
};
