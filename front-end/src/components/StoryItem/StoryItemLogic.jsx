// Packages
import { useContext, useState, useEffect, useLayoutEffect, useRef } from "react";

// Components

// Logic

// Context
import { RoutesContext } from "../../context/RoutesContext";

// Styles

// Assets

export const StoryItemLogic = ({ story, className, size }) => {
	const { changeLocation } = useContext(RoutesContext);

	const [storyItemClassName, setStoryItemClassName] = useState("story-item-loading");
	useEffect(() => {
		function getStoryItemClassName() {
			let newBtnListItemClassName = "story-item";
			if (className) newBtnListItemClassName += " " + className;
			if (size) newBtnListItemClassName += " story-item-size-" + size;
			setStoryItemClassName(newBtnListItemClassName);
		}
		getStoryItemClassName();
	}, [setStoryItemClassName, className, size]);

	const storyItemTitleContainerRef = useRef();
	const storyItemTitleRef = useRef();
	const hasResizedStoryItemTitle = useRef(false);
	const [storyItemTitleStyles, setStoryItemTitleStyles] = useState({});
	useLayoutEffect(() => {
		async function getStoryItemTitleStyles() {
			await new Promise((resolve) => setTimeout(resolve, 1));

			if (storyItemTitleRef?.current?.clientWidth <= storyItemTitleContainerRef?.current?.clientWidth) {
				if (!hasResizedStoryItemTitle.current) setStoryItemTitleStyles({});
				return;
			}

			hasResizedStoryItemTitle.current = true;

			let currFontSize = getComputedStyle(storyItemTitleRef.current)?.fontSize;
			currFontSize = currFontSize.substring(0, currFontSize.length - 2);
			currFontSize = parseInt(currFontSize);
			if (isNaN(currFontSize)) return false;
			currFontSize--;

			setStoryItemTitleStyles({ fontSize: currFontSize + "px" });

			getStoryItemTitleStyles();
		}
		getStoryItemTitleStyles();
	}, [setStoryItemTitleStyles, storyItemTitleContainerRef, storyItemTitleRef, hasResizedStoryItemTitle]);

	function onClick(e) {
		changeLocation("/s/" + story.uid, e.button === 1);
	}

	function onMouseDown(e) {
		if (e.button === 1) e.preventDefault();
	}

	function onOwnerClick(e) {
		e.stopPropagation();
		if (story?.data?.owner?.username) changeLocation("/u/" + story.data.owner.username, e.button === 1);
	}

	return { storyItemClassName, storyItemTitleContainerRef, storyItemTitleRef, storyItemTitleStyles, onClick, onMouseDown, onOwnerClick };
};
