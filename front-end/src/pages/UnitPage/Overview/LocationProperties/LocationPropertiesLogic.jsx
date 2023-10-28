// Packages
import { useContext, useEffect, useRef, useState } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../UnitPageContext";
import { APIContext } from "../../../../context/APIContext";

// Services
import { HierarchyFunctions } from "../../../Locations/HierarchyFunctions";

// Styles

// Assets

export const LocationPropertiesLogic = () => {
	const { unit_type, isAuthorizedToEdit, story, unit, setUnit } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);
	const { getPathToItemInHierarchy, getItemInHierarchyFromPath } = HierarchyFunctions();

	const propertiesTypes = [
		{ _id: "scale", name: "Scale", type: "numeric", location_types: ["star", "planet", "moon"] },
		{ _id: "tilt", name: "Tilt", type: "numeric", location_types: ["star", "planet", "moon"] },
		{ _id: "dayLength", name: "Day Length", type: "numeric", location_types: ["planet", "moon"] },
		{
			_id: "points",
			name: "Points",
			location_types: ["planet", "moon"],
			viewFunc: (e) => e.join(", "),
			changeFunc: (e, index) => {
				setUnit((oldUnit) => {
					let newUnit = JSON.parse(JSON.stringify(oldUnit));
					if (e.target.value.trim().length === 0) {
						newUnit.points[index] = "";
					} else {
						newUnit.points[index] = parseFloat(e.target.value);
					}
					return newUnit;
				});
			},
		},
		{ _id: "inclination", name: "Inclination", type: "numeric", location_types: ["planet", "moon"] },
	];

	async function defaultChangeFunction(e, type) {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			newUnit[type] = e.target.value;
			if (propertiesTypes?.find((e) => e?._id === type)?.type === "numeric") {
				if (e.target.value.trim().length === 0) {
					newUnit[type] = "";
				} else {
					newUnit[type] = parseFloat(e.target.value);
				}
			}
			return newUnit;
		});
	}

	async function revertLocationProperties() {
		let responses = await Promise.all(
			propertiesTypes?.map(async (propertyType) => {
				if (!propertyType?.location_types.includes(unit?.type)) return false;
				const response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", {
					story_id: story._id,
					path: [propertyType?._id],
				});
				if (!response || response?.errors || response?.data?.value === undefined) return false;
				return { key: propertyType?._id, value: response?.data?.value };
			})
		);

		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			responses
				.filter((e) => e !== false)
				.map((response) => {
					newUnit[response?.key] = response?.value;
					return true;
				});
			return newUnit;
		});

		return true;
	}

	async function saveLocationProperties() {
		const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
			story_id: story._id,
			paths: propertiesTypes?.filter((e) => e?.location_types.includes(unit?.type))?.map((e) => [e?._id]),
			newValues: propertiesTypes?.filter((e) => e?.location_types.includes(unit?.type))?.map((e) => unit[e?._id]),
		});
		if (!response || response?.errors) return false;
		return true;
	}

	const [locationParentName, setLocationParentName] = useState("");
	const locationParentID = useRef(false);
	useEffect(() => {
		async function getLocationParentName() {
			try {
				const parent_id = getItemInHierarchyFromPath(
					getPathToItemInHierarchy(unit?._id, story?.data?.locationsHierarchy)?.slice(0, -1),
					story?.data?.locationsHierarchy
				)?._id;
				if (!parent_id || locationParentID.current === parent_id || !story?.uid) return false;
				locationParentID.current = parent_id;
				const response = await APIRequest("/location/" + parent_id + "?story_uid=" + story?.uid, "GET");
				if (!response || response?.errors || !response?.data?.location?.data?.name) return false;
				setLocationParentName(response?.data?.location?.data?.name);
			} catch {}
		}
		getLocationParentName();
	}, [setLocationParentName, locationParentID, unit, story, getItemInHierarchyFromPath, getPathToItemInHierarchy, APIRequest]);

	return {
		isAuthorizedToEdit,
		unit,
		unit_type,
		propertiesTypes,
		defaultChangeFunction,
		revertLocationProperties,
		saveLocationProperties,
		locationParentName,
	};
};
