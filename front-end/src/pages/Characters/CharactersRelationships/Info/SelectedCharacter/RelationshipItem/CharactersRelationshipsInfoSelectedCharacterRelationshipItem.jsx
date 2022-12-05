// Packages

// Components
import { ContentItem } from "../../../../../../components/ContentItem/ContentItem";
import { DropdownContainer } from "../../../../../../components/DropdownContainer/DropdownContainer";
import { IconBtn } from "../../../../../../components/IconBtn/IconBtn";

// Logic
import { CharactersRelationshipsInfoSelectedCharacterRelationshipItemLogic } from "./CharactersRelationshipsInfoSelectedCharacterRelationshipItemLogic";

// Context

// Services

// Styles
import "./CharactersRelationshipsInfoSelectedCharacterRelationshipItem.css";
import { FaTimes } from "react-icons/fa";

// Assets

export const CharactersRelationshipsInfoSelectedCharacterRelationshipItem = ({ relationship, isEditing, selectedCharacterRelationships }) => {
	const { story, groups, characters, secondCharacter, changeRelationshipSecondCharacter, changeRelationshipType, removeRelationship } =
		CharactersRelationshipsInfoSelectedCharacterRelationshipItemLogic({ relationship, selectedCharacterRelationships });

	return (
		<ContentItem
			className='characters-relationship-info-home-selected-character-relationship-item'
			margin='none'
			size='s'
			hasBg={true}
			backgroundColour='grey3'
		>
			<div className='characters-relationship-info-home-selected-character-relationship-item-content'>
				<div className='characters-relationship-info-home-selected-character-relationship-item-second-character-name-container'>
					{!isEditing ? (
						!secondCharacter ? (
							"Unselected"
						) : (
							secondCharacter?.data?.name
						)
					) : (
						<DropdownContainer value={secondCharacter?.data?.name} onChange={changeRelationshipSecondCharacter} noBackground={true}>
							{groups
								.map((group) =>
									group?.data?.characters
										.filter(
											(character) =>
												selectedCharacterRelationships
													.filter((e) => !e?.isRemoved)
													.findIndex((relationship) => relationship.character_ids.includes(character?.character_id)) ===
												-1
										)
										.map((character) => characters.find((e) => e._id === character?.character_id))
								)
								.flat(1)
								.filter((e) => e)
								.map((character, index) => (
									<div key={index}>{character?.data?.name}</div>
								))}
						</DropdownContainer>
					)}
				</div>
				<div className='characters-relationship-info-home-selected-character-relationship-item-relationship-type-container'>
					{!isEditing ? (
						<div className='characters-relationship-info-home-selected-character-relationship-item-relationship-type'>
							{story?.data?.characterRelationshipTypes.find((e) => e._id === relationship.relationship_type)?.name}
						</div>
					) : (
						<DropdownContainer
							value={story?.data?.characterRelationshipTypes.find((e) => e._id === relationship.relationship_type)?.name}
							onChange={changeRelationshipType}
							noBackground={true}
						>
							{story?.data?.characterRelationshipTypes.map((relationshipType, index) => (
								<div key={index}>{relationshipType?.name}</div>
							))}
						</DropdownContainer>
					)}
				</div>
			</div>
			{!isEditing ? null : (
				<div className='characters-relationship-info-home-selected-character-relationship-item-buttons-container'>
					<IconBtn icon={<FaTimes />} iconName='times' onClick={removeRelationship} seamless={true} size='s' />
				</div>
			)}
		</ContentItem>
	);
};
