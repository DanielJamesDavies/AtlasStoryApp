// Packages

// Components
import { EditableContainer } from "../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../components/DragDropItem/DragDropItem";
import { HierarchyListItem } from "./HierarchyListItem/HierarchyListItem";

// Logic
import { HierarchyListLogic } from "./HierarchyListLogic";

// Context

// Services

// Styles
import "./HierarchyList.css";

// Assets

export const HierarchyList = () => {
	const {
		isAuthorizedToEdit,
		items,
		locationTypes,
		locations,
		isReorderingHierarchyItems,
		toggleIsReorderingHierarchyItems,
		changeHierarchyItemsOrder,
		deleteHierarchyItem,
		toggleHierarchyItemIsChildrenVisible,
		openCreateHierarchyItemForm,
		revertHierarchyItems,
		saveHierarchyItems,
	} = HierarchyListLogic();

	if (!locations) return null;
	return (
		<EditableContainer
			className='locations-hierarchy-list-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onAdd={openCreateHierarchyItemForm}
			onReorder={toggleIsReorderingHierarchyItems}
			onRevert={revertHierarchyItems}
			onSave={saveHierarchyItems}
		>
			<div className='locations-hierarchy-list'>
				{items.map((itemsItem, index) => (
					<div key={index} className='locations-heirarchy-list-item-container'>
						<HierarchyListItem
							itemsItem={itemsItem}
							item={locations.find((e) => e._id === itemsItem._id)}
							index={index}
							locations={locations}
							locationTypes={locationTypes}
							toggleHierarchyItemIsChildrenVisible={toggleHierarchyItemIsChildrenVisible}
							isEditing={false}
						/>
					</div>
				))}
			</div>
			<DragDropContainer
				className='locations-hierarchy-list'
				enableDragDrop={isReorderingHierarchyItems}
				onDropItem={changeHierarchyItemsOrder}
			>
				{items.map((itemsItem, index) => (
					<DragDropItem key={index} index={index} className='locations-heirarchy-list-item-container'>
						<HierarchyListItem
							itemsItem={itemsItem}
							item={locations.find((e) => e._id === itemsItem._id)}
							index={index}
							locations={locations}
							locationTypes={locationTypes}
							toggleHierarchyItemIsChildrenVisible={toggleHierarchyItemIsChildrenVisible}
							isEditing={true}
							deleteHierarchyItem={deleteHierarchyItem}
						/>
					</DragDropItem>
				))}
			</DragDropContainer>
		</EditableContainer>
	);
};
