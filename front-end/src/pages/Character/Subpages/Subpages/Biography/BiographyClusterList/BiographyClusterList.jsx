// Packages

// Components
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../../components/DragDropItem/DragDropItem";
import { BtnListItem } from "../../../../../../components/BtnListItem/BtnListItem";

// Logic
import { BiographyClusterListLogic } from "./BiographyClusterListLogic";

// Context

// Services

// Styles
import "./BiographyClusterList.css";
import { BtnListContainer } from "../../../../../../components/BtnListContainer/BtnListContainer";

// Assets

export const BiographyClusterList = ({ currBiographyCluster, switchBiographyCluster }) => {
	const {
		isAuthorizedToEdit,
		characterVersion,
		addBiographyCluster,
		removeBiographyCluster,
		isReorderingBiographyCluster,
		toggleIsReorderingBiographyClusters,
		reorderBiographyCluster,
		revertBiographyClusters,
		saveBiographyClusters,
		defaultBiographyClusters,
		onClickBiographyCluster,
		biographyClusterListItemsRef,
		onBiographyClusterListScroll,
	} = BiographyClusterListLogic({ currBiographyCluster, switchBiographyCluster });

	return (
		<div className='character-subpage-biography-cluster-list'>
			<EditableContainer
				isAuthorizedToEdit={isAuthorizedToEdit}
				onAdd={addBiographyCluster}
				onReorder={toggleIsReorderingBiographyClusters}
				onRevert={revertBiographyClusters}
				onSave={saveBiographyClusters}
				onDefault={defaultBiographyClusters}
				onScroll={onBiographyClusterListScroll}
			>
				<BtnListContainer>
					<div ref={biographyClusterListItemsRef} className='character-subpage-biography-cluster-list-items'>
						{characterVersion?.biography?.map((biologyCluster, index) => (
							<div key={index} className='character-subpage-biography-cluster-list-item-container'>
								<BtnListItem
									value={biologyCluster?.name}
									index={index}
									isActive={biologyCluster._id === currBiographyCluster._id}
									hasFoundActive={currBiographyCluster?._id !== undefined}
									onClick={() => onClickBiographyCluster(biologyCluster)}
									size='s'
								/>
							</div>
						))}
					</div>
				</BtnListContainer>
				<DragDropContainer
					className='character-subpage-biography-cluster-list-items'
					enableDragDrop={isReorderingBiographyCluster}
					onDropItem={reorderBiographyCluster}
					innerRef={biographyClusterListItemsRef}
				>
					{characterVersion?.biography?.map((biologyCluster, index) => (
						<DragDropItem key={index} index={index} className='character-subpage-biography-cluster-list-item-container'>
							<BtnListItem
								value={biologyCluster?.name}
								index={index}
								isActive={biologyCluster._id === currBiographyCluster._id}
								hasFoundActive={currBiographyCluster?._id !== undefined}
								onClick={() => onClickBiographyCluster(biologyCluster)}
								onRemove={(e) => removeBiographyCluster(e, index)}
								size='s'
							/>
						</DragDropItem>
					))}
				</DragDropContainer>
			</EditableContainer>
		</div>
	);
};
