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

export const BiographyClusterList = ({ currBiographyCluster, changeBiographyCluster, switchBiographyCluster }) => {
	const {
		isAuthorizedToEdit,
		unitVersion,
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
		unitVersionItemCopying,
		copyVersionValue,
		pasteVersionValue,
	} = BiographyClusterListLogic({ currBiographyCluster, changeBiographyCluster, switchBiographyCluster });

	return (
		<div className='unit-page-subpage-biography-cluster-list'>
			<EditableContainer
				isAuthorizedToEdit={isAuthorizedToEdit}
				onAdd={addBiographyCluster}
				onReorder={toggleIsReorderingBiographyClusters}
				onRevert={revertBiographyClusters}
				onSave={saveBiographyClusters}
				onDefault={defaultBiographyClusters}
				onScroll={onBiographyClusterListScroll}onCopyVersionValue={copyVersionValue}
				onPasteVersionValue={JSON.stringify(unitVersionItemCopying?.item) !== JSON.stringify(["biography"]) ? undefined : pasteVersionValue}
			>
				<BtnListContainer>
					<div ref={biographyClusterListItemsRef} className='unit-page-subpage-biography-cluster-list-items'>
						{unitVersion?.biography?.map((biologyCluster, index) => (
							<div key={index} className='unit-page-subpage-biography-cluster-list-item-container'>
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
					className='unit-page-subpage-biography-cluster-list-items'
					enableDragDrop={isReorderingBiographyCluster}
					onDropItem={reorderBiographyCluster}
					innerRef={biographyClusterListItemsRef}
				>
					{unitVersion?.biography?.map((biologyCluster, index) => (
						<DragDropItem key={index} index={index} className='unit-page-subpage-biography-cluster-list-item-container'>
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
