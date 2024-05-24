// Packages
import { useContext, useRef, useState } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../../UnitPageContext";
import { APIContext } from "../../../../../../context/APIContext";
import { RecentDataContext } from "../../../../../../context/RecentDataContext";

// Services

// Styles

// Assets

export const SettingsCardBackgroundImageLogic = () => {
	const { unit_type, isAuthorizedToEdit, story, unit, setUnit, characterCardBackground, setCharacterCardBackground } =
		useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);
	const { addImagesToRecentImages } = useContext(RecentDataContext);

	const [errors, setErrors] = useState([]);

	function changeCardBackground(image) {
		setCharacterCardBackground(image);
	}

	function removeCardBackground() {
		changeCardBackground(undefined);
	}

	function changeCardBackgroundAlignment(e, alignment) {
		const newUnit = JSON.parse(JSON.stringify(unit));
		newUnit.data.cardBackgroundProperties.alignment = alignment;
		setUnit(newUnit);
	}

	function changeCardBackgroundPosition(e, position) {
		const newUnit = JSON.parse(JSON.stringify(unit));
		newUnit.data.cardBackgroundProperties.position = position;
		setUnit(newUnit);
	}

	function changeCardBackgroundScale(e) {
		const newUnit = JSON.parse(JSON.stringify(unit));
		newUnit.data.cardBackgroundProperties.scale = e.target.value;
		setUnit(newUnit);
	}

	async function revertCardBackground() {
		setErrors([]);
		const response = await APIRequest("/image/" + unit?.data?.cardBackground, "GET");
		if (!response || response?.errors || !response?.data?.image?.image) return false;
		setCharacterCardBackground(response.data.image.image);
		return true;
	}

	async function saveCardBackground() {
		setErrors([]);
		if (!unit?._id) return;
		await APIRequest("/" + unit_type + "/" + unit?._id, "PATCH", {
			path: ["data", "cardBackground"],
			newValue: unit?.data?.cardBackground,
			story_id: story._id,
			unit_id: unit._id,
		});

		await APIRequest("/" + unit_type + "/" + unit?._id, "PATCH", {
			path: ["data", "cardBackgroundProperties"],
			newValue: unit?.data?.cardBackgroundProperties,
			story_id: story._id,
			unit_id: unit._id,
		});

		const response = await APIRequest("/image/" + unit?.data?.cardBackground, "PATCH", {
			newValue: characterCardBackground,
			story_id: story._id,
			unit_id: unit._id,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}

		addImagesToRecentImages([response?.data?.image]);

		return true;
	}

	const cardBackgroundSizeRef = useRef();
	const backgroundImageSizeRef = useRef();

	return {
		unit_type,
		isAuthorizedToEdit,
		unit,
		characterCardBackground,
		changeCardBackground,
		removeCardBackground,
		changeCardBackgroundAlignment,
		changeCardBackgroundPosition,
		changeCardBackgroundScale,
		revertCardBackground,
		saveCardBackground,
		errors,
		cardBackgroundSizeRef,
		backgroundImageSizeRef,
	};
};
