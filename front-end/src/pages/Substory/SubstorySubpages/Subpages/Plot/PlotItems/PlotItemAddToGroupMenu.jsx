// Packages
import { FaChevronLeft, FaTimes } from "react-icons/fa";

// Components
import { IconBtn } from "../../../../../../components/IconBtn/IconBtn";

// Logic
import { PlotItemAddToGroupMenuLogic } from "./PlotItemAddToGroupMenuLogic";

// Context

// Services

// Styles
import "./PlotItemAddToGroupMenu.css";

// Assets

export const PlotItemAddToGroupMenu = ({ itemID, cluster, isDisplayingPlotItemAddToGroupMenu, hidePlotItemAddToGroupMenu }) => {
	const { substory, currSlide, selectedClusterID, goBackToClusters, onClickCluster, onClickGroup } = PlotItemAddToGroupMenuLogic({
		itemID,
		isDisplayingPlotItemAddToGroupMenu,
		hidePlotItemAddToGroupMenu,
	});

	if (!cluster?.isAll) return null;
	return (
		<div
			className={
				isDisplayingPlotItemAddToGroupMenu
					? "substory-subpage-plot-item-add-to-group-menu-container"
					: "substory-subpage-plot-item-add-to-group-menu-container substory-subpage-plot-item-add-to-group-menu-container-hidden"
			}
		>
			<div className='substory-subpage-plot-item-add-to-group-menu-title-container'>
				<div className='substory-subpage-plot-item-add-to-group-menu-title'>Add to a Group</div>
				<IconBtn icon={<FaTimes />} iconName='times' seamless={true} size='s' onClick={hidePlotItemAddToGroupMenu} />
			</div>
			<div
				className={
					"substory-subpage-plot-item-add-to-group-menu-slides-container substory-subpage-plot-item-add-to-group-menu-slides-container-" +
					currSlide
				}
			>
				<div className='substory-subpage-plot-item-add-to-group-menu-slides'>
					<div className='substory-subpage-plot-item-add-to-group-menu-slide'>
						<div className='substory-subpage-plot-item-add-to-group-menu-suggestion-container'>
							<div className='substory-subpage-plot-item-add-to-group-menu-suggestion'>Select a Cluster</div>
						</div>
						<div className='substory-subpage-plot-item-add-to-group-menu-slide-btns-list'>
							{!substory?.data?.plot?.clusters
								? null
								: substory.data.plot.clusters
										.filter((e) => e.isAll !== true)
										.map((cluster, index) => (
											<button
												key={index}
												className={
													selectedClusterID === cluster._id
														? "substory-subpage-plot-item-add-to-group-menu-slide-btn substory-subpage-plot-item-add-to-group-menu-slide-btn-active"
														: "substory-subpage-plot-item-add-to-group-menu-slide-btn"
												}
												onClick={() => onClickCluster(cluster._id)}
											>
												{cluster?.name}
											</button>
										))}
						</div>
					</div>
					<div className='substory-subpage-plot-item-add-to-group-menu-slide'>
						<div className='substory-subpage-plot-item-add-to-group-menu-suggestion-container'>
							<IconBtn icon={<FaChevronLeft />} iconName='chevron-left' seamless={true} size='s' onClick={goBackToClusters} />
							<div className='substory-subpage-plot-item-add-to-group-menu-suggestion'>Select a Group</div>
						</div>
						<div className='substory-subpage-plot-item-add-to-group-menu-slide-btns-list'>
							{!substory?.data?.plot?.clusters.find((e) => e._id === selectedClusterID)?.groups
								? null
								: substory?.data?.plot?.clusters
										.find((e) => e._id === selectedClusterID)
										?.groups.map((group, index) => (
											<button
												key={index}
												className='substory-subpage-plot-item-add-to-group-menu-slide-btn'
												onClick={() => onClickGroup(group._id)}
											>
												{group?.name}
											</button>
										))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
