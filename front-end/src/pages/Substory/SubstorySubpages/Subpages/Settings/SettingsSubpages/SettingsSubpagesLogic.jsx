// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { SubstoryContext } from "../../../../SubstoryContext";
import { APIContext } from "../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const SettingsSubpagesLogic = () => {
	const { isAuthorizedToEdit, story, substory, subpages, setSubpages, allSubpages } = useContext(SubstoryContext);
	const { APIRequest } = useContext(APIContext);

	function toggleEnableSubpage(index) {
		setSubpages((oldSubpages) => {
			let newSubpages = JSON.parse(JSON.stringify(oldSubpages));
			newSubpages[index].isEnabled = !newSubpages[index].isEnabled;
			return newSubpages;
		});
	}

	const [isReorderingSubpages, setIsReorderingSubpages] = useState(false);
	function toggleIsReorderingSubpages() {
		setIsReorderingSubpages((oldIsReorderingSubpages) => !oldIsReorderingSubpages);
	}

	async function changeSubpagesOrder(res) {
		if (res.from === undefined || res.to === undefined) return false;
		setSubpages((oldSubpages) => {
			let newSubpages = JSON.parse(JSON.stringify(oldSubpages));
			let tempSubpage = newSubpages.splice(res.from, 1)[0];
			newSubpages.splice(res.to, 0, tempSubpage);
			return newSubpages;
		});
	}

	async function revertSubpages() {
		setErrors([]);
		const response = await APIRequest("/substory/get-value/" + substory._id, "POST", {
			story_id: story._id,
			path: ["data", "subpages"],
		});
		if (!response || response?.errors || !response?.data?.value) return false;

		let newSubpages = [];

		for (let i = 0; i < response.data.value.length; i++) {
			let newSubpage = allSubpages.find((e) => e.id === response.data.value[i].id);
			if (newSubpage) {
				newSubpage.isEnabled = response.data.value[i]?.isEnabled;
				newSubpages.push(newSubpage);
			}
		}

		newSubpages = newSubpages.concat(allSubpages.filter((e) => newSubpages.findIndex((e2) => e2.id === e.id) === -1));

		setSubpages(newSubpages);

		return true;
	}

	const [errors, setErrors] = useState([]);

	async function saveSubpages() {
		setErrors([]);
		if (!substory?._id) return;

		let newSubpages = JSON.parse(JSON.stringify(subpages));
		newSubpages = newSubpages.filter((e) => e.id !== "settings");

		const response = await APIRequest("/substory/" + substory._id, "PATCH", {
			story_id: story._id,
			path: ["data", "subpages"],
			newValue: newSubpages,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	return {
		isAuthorizedToEdit,
		subpages,
		toggleEnableSubpage,
		isReorderingSubpages,
		toggleIsReorderingSubpages,
		changeSubpagesOrder,
		revertSubpages,
		saveSubpages,
		errors,
	};
};
