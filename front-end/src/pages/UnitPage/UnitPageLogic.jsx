// Packages
import { useContext, useEffect, useRef } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "./UnitPageContext";

// Services

// Styles

// Assets

export const UnitPageLogic = () => {
	const {
		unit,
		unit_type,
		unitPageStyle,
		unitOverviewBackground,
		unitOverviewForegrounds,
		isOnOverviewSection,
		setIsOnOverviewSection,
		unitPagePrimaryRef,
	} = useContext(UnitPageContext);

	const unitPageContainerRef = useRef();
	const unitOverviewContainerRef = useRef();
	const unitSubpagesContainerRef = useRef();

	const touchStartCoords = useRef({ x: 0, y: 0 });
	useEffect(() => {
		const onWheel = (e) => (!unit || !unitPageStyle || e?.ctrlKey ? null : setIsOnOverviewSection(Math.sign(e?.deltaY) === -1));
		const onTouchStart = (e) => {
			touchStartCoords.current = { x: e.touches[0].pageX, y: e.touches[0].pageY };
		};
		const onTouchMove = (e) => {
			const touchMoveCoords = { x: e.touches[0].pageX, y: e.touches[0].pageY };
			if (Math.abs(touchStartCoords.current.y - touchMoveCoords.y) > 24) return (touchStartCoords.current = { x: 0, y: 0 });
			const deltaX = touchStartCoords.current.x - touchMoveCoords.x;
			if (Math.abs(deltaX) < window.innerWidth * 0.15) return;
			setIsOnOverviewSection(Math.sign(deltaX) === -1);
			touchStartCoords.current = { x: 0, y: 0 };
		};

		const unitPageContainerRefCurrent = unitPageContainerRef?.current;
		unitPageContainerRefCurrent?.addEventListener("wheel", onWheel);
		unitPageContainerRefCurrent?.addEventListener("touchstart", onTouchStart);
		unitPageContainerRefCurrent?.addEventListener("touchmove", onTouchMove);
		return () => {
			unitPageContainerRefCurrent?.removeEventListener("wheel", onWheel);
			unitPageContainerRefCurrent?.removeEventListener("touchstart", onTouchStart);
			unitPageContainerRefCurrent?.removeEventListener("touchmove", onTouchMove);
		};
	}, [unit, unitPageStyle, unitPageContainerRef, setIsOnOverviewSection]);

	useEffect(() => {
		const onOverviewWheel = (e) => {
			if (
				unitOverviewRefCurrent?.clientHeight < unitOverviewRefCurrent?.scrollHeight &&
				unitOverviewRefCurrent?.scrollTop !== unitOverviewRefCurrent?.scrollHeight - unitOverviewRefCurrent?.clientHeight
			)
				e.stopPropagation();
		};
		const onSubpagesWheel = (e) => {
			if (unitSubpagesRefCurrent?.clientHeight < unitSubpagesRefCurrent?.scrollHeight && unitSubpagesRefCurrent?.scrollTop !== 0)
				e.stopPropagation();
		};

		const unitOverviewRefCurrent = unitOverviewContainerRef?.current;
		unitOverviewRefCurrent?.addEventListener("wheel", onOverviewWheel);

		const unitSubpagesRefCurrent = unitSubpagesContainerRef?.current;
		unitSubpagesRefCurrent?.addEventListener("wheel", onSubpagesWheel);
		return () => {
			unitOverviewRefCurrent?.removeEventListener("wheel", onOverviewWheel);
			unitSubpagesRefCurrent?.removeEventListener("wheel", onSubpagesWheel);
		};
	}, [unitOverviewContainerRef, unitSubpagesContainerRef, isOnOverviewSection]);

	return {
		unit,
		unit_type,
		unitOverviewBackground,
		unitOverviewForegrounds,
		unitPageStyle,
		isOnOverviewSection,
		unitPageContainerRef,
		unitOverviewContainerRef,
		unitSubpagesContainerRef,
		unitPagePrimaryRef,
	};
};
