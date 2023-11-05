// Packages
import { useCallback, useContext, useEffect, useRef, useState } from "react";
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
	const { unit_type, isAuthorizedToEdit, story, unit, setUnit, locationMapImages, setLocationMapImages } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);
	const { addImagesToRecentImages } = useContext(RecentDataContext);

	const [errors, setErrors] = useState([]);

	const [mapVersion, setMapVersion] = useState("");
	const [mapVersionImage, setMapVersionImage] = useState(false);
	const [mapVersionComponents, setMapVersionComponents] = useState([]);

	const changeMapVersion = useCallback(
		(index) => {
			if (!unit?.data?.mapVersions[index]?._id) return false;
			setMapVersion(unit?.data?.mapVersions[index]?._id);
			setMapVersionImage(
				locationMapImages === false ? false : locationMapImages?.find((e) => e?._id === unit?.data?.mapVersions[index]?.mapImage)?.image
			);
		},
		[unit, locationMapImages]
	);

	const getMapVersionComponents = useCallback(() => {
		setMapVersionComponents(
			unit?.data?.mapVersions?.map((version) => {
				return { _id: version?._id, mapImageComponents: version?.mapImageComponents };
			})
		);
	}, [setMapVersionComponents, unit]);

	const hasGotMapVersionComponents = useRef(false);
	useEffect(() => {
		if (unit?._id && hasGotMapVersionComponents.current === false) {
			getMapVersionComponents();
			hasGotMapVersionComponents.current = true;
		}
	}, [getMapVersionComponents, unit]);

	const prevVersions = useRef(false);
	useEffect(() => {
		const newUnitMapVersions = unit?.data?.mapVersions?.map((e) => {
			e.mapImageComponents = "";
			return e;
		});

		if (locationMapImages !== false && JSON.stringify(newUnitMapVersions) !== JSON.stringify(prevVersions.current)) {
			const mapVersionID = mapVersion === "" ? 0 : unit?.data?.mapVersions?.findIndex((e) => e?._id === mapVersion);
			changeMapVersion(mapVersionID);
			prevVersions.current = JSON.parse(JSON.stringify(newUnitMapVersions));
		}
	}, [unit, changeMapVersion, locationMapImages, mapVersion]);

	var marvinj_image = false;

	function changeMapImage(image) {
		setMapVersionImage(image);
		marvinj_image = new MarvinImage();
		marvinj_image.load(image, marvinjImageLoaded);

		const image_id = unit?.data?.mapVersions?.find((e) => e?._id === mapVersion)?.mapImage;

		setLocationMapImages((oldValue) => {
			let newValue = JSON.parse(JSON.stringify(oldValue));
			const index = newValue?.findIndex((e) => e?._id === image_id);
			if (index === -1) return newValue;
			newValue[index].image = image;
			return newValue;
		});
	}

	function marvinjImageLoaded() {
		let imageOut = new MarvinImage(marvinj_image.getWidth(), marvinj_image.getHeight());
		Marvin.prewitt(marvinj_image, imageOut);
		Marvin.invertColors(imageOut, imageOut);
		Marvin.thresholding(imageOut, imageOut, 220);

		const svgstring = ImageTracer.imagedataToSVG(imageOut?.imageData, { strokewidth: 4, linefilter: true });

		setMapVersionComponents((oldValue) => {
			let newValue = JSON.parse(JSON.stringify(oldValue));
			const index = newValue?.findIndex((e) => e?._id === mapVersion);
			if (index === -1) return newValue;
			newValue[index].mapImageComponents = svgstring;
			return newValue;
		});
	}

	function removeMapImage() {
		setMapVersionImage("NO_IMAGE");
		let newUnit = JSON.parse(JSON.stringify(unit));
		newUnit.data.mapImageComponents = "";
		setUnit(newUnit);
	}

	async function revertMapImage() {
		setErrors([]);

		const mapVersionId = JSON.parse(JSON.stringify(mapVersion));
		const image_id = unit?.data?.mapVersions?.find((e) => e?._id === mapVersion)?.mapImage;

		const response = await APIRequest("/image/" + image_id, "GET");
		if (!response || response?.errors || !response?.data?.image?.image) return false;

		const components_response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", {
			story_id: story._id,
			path: ["data", "mapVersions", mapVersionId, "mapImageComponents"],
		});
		if (!components_response || components_response?.errors || components_response?.data?.value === undefined) return false;

		setMapVersionImage(response.data.image.image);
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			const mapVersionIndex = newUnit.data.mapVersions?.findIndex((e) => e?._id === mapVersionId);
			if (mapVersionIndex === -1) return newUnit;
			newUnit.data.mapVersions[mapVersionIndex].mapImageComponents = response.data.value;
			return newUnit;
		});

		setLocationMapImages((oldValue) => {
			let newValue = JSON.parse(JSON.stringify(oldValue));
			const index = newValue?.findIndex((e) => e?._id === image_id);
			if (index === -1) return newValue;
			newValue[index].image = response?.data?.image?.image;
			return newValue;
		});

		return true;
	}

	async function saveMapImage() {
		setErrors([]);
		const newUnit = JSON.parse(JSON.stringify(unit));

		if (!newUnit?._id) return;

		const newUnitType = JSON.parse(JSON.stringify(unit_type));
		const mapVersionId = JSON.parse(JSON.stringify(mapVersion));
		const mapVersionIndex = newUnit.data.mapVersions?.findIndex((e) => e?._id === mapVersionId);
		if (mapVersionIndex === -1) return false;

		const mapImageComponents = mapVersionComponents?.find((e) => e?._id === mapVersionId)?.mapImageComponents;
		const newMapVersionImage = JSON.parse(JSON.stringify(mapVersionImage));

		await APIRequest("/" + newUnitType + "/" + newUnit?._id, "PATCH", {
			path: ["data", "mapVersions", mapVersionId, "regions"],
			newValue: newUnit?.data?.mapVersions[mapVersionIndex]?.regions?.map((region) => {
				region.components = [];
				return region;
			}),
			story_id: story._id,
			unit_id: newUnit._id,
		});

		await APIRequest("/" + newUnitType + "/" + unit?._id, "PATCH", {
			path: ["data", "mapVersions", mapVersionId, "mapImageComponents"],
			newValue: mapImageComponents,
			story_id: story._id,
			unit_id: unit._id,
		});

		await APIRequest("/" + newUnitType + "/" + unit?._id, "PATCH", {
			path: ["data", "mapVersions", mapVersionId, "mapImage"],
			newValue: newUnit?.data?.mapVersions[mapVersionIndex]?.mapImage,
			story_id: story._id,
			unit_id: unit._id,
		});

		const response = await APIRequest("/image/" + newUnit?.data?.mapVersions[mapVersionIndex]?.mapImage, "PATCH", {
			newValue: newMapVersionImage,
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
		unit,
		mapVersion,
		changeMapVersion,
		mapVersionImage,
		changeMapImage,
		removeMapImage,
		revertMapImage,
		saveMapImage,
		errors,
	};
};
