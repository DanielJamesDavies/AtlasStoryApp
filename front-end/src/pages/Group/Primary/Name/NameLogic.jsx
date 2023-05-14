// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { GroupContext } from "../../GroupContext";
import { APIContext } from "../../../../context/APIContext";

// Services
import isLightBackground from "../../../../services/IsLightBackground";

// Styles

// Assets

export const GroupPrimaryNameLogic = () => {
	const { isAuthorizedToEdit, story, group, setGroup, groupOverviewBackground, isOnOverviewSection } = useContext(GroupContext);
	const { APIRequest } = useContext(APIContext);
	const [primaryNameStyles, setPrimaryNameStyles] = useState({});

	useEffect(() => {
		async function getPrimaryNameStyles() {
			if (!isOnOverviewSection) return setPrimaryNameStyles({});
			if (!groupOverviewBackground) setPrimaryNameStyles({ color: "#fff" });
			const isDarkName = await isLightBackground(groupOverviewBackground, [0, 40], [-1, 115]);
			setPrimaryNameStyles({ color: isDarkName ? "#000" : "#fff" });
		}
		getPrimaryNameStyles();
	}, [groupOverviewBackground, isOnOverviewSection, setPrimaryNameStyles]);

	function changeName(e) {
		setGroup((oldGroup) => {
			let newGroup = JSON.parse(JSON.stringify(oldGroup));
			newGroup.data.name = e.target.value;
			return newGroup;
		});
	}

	async function revertName() {
		const response = await APIRequest("/group/get-value/" + group._id, "POST", {
			story_id: story._id,
			path: ["data", "name"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setGroup((oldGroup) => {
			let newGroup = JSON.parse(JSON.stringify(oldGroup));
			newGroup.data.name = response.data.value;
			return newGroup;
		});

		return true;
	}

	const [errors, setErrors] = useState([]);

	async function saveName() {
		setErrors([]);
		if (!group?._id) return;
		const response = await APIRequest("/group/" + group._id, "PATCH", {
			story_id: story._id,
			path: ["data", "name"],
			newValue: group.data.name,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	return { isAuthorizedToEdit, group, primaryNameStyles, changeName, revertName, saveName, errors };
};
