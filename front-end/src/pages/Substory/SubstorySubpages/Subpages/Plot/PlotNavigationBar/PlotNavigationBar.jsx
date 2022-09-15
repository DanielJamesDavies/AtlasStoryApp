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
		<div className='substory-subpage-plot-navigation-bar'>
			<button
				className={
					isDisplayingClusters
						? "substory-subpage-plot-navigation-bar-btn substory-subpage-plot-navigation-bar-btn-active"
						: "substory-subpage-plot-navigation-bar-btn"
				}
				onClick={toggleIsDisplayingClusters}
			>
				Clusters
			</button>
			{cluster?.isAll ? null : (
				<button
					className={
						isDisplayingItemGroups
							? "substory-subpage-plot-navigation-bar-btn substory-subpage-plot-navigation-bar-btn-active"
							: "substory-subpage-plot-navigation-bar-btn"
					}
					onClick={toggleIsDisplayingItemGroups}
				>
					Item Groups
				</button>
			)}
		</div>
	);
};
