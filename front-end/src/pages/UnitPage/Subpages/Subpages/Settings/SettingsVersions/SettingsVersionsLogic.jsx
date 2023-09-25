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

export const SettingsVersionsLogic = () => {
	const { unit_type, isAuthorizedToEdit, story, unit, setUnit, unitVersion, setUnitVersion } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);

	const [versions, setVersions] = useState(unit?.data?.versions);
	useEffect(() => {
		setVersions(unit?.data?.versions);
	}, [unit]);

	function addVersion() {
		setVersions((oldVersions) => {
			let newVersions = JSON.parse(JSON.stringify(oldVersions));
			newVersions.push({ _id: "new", title: "" });
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
			path: ["data", "versions"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		setVersions(response.data.value);

		return true;
	}

	const [errors, setErrors] = useState([]);

	async function saveVersions() {
		setErrors([]);
		if (!unit?._id) return;
		const response = await APIRequest("/" + unit_type + "/" + unit._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions"],
			newValue: versions,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		if (response?.data?.unit?.data?.versions) {
			setVersions(response.data.unit.data.versions);

			setUnit((oldUnit) => {
				let newUnit = JSON.parse(JSON.stringify(oldUnit));
				newUnit.data.versions = response.data.unit.data.versions.map((version) => {
					const versionIndex = newUnit.data.versions.findIndex((e) => e._id === version._id);
					if (versionIndex !== -1) {
						const tempVersion = version;
						version = newUnit.data.versions[versionIndex];
						version.title = tempVersion.title;
					}
					return version;
				});

				const unitVersionIndex = newUnit.data.versions.findIndex((e) => e._id === unitVersion._id);
				if (unitVersionIndex === -1) {
					setUnitVersion(newUnit.data.versions[0]);
				} else {
					setUnitVersion((oldUnitVersion) => {
						let newUnitVersion = JSON.parse(JSON.stringify(oldUnitVersion));
						newUnitVersion.title = newUnit.data.versions[unitVersionIndex]?.title;
						return newUnitVersion;
					});
				}

				return newUnit;
			});
		}
		return true;
	}

	return {
		unit_type,
		isAuthorizedToEdit,
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
