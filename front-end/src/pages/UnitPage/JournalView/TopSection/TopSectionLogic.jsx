// Packages
import { useContext, useEffect, useRef, useState } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../UnitPageContext";

// Services

// Styles

// Assets

export const TopSectionLogic = () => {
	const {
		unit,
		unit_type,
		unitVersion,
		story,
		storyIcon,
		unitOverviewBackground,
		unitOverviewForegrounds,
		decrementUnitVersion,
		incrementUnitVersion,
	} = useContext(UnitPageContext);

	const unitImageContainerRef = useRef();
	const unitImageRef = useRef();
	const overviewForegroundSizeRef = useRef();
	const versionsWidthRef = useRef();

	const [showImage, setShowImage] = useState(true);

	useEffect(() => {
		setShowImage(false);
		const timeout = setTimeout(() => {
			setShowImage(true);
		}, 250);
		return () => {
			clearTimeout(timeout);
		};
	}, [unitVersion]);

	const onClickDecrementUnitVersion = () => {
		if (!unit?.data?.versions) return false;
		const currentVersionIndex = unit.data.versions.findIndex((e) => e._id === unitVersion._id);
		if (currentVersionIndex === -1 || currentVersionIndex === 0) return false;
		setShowImage(false);
		setTimeout(() => decrementUnitVersion(), 100);
	};

	const onClickIncrementUnitVersion = () => {
		if (!unit?.data?.versions) return false;
		const currentVersionIndex = unit.data.versions.findIndex((e) => e._id === unitVersion._id);
		if (currentVersionIndex === -1 || currentVersionIndex === unit.data.versions.length - 1) return false;
		setShowImage(false);
		setTimeout(() => incrementUnitVersion(), 100);
	};

	return {
		unit,
		unit_type,
		unitVersion,
		story,
		storyIcon,
		unitOverviewBackground,
		unitOverviewForegrounds,
		onClickDecrementUnitVersion,
		onClickIncrementUnitVersion,
		unitImageContainerRef,
		unitImageRef,
		overviewForegroundSizeRef,
		versionsWidthRef,
		showImage,
	};
};
