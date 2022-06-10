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

export const ColourPicker = ({ value, onChange, enableEdit, pickerVerticalPlacement, horizontalAlignment }) => {
	const { colourPickerClassName, isShowingPicker, setIsShowingPicker, colourBlockStyle, presetColours, onSketchPickerChange } = ColourPickerLogic(
		{ value, onChange, enableEdit, pickerVerticalPlacement, horizontalAlignment }
	);

	return (
		<div className={colourPickerClassName}>
			<div
				className='colour-picker-colour-block'
				style={colourBlockStyle}
				onClick={() => setIsShowingPicker((oldIsShowingPicker) => !oldIsShowingPicker)}
			/>
			<div className='colour-picker-colour-text'>{value}</div>
			{!enableEdit || (enableEdit && !isShowingPicker) ? null : (
				<SketchPicker className='colour-picker-sketch-picker' color={value} onChange={onSketchPickerChange} presetColors={presetColours} />
			)}
			{!enableEdit || (enableEdit && !isShowingPicker) ? null : (
				<div className='colour-picker-background' onClick={() => setIsShowingPicker(false)} />
			)}
		</div>
	);
};
