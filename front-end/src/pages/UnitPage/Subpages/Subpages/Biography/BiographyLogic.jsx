// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../UnitPageContext";

// Services

// Styles

// Assets

export const BiographyLogic = () => {
	const { unit, unitVersion, changeUnitVersion } = useContext(UnitPageContext);
	const [biographyCluster, setBiographyCluster] = useState(false);

	useEffect(() => {
		function getBiographyCluster() {
			let newBiography = false;
			let index = 0;

			const oldBiographyCluster = JSON.parse(JSON.stringify(biographyCluster));
			if (oldBiographyCluster !== false) {
				const oldVersion = unit?.data?.versions?.find((e) => e?._id === oldBiographyCluster?.character_version_id);
				const oldIndex = oldVersion?.biography?.findIndex((e) => e?._id === oldBiographyCluster?._id);
				if (oldIndex !== -1) index = oldIndex;
			}

			if (unitVersion.biography.length > 0) {
				if (unitVersion.biography.length - 1 < index) index = unitVersion.biography.length - 1;
				newBiography = JSON.parse(JSON.stringify(unitVersion.biography[index]));
				newBiography.character_version_id = unitVersion?._id;
			}
			return newBiography;
		}
		if (biographyCluster?.character_version_id !== unitVersion?._id) setBiographyCluster(getBiographyCluster());
	}, [unit, unitVersion, biographyCluster]);

	function changeBiographyCluster(newBiographyCluster) {
		setBiographyCluster(newBiographyCluster);

		let newUnitVersion = JSON.parse(JSON.stringify(unitVersion));
		const newBiographyClusterIndex = newUnitVersion.biography.findIndex((e) => e?._id === newBiographyCluster?._id);
		if (newBiographyClusterIndex === -1) return false;
		newUnitVersion.biography[newBiographyClusterIndex] = newBiographyCluster;
		changeUnitVersion(newUnitVersion);
	}

	function switchBiographyCluster(biographyClusterID) {
		if (biographyClusterID === biographyCluster._id) return false;

		let newBiographyCluster = false;
		const newBiographyClusterIndex = unitVersion.biography.findIndex((e) => e._id === biographyClusterID);
		if (newBiographyClusterIndex === -1) return setBiographyCluster(newBiographyCluster);

		newBiographyCluster = JSON.parse(JSON.stringify(unitVersion.biography[newBiographyClusterIndex]));
		newBiographyCluster.character_version_id = unitVersion?._id;
		setBiographyCluster(newBiographyCluster);
	}

	return { biographyCluster, changeBiographyCluster, switchBiographyCluster };
};
