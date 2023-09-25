// Packages

// Components

// Logic

// Context

// Services

// Styles
import "./PlotNavigationBar.css";

// Assets

export const PlotNavigationBar = ({
	cluster,
	isDisplayingClusters,
	toggleIsDisplayingClusters,
	isDisplayingItemGroups,
	toggleIsDisplayingItemGroups,
}) => {
	return (
		<div className='unit-page-subpage-plot-navigation-bar'>
			<button
				className={
					isDisplayingClusters
						? "unit-page-subpage-plot-navigation-bar-btn unit-page-subpage-plot-navigation-bar-btn-active"
						: "unit-page-subpage-plot-navigation-bar-btn"
				}
				onClick={toggleIsDisplayingClusters}
			>
				Clusters
			</button>
			{cluster?.isAll ? null : (
				<button
					className={
						isDisplayingItemGroups
							? "unit-page-subpage-plot-navigation-bar-btn unit-page-subpage-plot-navigation-bar-btn-active"
							: "unit-page-subpage-plot-navigation-bar-btn"
					}
					onClick={toggleIsDisplayingItemGroups}
				>
					Item Groups
				</button>
			)}
		</div>
	);
};
