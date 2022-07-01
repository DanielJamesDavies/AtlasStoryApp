// Packages

// Components
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { DragDropContainer } from "../../../../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../../../../components/DragDropItem/DragDropItem";
import { IconBtn } from "../../../../../../components/IconBtn/IconBtn";

// Logic
import { AbilitiesListLogic } from "./AbilitiesListLogic";

// Context

// Services

// Styles
import "./AbilitiesList.css";
import { FaTimes } from "react-icons/fa";

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
	} = AbilitiesListLogic({ currAbility, switchAbility });

	return (
		<div className='character-subpage-abilities-list'>
			<EditableContainer
				isAuthorizedToEdit={isAuthorizedToEdit}
				onAdd={addAbility}
				onReorder={toggleIsReorderingAbilities}
				onRevert={revertAbilities}
				onSave={saveAbilities}
			>
				<div className='character-subpage-abilities-list-items'>
					{characterVersion?.abilities?.map((ability, index) => (
						<div key={index} className='character-subpage-abilities-list-item-container'>
							<div
								className={
									ability._id === currAbility._id
										? "character-subpage-abilities-list-item character-subpage-abilities-list-item-active"
										: "character-subpage-abilities-list-item"
								}
								onClick={() => onClickAbility(ability)}
							>
								<div className='character-subpage-abilities-list-item-name'>{ability?.name}</div>
							</div>
						</div>
					))}
				</div>
				<DragDropContainer
					className='character-subpage-abilities-list-items'
					enableDragDrop={isReorderingAbilities}
					onDropItem={reorderAbilities}
				>
					{characterVersion?.abilities?.map((ability, index) => (
						<DragDropItem key={index} index={index} className='character-subpage-abilities-list-item-container'>
							<div
								className={
									ability._id === currAbility._id
										? "character-subpage-abilities-list-item character-subpage-abilities-list-item-active"
										: "character-subpage-abilities-list-item"
								}
								onClick={() => onClickAbility(ability)}
							>
								<div className='character-subpage-abilities-list-item-name'>{ability?.name}</div>
								<IconBtn
									className='character-subpage-abilities-list-item-remove-btn'
									icon={<FaTimes />}
									iconName='times'
									size='s'
									seamless={true}
									onClick={(e) => removeAbility(e, index)}
								/>
							</div>
						</DragDropItem>
					))}
				</DragDropContainer>
			</EditableContainer>
		</div>
	);
};
