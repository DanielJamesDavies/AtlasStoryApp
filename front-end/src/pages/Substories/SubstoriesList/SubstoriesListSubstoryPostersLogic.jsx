// Packages
import { useContext, useRef, useState } from "react";

// Components

// Logic

// Context
import { SubstoriesContext } from "../SubstoriesContext";
import { APIContext } from "../../../context/APIContext";

// Services

// Styles

// Assets

export const SubstoriesListSubstoryPostersLogic = () => {
	const { story, setStory, substoriesPosterBackgrounds, isReorderingSubstories } = useContext(SubstoriesContext);
	const { APIRequest } = useContext(APIContext);

	// Character Cards Scroll
	const substoryPosters = useRef();
	const [substoryPostersScrollInterval, setSubstoryPostersScrollInterval] = useState(false);

	function scrollSubstoryPosters(substoryPostersScrollValue) {
		if (!substoryPosters?.current || substoryPostersScrollValue === 0) {
			clearInterval(substoryPostersScrollInterval);
			setSubstoryPostersScrollInterval(false);
			return;
		}
		var interval = setInterval(() => {
			if (
				substoryPostersScrollValue !== 0 &&
				substoryPosters?.current &&
				(substoryPosters.current.scrollLeft !== 0 || substoryPostersScrollValue > 0) &&
				(substoryPosters.current.scrollLeft !== substoryPosters.current.scrollWidth - substoryPosters.current.clientWidth ||
					substoryPostersScrollValue < 0)
			) {
				substoryPosters.current.scrollLeft += substoryPostersScrollValue * 1.5;
			} else {
				clearInterval(interval);
				setSubstoryPostersScrollInterval(false);
			}
		}, 2);
		setSubstoryPostersScrollInterval(interval);
	}

	// Reorder Substories
	async function changeSubstoriesOrder(res) {
		let newStory = JSON.parse(JSON.stringify(story));

		if (res.from === undefined || res.to === undefined) return;

		const tempSubstory = newStory.data.substories.splice(res.from, 1)[0];
		newStory.data.substories.splice(res.to, 0, tempSubstory);

		setStory(newStory);

		await APIRequest("/story/" + newStory._id, "PATCH", {
			story_id: newStory._id,
			path: ["data", "substories"],
			newValue: newStory.data.substories,
		});
	}

	function afterOnTouchMove(e) {
		if (e?.touches[0]?.clientX === undefined || e?.touches[0]?.clientY === undefined) return;
		const elementsOver = document.elementsFromPoint(e.touches[0].clientX, e.touches[0].clientY);

		clearInterval(substoryPostersScrollInterval);
		setSubstoryPostersScrollInterval(false);
		scrollSubstoryPosters(0);

		elementsOver.forEach((element) => {
			if (!element.classList || !Array.from(element.classList)) return;
			if (
				Array.from(element.classList).includes("substories-list-substories-posters-scroll-left") ||
				Array.from(element.classList).includes("substories-list-substories-posters-scroll-right")
			) {
				scrollSubstoryPosters(Array.from(element.classList).includes("substories-list-substories-posters-scroll-left") ? -1.5 : 1.5);
			}
		});
	}

	function afterOnTouchEnd() {
		scrollSubstoryPosters(0);
	}

	return {
		story,
		substoriesPosterBackgrounds,
		substoryPosters,
		scrollSubstoryPosters,
		isReorderingSubstories,
		changeSubstoriesOrder,
		afterOnTouchMove,
		afterOnTouchEnd,
	};
};
