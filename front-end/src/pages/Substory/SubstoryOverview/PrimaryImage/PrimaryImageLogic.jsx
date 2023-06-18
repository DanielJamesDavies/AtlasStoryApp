// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { SubstoryContext } from "../../SubstoryContext";
import { APIContext } from "../../../../context/APIContext";

// Services

// Styles

// Assets

export const SubstoryOverviewPrimaryImageLogic = () => {
	const { isAuthorizedToEdit, story, substory, substoryPrimaryImage, setSubstoryPrimaryImage } = useContext(SubstoryContext);
	const { APIRequest } = useContext(APIContext);

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
		substoryPrimaryImage,
		changePrimaryImage,
		revertPrimaryImage,
		savePrimaryImage,
	};
};
