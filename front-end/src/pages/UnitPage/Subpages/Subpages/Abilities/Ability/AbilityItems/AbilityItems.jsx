// Packages

// Components
import { EditableContainer } from "../../../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../../../components/DragDropItem/DragDropItem";
import { AbilityItem } from "./AbilityItem";

// Logic
import { AbilityItemsLogic } from "./AbilityItemsLogic";

// Context

// Services

// Styles

// Assets

export const AbilityItems = ({ ability, changeAbility }) => {
	const {
		isAuthorizedToEdit,
		addAbilityItem,
		isReorderingAbilityItems,
		toggleIsReorderingAbilityItems,
		reorderAbilityItems,
		revertAbilityItems,
		saveAbilityItems,
	} = AbilityItemsLogic({
		ability,
		changeAbility,
	});

	return (
		<EditableContainer
			className='unit-page-subpage-abilities-ability-items-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onAdd={addAbilityItem}
			onReorder={toggleIsReorderingAbilityItems}
			onRevert={revertAbilityItems}
			onSave={saveAbilityItems}
		>
			<div className='unit-page-subpage-abilities-ability-items'>
				{ability?.items?.map((abilityItem, index) => (
					<div key={index} className='unit-page-subpage-abilities-ability-item-container'>
						<AbilityItem ability={ability} changeAbility={changeAbility} abilityItem={abilityItem} index={index} isEditing={false} />
					</div>
				))}
			</div>
			<DragDropContainer
				className='unit-page-subpage-abilities-ability-items'
				enableDragDrop={isReorderingAbilityItems}
				onDropItem={reorderAbilityItems}
			>
				{ability?.items?.map((abilityItem, index) => (
					<DragDropItem key={index} index={index} className='unit-page-subpage-abilities-ability-item-container'>
						<AbilityItem ability={ability} changeAbility={changeAbility} abilityItem={abilityItem} index={index} isEditing={true} />
					</DragDropItem>
				))}
			</DragDropContainer>
		</EditableContainer>
	);
};
