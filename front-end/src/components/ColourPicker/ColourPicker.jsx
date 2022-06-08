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
	const { isShowingPicker, setIsShowingPicker, colourBlockStyle, presetColours, onSketchPickerChange } = ColourPickerLogic({ value, onChange });

	return (
		<div className={enableEdit ? "colour-picker colour-picker-is-editing" : "colour-picker"}>
			{!enableEdit || (enableEdit && !isShowingPicker) ? null : (
				<SketchPicker className='colour-picker-sketch-picker' color={value} onChange={onSketchPickerChange} presetColors={presetColours} />
			)}
			<div
				className='colour-picker-colour-block'
				style={colourBlockStyle}
				onClick={() => setIsShowingPicker((oldIsShowingPicker) => !oldIsShowingPicker)}
			/>
			<div className='colour-picker-colour-text'>{value}</div>
			{!enableEdit || (enableEdit && !isShowingPicker) ? null : (
				<div className='colour-picker-background' onClick={() => setIsShowingPicker(false)} />
			)}
		</div>
	);
};
