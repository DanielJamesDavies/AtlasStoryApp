// Packages
import { useCallback, useContext, useEffect, useRef, useState } from "react";

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
	const { unit_type, isAuthorizedToEdit, story, unit, locationMapImages, setLocationMapImages, locationMapComponents, setLocationMapComponents } =
		useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);
	const { addImagesToRecentImages } = useContext(RecentDataContext);

	const [errors, setErrors] = useState([]);

	const [mapVersion, setMapVersion] = useState("");
	const [mapVersionImage, setMapVersionImage] = useState(false);

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

	const prevVersions = useRef(false);
	useEffect(() => {
		if (locationMapImages !== false && JSON.stringify(unit?.data?.mapVersions) !== JSON.stringify(prevVersions.current)) {
			const mapVersionID = mapVersion === "" ? 0 : unit?.data?.mapVersions?.findIndex((e) => e?._id === mapVersion);
			changeMapVersion(mapVersionID);
			prevVersions.current = JSON.parse(JSON.stringify(unit?.data?.mapVersions));
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

		const workerCode = `
		import ImageTracer from "imagetracerjs";
		self.onmessage = function(e) {
			try {
				const svgstring = ImageTracer.imagedataToSVG(e.data.imageData, { strokewidth: 4, linefilter: true });
				self.postMessage({ svgstring });
			} catch (error) {
				self.postMessage({ error: error.message });
			}
		};
		`;

		const blob = new Blob([workerCode], { type: "application/javascript" });
		const worker = new Worker(URL.createObjectURL(blob), { type: "module" });

		const timeoutId = setTimeout(() => {
			worker.terminate();
			console.error("Operation timed out and worker was terminated.");
			const svgstring =
				'<svg width="2000" height="1000" version="1.1" xmlns="http://www.w3.org/2000/svg" desc="Created with imagetracer.js version 1.2.6"></svg>';
			setLocationMapComponents((oldValue) => {
				let newValue = JSON.parse(JSON.stringify(oldValue));
				const index = newValue.findIndex((e) => e?.version_id === mapVersion);
				if (index === -1) {
					const mapImageComponents = unit?.data?.mapVersions?.find((e) => e?._id === mapVersion)?.mapImageComponents;
					newValue.push({ _id: mapImageComponents, version_id: mapVersion, image: svgstring });
					return newValue;
				}
				newValue[index].image = svgstring;
				return newValue;
			});
		}, 10000);

		worker.onmessage = function (e) {
			clearTimeout(timeoutId);
			if (e.data.error) {
				console.error("Worker error:", e.data.error);
				return;
			}
			const svgstring = e.data.svgstring;
			// const svgstring = ImageTracer.imagedataToSVG(imageOut?.imageData, { strokewidth: 4, linefilter: true });
			setLocationMapComponents((oldValue) => {
				let newValue = JSON.parse(JSON.stringify(oldValue));
				const index = newValue.findIndex((e) => e?.version_id === mapVersion);
				if (index === -1) {
					const mapImageComponents = unit?.data?.mapVersions?.find((e) => e?._id === mapVersion)?.mapImageComponents;
					newValue.push({ _id: mapImageComponents, version_id: mapVersion, image: svgstring });
					return newValue;
				}
				newValue[index].image = svgstring;
				return newValue;
			});
		};
	}

	function removeMapImage() {
		setMapVersionImage("NO_IMAGE");

		const image_id = unit?.data?.mapVersions?.find((e) => e?._id === mapVersion)?.mapImage;

		setLocationMapImages((oldValue) => {
			let newValue = JSON.parse(JSON.stringify(oldValue));
			const index = newValue?.findIndex((e) => e?._id === image_id);
			if (index === -1) return newValue;
			newValue[index].image = false;
			return newValue;
		});

		setLocationMapComponents((oldValue) => {
			let newValue = JSON.parse(JSON.stringify(oldValue));
			const index = newValue.findIndex((e) => e?.version_id === mapVersion);
			if (index === -1) return newValue;
			newValue[index].image = "";
			return newValue;
		});
	}

	async function revertMapImage() {
		setErrors([]);

		const image_id = unit?.data?.mapVersions?.find((e) => e?._id === mapVersion)?.mapImage;
		const components_id = unit?.data?.mapVersions?.find((e) => e?._id === mapVersion)?.mapImageComponents;

		const response = await APIRequest("/image/" + image_id, "GET");
		if (!response || response?.errors || !response?.data?.image?.image) return false;

		const components_response = await APIRequest("/image/" + components_id, "GET");
		if (!response || response?.errors || !components_response?.data?.image?.image) return false;

		setMapVersionImage(response.data.image.image);

		setLocationMapImages((oldValue) => {
			let newValue = JSON.parse(JSON.stringify(oldValue));
			const index = newValue?.findIndex((e) => e?._id === image_id);
			if (index === -1) return newValue;
			newValue[index].image = response?.data?.image?.image;
			return newValue;
		});

		setLocationMapComponents((oldValue) => {
			let newValue = JSON.parse(JSON.stringify(oldValue));
			const index = newValue.findIndex((e) => e?.version_id === mapVersion);
			if (index === -1) return newValue;
			newValue[index].image = components_response?.data?.image?.image;
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

		const newMapVersionImage = JSON.parse(JSON.stringify(mapVersionImage));
		const newMapVersionImageComponentsItem = JSON.parse(JSON.stringify(locationMapComponents))?.find((e) => e?.version_id === mapVersionId);
		const mapImageComponents = newMapVersionImageComponentsItem?._id;
		const newMapVersionImageComponentsImage = newMapVersionImageComponentsItem?.image;

		// Add Map Components ID to Location
		await APIRequest("/" + newUnitType + "/" + unit?._id, "PATCH", {
			path: ["data", "mapVersions", mapVersionId, "mapImageComponents"],
			newValue: mapImageComponents,
			story_id: story._id,
			unit_id: unit._id,
		});

		// Update Map Components Image
		const components_response = await APIRequest("/image/" + mapImageComponents, "PATCH", {
			newValue: newMapVersionImageComponentsImage,
			story_id: story._id,
			unit_id: unit._id,
			location_id: newUnit?._id,
			location_map_version_id: mapVersionId,
			isLocationMapImage: true,
		});
		if (!components_response || components_response?.errors) {
			if (components_response?.errors) setErrors(components_response.errors);
			return false;
		}

		// Reset Map Version Regions Components
		await APIRequest("/" + newUnitType + "/" + newUnit?._id, "PATCH", {
			path: ["data", "mapVersions", mapVersionId, "regions"],
			newValue: newUnit?.data?.mapVersions[mapVersionIndex]?.regions?.map((region) => {
				region.components = [];
				return region;
			}),
			story_id: story._id,
			unit_id: newUnit._id,
		});

		// Add Map Image ID to Location
		await APIRequest("/" + newUnitType + "/" + unit?._id, "PATCH", {
			path: ["data", "mapVersions", mapVersionId, "mapImage"],
			newValue: newUnit?.data?.mapVersions[mapVersionIndex]?.mapImage,
			story_id: story._id,
			unit_id: unit._id,
		});

		// Update Map Image
		const response = await APIRequest("/image/" + newUnit?.data?.mapVersions[mapVersionIndex]?.mapImage, "PATCH", {
			newValue: newMapVersionImage,
			story_id: story._id,
			unit_id: unit._id,
			location_id: newUnit?._id,
			location_map_version_id: mapVersionId,
			isLocationMapImage: true,
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
