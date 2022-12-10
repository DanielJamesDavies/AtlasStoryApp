// Packages
import { FaPlus, FaSort } from "react-icons/fa";

// Components
import { CharactersCreateCharacterType } from "./CharactersCreateCharacterType/CharactersCreateCharacterType";
import { ContentItem } from "../../../components/ContentItem/ContentItem";
import { IconBtn } from "../../../components/IconBtn/IconBtn";
import { BtnListContainer } from "../../../components/BtnListContainer/BtnListContainer";
import { DragDropContainer } from "../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../components/DragDropItem/DragDropItem";
import { BtnListItem } from "../../../components/BtnListItem/BtnListItem";

// Logic
import { CharactersCharacterTypesLogic } from "./CharactersCharacterTypesLogic";

// Context

// Services

// Styles
import "./CharactersCharacterTypes.css";

// Assets

export const CharactersCharacterTypes = () => {
	const {
		isAuthorizedToEdit,
		story,
		characterTypes,
		characterType,
		changeCharacterType,
		openCreateCharacterTypeForm,
		isReorderingCharacterTypes,
		toggleIsReorderingCharacterTypes,
		changeCharacterTypesOrder,
	} = CharactersCharacterTypesLogic();

	if (!isAuthorizedToEdit && (!story?.data?.characterTypes || story?.data?.characterTypes.length === 0)) return null;
	return (
		<div className='characters-character-types-container'>
			<ContentItem className='characters-character-types'>
				<div className='characters-character-types-primary'>
					<div className='characters-character-types-primary-title'>Character Types</div>
					{!isAuthorizedToEdit ? null : (
						<div className='characters-character-types-primary-modify-buttons-container'>
							<IconBtn
								className='characters-character-types-primary-modify-btn'
								seamless={true}
								icon={<FaPlus />}
								iconName='plus'
								onClick={openCreateCharacterTypeForm}
								label='Create Character Type'
							/>
							<IconBtn
								className='characters-character-types-primary-modify-btn'
								seamless={true}
								icon={<FaSort />}
								iconName='sort'
								onClick={toggleIsReorderingCharacterTypes}
								label='Reorder Character Types'
							/>
						</div>
					)}
				</div>
				{!story?.data?.characterTypes || !characterTypes ? (
					<div className='characters-character-types-character-type-items-container'>
						<BtnListItem />
						<BtnListItem />
						<BtnListItem />
					</div>
				) : (
					<BtnListContainer>
						<DragDropContainer
							className='characters-character-types-character-type-items-container'
							inlineItems={false}
							enableDragDrop={isReorderingCharacterTypes}
							onDropItem={changeCharacterTypesOrder}
						>
							{story.data.characterTypes.map((characterTypeID, index) => (
								<DragDropItem key={index} index={index} className='characters-character-types-character-type-item-container'>
									<BtnListItem
										value={characterTypes.find((e) => e._id === characterTypeID)?.data?.name}
										index={index}
										isActive={characterType._id === characterTypeID}
										onClick={(e) => (e?.button === 2 ? null : changeCharacterType(characterTypeID))}
									/>
								</DragDropItem>
							))}
						</DragDropContainer>
					</BtnListContainer>
				)}
				<CharactersCreateCharacterType />
			</ContentItem>
		</div>
	);
};
