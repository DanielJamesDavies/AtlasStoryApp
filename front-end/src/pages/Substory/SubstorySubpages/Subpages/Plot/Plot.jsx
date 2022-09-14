// Packages

// Components
import { PlotClusters } from "./PlotClusters/PlotClusters";
import { PlotItemGroups } from "./PlotItemGroups/PlotItemGroups";
import { PlotItems } from "./PlotItems/PlotItems";

// Logic
import { PlotLogic } from "./PlotLogic";

// Context

// Services

// Styles
import "./Plot.css";

// Assets

export const Plot = () => {
	const { cluster, changeCluster, switchCluster, groupID, setGroupID, changeGroup } = PlotLogic();

	return (
		<div className='substory-subpage-plot'>
			<PlotClusters currCluster={cluster} switchCluster={switchCluster} />
			<PlotItemGroups cluster={cluster} changeCluster={changeCluster} currGroupID={groupID} setGroupID={setGroupID} />
			<PlotItems cluster={cluster} changeCluster={changeCluster} groupID={groupID} changeGroup={changeGroup} />
		</div>
	);
};
