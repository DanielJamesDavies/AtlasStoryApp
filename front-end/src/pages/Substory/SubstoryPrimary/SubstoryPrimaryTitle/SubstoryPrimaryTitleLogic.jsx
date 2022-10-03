// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { SubstoryContext } from "../../SubstoryContext";
import { APIContext } from "../../../../context/APIContext";

// Services
import isLightBackground from "../../../../services/IsLightBackground";

// Styles

// Assets

export const SubstoryPrimaryTitleLogic = () => {
	const { isAuthorizedToEdit, story, substory, setSubstory, substoryOverviewBackground, isOnOverviewSection } = useContext(SubstoryContext);
	const { APIRequest } = useContext(APIContext);
	const [primaryTitleStyles, setPrimaryTitleStyles] = useState({});

	useEffect(() => {
		async function getPrimaryTitleStyles() {
			if (!isOnOverviewSection) return setPrimaryTitleStyles({});
			if (!substoryOverviewBackground) setPrimaryTitleStyles({ color: "#fff" });
			const isDarkTitle = await isLightBackground(substoryOverviewBackground, [0, 40], [-1, 115]);
			setPrimaryTitleStyles({ color: isDarkTitle ? "#000" : "#fff" });
		}
		getPrimaryTitleStyles();
	}, [substoryOverviewBackground, isOnOverviewSection, setPrimaryTitleStyles]);

	function changeTitle(e) {
		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			newSubstory.data.title = e.target.value;
			return newSubstory;
		});
	}

	async function revertTitle() {
		const response = await APIRequest("/substory/get-value/" + substory._id, "POST", {
			story_id: story._id,
			path: ["data", "title"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			newSubstory.data.title = response.data.value;
			return newSubstory;
		});

		return true;
	}

	const [errors, setErrors] = useState([]);

	async function saveTitle() {
		setErrors([]);
		if (!substory?._id) return;
		const response = await APIRequest("/substory/" + substory._id, "PATCH", {
			story_id: story._id,
			path: ["data", "title"],
			newValue: substory.data.title,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	return { isAuthorizedToEdit, story, substory, primaryTitleStyles, changeTitle, revertTitle, saveTitle, errors };
};
