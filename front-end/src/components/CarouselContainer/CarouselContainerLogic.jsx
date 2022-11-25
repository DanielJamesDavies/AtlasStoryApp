// Packages
import { useEffect, useRef, useState } from "react";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const CarouselContainerLogic = ({ className, speed, scrollStartOnDataChange }) => {
	const [carouselClassName, setCarouselClassName] = useState(className ? "carousel-container" + className : "carousel-container");

	useEffect(() => {
		function getCarouselClassName() {
			let newClassName = "carousel-container";
			if (className) newClassName += " " + className;
			setCarouselClassName(newClassName);
		}
		getCarouselClassName();
	}, [setCarouselClassName, className]);

	const carouselContentRef = useRef();
	const [carouselContentScrollInterval, setCarouselContentScrollInterval] = useState(false);

	function scrollCarousel(scrollValue) {
		if (!carouselContentRef?.current || scrollValue === 0) {
			clearInterval(carouselContentScrollInterval);
			setCarouselContentScrollInterval(false);
			return;
		}
		if (carouselContentScrollInterval) return;
		var interval = setInterval(() => {
			setCarouselContentScrollInterval((oldCarouselContentScrollInterval) => {
				if (
					scrollValue !== 0 &&
					carouselContentRef?.current &&
					(carouselContentRef.current.scrollLeft !== 0 || scrollValue > 0) &&
					(carouselContentRef.current.scrollLeft !== carouselContentRef.current.scrollWidth - carouselContentRef.current.clientWidth ||
						scrollValue < 0)
				) {
					carouselContentRef.current.scrollLeft += scrollValue * 2;
					return interval;
				} else {
					clearInterval(oldCarouselContentScrollInterval);
					return false;
				}
			});
		}, 2);
		setCarouselContentScrollInterval(interval);
	}

	useEffect(() => {
		if (carouselContentRef?.current) carouselContentRef.current.scrollLeft = 0;
	}, [scrollStartOnDataChange]);

	return { carouselClassName, carouselContentRef, scrollCarousel };
};
