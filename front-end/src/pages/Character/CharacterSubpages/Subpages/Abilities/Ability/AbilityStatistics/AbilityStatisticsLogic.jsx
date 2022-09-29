// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../../../../CharacterContext";
import { APIContext } from "../../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const AbilityStatisticsLogic = ({ ability, changeAbility }) => {
	const { isAuthorizedToEdit, story, character, characterVersion } = useContext(CharacterContext);
	const { APIRequest } = useContext(APIContext);

	function addAbilityStatisticsValue() {
		let newAbility = JSON.parse(JSON.stringify(ability));
		newAbility.statistics.values.push({ label: "New Statistic", value: 0 });
		changeAbility(newAbility);
	}

	function removeAbilityStatisticsValue(index) {
		let newAbility = JSON.parse(JSON.stringify(ability));
		newAbility.statistics.values.splice(index, 1);
		changeAbility(newAbility);
	}

	async function defaultAbilityStatistics() {
		if (!story?._id) return false;
		const response = await APIRequest("/story/get-value/" + story._id, "POST", {
			story_id: story._id,
			path: ["data", "characterPreferences", "abilities", "defaultStatistics"],
		});
		if (!response || response?.errors || !response?.data?.value) return false;

		let newAbility = JSON.parse(JSON.stringify(ability));
		newAbility.statistics.values = response.data.value.labels.map((label) => {
			const oldValue = newAbility.statistics.values.find((e) => e.label === label)?.value;
			if (oldValue !== undefined) return { label, value: oldValue };
			return { label, value: 0 };
		});
		newAbility.statistics.maxValue = response.data.value.maxValue;
		changeAbility(newAbility);

		return true;
	}

	async function saveDefaultAbilityStatistics() {
		if (!story?._id) return;
		const response = await APIRequest("/story/" + story._id, "PATCH", {
			story_id: story._id,
			path: ["data", "characterPreferences", "abilities", "defaultStatistics"],
			newValue: { labels: ability.statistics.values.map((value) => value.label), maxValue: ability.statistics.maxValue },
		});
		if (!response) return false;
		return true;
	}

	const [isReorderingAbilityStatisticsValues, setIsReorderingAbilityStatisticsValues] = useState(false);
	function toggleIsReorderingAbilityStatisticsValues() {
		setIsReorderingAbilityStatisticsValues((oldIsReorderingAbilityStatisticsValues) => !oldIsReorderingAbilityStatisticsValues);
	}

	function reorderAbilityStatisticsValues(res) {
		if (res.from === undefined || res.to === undefined) return false;
		let newAbility = JSON.parse(JSON.stringify(ability));
		const tempAbilityStatisticsValue = newAbility.statistics.values.splice(res.from, 1)[0];
		newAbility.statistics.values.splice(res.to, 0, tempAbilityStatisticsValue);
		changeAbility(newAbility);
	}

	function changeAbilityStatisticsValueLabel(e, index) {
		let newAbility = JSON.parse(JSON.stringify(ability));
		newAbility.statistics.values[index].label = e.target.value;
		changeAbility(newAbility);
	}

	function changeAbilityStatisticsValueValue(e, index) {
		let newAbility = JSON.parse(JSON.stringify(ability));
		let newValue = parseInt(e.target.value);
		if (isNaN(newValue)) newValue = 0;
		if (newValue > newAbility.statistics.maxValue) newValue = newAbility.statistics.maxValue;
		newAbility.statistics.values[index].value = newValue;
		changeAbility(newAbility);
	}

	function changeAbilityStatisticsMaxValue(e) {
		let newAbility = JSON.parse(JSON.stringify(ability));
		let newValue = parseInt(e.target.value);
		if (isNaN(newValue)) newValue = 0;
		if (newValue > 1000000000000) newValue = 1000000000000;
		newAbility.statistics.maxValue = newValue;
		changeAbility(newAbility);
	}

	async function revertAbilityStatistics() {
		if (!character?._id || !characterVersion?._id) return;
		const response = await APIRequest("/character/get-value/" + character._id, "POST", {
			story_id: story._id,
			path: ["data", "versions", characterVersion._id, "abilities", ability._id, "statistics"],
		});
		if (!response || response?.errors || !response?.data?.value) return false;

		let newAbility = JSON.parse(JSON.stringify(ability));
		newAbility.statistics = response.data.value;
		changeAbility(newAbility);

		return true;
	}

	async function saveAbilityStatistics() {
		if (!character?._id || !characterVersion?._id) return;
		const response = await APIRequest("/character/" + character._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions", characterVersion._id, "abilities", ability._id, "statistics"],
			newValue: ability.statistics,
		});
		if (!response) return false;
		return true;
	}

	return {
		isAuthorizedToEdit,
		revertAbilityStatistics,
		saveAbilityStatistics,
		addAbilityStatisticsValue,
		removeAbilityStatisticsValue,
		defaultAbilityStatistics,
		saveDefaultAbilityStatistics,
		isReorderingAbilityStatisticsValues,
		toggleIsReorderingAbilityStatisticsValues,
		reorderAbilityStatisticsValues,
		changeAbilityStatisticsValueLabel,
		changeAbilityStatisticsValueValue,
		changeAbilityStatisticsMaxValue,
	};
};
