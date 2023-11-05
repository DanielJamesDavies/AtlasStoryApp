// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../../UnitPageContext";
import { APIContext } from "../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const SettingsMapVersionsLogic = () => {
	const { unit_type, isAuthorizedToEdit, story, unit, setUnit } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);

	const [versions, setVersions] = useState(unit?.data?.mapVersions);
	useEffect(() => {
		setVersions(unit?.data?.mapVersions);
	}, [unit]);

	async function addVersion() {
		const new_id_response = await APIRequest("/new-id/", "GET");
		if (!new_id_response || new_id_response?.errors || !new_id_response?.data?._id) return false;

		setVersions((oldVersions) => {
			let newVersions = JSON.parse(JSON.stringify(oldVersions));
			newVersions.push({ _id: new_id_response.data._id, title: "" });
			return newVersions;
		});
	}

	function removeVersion(index) {
		setVersions((oldVersions) => {
			let newVersions = JSON.parse(JSON.stringify(oldVersions));
			newVersions.splice(index, 1);
			return newVersions;
		});
	}

	const [isReorderingVersions, setIsReorderingVersions] = useState(false);
	function toggleIsReorderingVersions() {
		setIsReorderingVersions((oldIsReorderingVersions) => !oldIsReorderingVersions);
	}

	async function changeVersionsOrder(res) {
		if (res.from === undefined || res.to === undefined) return false;
		setVersions((oldVersions) => {
			let newVersions = JSON.parse(JSON.stringify(oldVersions));
			let tempVersion = newVersions.splice(res.from, 1)[0];
			newVersions.splice(res.to, 0, tempVersion);
			return newVersions;
		});
	}

	function changeVersionTitle(e, index) {
		setVersions((oldVersions) => {
			let newVersions = JSON.parse(JSON.stringify(oldVersions));
			newVersions[index].title = e.target.value;
			return newVersions;
		});
	}

	async function revertVersions() {
		setErrors([]);
		const response = await APIRequest("/" + unit_type + "/get-value/" + unit._id, "POST", {
			story_id: story._id,
			path: ["data", "mapVersions"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setVersions(response.data.value);

		return true;
	}

	const [errors, setErrors] = useState([]);

	async function saveVersions() {
		setErrors([]);
		if (!unit?._id) return;
		const newVersions = JSON.parse(JSON.stringify(versions));
		const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
			story_id: story._id,
			path: ["data", "mapVersions"],
			newValue: newVersions,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		if (response?.data?.location?.data?.mapVersions) {
			setVersions(response.data.location.data.mapVersions);

			setUnit((oldUnit) => {
				let newUnit = JSON.parse(JSON.stringify(oldUnit));
				newUnit.data.mapVersions = response.data.location.data.mapVersions.map((version) => {
					const versionIndex = newUnit.data.mapVersions.findIndex((e) => e._id === version._id);
					if (versionIndex !== -1) {
						const tempVersion = version;
						version = newUnit.data.mapVersions[versionIndex];
						version.title = tempVersion.title;
					}
					return version;
				});

				return newUnit;
			});
		}
		return true;
	}

	return {
		unit_type,
		isAuthorizedToEdit,
		unit,
		versions,
		addVersion,
		removeVersion,
		isReorderingVersions,
		toggleIsReorderingVersions,
		changeVersionsOrder,
		changeVersionTitle,
		revertVersions,
		saveVersions,
		errors,
	};
};
