// Packages

// Components
import { BiographyClusterName } from "./BiographyClusterName/BiographyClusterName";
import { BiographyClusterItems } from "./BiographyClusterItems/BiographyClusterItems";

// Logic

// Context

// Services

// Styles
import "./BiographyCluster.css";

// Assets

export const BiographyCluster = ({ biographyCluster, changeBiographyCluster }) => {
	if (!biographyCluster) return null;
	return (
		<div className='character-subpage-biography-cluster'>
			<BiographyClusterName biographyCluster={biographyCluster} changeBiographyCluster={changeBiographyCluster} />
			<BiographyClusterItems biographyCluster={biographyCluster} changeBiographyCluster={changeBiographyCluster} />
		</div>
	);
};
