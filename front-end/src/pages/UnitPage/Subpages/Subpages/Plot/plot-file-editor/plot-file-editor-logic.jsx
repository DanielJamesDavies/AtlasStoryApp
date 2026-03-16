// Packages
import { useContext, useRef } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../../UnitPageContext";
import { APIContext } from "../../../../../../context/APIContext";

// Services
import getImageFromFile from "../../../../../../services/GetImageFromFile";

// Assets

export const PlotFileEditorLogic = () => {
	const { story, unit, unitImages, setUnitImages } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);

	// In-memory cache so the same ID is only fetched once per editor session
	const previewCache = useRef({});

	/**
	 * Called by MDXEditor's imagePlugin when it needs to display an image.
	 * `src` is the string stored in the markdown — in our case a MongoDB ObjectID.
	 * Must return a Promise<string> resolving to a displayable URL or base64 src.
	 */
	const imagePreviewHandler = async (src) => {
		const id = String(src);

		if (previewCache.current[id]) return previewCache.current[id];

		// Check the pre-loaded unit images gallery cache
		const cached = unitImages.find((img) => String(img._id) === id);
		if (cached?.image) {
			previewCache.current[id] = cached.image;
			return cached.image;
		}

		// Fall back to an API fetch
		const response = await APIRequest(`/image/${id}`, "GET");
		const base64 = response?.data?.image?.image;
		if (base64) {
			previewCache.current[id] = base64;
			return base64;
		}

		return "";
	};

	/**
	 * Called by MDXEditor's imagePlugin when the user picks a file to upload.
	 * Must return a Promise<string> resolving to the URL/src to embed in the markdown.
	 * We return the MongoDB ObjectID so the format stays `![alt](objectId)`.
	 */
	const imageUploadHandler = async (file) => {
		const image = await getImageFromFile(file);
		if (image?.error || !image?.data) return "";

		const response = await APIRequest("/image", "POST", {
			story_id: story._id,
			substory_id: unit._id,
			newValue: image.data,
			image: image.data,
		});

		if (!response?.data?.image?._id) return "";

		const newId = String(response.data.image._id);

		// Cache for immediate preview in the editor
		previewCache.current[newId] = image.data;

		// Add to unitImages so the viewer can use the same cache
		setUnitImages((prev) => [...prev, { _id: newId, image: image.data }]);

		return newId;
	};

	return { imageUploadHandler, imagePreviewHandler };
};
