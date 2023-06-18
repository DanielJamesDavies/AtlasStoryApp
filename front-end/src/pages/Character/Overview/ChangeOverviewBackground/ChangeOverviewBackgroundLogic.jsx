// Packages
import { useContext, useRef } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../CharacterContext";
import { APIContext } from "../../../../context/APIContext";
import { RecentDataContext } from "../../../../context/RecentDataContext";

// Services
import getImageFromFile from "../../../../services/GetImageFromFile";

// Styles

// Assets

export const ChangeOverviewBackgroundLogic = () => {
	const { isAuthorizedToEdit, story, character, characterOverviewBackground, setCharacterOverviewBackground } = useContext(CharacterContext);
	const { APIRequest } = useContext(APIContext);
	const { addImagesToRecentImages } = useContext(RecentDataContext);
	const inputRef = useRef();

	async function changeOverviewBackground(e) {
		if (!character?._id) return;

		let image = await getImageFromFile(e.target.files[0]);
		inputRef.current.value = [];
		if (image?.error || !image?.data) return;
		image = image.data;

		setCharacterOverviewBackground(image);

		await APIRequest("/character/" + character?._id, "PATCH", {
			path: ["data", "overviewBackground"],
			newValue: character?.data?.overviewBackground,
			story_id: story._id,
			character_id: character._id,
		});
		const response = await APIRequest("/image/" + character?.data?.overviewBackground, "PATCH", {
			newValue: image,
			story_id: story._id,
			character_id: character._id,
		});
		if (!response || response?.errors) return false;

		addImagesToRecentImages([response?.data?.image]);

		return true;
	}

	return {
		isAuthorizedToEdit,
		inputRef,
		characterOverviewBackground,
		changeOverviewBackground,
	};
};
