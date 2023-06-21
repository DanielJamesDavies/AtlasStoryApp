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
	const { isAuthorizedToEdit, story, substory, setSubstory, subpages, setSubpages, allSubpages } = useContext(SubstoryContext);
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

	async function addCustomSubpage() {
		const new_id_response = await APIRequest("/new-id/", "GET");
		if (!new_id_response || new_id_response?.errors || !new_id_response?.data?._id) return false;

		setSubpages((oldSubpages) => {
			let newSubpages = JSON.parse(JSON.stringify(oldSubpages));
			newSubpages.push({ id: new_id_response.data._id, name: "Custom Subpage", isEnabled: true, isCustom: true, isSaved: false });
			const settingsIndex = newSubpages.findIndex((e) => e.id === "settings");
			const tempSettings = newSubpages.splice(settingsIndex, 1)[0];
			newSubpages.push(tempSettings);
			return newSubpages;
		});

		setSubstory((oldSubstory) => {
			let newSubstory = JSON.parse(JSON.stringify(oldSubstory));
			newSubstory.data.custom_subpages.push({ id: new_id_response.data._id, name: "Custom Subpage", items: [], isSaved: false });
			return newSubstory;
		});
	}

	async function removeCustomSubpage(id) {
		let newSubpages = JSON.parse(JSON.stringify(subpages));
		let newSubstory = JSON.parse(JSON.stringify(substory));

		const subpagesItemIndex = newSubpages.findIndex((e) => e.id === id);
		const customSubpageIndex = newSubstory.data.custom_subpages.findIndex((e) => e.id === id);
		if (subpagesItemIndex === -1 || customSubpageIndex === -1) return false;

		if (!newSubpages[subpagesItemIndex].isCustom) return false;

		newSubpages.splice(subpagesItemIndex, 1);
		setSubpages(newSubpages);

		newSubstory.data.custom_subpages.splice(customSubpageIndex, 1);
		setSubstory(newSubstory);
	}

	async function changeCustomSubpageName(e, id) {
		let newSubpages = JSON.parse(JSON.stringify(subpages));
		let newSubstory = JSON.parse(JSON.stringify(substory));

		const subpagesItemIndex = newSubpages.findIndex((e) => e.id === id);
		const customSubpageIndex = newSubstory.data.custom_subpages.findIndex((e) => e.id === id);
		if (subpagesItemIndex === -1 || customSubpageIndex === -1) return false;

		newSubpages[subpagesItemIndex].name = e.target.value;
		setSubpages(newSubpages);

		newSubstory.data.custom_subpages[customSubpageIndex].name = e.target.value;
		setSubstory(newSubstory);
	}

	async function revertSubpages() {
		setErrors([]);
		const response = await APIRequest("/substory/get-value/" + substory._id, "POST", {
			story_id: story._id,
			path: ["data", "subpages"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

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

		const custom_subpages_response = await APIRequest("/substory/get-value/" + substory._id, "POST", {
			story_id: story._id,
			path: ["data", "custom_subpages"],
		});
		if (!custom_subpages_response || custom_subpages_response?.errors || custom_subpages_response?.data?.value === undefined) return false;

		let newSubstory = JSON.parse(JSON.stringify(substory));
		newSubstory.data.custom_subpages = custom_subpages_response?.data?.value.map((custom_subpage) => {
			const curr_custom_subpage_index = newSubstory.data.custom_subpages.findIndex((e) => e.id === custom_subpage.id);
			if (curr_custom_subpage_index === -1) return custom_subpage;
			let newCustomSubpage = newSubstory.data.custom_subpages[curr_custom_subpage_index];
			newCustomSubpage.name = custom_subpage.name;
			return newCustomSubpage;
		});
		setSubstory(newSubstory);

		return true;
	}

	const [errors, setErrors] = useState([]);

	async function saveSubpages() {
		setErrors([]);
		if (!substory?._id || !story?._id) return;

		let newSubpages = JSON.parse(JSON.stringify(subpages));
		newSubpages = newSubpages.map((newSubpage) => {
			delete newSubpage.isSaved;
			return newSubpage;
		});
		setSubpages(newSubpages);
		newSubpages = newSubpages.filter((e) => e.id !== "settings");

		let newSubstory = JSON.parse(JSON.stringify(substory));
		newSubstory.data.custom_subpages = newSubstory.data.custom_subpages.map((newSubpage) => {
			delete newSubpage.isSaved;
			return newSubpage;
		});
		setSubstory(newSubstory);

		const subpages_response = await APIRequest("/substory/" + substory._id, "PATCH", {
			story_id: story._id,
			path: ["data", "subpages"],
			newValue: newSubpages,
		});
		if (!subpages_response || subpages_response?.errors) {
			if (subpages_response?.errors) setErrors(subpages_response.errors);
			return false;
		}

		const custom_subpages_response = await APIRequest("/substory/" + substory._id, "PATCH", {
			story_id: story._id,
			path: ["data", "custom_subpages"],
			newValue: newSubstory?.data?.custom_subpages,
		});
		if (!custom_subpages_response || custom_subpages_response?.errors) {
			if (custom_subpages_response?.errors) setErrors(custom_subpages_response.errors);
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
		addCustomSubpage,
		removeCustomSubpage,
		changeCustomSubpageName,
		revertSubpages,
		saveSubpages,
		errors,
	};
};
