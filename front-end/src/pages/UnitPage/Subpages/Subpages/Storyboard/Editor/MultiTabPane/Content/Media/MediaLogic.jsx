// Packages
import { useContext, useRef } from "react";

// Components

// Logic

// Context
import { StoryboardContext } from "../../../../StoryboardContext";
import { APIContext } from "../../../../../../../../../context/APIContext";

// Services
import getImageFromFile from "../../../../../../../../../services/GetImageFromFile";

// Styles

// Assets

export const MediaLogic = () => {
	const { playerHeight, content_simple, content_images, setContentImages } = useContext(StoryboardContext);
	const { APIRequest } = useContext(APIContext);

	const addImageInputRef = useRef();

	async function onAddImageInputChange(e) {
		const image = await getImageFromFile(e.target.files[0], { maxFileSizeInKBs: undefined });
		addImageInputRef.current.value = [];
		if (image?.error || !image?.data) return false;

		const new_id_response = await APIRequest("/new-id/", "GET");
		if (!new_id_response || new_id_response?.errors || !new_id_response?.data?._id) return false;

		const image_size = new Promise((resolve) => {
			const img = new Image();
			img.onload = () => {
				resolve({ width: img.width, height: img.height });
			};
			img.onerror = resolve({ width: 400, height: 400 });
			img.src = image.data;
		});

		setContentImages((oldValue) =>
			oldValue.concat([
				{
					id: new_id_response?.data?._id,
					image: image?.data,
					width: image_size?.width,
					height: image_size?.height,
				},
			])
		);
	}

	return { playerHeight, content_simple, content_images, addImageInputRef, onAddImageInputChange };
};
