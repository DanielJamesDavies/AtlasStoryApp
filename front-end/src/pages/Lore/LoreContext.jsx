import React, { createContext, useContext, useEffect, useRef, useState } from "react";

import { RoutesContext } from "../../context/RoutesContext";
import { StoryContext } from "../../context/StoryContext";
import { APIContext } from "../../context/APIContext";

export const LoreContext = createContext();

const LoreProvider = ({ children, story_uid }) => {
	const { location, changeLocationParameters } = useContext(RoutesContext);
	const { isAuthorizedToEdit, story, setStory, storyIcon, createUnitForm } = useContext(StoryContext);
	const { APIRequest } = useContext(APIContext);
	const [lore, setLore] = useState(false);
	const [loreImages, setLoreImages] = useState(false);

	const [createLoreItemValues, setCreateLoreItemValues] = useState({});

	const curr_story_uid = useRef(false);
	useEffect(() => {
		async function getInitial() {
			if (!story_uid) return;
			if (curr_story_uid === story_uid) return;
			if (!story || story.uid !== story_uid) return;

			// Document Title
			updateDocumentTitle();
			setTimeout(() => {
				if (window.location.pathname.split("/").filter((e) => e.length !== 0)[2] === "lore") updateDocumentTitle();
			}, 500);
			setTimeout(() => {
				if (window.location.pathname.split("/").filter((e) => e.length !== 0)[2] === "lore") updateDocumentTitle();
			}, 750);
			setTimeout(() => {
				if (window.location.pathname.split("/").filter((e) => e.length !== 0)[2] === "lore") updateDocumentTitle();
			}, 1000);

			const newLore = await getLore();
			getLoreImages(newLore?.map((lore_item) => lore_item?.data?.listImage));
		}

		function updateDocumentTitle() {
			if (story?.data?.title) {
				document.title = "Lore | " + story.data.title + " | Atlas Story App";
			} else {
				document.title = "https://www.atlas-story.app" + location;
			}
		}

		async function getLore() {
			const response = await APIRequest("/lore?story_uid=" + story_uid, "GET");
			if (!response || response?.error || !response?.data?.lore) return false;
			setLore(response?.data?.lore);
			return response?.data?.lore;
		}

		async function getLoreImages(image_ids) {
			if (!image_ids) return setLoreImages([]);

			const newObjectImages = await Promise.all(
				image_ids.map(async (image_id) => {
					if (!image_id) return false;

					const lore_item_image_response = await APIRequest("/image/" + image_id, "GET");
					if (lore_item_image_response?.errors || !lore_item_image_response?.data?.image?.image) return false;
					return lore_item_image_response.data.image;
				})
			);

			setLoreImages(newObjectImages.filter((e) => e !== false));
		}

		getInitial();
	}, [location, story_uid, curr_story_uid, story, APIRequest]);

	useEffect(() => {
		changeLocationParameters([]);
	}, [changeLocationParameters]);

	const [isDisplayingCreateLoreItemForm, setIsDisplayingCreateLoreItemForm] = useState(false);
	const [isReorderingLore, setIsReorderingLore] = useState(false);
	function toggleIsReorderingLore() {
		setIsReorderingLore((oldIsReorderingLore) => !oldIsReorderingLore);
	}

	const lastCreateUnitForm = useRef(false);
	useEffect(() => {
		if (JSON.stringify(lastCreateUnitForm?.current) !== JSON.stringify(createUnitForm)) {
			lastCreateUnitForm.current = JSON.parse(JSON.stringify(createUnitForm));
			if (createUnitForm?.unit_type === "world_item") {
				setIsDisplayingCreateLoreItemForm(true);

				setCreateLoreItemValues({ name: createUnitForm?.name, uid: createUnitForm?.uid });
			}
		}
	}, [createUnitForm, setCreateLoreItemValues, setIsDisplayingCreateLoreItemForm, lastCreateUnitForm]);

	return (
		<LoreContext.Provider
			value={{
				isAuthorizedToEdit,
				story,
				setStory,
				storyIcon,
				lore,
				loreImages,
				isDisplayingCreateLoreItemForm,
				setIsDisplayingCreateLoreItemForm,
				isReorderingLore,
				setIsReorderingLore,
				toggleIsReorderingLore,
				createLoreItemValues,
				setCreateLoreItemValues,
			}}
		>
			{children}
		</LoreContext.Provider>
	);
};

export default LoreProvider;
