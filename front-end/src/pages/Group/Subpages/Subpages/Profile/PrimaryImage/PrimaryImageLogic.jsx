// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { GroupContext } from "../../../../GroupContext";
import { APIContext } from "../../../../../../context/APIContext";
import { LightboxContext } from "../../../../../../context/LightboxContext";

// Services

// Styles

// Assets

export const GroupProfilePrimaryImageLogic = () => {
	const { isAuthorizedToEdit, story, group, groupVersion, groupPrimaryImages, setGroupPrimaryImages } = useContext(GroupContext);
	const { APIRequest } = useContext(APIContext);
	const { setLightboxImageIDs, setLightboxIndex } = useContext(LightboxContext);

	function onPrimaryImageClick() {
		setLightboxImageIDs([groupVersion?.primaryImage]);
		setLightboxIndex(0);
	}

	async function changePrimaryImage(image) {
		let newGroupPrimaryImages = JSON.parse(JSON.stringify(groupPrimaryImages));
		const newGroupPrimaryImagesIndex = newGroupPrimaryImages.findIndex((e) => JSON.stringify(e._id) === JSON.stringify(groupVersion._id));
		if (newGroupPrimaryImagesIndex === -1) return false;
		if (newGroupPrimaryImages[newGroupPrimaryImagesIndex]?.image?.image) newGroupPrimaryImages[newGroupPrimaryImagesIndex].image.image = image;
		setGroupPrimaryImages(newGroupPrimaryImages);
	}

	async function revertPrimaryImage() {
		let newGroupPrimaryImages = JSON.parse(JSON.stringify(groupPrimaryImages));
		const newGroupPrimaryImagesIndex = newGroupPrimaryImages.findIndex((e) => JSON.stringify(e._id) === JSON.stringify(groupVersion._id));
		if (newGroupPrimaryImagesIndex === -1) return false;

		const response = await APIRequest("/image/" + groupVersion?.primaryImage, "GET");
		if (!response || response?.errors || !response?.data?.image?.image) return false;
		newGroupPrimaryImages[newGroupPrimaryImagesIndex].image = response.data.image;
		setGroupPrimaryImages(newGroupPrimaryImages);
		return true;
	}

	async function savePrimaryImage() {
		if (!groupVersion?.primaryImage || !groupPrimaryImages) return false;

		let newGroupPrimaryImages = JSON.parse(JSON.stringify(groupPrimaryImages));
		const newGroupPrimaryImagesIndex = newGroupPrimaryImages.findIndex((e) => JSON.stringify(e._id) === JSON.stringify(groupVersion._id));
		if (newGroupPrimaryImagesIndex === -1 || newGroupPrimaryImages[newGroupPrimaryImagesIndex]?.image?.image === "NO_IMAGE") return false;

		const group_response = await APIRequest("/group/" + group._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions", groupVersion._id, "primaryImage"],
			newValue: groupVersion.primaryImage,
		});
		if (!group_response || group_response?.errors) return false;

		const response = await APIRequest("/image/" + groupVersion?.primaryImage, "PATCH", {
			newValue: newGroupPrimaryImages[newGroupPrimaryImagesIndex]?.image?.image,
			story_id: story._id,
			group_id: group._id,
		});
		if (!response || response?.errors) return false;
		return true;
	}

	return {
		isAuthorizedToEdit,
		groupVersion,
		groupPrimaryImages,
		onPrimaryImageClick,
		changePrimaryImage,
		revertPrimaryImage,
		savePrimaryImage,
	};
};
