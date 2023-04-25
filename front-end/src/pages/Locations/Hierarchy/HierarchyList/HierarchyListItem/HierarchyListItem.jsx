// Packages
import { FaCaretDown, FaTimes } from "react-icons/fa";

// Components

// Logic
import { HierarchyListItemLogic } from "./HierarchyListItemLogic";

// Context

// Services

// Styles
import "./HierarchyListItem.css";

// Assets

export const HierarchyListItem = ({ itemsItem, item, locationTypes, toggleHierarchyItemIsChildrenVisible, isEditing, deleteHierarchyItem }) => {
	const { icon } = HierarchyListItemLogic({ item, locationTypes });

	if (!itemsItem?.isVisible) return null;
	return (
		<div className='locations-hierarchy-list-item'>
			<div className='locations-hierarchy-list-item-indentations'>
				{[...Array(itemsItem.level)].map((indentation, index) => (
					<div key={index} className='locations-hierarchy-list-item-indentation' />
				))}
			</div>
			{!itemsItem?.hasChildren ? (
				<div
					className='locations-hierarchy-list-item-toggle-children-visible locations-hierarchy-list-item-toggle-children-visible-placeholder'
					onClick={() => toggleHierarchyItemIsChildrenVisible(item._id)}
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
					onClick={() => toggleHierarchyItemIsChildrenVisible(item._id)}
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
