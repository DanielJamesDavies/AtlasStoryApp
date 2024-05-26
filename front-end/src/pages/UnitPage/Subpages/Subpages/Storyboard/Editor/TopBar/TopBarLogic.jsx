// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../../../UnitPageContext";
import { StoryboardContext } from "../../StoryboardContext";
import { APIContext } from "../../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const TopBarLogic = () => {
	const { unit_type, story, storyIcon, unit } = useContext(UnitPageContext);
	const { setIsEditingStoryboard, layers, pieces, playlists, tracks, content_images } = useContext(StoryboardContext);
	const { APIRequest } = useContext(APIContext);

	function onClickBackBtn() {
		setIsEditingStoryboard(false);
	}

	async function onClickSaveBtn() {
		const newLayers = JSON.parse(JSON.stringify(layers));
		const newPieces = JSON.parse(JSON.stringify(pieces));
		const newPlaylists = JSON.parse(JSON.stringify(playlists));
		const newTracks = JSON.parse(JSON.stringify(tracks));
		const newImages = JSON.parse(JSON.stringify(content_images));

		const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
			story_id: story._id,
			path: ["data", "storyboard"],
			newValue: { layers: newLayers, pieces: newPieces, playlists: newPlaylists, tracks: newTracks, images: newImages },
		});
		if (!response || response?.errors) {
			return false;
		}
	}

	return { story, storyIcon, unit, onClickBackBtn, onClickSaveBtn };
};
