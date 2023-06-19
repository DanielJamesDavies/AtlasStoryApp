// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { SubstoryContext } from "../../../../SubstoryContext";
import { APIContext } from "../../../../../../context/APIContext";
import { LightboxContext } from "../../../../../../context/LightboxContext";

// Services

// Styles

// Assets

export const SubstoryProfilePrimaryImageLogic = () => {
	const { isAuthorizedToEdit, story, substory, substoryVersion, substoryPrimaryImage, setSubstoryPrimaryImage } = useContext(SubstoryContext);
	const { APIRequest } = useContext(APIContext);
	const { setLightboxImageIDs, setLightboxIndex } = useContext(LightboxContext);

	function onPrimaryImageClick() {
		setLightboxImageIDs([substoryVersion?.primaryImage]);
		setLightboxIndex(0);
	}

	function changePrimaryImage(image) {
		setSubstoryPrimaryImage(image);
	}

	async function revertPrimaryImage() {
		const response = await APIRequest("/image/" + substory?.data?.primaryImage, "GET");
		if (!response || response?.errors || !response?.data?.image?.image) return false;
		setSubstoryPrimaryImage(response.data.image.image);
		return true;
	}

	async function savePrimaryImage() {
		if (!substory?._id || !substory?.data?.primaryImage) return;
		await APIRequest("/substory/" + substory?._id, "PATCH", {
			path: ["data", "primaryImage"],
			newValue: substory?.data?.primaryImage,
			story_id: story._id,
			substory_id: substory._id,
		});
		const response = await APIRequest("/image/" + substory?.data?.primaryImage, "PATCH", {
			newValue: substoryPrimaryImage,
			story_id: story._id,
			substory_id: substory._id,
		});
		if (!response || response?.errors) return false;
		return true;
	}

	return {
		isAuthorizedToEdit,
		substoryVersion,
		substoryPrimaryImage,
		onPrimaryImageClick,
		changePrimaryImage,
		revertPrimaryImage,
		savePrimaryImage,
	};
};
