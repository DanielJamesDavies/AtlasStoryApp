// Packages

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const BiographyClusterItemLogic = ({ biographyCluster, changeBiographyCluster, index }) => {
	function changeBiographyClusterItemTitle(e) {
		let newBiographyCluster = JSON.parse(JSON.stringify(biographyCluster));
		newBiographyCluster.items[index].title = e.target.value;
		changeBiographyCluster(newBiographyCluster);
	}

	function changeBiographyClusterItemText(e) {
		let newBiographyCluster = JSON.parse(JSON.stringify(biographyCluster));
		newBiographyCluster.items[index].text = e.target.value.split("\n");
		changeBiographyCluster(newBiographyCluster);
	}

	function removeBiographyClusterItem() {
		if (biographyCluster.length - 1 < index) return;
		let newBiographyCluster = JSON.parse(JSON.stringify(biographyCluster));
		newBiographyCluster.items.splice(index, 1);
		changeBiographyCluster(newBiographyCluster);
	}

	return { changeBiographyClusterItemTitle, changeBiographyClusterItemText, removeBiographyClusterItem };
};
