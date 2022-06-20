// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../../../CharacterContext";
import { APIContext } from "../../../../../../context/APIContext";

// Services

// Styles

// Assets

export const SettingsVersionsLogic = () => {
	const { isAuthorizedToEdit, story, character, setCharacter, characterVersion, setCharacterVersion } = useContext(CharacterContext);
	const { APIRequest } = useContext(APIContext);

	const [versions, setVersions] = useState(character?.data?.versions);
	useEffect(() => {
		setVersions(character?.data?.versions);
	}, [character]);

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
		const response = await APIRequest("/character/get-value/" + character._id, "POST", {
			story_id: story._id,
			path: ["data", "versions"],
		});
		if (!response || response?.errors || !response?.data?.value) return false;

		setVersions(response.data.value);

		return true;
	}

	const [errors, setErrors] = useState([]);

	async function saveVersions() {
		setErrors([]);
		if (!character?._id) return;
		const response = await APIRequest("/character/" + character._id, "PATCH", {
			story_id: story._id,
			path: ["data", "versions"],
			newValue: versions,
		});
		if (!response || response?.errors) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		if (response?.data?.character?.data?.versions) {
			setVersions(response.data.character.data.versions);

			setCharacter((oldCharacter) => {
				let newCharacter = JSON.parse(JSON.stringify(oldCharacter));
				newCharacter.data.versions = response.data.character.data.versions.map((version) => {
					const versionIndex = newCharacter.data.versions.findIndex((e) => e._id === version._id);
					if (versionIndex !== -1) {
						const tempVersion = version;
						version = newCharacter.data.versions[versionIndex];
						version.title = tempVersion.title;
					}
					return version;
				});

				const characterVersionIndex = newCharacter.data.versions.findIndex((e) => e._id === characterVersion._id);
				if (characterVersionIndex === -1) {
					setCharacterVersion(newCharacter.data.versions[0]);
				} else {
					setCharacterVersion((oldCharacterVersion) => {
						let newCharacterVersion = JSON.parse(JSON.stringify(oldCharacterVersion));
						newCharacterVersion.title = newCharacter.data.versions[characterVersionIndex]?.title;
						return newCharacterVersion;
					});
				}

				return newCharacter;
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
