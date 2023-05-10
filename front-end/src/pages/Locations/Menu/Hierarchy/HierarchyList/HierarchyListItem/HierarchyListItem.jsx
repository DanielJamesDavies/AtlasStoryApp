// Packages
import { FaCaretDown, FaMapMarkerAlt, FaTimes } from "react-icons/fa";

// Components

// Logic
import { HierarchyListItemLogic } from "./HierarchyListItemLogic";

// Context

// Services

// Styles
import "./HierarchyListItem.css";

// Assets

export const HierarchyListItem = ({ itemsItem, item, locationTypes, toggleHierarchyItemIsChildrenVisible, isEditing, deleteHierarchyItem }) => {
	const { selectedLocationId, hoverMapLocationId, currentMapLocationId, icon, onClickItem, onClickTravelToLocation } = HierarchyListItemLogic({
		item,
		locationTypes,
	});

	if (!itemsItem?.isVisible) return null;
	return (
		<div
			className={
				item?._id !== undefined && selectedLocationId === item?._id
					? "locations-hierarchy-list-item locations-hierarchy-list-item-active"
					: hoverMapLocationId === item?._id
					? "locations-hierarchy-list-item locations-hierarchy-list-item-hover"
					: "locations-hierarchy-list-item"
			}
			onClick={onClickItem}
		>
			<div
				className={
					item?.type === "reality"
						? "locations-hierarchy-list-item-current-map-location locations-hierarchy-list-item-current-map-location-placeholder"
						: item?._id !== undefined && currentMapLocationId === item?._id
						? "locations-hierarchy-list-item-current-map-location locations-hierarchy-list-item-current-map-location-active"
						: "locations-hierarchy-list-item-current-map-location"
				}
				onClick={onClickTravelToLocation}
			>
				<FaMapMarkerAlt />
			</div>
			<div className='locations-hierarchy-list-item-indentations'>
				{[...Array(itemsItem.level)].map((indentation, index) => (
					<div key={index} className='locations-hierarchy-list-item-indentation' />
				))}
			</div>
			{!itemsItem?.hasChildren ? (
				<div
					className='locations-hierarchy-list-item-toggle-children-visible locations-hierarchy-list-item-toggle-children-visible-placeholder'
					onClick={(e) => toggleHierarchyItemIsChildrenVisible(e, item._id)}
				>
					<FaCaretDown />
				</div>
			) : (
				<div
					className={
						itemsItem?.isChildrenVisible
							? "locations-hierarchy-list-item-toggle-children-visible locations-hierarchy-list-item-toggle-children-visible-true"
							: "locations-hierarchy-list-item-toggle-children-visible locations-hierarchy-list-item-toggle-children-visible-false"
					}
					onClick={(e) => toggleHierarchyItemIsChildrenVisible(e, item._id)}
				>
					<FaCaretDown />
				</div>
			)}
			<div className='locations-hierarchy-list-item-icon'>{icon}</div>
			<div className='locations-hierarchy-list-item-name'>{item?.data?.name}</div>
			{!isEditing ? null : (
				<div className='locations-hierarchy-list-item-btns-container'>
					<div className='locations-hierarchy-list-item-btn' onClick={() => deleteHierarchyItem(item._id)}>
						<FaTimes />
					</div>
				</div>
			)}
		</div>
	);
};
