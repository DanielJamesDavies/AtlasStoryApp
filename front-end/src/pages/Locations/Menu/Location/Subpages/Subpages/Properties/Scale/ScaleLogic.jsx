// Packages
import { useContext, useEffect, useRef, useState } from "react";

// Components

// Logic

// Context
import { LocationContext } from "../../../../LocationContext";
import { APIContext } from "../../../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const LocationScaleLogic = () => {
	const { isAuthorizedToEdit, location_id, story, location, changeLocation } = useContext(LocationContext);
	const { APIRequest } = useContext(APIContext);

	const scaleUnits = useRef([
		{ id: "m", label: " m", to_unit: (value) => value, to_meters: (value) => value },
		{ id: "km", label: " km", to_unit: (value) => value / 1000, to_meters: (value) => value * 1000 },
		{ id: "au", label: " AU", to_unit: (value) => value / 149597870700, to_meters: (value) => value * 149597870700 },
		{
			id: "ly",
			label: " light year",
			pluralS: true,
			to_unit: (value) => value / (9460730472580.044 * 1000),
			to_meters: (value) => value * 9460730472580.044 * 1000,
		},
	]);

	const [displayedScale, setDisplayedScale] = useState(false);

	useEffect(() => {
		setDisplayedScale((oldDisplayedScale) => {
			if (!location.data.scaleUnit) return 1;
			if (oldDisplayedScale === false) return scaleUnits.current.find((e) => e.id === location.data.scaleUnit).to_unit(location.scale);
			return oldDisplayedScale;
		});
	}, [location, setDisplayedScale, scaleUnits]);

	function changeScale(e) {
		e.stopPropagation();
		let newLocation = JSON.parse(JSON.stringify(location));
		if (!newLocation.data.scaleUnit) newLocation.data.scaleUnit = scaleUnits.current[0].id;
		setDisplayedScale(e.target.value);
		if (e.target.value === "") {
			newLocation.scale = 0;
		} else {
			newLocation.scale = scaleUnits.current.find((e) => e.id === newLocation.data.scaleUnit).to_meters(parseFloat(e.target.value));
		}
		changeLocation(newLocation);
	}

	function changeScaleUnit(e) {
		let newLocation = JSON.parse(JSON.stringify(location));
		newLocation.data.scaleUnit = scaleUnits.current[e].id;
		setDisplayedScale(scaleUnits.current[e].to_unit(parseFloat(newLocation.scale)));
		changeLocation(newLocation);
	}

	async function revertScale(e) {
		e.stopPropagation();
		if (!story?._id) return false;

		const newLocationId = JSON.parse(JSON.stringify(location_id));
		const scale_response = await APIRequest("/location/get-value/" + newLocationId, "POST", {
			story_id: story._id,
			path: ["scale"],
		});
		if (!scale_response || scale_response?.errors || scale_response?.data?.value === undefined) return false;

		const scale_unit_response = await APIRequest("/location/get-value/" + newLocationId, "POST", {
			story_id: story._id,
			path: ["data", "scaleUnit"],
		});
		if (!scale_unit_response || scale_unit_response?.errors || scale_unit_response?.data?.value === undefined) return false;

		let newLocation = JSON.parse(JSON.stringify(location));
		newLocation.scale = scale_response?.data?.value;
		newLocation.data.scaleUnit = scale_unit_response?.data?.value;
		changeLocation(newLocation);

		setDisplayedScale(() => {
			if (!newLocation.data.scaleUnit) return 1;
			return scaleUnits.current.find((e) => e.id === newLocation.data.scaleUnit).to_unit(newLocation.scale);
		});

		return true;
	}

	async function saveScale(e) {
		e.stopPropagation();
		if (!story?._id) return false;

		const newLocationId = JSON.parse(JSON.stringify(location_id));

		const scale_response = await APIRequest("/location/" + newLocationId, "PATCH", {
			story_id: story._id,
			newValue: location?.scale,
			path: ["scale"],
		});
		if (!scale_response || scale_response?.errors) return false;

		const scale_unit_response = await APIRequest("/location/" + newLocationId, "PATCH", {
			story_id: story._id,
			newValue: location?.data?.scaleUnit,
			path: ["data", "scaleUnit"],
		});
		if (!scale_unit_response || scale_unit_response?.errors) return false;

		return true;
	}

	return { isAuthorizedToEdit, location, scaleUnits, displayedScale, changeScale, changeScaleUnit, revertScale, saveScale };
};
