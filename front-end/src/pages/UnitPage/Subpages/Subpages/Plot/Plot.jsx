// Packages

// Components
import { PlotNavigationBar } from "./PlotNavigationBar/PlotNavigationBar";
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
	const {
		cluster,
		changeCluster,
		switchCluster,
		groupID,
		setGroupID,
		changeGroup,
		isDisplayingClusters,
		setIsDisplayingClusters,
		toggleIsDisplayingClusters,
		isDisplayingItemGroups,
		setIsDisplayingItemGroups,
		toggleIsDisplayingItemGroups,
	} = PlotLogic();

	return (
		<div className='unit-page-subpage-plot'>
			<PlotNavigationBar
				cluster={cluster}
				isDisplayingClusters={isDisplayingClusters}
				toggleIsDisplayingClusters={toggleIsDisplayingClusters}
				isDisplayingItemGroups={isDisplayingItemGroups}
				toggleIsDisplayingItemGroups={toggleIsDisplayingItemGroups}
			/>
			<PlotClusters
				currCluster={cluster}
				switchCluster={switchCluster}
				isDisplayingClusters={isDisplayingClusters}
				setIsDisplayingClusters={setIsDisplayingClusters}
			/>
			<PlotItemGroups
				cluster={cluster}
				changeCluster={changeCluster}
				currGroupID={groupID}
				setGroupID={setGroupID}
				isDisplayingItemGroups={isDisplayingItemGroups}
				setIsDisplayingItemGroups={setIsDisplayingItemGroups}
			/>
			<PlotItems cluster={cluster} changeCluster={changeCluster} groupID={groupID} changeGroup={changeGroup} />
		</div>
	);
};
