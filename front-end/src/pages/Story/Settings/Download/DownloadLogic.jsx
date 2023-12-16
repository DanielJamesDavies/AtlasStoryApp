// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { StoryContext } from "../../../../context/StoryContext";
import { APIContext } from "../../../../context/APIContext";

// Services

// Styles

// Assets

export const DownloadLogic = () => {
	const { story } = useContext(StoryContext);
	const { APIRequest } = useContext(APIContext);

	const [errors, setErrors] = useState([]);

	async function downloadAllStoryData() {
		const newStory = JSON.parse(JSON.stringify(story));
		if (!newStory._id || !newStory?.uid) return false;

		setErrors([]);
		const response = await APIRequest("/story/" + newStory?._id + "?story_id=" + newStory?._id + "&all=true", "GET");
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}

		const blob = new Blob([JSON.stringify(response?.data)], { type: "text/json" });
		const a_element = document.createElement("a");
		a_element.download = newStory?.uid + ".json";
		a_element.href = window.URL.createObjectURL(blob);
		const clickEvt = new MouseEvent("click", { view: window, bubbles: true, cancelable: true });
		a_element.dispatchEvent(clickEvt);
		a_element.remove();

		return true;
	}

	return { downloadAllStoryData, errors };
};
