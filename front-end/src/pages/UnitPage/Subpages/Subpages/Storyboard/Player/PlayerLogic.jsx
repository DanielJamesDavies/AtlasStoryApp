// Packages
import { useCallback, useContext, useEffect, useRef, useState } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../../UnitPageContext";
import { StoryboardContext } from "../StoryboardContext";

// Services

// Styles

// Assets

export const PlayerLogic = () => {
	const { unit, unitOverviewBackground, unitOverviewForegrounds } = useContext(UnitPageContext);
	const { isPlaying, setElapsedTime, fullDuration, lastTimeUpdatedElapsedTime, setPlayerHeight } = useContext(StoryboardContext);

	useEffect(() => {
		let interval = false;
		if (isPlaying) {
			interval = setInterval(() => {
				setElapsedTime((oldValue) => {
					if (fullDuration === oldValue) clearInterval(interval);
					return Math.min(oldValue + 0.05, fullDuration);
				});
			}, 50);
		}
		return () => {
			clearInterval(interval);
		};
	}, [isPlaying, setElapsedTime, fullDuration, lastTimeUpdatedElapsedTime]);

	const unitPageStoryboardPlayerContainerRef = useRef();

	const [playerScale, setPlayerScale] = useState(0);
	const [isPlayerFullScreen, setIsPlayerFullScreen] = useState(false);
	const [areBlackBarsOnSide, setAreBlackBarsOnSide] = useState(false);

	useEffect(() => {
		setPlayerHeight(playerScale * 1080);
	}, [playerScale, setPlayerHeight]);

	const updatePlayerScale = useCallback(() => {
		if (document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement) {
			const newAreBlackBarsOnSide = window.screen.width / window.screen.height >= 1920 / 1080;
			setAreBlackBarsOnSide(newAreBlackBarsOnSide);
			if (newAreBlackBarsOnSide) {
				setPlayerScale(1080 / (window.screen.height || 0));
			} else {
				setPlayerScale((window.screen.width || 0) / 1920);
			}
		} else {
			setPlayerScale(
				Math.min(
					(unitPageStoryboardPlayerContainerRef?.current?.clientWidth || 0) / 1920,
					(unitPageStoryboardPlayerContainerRef?.current?.parentNode?.clientHeight || 0) / 1080
				)
			);
		}
	}, [unitPageStoryboardPlayerContainerRef, setPlayerScale, setAreBlackBarsOnSide]);

	useEffect(() => {
		const interval = setInterval(() => updatePlayerScale(), 100);
		return () => clearInterval(interval);
	}, [updatePlayerScale]);

	useEffect(() => {
		updatePlayerScale();
		const interval = setInterval(() => updatePlayerScale(), 5);
		setTimeout(() => clearInterval(interval), 100);
	}, [updatePlayerScale]);

	useEffect(() => {
		function onVisibilityChange() {
			const interval = setInterval(() => updatePlayerScale(), 5);
			setTimeout(() => clearInterval(interval), 100);
		}

		document.addEventListener("visibilitychange", onVisibilityChange);
		return () => {
			document.removeEventListener("visibilitychange", onVisibilityChange);
		};
	}, [updatePlayerScale]);

	useEffect(() => {
		updatePlayerScale();
		const interval = setInterval(() => updatePlayerScale(), 5);
		setTimeout(() => clearInterval(interval), 100);
	}, [updatePlayerScale, unit, unitOverviewBackground, unitOverviewForegrounds]);

	useEffect(() => {
		window.addEventListener("resize", updatePlayerScale);
		return () => {
			window.removeEventListener("resize", updatePlayerScale);
		};
	}, [updatePlayerScale]);

	const fullScreenHandler = useCallback(() => {
		setIsPlayerFullScreen(document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement);
		updatePlayerScale();
	}, [setIsPlayerFullScreen, updatePlayerScale]);

	useEffect(() => {
		document.addEventListener("fullscreenchange", fullScreenHandler, false);
	}, [fullScreenHandler]);

	const togglePlayerFullScreen = useCallback(() => {
		if (!isPlayerFullScreen) {
			unitPageStoryboardPlayerContainerRef?.current?.requestFullscreen();
		} else {
			document?.exitFullscreen();
		}
		fullScreenHandler();
	}, [unitPageStoryboardPlayerContainerRef, isPlayerFullScreen, fullScreenHandler]);

	const mouseMoveTimeout = useRef();
	const [hideControls, setHideControls] = useState(false);

	const onMouseMove = useCallback(() => {
		clearTimeout(mouseMoveTimeout?.current);
		mouseMoveTimeout.current = false;
		setHideControls(false);

		if (document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement) {
			mouseMoveTimeout.current = setTimeout(() => {
				setHideControls(true);
			}, 1000);
		}
	}, []);

	useEffect(() => {
		const unitPageStoryboardPlayerContainerRefCurrent = unitPageStoryboardPlayerContainerRef?.current;
		unitPageStoryboardPlayerContainerRefCurrent.addEventListener("mousemove", onMouseMove);
		return () => {
			unitPageStoryboardPlayerContainerRefCurrent.removeEventListener("mousemove", onMouseMove);
		};
	});

	return {
		unitPageStoryboardPlayerContainerRef,
		playerScale,
		isPlayerFullScreen,
		togglePlayerFullScreen,
		hideControls,
		isPlaying,
		areBlackBarsOnSide,
	};
};
