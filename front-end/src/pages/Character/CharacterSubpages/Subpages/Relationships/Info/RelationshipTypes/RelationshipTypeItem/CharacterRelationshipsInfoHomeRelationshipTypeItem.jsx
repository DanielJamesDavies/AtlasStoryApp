// Packages
import { FaTimes } from "react-icons/fa";

// Components
import { ContentItem } from "../../../../../../../../components/ContentItem/ContentItem";
import { ColourPicker } from "../../../../../../../../components/ColourPicker/ColourPicker";
import { TextInput } from "../../../../../../../../components/TextInput/TextInput";
import { IconBtn } from "../../../../../../../../components/IconBtn/IconBtn";

// Logic
import { CharacterRelationshipsInfoHomeRelationshipTypeItemLogic } from "./CharacterRelationshipsInfoHomeRelationshipTypeItemLogic";

// Context

// Services

// Styles
import "./CharacterRelationshipsInfoHomeRelationshipTypeItem.css";

// Assets

export const CharacterRelationshipsInfoHomeRelationshipTypeItem = ({ relationship, isEditing }) => {
	const { changeRelationshipTypeName, changeRelationshipTypeColour, removeRelationshipType } =
		CharacterRelationshipsInfoHomeRelationshipTypeItemLogic({ relationship });

	return (
		<ContentItem
			className='characters-relationship-info-home-relationship-type-item'
			size='s'
			hasBg={true}
			backgroundColour='grey3'
			margin='none'
		>
			<div className='characters-relationship-info-home-relationship-type-item-content'>
				<div className='characters-relationship-info-home-relationship-type-item-colour-container'>
					<ColourPicker
						value={relationship?.colour}
						onChange={changeRelationshipTypeColour}
						displayText={isEditing}
						enableEdit={isEditing}
						size='s'
						pickerVerticalPlacement='bottom'
						noBackground={true}
						circular={true}
					/>
				</div>
				<div className='characters-relationship-info-home-relationship-type-item-name-container'>
					{!isEditing ? (
						relationship?.name
					) : (
						<TextInput
							value={relationship?.name}
							onChange={changeRelationshipTypeName}
							seamless={true}
							label='Relationship Type Name'
						/>
					)}
				</div>
			</div>
			{!isEditing ? null : (
				<div className='characters-relationship-info-home-relationship-type-item-buttons-container'>
					<IconBtn icon={<FaTimes />} iconName='times' onClick={removeRelationshipType} seamless={true} />
				</div>
			)}
		</ContentItem>
	);
};
