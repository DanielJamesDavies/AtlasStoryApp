// Packages
import { FaTimes } from "react-icons/fa";

// Components
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../../components/DragDropItem/DragDropItem";
import { IconBtn } from "../../../../../../components/IconBtn/IconBtn";

// Logic
import { BiographyClusterListLogic } from "./BiographyClusterListLogic";

// Context

// Services

// Styles
import "./BiographyClusterList.css";

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
			>
				<div className='character-subpage-biography-cluster-list-items'>
					{characterVersion?.biography?.map((biologyCluster, index) => (
						<div key={index} className='character-subpage-biography-cluster-list-item-container'>
							<div
								className={
									biologyCluster._id === currBiographyCluster._id
										? "character-subpage-biography-cluster-list-item character-subpage-biography-cluster-list-item-active"
										: "character-subpage-biography-cluster-list-item"
								}
								onClick={() => onClickBiographyCluster(biologyCluster)}
							>
								<div className='character-subpage-biography-cluster-list-item-name'>{biologyCluster?.name}</div>
							</div>
						</div>
					))}
				</div>
				<DragDropContainer
					className='character-subpage-biography-cluster-list-items'
					enableDragDrop={isReorderingBiographyCluster}
					onDropItem={reorderBiographyCluster}
				>
					{characterVersion?.biography?.map((biologyCluster, index) => (
						<DragDropItem key={index} index={index} className='character-subpage-biography-cluster-list-item-container'>
							<div
								className={
									biologyCluster._id === currBiographyCluster._id
										? "character-subpage-biography-cluster-list-item character-subpage-biography-cluster-list-item-active"
										: "character-subpage-biography-cluster-list-item"
								}
								onClick={() => onClickBiographyCluster(biologyCluster)}
							>
								<div className='character-subpage-biography-cluster-list-item-name'>{biologyCluster?.name}</div>
								<IconBtn
									className='character-subpage-biography-cluster-list-item-remove-btn'
									icon={<FaTimes />}
									iconName='times'
									size='s'
									seamless={true}
									onClick={(e) => removeBiographyCluster(e, index)}
								/>
							</div>
						</DragDropItem>
					))}
				</DragDropContainer>
			</EditableContainer>
		</div>
	);
};
