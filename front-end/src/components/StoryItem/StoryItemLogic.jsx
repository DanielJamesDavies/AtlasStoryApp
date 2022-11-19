// Packages
import { useContext, useState, useEffect } from "react";

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

	return { storyItemClassName, onClick, onMouseDown, onOwnerClick };
};
