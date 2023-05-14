// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { GroupContext } from "../../../../GroupContext";
import { APIContext } from "../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const SettingsVersionsLogic = () => {
	const { isAuthorizedToEdit, story, group, setGroup, groupVersion, setGroupVersion } = useContext(GroupContext);
	const { APIRequest } = useContext(APIContext);

	const [versions, setVersions] = useState(group?.data?.versions);
	useEffect(() => {
		setVersions(group?.data?.versions);
	}, [group]);

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
		const response = await APIRequest("/group/get-value/" + group._id, "POST", {
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
		if (!group?._id) return;
		const response = await APIRequest("/group/" + group._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions"],
			newValue: versions,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		if (response?.data?.group?.data?.versions) {
			setVersions(response.data.group.data.versions);

			setGroup((oldGroup) => {
				let newGroup = JSON.parse(JSON.stringify(oldGroup));
				newGroup.data.versions = response.data.group.data.versions.map((version) => {
					const versionIndex = newGroup.data.versions.findIndex((e) => e._id === version._id);
					if (versionIndex !== -1) {
						const tempVersion = version;
						version = newGroup.data.versions[versionIndex];
						version.title = tempVersion.title;
					}
					return version;
				});

				const groupVersionIndex = newGroup.data.versions.findIndex((e) => e._id === groupVersion._id);
				if (groupVersionIndex === -1) {
					setGroupVersion(newGroup.data.versions[0]);
				} else {
					setGroupVersion((oldGroupVersion) => {
						let newGroupVersion = JSON.parse(JSON.stringify(oldGroupVersion));
						newGroupVersion.title = newGroup.data.versions[groupVersionIndex]?.title;
						return newGroupVersion;
					});
				}

				return newGroup;
			});
		}
		return true;
	}

	return {
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
