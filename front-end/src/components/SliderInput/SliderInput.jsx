// Packages

// Components

// Logic
import { SliderInputLogic } from "./SliderInputLogic";

// Context

// Services

// Styles
import "./SliderInput.css";

// Assets

export const SliderInput = ({ value, min, max, step, onChange, enableSlider, hasPercentageColours, flipPercentageColours, hasThumb, label }) => {
	const {
		sliderInputContainerRef,
		sliderInputRef,
		sliderInputContainerClassName,
		sliderThumbStyles,
		sliderLabelStyles,
		labelRef,
		sliderProgressStyles,
	} = SliderInputLogic({
		value,
		min,
		max,
		enableSlider,
		hasPercentageColours,
		flipPercentageColours,
		hasThumb,
		label,
	});

	return (
		<div ref={sliderInputContainerRef} className={sliderInputContainerClassName}>
			<div className='slider'>
				<input
					ref={sliderInputRef}
					className='slider-input'
					type='range'
					value={value}
					onChange={!enableSlider ? () => {} : (e) => onChange(e)}
					min={min}
					max={max}
					step={step}
				/>
				<div className='slider-input-thumb' style={sliderThumbStyles} />
				<div className='slider-input-progress' style={sliderProgressStyles} />
				<div className='slider-input-background' />
			</div>
			<div
				className={label === undefined ? "slider-input-label-container slider-input-label-container-empty" : "slider-input-label-container"}
			>
				<div ref={labelRef} className='slider-input-label' style={sliderLabelStyles}>
					{label}
				</div>
			</div>
		</div>
	);
};
