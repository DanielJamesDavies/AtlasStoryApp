// Packages
import { useContext, useRef } from "react";

// Components

// Logic

// Context
import { SubstoryContext } from "../../SubstoryContext";
import { APIContext } from "../../../../context/APIContext";
import { RecentDataContext } from "../../../../context/RecentDataContext";

// Services
import getImageFromFile from "../../../../services/GetImageFromFile";

// Styles

// Assets

export const ChangeOverviewBackgroundLogic = () => {
	const { isAuthorizedToEdit, story, substory, substoryOverviewBackground, setSubstoryOverviewBackground } = useContext(SubstoryContext);
	const { APIRequest } = useContext(APIContext);
	const { addImagesToRecentImages } = useContext(RecentDataContext);
	const inputRef = useRef();

	async function changeOverviewBackground(e) {
		if (!substory?._id) return;

		let image = await getImageFromFile(e.target.files[0]);
		inputRef.current.value = [];
		if (image?.error || !image?.data) return;
		image = image.data;

		setSubstoryOverviewBackground(image);

		await APIRequest("/substory/" + substory?._id, "PATCH", {
			path: ["data", "overviewBackground"],
			newValue: substory?.data?.overviewBackground,
			story_id: story._id,
			substory_id: substory._id,
		});
		const response = await APIRequest("/image/" + substory?.data?.overviewBackground, "PATCH", {
			newValue: image,
			story_id: story._id,
			substory_id: substory._id,
		});
		if (!response || response?.errors) return false;

		addImagesToRecentImages([response?.data?.image]);

		return true;
	}

	return {
		isAuthorizedToEdit,
		inputRef,
		substoryOverviewBackground,
		changeOverviewBackground,
	};
};
