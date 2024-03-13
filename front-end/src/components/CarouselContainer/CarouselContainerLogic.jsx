// Packages
import { useEffect, useRef, useState } from "react";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const CarouselContainerLogic = ({ children, className, speed, scrollStartOnDataChange, disableOnMobile, buttonScroll }) => {
	const [carouselClassName, setCarouselClassName] = useState(className ? "carousel-container" + className : "carousel-container");

	useEffect(() => {
		function getCarouselClassName() {
			let newClassName = "carousel-container";
			if (className) newClassName += " " + className;
			if (disableOnMobile) newClassName += " carousel-container-disabled-on-mobile";
			if (buttonScroll) newClassName += " carousel-container-button-scroll";
			setCarouselClassName(newClassName);
		}
		getCarouselClassName();
	}, [setCarouselClassName, className, disableOnMobile, buttonScroll]);

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

	var isScrollingWithBtn = false;
	var secondScrollClickDirection = 0;

	function onScrollBtn(direction) {
		if (isScrollingWithBtn) {
			secondScrollClickDirection = direction;
			return false;
		}

		if (carouselContentRef.current.scrollLeft === 0 && direction === -1) return false;
		if (
			carouselContentRef.current.scrollLeft >= carouselContentRef.current.scrollWidth - carouselContentRef.current.clientWidth &&
			direction === 1
		)
			return false;

		isScrollingWithBtn = true;
		secondScrollClickDirection = 0;

		// Calculate Distance to Scroll
		let scroll_distance = 0;

		// Calculate Width of Items in View
		let child_widths = Array.from(carouselContentRef.current.children?.[0]?.children).map((child) => {
			const childStyle = window.getComputedStyle(child);
			const childWidth = child.offsetWidth;
			const childMargin = parseFloat(childStyle.marginLeft) + parseFloat(childStyle.marginRight);
			return childWidth + childMargin;
		});

		let parent_gap = parseFloat(window.getComputedStyle(carouselContentRef.current.children?.[0])?.gap);
		if (isNaN(parent_gap)) parent_gap = 0;

		child_widths = child_widths.join("," + parent_gap + ",").split(",");

		let children_in_view = 0;
		let remaining_parent_width = JSON.parse(JSON.stringify(carouselContentRef.current?.clientWidth));
		child_widths?.map((e, i) => {
			remaining_parent_width -= parseFloat(e);
			if (remaining_parent_width >= 0 && i % 2 === 0) children_in_view++;
			return true;
		});

		const extra_space = (carouselContentRef.current.clientWidth - (parseFloat(child_widths[0]) + parent_gap) * children_in_view) / 2;

		scroll_distance = (parseFloat(child_widths[0]) + parent_gap) * children_in_view;
		let new_scroll_distance = JSON.parse(JSON.stringify(scroll_distance));
		if (
			(carouselContentRef.current.scrollLeft === 0 && direction === 1) ||
			(carouselContentRef.current.scrollLeft >= carouselContentRef.current.scrollWidth - carouselContentRef.current.clientWidth &&
				direction === -1)
		)
			new_scroll_distance -= extra_space;

		carouselContentRef.current.scrollLeft += direction * new_scroll_distance;

		setTimeout(() => {
			isScrollingWithBtn = false;
			const newSecondScrollClickDirection = JSON.parse(JSON.stringify(secondScrollClickDirection));
			secondScrollClickDirection = 0;
			if (newSecondScrollClickDirection !== 0) onScrollBtn(newSecondScrollClickDirection);
		}, 700);
	}

	const [showingScrollButtons, setShowingScrollButtons] = useState(false);

	useEffect(() => {
		setShowingScrollButtons(carouselContentRef?.current?.scrollWidth - carouselContentRef?.current?.clientWidth > 0);
		setTimeout(() => setShowingScrollButtons(carouselContentRef?.current?.scrollWidth - carouselContentRef?.current?.clientWidth > 0), 1);
	}, [children]);

	return { carouselClassName, carouselContentRef, scrollCarousel, onScrollBtn, showingScrollButtons };
};
