// Packages
import { useContext, useState, useRef } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../../../CharacterContext";
import { APIContext } from "../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const BigFiveLogic = () => {
	const { isAuthorizedToEdit, story, character, characterVersion, changeCharacterVersion } = useContext(CharacterContext);
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
		if (!character?._id) return;

		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.psychology.isBigFiveVisible = true;
		changeCharacterVersion(newCharacterVersion);

		const response = await APIRequest("/character/" + character._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions", characterVersion._id, "psychology", "isBigFiveVisible"],
			newValue: true,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	async function hideBigFive() {
		if (!character?._id) return;

		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.psychology.isBigFiveVisible = false;
		changeCharacterVersion(newCharacterVersion);

		const response = await APIRequest("/character/" + character._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions", characterVersion._id, "psychology", "isBigFiveVisible"],
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
		const response = await APIRequest("/character/get-value/" + character._id, "POST", {
			story_id: story._id,
			path: ["data", "versions", characterVersion._id, "psychology", "bigFive"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.psychology.bigFive = response.data.value;
		changeCharacterVersion(newCharacterVersion);

		return true;
	}

	async function saveBigFive() {
		setErrors([]);
		if (!character?._id) return;
		const response = await APIRequest("/character/" + character._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions", characterVersion._id, "psychology", "bigFive"],
			newValue: characterVersion.psychology.bigFive,
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

	return {
		isAuthorizedToEdit,
		characterVersion,
		bigFiveTraits,
		showBigFive,
		hideBigFive,
		revertBigFive,
		saveBigFive,
		errors,
		bigFiveRef,
		onBigFiveContainerScroll,
	};
};
