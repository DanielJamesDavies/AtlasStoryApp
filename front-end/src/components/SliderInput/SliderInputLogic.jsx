// Packages
import { useState, useEffect } from "react";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const SliderInputLogic = ({ value, max, hasPercentageColours, flipPercentageColours }) => {
	const [sliderInputContainerClassName, setSliderInputContainerClassName] = useState({});
	const [sliderProgressStyles, setSliderProgressStyles] = useState({});

	useEffect(() => {
		function getSliderInputContainerClassName() {
			let newSliderInputContainerClassName = "slider-input-container";
			if (hasPercentageColours) {
				const valuePercentage = !flipPercentageColours ? (value / max) * 100 : 100 - (value / max) * 100;
				if (valuePercentage <= 4) {
					newSliderInputContainerClassName += " slider-input-container-percentage-colour-exceptionally-low";
				} else if (valuePercentage <= 14) {
					newSliderInputContainerClassName += " slider-input-container-percentage-colour-very-low";
				} else if (valuePercentage <= 24) {
					newSliderInputContainerClassName += " slider-input-container-percentage-colour-low";
				} else if (valuePercentage <= 39) {
					newSliderInputContainerClassName += " slider-input-container-percentage-colour-moderately-low";
				} else if (valuePercentage <= 60) {
					newSliderInputContainerClassName += " slider-input-container-percentage-colour-typical";
				} else if (valuePercentage <= 75) {
					newSliderInputContainerClassName += " slider-input-container-percentage-colour-moderately-high";
				} else if (valuePercentage <= 85) {
					newSliderInputContainerClassName += " slider-input-container-percentage-colour-high";
				} else if (valuePercentage <= 95) {
					newSliderInputContainerClassName += " slider-input-container-percentage-colour-very-high";
				} else {
					newSliderInputContainerClassName += " slider-input-container-percentage-colour-exceptionally-high";
				}
			}
			setSliderInputContainerClassName(newSliderInputContainerClassName);
		}
		getSliderInputContainerClassName();
	}, [setSliderInputContainerClassName, value, max, hasPercentageColours, flipPercentageColours]);

	useEffect(() => {
		function getSliderProgressStyles() {
			var newSliderProgressStyles = {};
			newSliderProgressStyles.width = "calc(" + (value / max) * 100 + "% + 5px)";
			if (value / max === 1) newSliderProgressStyles.width = "calc(" + (value / max) * 100 + "%)";
			setSliderProgressStyles(newSliderProgressStyles);
		}
		getSliderProgressStyles();
	}, [value, max, setSliderProgressStyles]);

	return { sliderInputContainerClassName, sliderProgressStyles };
};
