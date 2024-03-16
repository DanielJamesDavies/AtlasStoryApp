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

export const AbilitiesList = ({ currAbility, changeAbility, switchAbility }) => {
	const {
		isAuthorizedToEdit,
		unitVersion,
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
		unitVersionItemCopying,
		copyVersionValue,
		pasteVersionValue,
		abilitiesListRef,
	} = AbilitiesListLogic({ currAbility, changeAbility, switchAbility });

	return (
		<div ref={abilitiesListRef} className='unit-page-subpage-abilities-list'>
			<EditableContainer
				isAuthorizedToEdit={isAuthorizedToEdit}
				onAdd={addAbility}
				onReorder={toggleIsReorderingAbilities}
				onRevert={revertAbilities}
				onSave={saveAbilities}
				onScroll={onAbilitiesListScroll}
				onCopyVersionValue={copyVersionValue}
				onPasteVersionValue={JSON.stringify(unitVersionItemCopying?.item) !== JSON.stringify(["abilities"]) ? undefined : pasteVersionValue}
			>
				<BtnListContainer>
					<div ref={abilitiesListItemsRef} className='unit-page-subpage-abilities-list-items'>
						{unitVersion?.abilities?.map((ability, index) => (
							<div key={index} className='unit-page-subpage-abilities-list-item-container'>
								<BtnListItem
									value={ability?.name}
									index={index}
									isActive={ability._id === currAbility._id}
									hasFoundActive={currAbility?._id !== undefined}
									onClick={() => onClickAbility(ability)}
									size='s'
								/>
							</div>
						))}
					</div>
				</BtnListContainer>
				<DragDropContainer
					className='unit-page-subpage-abilities-list-items'
					enableDragDrop={isReorderingAbilities}
					onDropItem={reorderAbilities}
					innerRef={abilitiesListItemsRef}
				>
					{unitVersion?.abilities?.map((ability, index) => (
						<DragDropItem key={index} index={index} className='unit-page-subpage-abilities-list-item-container'>
							<BtnListItem
								value={ability?.name}
								index={index}
								isActive={ability._id === currAbility._id}
								hasFoundActive={currAbility?._id !== undefined}
								onClick={() => onClickAbility(ability)}
								onRemove={(e) => removeAbility(e, index)}
								size='s'
							/>
						</DragDropItem>
					))}
				</DragDropContainer>
			</EditableContainer>
		</div>
	);
};
