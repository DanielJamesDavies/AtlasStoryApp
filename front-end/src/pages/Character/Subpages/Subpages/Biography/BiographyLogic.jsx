// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { CharacterContext } from "../../../CharacterContext";

// Services

// Styles

// Assets

export const BiographyLogic = () => {
	const { character, characterVersion, changeCharacterVersion } = useContext(CharacterContext);
	const [biographyCluster, setBiographyCluster] = useState(false);

	useEffect(() => {
		function getBiographyCluster() {
			let newBiography = false;
			let index = 0;

			const oldBiographyCluster = JSON.parse(JSON.stringify(biographyCluster));
			if (oldBiographyCluster !== false) {
				const oldVersion = character?.data?.versions?.find((e) => e?._id === oldBiographyCluster?.character_version_id);
				const oldIndex = oldVersion?.biography?.findIndex((e) => e?._id === oldBiographyCluster?._id);
				if (oldIndex !== -1) index = oldIndex;
			}

			if (characterVersion.biography.length > 0) {
				if (characterVersion.biography.length - 1 < index) index = characterVersion.biography.length - 1;
				newBiography = JSON.parse(JSON.stringify(characterVersion.biography[index]));
				newBiography.character_version_id = characterVersion?._id;
			}
			return newBiography;
		}
		if (biographyCluster?.character_version_id !== characterVersion?._id) setBiographyCluster(getBiographyCluster());
	}, [character, characterVersion, biographyCluster]);

	function changeBiographyCluster(newBiographyCluster) {
		setBiographyCluster(newBiographyCluster);

		let newCharacterVersion = JSON.parse(JSON.stringify(characterVersion));
		const newBiographyClusterIndex = newCharacterVersion.biography.findIndex((e) => e?._id === newBiographyCluster?._id);
		if (newBiographyClusterIndex === -1) return false;
		newCharacterVersion.biography[newBiographyClusterIndex] = newBiographyCluster;
		changeCharacterVersion(newCharacterVersion);
	}

	function switchBiographyCluster(biographyClusterID) {
		if (biographyClusterID === biographyCluster._id) return false;

		let newBiographyCluster = false;
		const newBiographyClusterIndex = characterVersion.biography.findIndex((e) => e._id === biographyClusterID);
		if (newBiographyClusterIndex === -1) return setBiographyCluster(newBiographyCluster);

		newBiographyCluster = JSON.parse(JSON.stringify(characterVersion.biography[newBiographyClusterIndex]));
		newBiographyCluster.character_version_id = characterVersion?._id;
		setBiographyCluster(newBiographyCluster);
	}

	return { biographyCluster, changeBiographyCluster, switchBiographyCluster };
};
