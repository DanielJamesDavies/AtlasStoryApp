// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { StoryContext } from "../../../../context/StoryContext";
import { APIContext } from "../../../../context/APIContext";
import { AIContext } from "../../../../context/AIContext";

// Services

// Styles

// Assets

export const PronunciationsLogic = () => {
	const { isAuthorizedToEdit, story, setStory } = useContext(StoryContext);
	const { APIRequest } = useContext(APIContext);
	const { AI_TTS_Request } = useContext(AIContext);

	function changePronunciationFrom(e, index) {
		let newStory = JSON.parse(JSON.stringify(story));
		newStory.data.pronunciations[index].from = e.target.value;
		setStory(newStory);
	}

	function changePronunciationTo(e, index) {
		let newStory = JSON.parse(JSON.stringify(story));
		newStory.data.pronunciations[index].to = e.target.value;
		setStory(newStory);
	}

	const [errors, setErrors] = useState([]);

	async function revertPronunciations() {
		const response = await APIRequest("/story/get-value/" + story._id, "POST", {
			story_id: story._id,
			path: ["data", "pronunciations"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		let newStory = JSON.parse(JSON.stringify(story));
		newStory.data.pronunciations = response.data.value;
		setStory(newStory);

		return true;
	}

	async function savePronunciations() {
		setErrors([]);
		if (!story?._id) return;
		const response = await APIRequest("/story/" + story._id, "PATCH", {
			story_id: story._id,
			path: ["data", "pronunciations"],
			newValue: story?.data?.pronunciations,
		});
		if (!response || response?.errors || !response?.data?.story?.uid) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	function addPronunciation() {
		let newStory = JSON.parse(JSON.stringify(story));
		newStory.data.pronunciations.push({ from: "", to: "" });
		setStory(newStory);
	}

	function removePronunciation(index) {
		let newStory = JSON.parse(JSON.stringify(story));
		newStory.data.pronunciations.splice(index, 1);
		setStory(newStory);
	}

	const [isLoadingPronounciation, setIsLoadingPronounciation] = useState(false);

	async function hearPronunciation(index) {
		const pronunciation = story.data.pronunciations[index]?.to;
		setIsLoadingPronounciation(true);

		try {
			const response_audio = await AI_TTS_Request(pronunciation, []);

			const ctx = new AudioContext();
			const source = ctx.createBufferSource();
			source.buffer = response_audio;

			const gain_node = ctx.createGain();
			gain_node.gain.value = 0.1;
			gain_node.connect(ctx.destination);
			source.connect(gain_node);
			source.start();

			setTimeout(() => {
				setIsLoadingPronounciation(false);
			}, 1000 * 20);
		} catch {
			setTimeout(() => {
				setIsLoadingPronounciation(false);
			}, 1000 * 20);
		}
	}

	return {
		isAuthorizedToEdit,
		story,
		addPronunciation,
		removePronunciation,
		changePronunciationFrom,
		changePronunciationTo,
		revertPronunciations,
		savePronunciations,
		errors,
		isLoadingPronounciation,
		hearPronunciation,
	};
};
