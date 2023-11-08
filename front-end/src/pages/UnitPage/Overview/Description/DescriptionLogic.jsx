// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../UnitPageContext";
import { APIContext } from "../../../../context/APIContext";

// Services

// Styles

// Assets

export const DescriptionLogic = () => {
	const { unit_type, isAuthorizedToEdit, story, unit, setUnit, unitVersion, changeUnitVersion, unitVersionItemCopying, changeUnitVersionItemCopying, pasteVersionItemCopying } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);

	function changeDescription(e) {
		if (["character", "group"].includes(unit_type)) {
			let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
			newUnitVersion.description = e.target.value.split("\n");
			changeUnitVersion(newUnitVersion);
		} else {
			let newUnit = JSON.parse(JSON.stringify(unit));
			newUnit.data.description = e.target.value.split("\n");
			setUnit(newUnit);
		}
	}

	async function revertDescription() {
		if (["character", "group"].includes(unit_type)) {
			const response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", {
				story_id: story._id,
				path: ["data", "versions", unitVersion._id, "description"],
			});
			if (!response || response?.errors || response?.data?.value === undefined) return false;

			let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
			newUnitVersion.description = response.data.value;
			changeUnitVersion(newUnitVersion);

			return true;
		} else {
			const response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", {
				story_id: story._id,
				path: ["data", "description"],
			});
			if (!response || response?.errors || response?.data?.value === undefined) return false;

			let newUnit = JSON.parse(JSON.stringify(unit));
			newUnit.data.description = response.data.value;
			setUnit(newUnit);

			return true;
		}
	}

	async function saveDescription() {
		if (["character", "group"].includes(unit_type)) {
			const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
				story_id: story._id,
				path: ["data", "versions", unitVersion._id, "description"],
				newValue: unitVersion.description,
			});
			if (!response || response?.errors) return false;
			return true;
		} else {
			const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
				story_id: story._id,
				path: ["data", "description"],
				newValue: unit.data.description,
			});
			if (!response || response?.errors) return false;
			return true;
		}
	}

	function copyVersionDescription() {
		changeUnitVersionItemCopying(["description"]);
	}

	function pasteVersionDescription() {
		pasteVersionItemCopying(["description"]);
	}

	return { unit_type, isAuthorizedToEdit, unit, unitVersion, changeDescription, revertDescription, saveDescription, unitVersionItemCopying, copyVersionDescription, pasteVersionDescription };
};
