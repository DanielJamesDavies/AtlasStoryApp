// Packages
import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const SliderInputLogic = ({ value, min, max, enableSlider, hasPercentageColours, flipPercentageColours, hasThumb, label }) => {
	const [sliderInputContainerClassName, setSliderInputContainerClassName] = useState({});

	useEffect(() => {
		function getSliderInputContainerClassName() {
			let newSliderInputContainerClassName = "slider-input-container";
			if (enableSlider) newSliderInputContainerClassName += " slider-input-container-enabled";
			if (hasThumb) newSliderInputContainerClassName += " slider-input-container-has-thumb";
			if (label !== undefined) newSliderInputContainerClassName += " slider-input-container-has-label";
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
	}, [setSliderInputContainerClassName, value, max, enableSlider, hasPercentageColours, flipPercentageColours, hasThumb, label]);

	const [sliderThumbStyles, setSliderThumbStyles] = useState({});

	useEffect(() => {
		function getSliderThumbStyles() {
			var newSliderThumbStyles = {};
			newSliderThumbStyles.left = "calc(" + (value / max) * 100 + "% - (" + value / max + " * " + 6 + "px))";
			setSliderThumbStyles(newSliderThumbStyles);
		}
		getSliderThumbStyles();
	}, [setSliderThumbStyles, value, min, max]);

	const [sliderLabelStyles, setSliderLabelStyles] = useState({ opacity: 0 });
	const labelRef = useRef();

	const getSliderLabelStyles = useCallback(() => {
		if (!labelRef?.current?.clientWidth || labelRef?.current?.clientWidth === 0) return;
		var newSliderThumbStyles = {};
		newSliderThumbStyles.left = "calc(" + (value / max) * 100 + "% - ((" + labelRef?.current?.clientWidth + "px + 8px) / 2) + 5px)";
		if (parseInt(value) === parseInt(min)) newSliderThumbStyles.left = "0px";
		if (parseInt(value) === parseInt(max)) newSliderThumbStyles.left = "calc(100% - " + labelRef?.current?.clientWidth + "px)";
		setSliderLabelStyles(newSliderThumbStyles);
	}, [setSliderLabelStyles, labelRef, value, min, max]);

	useLayoutEffect(() => {
		getSliderLabelStyles();
	}, [setSliderLabelStyles, getSliderLabelStyles, label, labelRef, value, min, max]);

	const [sliderProgressStyles, setSliderProgressStyles] = useState({});

	useEffect(() => {
		function getSliderProgressStyles() {
			var newSliderProgressStyles = {};
			newSliderProgressStyles.width = "calc(" + (value / max) * 100 + "%" + (hasThumb ? "" : " + 5px") + ")";
			if (value / max === 1) newSliderProgressStyles.width = "calc(" + (value / max) * 100 + "%)";
			setSliderProgressStyles(newSliderProgressStyles);
		}
		getSliderProgressStyles();
	}, [setSliderProgressStyles, value, max, hasThumb]);

	const sliderInputContainerRef = useRef();
	useEffect(() => {
		const onTouch = (e) => (!enableSlider ? null : e.stopPropagation());
		const sliderInputContainerRefCurrent = sliderInputContainerRef.current;
		sliderInputContainerRefCurrent.addEventListener("touchstart", onTouch);
		sliderInputContainerRefCurrent.addEventListener("touchmove", onTouch);
		return () => {
			sliderInputContainerRefCurrent.removeEventListener("touchstart", onTouch);
			sliderInputContainerRefCurrent.removeEventListener("touchmove", onTouch);
		};
	}, [sliderInputContainerRef, enableSlider]);

	const sliderInputRef = useRef();
	useEffect(() => {
		const onTouch = (e) => (!enableSlider ? null : console.log(JSON.stringify(e)));
		const sliderInputRefCurrent = sliderInputRef.current;
		sliderInputRefCurrent.addEventListener("touchstart", onTouch);
		sliderInputRefCurrent.addEventListener("touchmove", onTouch);
		return () => {
			sliderInputRefCurrent.removeEventListener("touchstart", onTouch);
			sliderInputRefCurrent.removeEventListener("touchmove", onTouch);
		};
	}, [sliderInputRef, enableSlider]);

	return {
		sliderInputContainerRef,
		sliderInputRef,
		sliderInputContainerClassName,
		sliderThumbStyles,
		sliderLabelStyles,
		labelRef,
		sliderProgressStyles,
	};
};
