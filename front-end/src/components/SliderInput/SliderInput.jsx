// Packages

// Components

// Logic
import { SliderInputLogic } from "./SliderInputLogic";

// Context

// Services

// Styles
import "./SliderInput.css";

// Assets

export const SliderInput = ({ value, min, max, step, onChange, enableSlider, hasPercentageColours, flipPercentageColours }) => {
	const { sliderInputContainerClassName, sliderProgressStyles } = SliderInputLogic({
		value,
		max,
		hasPercentageColours,
		flipPercentageColours,
	});

	return (
		<div className={sliderInputContainerClassName}>
			<input
				className='slider-input'
				type='range'
				value={value}
				onChange={!enableSlider ? () => {} : (e) => onChange(e)}
				min={min}
				max={max}
				step={step}
			/>
			<div className='slider-input-progress' style={sliderProgressStyles} />
			<div className='slider-input-background' />
		</div>
	);
};
