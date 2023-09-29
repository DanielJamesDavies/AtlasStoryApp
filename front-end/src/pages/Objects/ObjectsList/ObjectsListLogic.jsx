// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { ObjectsContext } from "../ObjectsContext";
import { APIContext } from "../../../context/APIContext";

// Services

// Styles

// Assets

export const ObjectsListLogic = () => {
	const { story, setStory, objects, objectsImages, isReorderingObjects, setIsDisplayingCreateObjectForm } = useContext(ObjectsContext);
	const { authorized_user_id, APIRequest } = useContext(APIContext);

	async function changeObjectsOrder(res) {
		if (res.from === undefined || res.to === undefined) return;

		let newStory = JSON.parse(JSON.stringify(story));
		const tempItem = newStory.data.objects.splice(res.from, 1)[0];
		newStory.data.objects.splice(res.to, 0, tempItem);
		setStory(newStory);

		await APIRequest("/story/" + newStory._id, "PATCH", {
			story_id: newStory._id,
			path: ["data", "objects"],
			newValue: newStory.data.objects,
		});
	}

	return { authorized_user_id, story, objects, objectsImages, isReorderingObjects, changeObjectsOrder, setIsDisplayingCreateObjectForm };
};
