// Packages

// Components
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { BtnListContainer } from "../../../../../../components/BtnListContainer/BtnListContainer";
import { DragDropContainer } from "../../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../../components/DragDropItem/DragDropItem";
import { BtnListItem } from "../../../../../../components/BtnListItem/BtnListItem";

// Logic
import { AbilitiesListLogic } from "./AbilitiesListLogic";

// Context

// Services

// Styles
import "./AbilitiesList.css";

// Assets

export const AbilitiesList = ({ currAbility, switchAbility }) => {
	const {
		isAuthorizedToEdit,
		characterVersion,
		addAbility,
		removeAbility,
		isReorderingAbilities,
		toggleIsReorderingAbilities,
		reorderAbilities,
		revertAbilities,
		saveAbilities,
		onClickAbility,
		abilitiesListItemsRef,
		onAbilitiesListScroll,
	} = AbilitiesListLogic({ currAbility, switchAbility });

	return (
		<div className='character-subpage-abilities-list'>
			<EditableContainer
				isAuthorizedToEdit={isAuthorizedToEdit}
				onAdd={addAbility}
				onReorder={toggleIsReorderingAbilities}
				onRevert={revertAbilities}
				onSave={saveAbilities}
				onScroll={onAbilitiesListScroll}
			>
				<BtnListContainer>
					<div ref={abilitiesListItemsRef} className='character-subpage-abilities-list-items'>
						{characterVersion?.abilities?.map((ability, index) => (
							<div key={index} className='character-subpage-abilities-list-item-container'>
								<BtnListItem
									value={ability?.name}
									index={index}
									isActive={ability._id === currAbility._id}
									hasFoundActive={currAbility?._id !== undefined}
									onClick={() => onClickAbility(ability)}
								/>
							</div>
						))}
					</div>
				</BtnListContainer>
				<DragDropContainer
					className='character-subpage-abilities-list-items'
					enableDragDrop={isReorderingAbilities}
					onDropItem={reorderAbilities}
					innerRef={abilitiesListItemsRef}
				>
					{characterVersion?.abilities?.map((ability, index) => (
						<DragDropItem key={index} index={index} className='character-subpage-abilities-list-item-container'>
							<BtnListItem
								value={ability?.name}
								index={index}
								isActive={ability._id === currAbility._id}
								hasFoundActive={currAbility?._id !== undefined}
								onClick={() => onClickAbility(ability)}
								onRemove={(e) => removeAbility(e, index)}
							/>
						</DragDropItem>
					))}
				</DragDropContainer>
			</EditableContainer>
		</div>
	);
};
