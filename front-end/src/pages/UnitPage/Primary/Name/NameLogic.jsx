// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../UnitPageContext";
import { APIContext } from "../../../../context/APIContext";

// Services

// Styles

// Assets

export const NameLogic = () => {
	const { unit_type, isAuthorizedToEdit, story, unit, setUnit } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);

	function changeName(e) {
		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			switch (unit_type) {
				case "character":
				case "group":
				case "location":
					newUnit.data.name = e.target.value;
					break;
				default:
					newUnit.data.title = e.target.value;
			}
			return newUnit;
		});
	}

	async function revertName() {
		let path = ["data", "title"];
		switch (unit_type) {
			case "character":
			case "group":
			case "location":
				path = ["data", "name"];
				break;
			default:
				path = ["data", "title"];
		}

		const response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", { story_id: story._id, path });
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setUnit((oldUnit) => {
			let newUnit = JSON.parse(JSON.stringify(oldUnit));
			switch (unit_type) {
				case "character":
				case "group":
				case "location":
					newUnit.data.name = response.data.value;
					break;
				default:
					newUnit.data.title = response.data.value;
			}
			return newUnit;
		});

		return true;
	}

	const [errors, setErrors] = useState([]);

	async function saveName() {
		setErrors([]);
		if (!unit?._id) return;

		let path = ["data", "title"];
		let newValue = false;
		switch (unit_type) {
			case "character":
			case "group":
			case "location":
				path = ["data", "name"];
				newValue = unit.data.name;
				break;
			default:
				path = ["data", "title"];
				newValue = unit.data.title;
		}

		const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", { story_id: story._id, path, newValue });
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	return { unit_type, isAuthorizedToEdit, story, unit, changeName, revertName, saveName, errors };
};
