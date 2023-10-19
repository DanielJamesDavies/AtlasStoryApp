// Packages
import { useContext, useState } from "react";
import ImageTracer from "imagetracerjs";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../../UnitPageContext";
import { APIContext } from "../../../../../../context/APIContext";
import { RecentDataContext } from "../../../../../../context/RecentDataContext";

// Services
const Marvin = window.Marvin;
const MarvinImage = window.MarvinImage;

// Styles

// Assets

export const SettingsMapImageLogic = () => {
	const { unit_type, isAuthorizedToEdit, story, unit, setUnit, locationMapImage, setLocationMapImage } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);
	const { addImagesToRecentImages } = useContext(RecentDataContext);

	const [errors, setErrors] = useState([]);

	var marvinj_image = false;

	function changeMapImage(image) {
		setLocationMapImage(image);
		marvinj_image = new MarvinImage();
		marvinj_image.load(image, marvinjImageLoaded);
	}

	function marvinjImageLoaded() {
		let newUnit = JSON.parse(JSON.stringify(unit));

		let imageOut = new MarvinImage(marvinj_image.getWidth(), marvinj_image.getHeight());
		Marvin.prewitt(marvinj_image, imageOut);
		Marvin.invertColors(imageOut, imageOut);
		Marvin.thresholding(imageOut, imageOut, 220);

		const svgstring = ImageTracer.imagedataToSVG(imageOut?.imageData, { strokewidth: 4, linefilter: true });
		
		newUnit.data.mapImageComponents = svgstring;
		setUnit(newUnit);
	}

	function removeMapImage() {
		setLocationMapImage("NO_IMAGE");
		let newUnit = JSON.parse(JSON.stringify(unit));
		newUnit.data.mapImageComponents = "";
		setUnit(newUnit);
	}

	async function revertMapImage() {
		setErrors([]);
		
		const response = await APIRequest("/image/" + unit?.data?.mapImage, "GET");
		if (!response || response?.errors || !response?.data?.image?.image) return false;
		
		const components_response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", {
			story_id: story._id,
			path: ["data", "mapImageComponents"],
		});
		if (!components_response || components_response?.errors || components_response?.data?.value === undefined) return false;

		setLocationMapImage(response.data.image.image);
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit.data.mapImageComponents = response.data.value;
			return newUnit;
		});

		return true;
	}

	async function saveMapImage() {
		setErrors([]);
		if (!unit?._id) return;
		await APIRequest("/" + unit_type + "/" + unit?._id, "PATCH", {
			path: ["data", "mapImageComponents"],
			newValue: unit?.data?.mapImageComponents,
			story_id: story._id,
			unit_id: unit._id,
		});
		await APIRequest("/" + unit_type + "/" + unit?._id, "PATCH", {
			path: ["data", "mapImage"],
			newValue: unit?.data?.mapImage,
			story_id: story._id,
			unit_id: unit._id,
		});
		const response = await APIRequest("/image/" + unit?.data?.mapImage, "PATCH", {
			newValue: locationMapImage,
			story_id: story._id,
			unit_id: unit._id,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		addImagesToRecentImages([response?.data?.image]);
		return true;
	}

	return {
		unit_type,
		isAuthorizedToEdit,
		locationMapImage,
		changeMapImage,
		removeMapImage,
		revertMapImage,
		saveMapImage,
		errors,
	};
};
