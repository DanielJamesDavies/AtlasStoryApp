// Packages

// Components
import { EditableContainer } from "../../../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../../../components/DragDropItem/DragDropItem";
import { BiographyClusterItem } from "./BiographyClusterItem";

// Logic
import { BiographyClusterItemsLogic } from "./BiographyClusterItemsLogic";

// Context

// Services

// Styles
import "./BiographyClusterItems.css";

// Assets

export const BiographyClusterItems = ({ biographyCluster, changeBiographyCluster }) => {
	const {
		isAuthorizedToEdit,
		addBiographyClusterItem,
		isReorderingBiographyClusterItems,
		toggleIsReorderingBiographyClusterItems,
		reorderBiographyClusterItems,
		revertBiographyClusterItems,
		saveBiographyClusterItems,
	} = BiographyClusterItemsLogic({
		biographyCluster,
		changeBiographyCluster,
	});

	return (
		<EditableContainer
			className='character-subpage-biography-cluster-items-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onAdd={addBiographyClusterItem}
			onReorder={toggleIsReorderingBiographyClusterItems}
			onRevert={revertBiographyClusterItems}
			onSave={saveBiographyClusterItems}
		>
			<div className='character-subpage-biography-cluster-items'>
				{biographyCluster?.items?.map((biographyClusterItem, index) => (
					<div key={index} className='character-subpage-biography-cluster-item-container'>
						<BiographyClusterItem
							biographyCluster={biographyCluster}
							changeBiographyCluster={changeBiographyCluster}
							biographyClusterItem={biographyClusterItem}
							index={index}
							isEditing={false}
						/>
					</div>
				))}
			</div>
			<DragDropContainer
				className='character-subpage-biography-cluster-items'
				enableDragDrop={isReorderingBiographyClusterItems}
				onDropItem={reorderBiographyClusterItems}
			>
				{biographyCluster?.items?.map((biographyClusterItem, index) => (
					<DragDropItem key={index} index={index} className='character-subpage-biography-cluster-item-container'>
						<BiographyClusterItem
							biographyCluster={biographyCluster}
							changeBiographyCluster={changeBiographyCluster}
							biographyClusterItem={biographyClusterItem}
							index={index}
							isEditing={true}
						/>
					</DragDropItem>
				))}
			</DragDropContainer>
		</EditableContainer>
	);
};
