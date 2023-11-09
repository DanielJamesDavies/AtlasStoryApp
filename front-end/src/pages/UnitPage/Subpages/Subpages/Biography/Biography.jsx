// Packages

// Components
import { BiographyClusterList } from "./BiographyClusterList/BiographyClusterList";
import { BiographyCluster } from "./BiographyCluster/BiographyCluster";

// Logic
import { BiographyLogic } from "./BiographyLogic";

// Context

// Services

// Styles

// Assets

export const Biography = () => {
	const { biographyCluster, changeBiographyCluster, switchBiographyCluster } = BiographyLogic();

	return (
		<div className='unit-page-subpage-abilities'>
			<BiographyClusterList currBiographyCluster={biographyCluster} changeBiographyCluster={changeBiographyCluster} switchBiographyCluster={switchBiographyCluster} />
			<BiographyCluster biographyCluster={biographyCluster} changeBiographyCluster={changeBiographyCluster} />
		</div>
	);
};
