import React, { createContext, useContext, useEffect, useRef, useState } from "react";

import { RoutesContext } from "../../context/RoutesContext";
import { StoryContext } from "../../context/StoryContext";
import { APIContext } from "../../context/APIContext";

export const ObjectsContext = createContext();

const ObjectsProvider = ({ children, story_uid }) => {
	const { location, changeLocationParameters } = useContext(RoutesContext);
	const { isAuthorizedToEdit, story, setStory, storyIcon, createUnitForm } = useContext(StoryContext);
	const { APIRequest } = useContext(APIContext);
	const [objects, setObjects] = useState(false);
	const [objectsImages, setObjectsImages] = useState(false);

	const [createObjectsValues, setCreateObjectsValues] = useState({});

	const curr_story_uid = useRef(false);
	useEffect(() => {
		async function getInitial() {
			if (!story_uid) return;
			if (curr_story_uid === story_uid) return;
			if (!story || story.uid !== story_uid) return;

			// Document Title
			updateDocumentTitle();
			setTimeout(() => {
				if (window.location.pathname.split("/").filter((e) => e.length !== 0)[2] === "objects") updateDocumentTitle();
			}, 500);
			setTimeout(() => {
				if (window.location.pathname.split("/").filter((e) => e.length !== 0)[2] === "objects") updateDocumentTitle();
			}, 750);
			setTimeout(() => {
				if (window.location.pathname.split("/").filter((e) => e.length !== 0)[2] === "objects") updateDocumentTitle();
			}, 1000);

			const newObjects = await getObjects();
			getObjectsImages(newObjects?.map((object) => object?.data?.listImage));
		}

		function updateDocumentTitle() {
			if (story?.data?.title) {
				document.title = "Objects | " + story.data.title + " | Atlas Story App";
			} else {
				document.title = "https://www.atlas-story.app" + location;
			}
		}

		async function getObjects() {
			const response = await APIRequest("/object?story_uid=" + story_uid, "GET");
			if (!response || response?.error || !response?.data?.objects) return false;
			setObjects(response?.data?.objects);
			return response?.data?.objects;
		}

		async function getObjectsImages(image_ids) {
			if (!image_ids) return setObjectsImages([]);

			const newObjectImages = await Promise.all(
				image_ids.map(async (image_id) => {
					if (!image_id) return false;

					const object_image_response = await APIRequest("/image/" + image_id, "GET");
					if (object_image_response?.errors || !object_image_response?.data?.image?.image) return false;
					return object_image_response.data.image;
				})
			);

			setObjectsImages(newObjectImages.filter((e) => e !== false));
		}

		getInitial();
	}, [location, story_uid, curr_story_uid, story, APIRequest]);

	useEffect(() => {
		changeLocationParameters([]);
	}, [changeLocationParameters]);

	const [isDisplayingCreateObjectForm, setIsDisplayingCreateObjectForm] = useState(false);
	const [isReorderingObjects, setIsReorderingObjects] = useState(false);
	function toggleIsReorderingObjects() {
		setIsReorderingObjects((oldIsReorderingObjects) => !oldIsReorderingObjects);
	}

	const lastCreateUnitForm = useRef(false);
	useEffect(() => {
		if (JSON.stringify(lastCreateUnitForm?.current) !== JSON.stringify(createUnitForm)) {
			lastCreateUnitForm.current = JSON.parse(JSON.stringify(createUnitForm));
			if (createUnitForm?.unit_type === "object") {
				setIsDisplayingCreateObjectForm(true);

				setCreateObjectsValues({ name: createUnitForm?.name, uid: createUnitForm?.uid });
			}
		}
	}, [createUnitForm, setCreateObjectsValues, setIsDisplayingCreateObjectForm, lastCreateUnitForm]);

	return (
		<ObjectsContext.Provider
			value={{
				isAuthorizedToEdit,
				story,
				setStory,
				storyIcon,
				objects,
				objectsImages,
				isDisplayingCreateObjectForm,
				setIsDisplayingCreateObjectForm,
				isReorderingObjects,
				setIsReorderingObjects,
				toggleIsReorderingObjects,
				createObjectsValues,
				setCreateObjectsValues,
			}}
		>
			{children}
		</ObjectsContext.Provider>
	);
};

export default ObjectsProvider;
