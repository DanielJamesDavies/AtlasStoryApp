// Packages

// Components
import { BiographyClusterName } from "./BiographyClusterName/BiographyClusterName";
import { BiographyClusterItems } from "./BiographyClusterItems/BiographyClusterItems";

// Logic
import { BiographyClusterLogic } from "./BiographyClusterLogic";

// Context

// Services

// Styles
import "./BiographyCluster.css";

// Assets

export const BiographyCluster = ({ biographyCluster, changeBiographyCluster }) => {
	const { biographyClusterRef } = BiographyClusterLogic();

	if (!biographyCluster) return null;
	return (
		<div ref={biographyClusterRef} className='unit-page-subpage-biography-cluster'>
			<BiographyClusterName biographyCluster={biographyCluster} changeBiographyCluster={changeBiographyCluster} />
			<BiographyClusterItems biographyCluster={biographyCluster} changeBiographyCluster={changeBiographyCluster} />
		</div>
	);
};
