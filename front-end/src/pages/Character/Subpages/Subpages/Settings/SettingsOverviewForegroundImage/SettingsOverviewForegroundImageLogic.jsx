// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../../../CharacterContext";
import { APIContext } from "../../../../../../context/APIContext";
import { RecentDataContext } from "../../../../../../context/RecentDataContext";

// Services

// Styles

// Assets

export const SettingsOverviewForegroundImageLogic = () => {
	const {
		isAuthorizedToEdit,
		story,
		character,
		characterVersion,
		changeCharacterVersion,
		characterOverviewForegrounds,
		setCharacterOverviewForegrounds,
	} = useContext(CharacterContext);
	const { APIRequest } = useContext(APIContext);
	const { addImagesToRecentImages } = useContext(RecentDataContext);

	function changeOverviewForeground(image) {
		let newCharacterOverviewForegrounds = JSON.parse(JSON.stringify(characterOverviewForegrounds));
		const newCharacterOverviewForegroundsIndex = newCharacterOverviewForegrounds.findIndex(
			(e) => JSON.stringify(e._id) === JSON.stringify(characterVersion._id)
		);
		if (newCharacterOverviewForegroundsIndex === -1) return false;
		if (
			newCharacterOverviewForegrounds[newCharacterOverviewForegroundsIndex]?.image?.image ||
			newCharacterOverviewForegrounds[newCharacterOverviewForegroundsIndex]?.image?.image === undefined
		)
			newCharacterOverviewForegrounds[newCharacterOverviewForegroundsIndex].image.image = image;
		setCharacterOverviewForegrounds(newCharacterOverviewForegrounds);
	}

	function changeOverviewForegroundAlignment(e, alignment) {
		const newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.overviewForeground.alignment = alignment;
		changeCharacterVersion(newCharacterVersion);
	}

	function changeOverviewForegroundPosition(e, position) {
		const newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.overviewForeground.position = position;
		changeCharacterVersion(newCharacterVersion);
	}

	function changeOverviewForegroundScale(e) {
		const newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.overviewForeground.scale = e.target.value;
		changeCharacterVersion(newCharacterVersion);
	}

	function removeOverviewForeground() {
		changeOverviewForeground(undefined);
	}

	async function revertOverviewForeground() {
		let newCharacterOverviewForegrounds = JSON.parse(JSON.stringify(characterOverviewForegrounds));
		const newCharacterOverviewForegroundsIndex = newCharacterOverviewForegrounds.findIndex(
			(e) => JSON.stringify(e._id) === JSON.stringify(characterVersion._id)
		);
		if (newCharacterOverviewForegroundsIndex === -1) return false;

		const response = await APIRequest("/image/" + characterVersion?.overviewForeground, "GET");
		if (!response || response?.errors || !response?.data?.image?.image) return false;
		newCharacterOverviewForegrounds[newCharacterOverviewForegroundsIndex].image = response.data.image;
		setCharacterOverviewForegrounds(newCharacterOverviewForegrounds);
		return true;
	}

	async function saveOverviewForeground() {
		if (!characterVersion?.overviewForeground || !characterOverviewForegrounds) return false;

		let newCharacterOverviewForegrounds = JSON.parse(JSON.stringify(characterOverviewForegrounds));
		const newCharacterOverviewForegroundsIndex = newCharacterOverviewForegrounds.findIndex(
			(e) => JSON.stringify(e._id) === JSON.stringify(characterVersion._id)
		);
		if (
			newCharacterOverviewForegroundsIndex === -1 ||
			newCharacterOverviewForegrounds[newCharacterOverviewForegroundsIndex]?.image?.image === "NO_IMAGE"
		)
			return false;

		const newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		newCharacterVersion.overviewForeground.scale = parseFloat(newCharacterVersion.overviewForeground.scale);
		changeCharacterVersion(newCharacterVersion);

		const character_response = await APIRequest("/character/" + character._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions", characterVersion._id, "overviewForeground"],
			newValue: characterVersion.overviewForeground,
		});
		if (!character_response || character_response?.errors) return false;

		const response = await APIRequest("/image/" + characterVersion?.overviewForeground?.image, "PATCH", {
			newValue: newCharacterOverviewForegrounds[newCharacterOverviewForegroundsIndex]?.image?.image,
			story_id: story._id,
			character_id: character._id,
		});
		if (!response || response?.errors) return false;
		addImagesToRecentImages([response?.data?.image]);
		return true;
	}

	return {
		isAuthorizedToEdit,
		characterVersion,
		characterOverviewForegrounds,
		changeOverviewForeground,
		changeOverviewForegroundAlignment,
		changeOverviewForegroundPosition,
		changeOverviewForegroundScale,
		removeOverviewForeground,
		revertOverviewForeground,
		saveOverviewForeground,
	};
};
