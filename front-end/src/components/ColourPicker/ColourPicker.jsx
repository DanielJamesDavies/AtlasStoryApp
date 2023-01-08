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

export const ColourPicker = ({
	value,
	onChange,
	size,
	displayText,
	enableEdit,
	pickerVerticalPlacement,
	horizontalAlignment,
	noBackground,
	circular,
}) => {
	const { colourPickerClassName, isShowingPicker, setIsShowingPicker, colourBlockStyle, presetColours, onSketchPickerChange } = ColourPickerLogic(
		{ value, onChange, size, enableEdit, pickerVerticalPlacement, horizontalAlignment, circular }
	);

	return (
		<div
			className={colourPickerClassName}
			onTouchMove={(e) => e.stopPropagation()}
			onClick={() => setIsShowingPicker((oldIsShowingPicker) => !oldIsShowingPicker)}
		>
			<div className='colour-picker-colour-block' style={colourBlockStyle} />
			{displayText === false ? null : <div className='colour-picker-colour-text'>{value}</div>}
			<div className='colour-picker-sketch-picker-container' onClick={(e) => e.stopPropagation()}>
				{!enableEdit || (enableEdit && !isShowingPicker) ? null : (
					<SketchPicker
						className='colour-picker-sketch-picker'
						color={value}
						onChange={onSketchPickerChange}
						presetColors={presetColours}
					/>
				)}
			</div>
			<div onClick={(e) => e.stopPropagation()}>
				{!enableEdit || (enableEdit && !isShowingPicker) || noBackground ? null : (
					<div className='colour-picker-background' onClick={() => setIsShowingPicker(false)} />
				)}
			</div>
		</div>
	);
};
