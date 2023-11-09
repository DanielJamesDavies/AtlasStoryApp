// Packages
import { useContext, useState, useRef } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../../UnitPageContext";
import { APIContext } from "../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const BigFiveLogic = () => {
	const { unit_type, isAuthorizedToEdit, story, unit, unitVersion, changeUnitVersion, unitVersionItemCopying, changeUnitVersionItemCopying, pasteVersionItemCopying } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);

	const bigFiveTraits = [
		{
			id: "openness",
			name: "Openness to Experience",
			aspects: [
				{ id: "intellect", name: "Intellect" },
				{ id: "openness", name: "Openness" },
			],
		},
		{
			id: "conscientiousness",
			name: "Conscientiousness",
			aspects: [
				{ id: "industriousness", name: "Industriousness" },
				{ id: "orderliness", name: "Orderliness" },
			],
		},
		{
			id: "agreeableness",
			name: "Agreeableness",
			aspects: [
				{ id: "compassion", name: "Compassion" },
				{ id: "politeness", name: "Politeness" },
			],
		},
		{
			id: "extraversion",
			name: "Extraversion",
			aspects: [
				{ id: "enthusiasm", name: "Enthusiasm" },
				{ id: "assertiveness", name: "Assertiveness" },
			],
		},
		{
			id: "neuroticism",
			name: "Neuroticism",
			aspects: [
				{ id: "withdrawal", name: "Withdrawal" },
				{ id: "volatility", name: "Volatility" },
			],
		},
	];

	async function showBigFive() {
		if (!unit?._id) return;

		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		newUnitVersion.psychology.isBigFiveVisible = true;
		changeUnitVersion(newUnitVersion);

		const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions", unitVersion._id, "psychology", "isBigFiveVisible"],
			newValue: true,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	async function hideBigFive() {
		if (!unit?._id) return;

		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		newUnitVersion.psychology.isBigFiveVisible = false;
		changeUnitVersion(newUnitVersion);

		const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions", unitVersion._id, "psychology", "isBigFiveVisible"],
			newValue: false,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	const [errors, setErrors] = useState([]);

	async function revertBigFive() {
		setErrors([]);
		const response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", {
			story_id: story._id,
			path: ["data", "versions", unitVersion._id, "psychology", "bigFive"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		newUnitVersion.psychology.bigFive = response.data.value;
		changeUnitVersion(newUnitVersion);

		return true;
	}

	async function saveBigFive() {
		setErrors([]);
		if (!unit?._id) return;
		const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions", unitVersion._id, "psychology", "bigFive"],
			newValue: unitVersion.psychology.bigFive,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	const bigFiveRef = useRef();
	function onBigFiveContainerScroll(e) {
		if (bigFiveRef?.current?.scrollTop === 0) return;
		e.stopPropagation();
	}

	function copyVersionValue() {
		changeUnitVersionItemCopying(["psychology", "bigFive"]);
	}

	function pasteVersionValue() {
		pasteVersionItemCopying(["psychology", "bigFive"]);
	}

	return {
		isAuthorizedToEdit,
		unitVersion,
		bigFiveTraits,
		showBigFive,
		hideBigFive,
		revertBigFive,
		saveBigFive,
		errors,
		bigFiveRef,
		onBigFiveContainerScroll,
		unitVersionItemCopying,
		copyVersionValue,
		pasteVersionValue,
	};
};
