// Packages
import { FaTimes } from "react-icons/fa";

// Components
import { ContentItem } from "../../../../../../../../components/ContentItem/ContentItem";
import { DropdownContainer } from "../../../../../../../../components/DropdownContainer/DropdownContainer";
import { IconBtn } from "../../../../../../../../components/IconBtn/IconBtn";

// Logic
import { RelationshipItemLogic } from "./RelationshipItemLogic";

// Context

// Services

// Styles
import "./RelationshipItem.css";

// Assets

export const RelationshipItem = ({ relationship, isEditing, selectedRelationships }) => {
	const { story, storyGroups, storyCharacters, secondCharacter, changeRelationshipSecondCharacter, changeRelationshipType, removeRelationship } =
		RelationshipItemLogic({ relationship, selectedRelationships });

	return (
		<ContentItem
			className='unit-page-relationship-info-home-selected-unit-page-relationship-item'
			margin='none'
			size='s'
			hasBg={true}
			backgroundColour='grey3'
		>
			<div className='unit-page-relationship-info-home-selected-unit-page-relationship-item-content'>
				<div className='unit-page-relationship-info-home-selected-unit-page-relationship-item-second-unit-page-name-container'>
					{!isEditing ? (
						!secondCharacter ? (
							"Unselected"
						) : (
							secondCharacter?.data?.name
						)
					) : (
						<DropdownContainer value={secondCharacter?.data?.name} onChange={changeRelationshipSecondCharacter} noBackground={true}>
							{storyGroups
								?.map((group) =>
									group?.data?.characters
										.filter(
											(character) =>
												selectedRelationships
													.filter((e) => !e?.isRemoved)
													.findIndex((relationship) => relationship.character_ids.includes(character?.character_id)) ===
												-1
										)
										.map((character) => storyCharacters.find((e) => e._id === character?.character_id))
								)
								.flat(1)
								.filter((e) => e)
								.map((unit, index) => (
									<div key={index}>{unit?.data?.name}</div>
								))}
						</DropdownContainer>
					)}
				</div>
				<div className='unit-page-relationship-info-home-selected-unit-page-relationship-item-relationship-type-container'>
					{!isEditing ? (
						<div className='unit-page-relationship-info-home-selected-unit-page-relationship-item-relationship-type'>
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
				<div className='unit-page-relationship-info-home-selected-unit-page-relationship-item-buttons-container'>
					<IconBtn icon={<FaTimes />} iconName='times' onClick={removeRelationship} seamless={true} size='s' />
				</div>
			)}
		</ContentItem>
	);
};
