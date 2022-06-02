// Packages
import { FaPlus, FaSort } from "react-icons/fa";

// Components
import { IconBtn } from "../../../components/IconBtn/IconBtn";
import { DragDropContainer } from "../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../components/DragDropItem/DragDropItem";
import { CharactersCreateCharacterType } from "./CharactersCreateCharacterType";

// Logic
import { CharactersCharacterTypesLogic } from "./CharactersCharacterTypesLogic";

// Context

// Services

// Styles
import "./CharactersCharacterTypes.css";

// Assets

export const CharactersCharacterTypes = () => {
	const {
		isAuthorizedToModify,
		story,
		characterTypes,
		characterType,
		changeCharacterType,
		openCreateCharacterTypeForm,
		isReorderingCharacterTypes,
		toggleIsReorderingCharacterTypes,
		changeCharacterTypesOrder,
	} = CharactersCharacterTypesLogic();

	return (
		<div className='characters-character-types'>
			<div className='characters-character-types-primary'>
				<div className='characters-character-types-primary-title'>Character Types</div>
				{!isAuthorizedToModify ? null : (
					<div className='characters-character-types-primary-modify-buttons-container'>
						<IconBtn
							className='characters-character-types-primary-modify-btn'
							icon={<FaPlus />}
							iconName='plus'
							onClick={openCreateCharacterTypeForm}
						/>
						<IconBtn
							className='characters-character-types-primary-modify-btn'
							icon={<FaSort />}
							iconName='sort'
							onClick={toggleIsReorderingCharacterTypes}
						/>
					</div>
				)}
			</div>
			{!story?.data?.characterTypes || !characterTypes ? null : (
				<DragDropContainer
					className='characters-character-types-character-type-items-container'
					inlineItems={false}
					enableDragDrop={isReorderingCharacterTypes}
					onDropItem={changeCharacterTypesOrder}
				>
					{story.data.characterTypes.map((characterTypeID, index) => (
						<DragDropItem key={index} index={index} className='characters-character-types-character-type-item-container'>
							<button
								className={
									characterType._id === characterTypeID
										? "characters-character-types-character-type-item characters-character-types-character-type-item-active"
										: "characters-character-types-character-type-item"
								}
								onClick={() => changeCharacterType(characterTypeID)}
							>
								{characterTypes.find((e) => e._id === characterTypeID)?.data?.name}
							</button>
						</DragDropItem>
					))}
				</DragDropContainer>
			)}
			<CharactersCreateCharacterType />
		</div>
	);
};
