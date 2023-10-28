// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../UnitPageContext";
import { APIContext } from "../../../../context/APIContext";
import { LightboxContext } from "../../../../context/LightboxContext";

// Services

// Styles

// Assets

export const PrimaryImageLogic = () => {
	const { unit_type, isAuthorizedToEdit, story, unit, unitVersion, unitPrimaryImages, setUnitPrimaryImages } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);
	const { setLightboxImageIDs, setLightboxIndex } = useContext(LightboxContext);

	function onPrimaryImageClick() {
		setLightboxImageIDs([unitVersion?.primaryImage]);
		setLightboxIndex(0);
	}

	async function changePrimaryImage(image) {
		let newCharacterPrimaryImages = JSON.parse(JSON.stringify(unitPrimaryImages));
		const newUnitPrimaryImagesIndex = newCharacterPrimaryImages.findIndex((e) => JSON.stringify(e._id) === JSON.stringify(unitVersion._id));
		if (newUnitPrimaryImagesIndex === -1) return false;
		if (newCharacterPrimaryImages[newUnitPrimaryImagesIndex]?.image?.image)
			newCharacterPrimaryImages[newUnitPrimaryImagesIndex].image.image = image;
		setUnitPrimaryImages(newCharacterPrimaryImages);
	}

	async function revertPrimaryImage() {
		let newCharacterPrimaryImages = JSON.parse(JSON.stringify(unitPrimaryImages));
		const newUnitPrimaryImagesIndex = newCharacterPrimaryImages.findIndex((e) => JSON.stringify(e._id) === JSON.stringify(unitVersion._id));
		if (newUnitPrimaryImagesIndex === -1) return false;

		const response = await APIRequest("/image/" + unitVersion?.primaryImage, "GET");
		if (!response || response?.errors || !response?.data?.image?.image) return false;
		newCharacterPrimaryImages[newUnitPrimaryImagesIndex].image = response.data.image;
		setUnitPrimaryImages(newCharacterPrimaryImages);
		return true;
	}

	async function savePrimaryImage() {
		if (!unitVersion?.primaryImage || !unitPrimaryImages) return false;

		let newCharacterPrimaryImages = JSON.parse(JSON.stringify(unitPrimaryImages));
		const newUnitPrimaryImagesIndex = newCharacterPrimaryImages.findIndex((e) => JSON.stringify(e._id) === JSON.stringify(unitVersion._id));
		if (newUnitPrimaryImagesIndex === -1 || newCharacterPrimaryImages[newUnitPrimaryImagesIndex]?.image?.image === "NO_IMAGE") return false;

		const unit_response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions", unitVersion._id, "primaryImage"],
			newValue: unitVersion.primaryImage,
		});
		if (!unit_response || unit_response?.errors) return false;

		let image_request_body = {
			newValue: newCharacterPrimaryImages[newUnitPrimaryImagesIndex]?.image?.image,
			story_id: story._id,
		};
		image_request_body[unit_type + "_id"] = unit._id;

		const response = await APIRequest("/image/" + unitVersion?.primaryImage, "PATCH", image_request_body);
		if (!response || response?.errors) return false;
		return true;
	}

	return {
		isAuthorizedToEdit,
		unit_type,
		unitVersion,
		unitPrimaryImages,
		onPrimaryImageClick,
		changePrimaryImage,
		revertPrimaryImage,
		savePrimaryImage,
	};
};
