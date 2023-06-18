// Packages
import { useEffect, useLayoutEffect, useState, useRef } from "react";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const IconBtnLogic = ({ className, seamless, size, iconName, iconHover, isLight }) => {
	const [iconBtnClassName, setIconBtnClassName] = useState("icon-btn-container-hidden");

	useEffect(() => {
		function getIconBtnClassName() {
			let newClassName = "icon-btn-container";

			if (seamless) newClassName += " icon-btn-container-seamless";
			if (isLight) newClassName += " icon-btn-container-light";
			if (iconHover) newClassName += " icon-btn-container-has-hover-icon";

			switch (size) {
				case "xs":
					newClassName += " icon-btn-container-extra-small";
					break;
				case "s":
					newClassName += " icon-btn-container-small";
					break;
				case "l":
					newClassName += " icon-btn-container-large";
					break;
				default:
					break;
			}

			if (iconName) newClassName += ` icon-btn-container-${iconName}-icon`;

			if (className) newClassName += " " + className;
			return newClassName;
		}
		setIconBtnClassName(getIconBtnClassName());
	}, [setIconBtnClassName, className, seamless, size, iconName, iconHover, isLight]);

	const containerRef = useRef();
	const labelRef = useRef();
	const [labelStyle, setLabelStyles] = useState({});

	useLayoutEffect(() => {
		function updateLabelPosition() {
			if (!containerRef?.current || !labelRef?.current) return;
			if (containerRef?.current?.offsetLeft + labelRef?.current?.clientWidth > window?.innerWidth) {
				setLabelStyles({
					left: -1 * (containerRef?.current?.offsetLeft + labelRef?.current?.clientWidth - window?.innerWidth - 14) + "px",
				});
			} else {
				setLabelStyles({});
			}
		}
		updateLabelPosition();
		window.addEventListener("resize", updateLabelPosition);
		const containerRefCurrent = containerRef?.current;
		containerRefCurrent.addEventListener("mouseenter", updateLabelPosition);
		return () => {
			window.removeEventListener("resize", updateLabelPosition);
			containerRefCurrent.removeEventListener("mouseenter", updateLabelPosition);
		};
	}, [containerRef, labelRef, setLabelStyles]);

	return { iconBtnClassName, containerRef, labelRef, labelStyle };
};
