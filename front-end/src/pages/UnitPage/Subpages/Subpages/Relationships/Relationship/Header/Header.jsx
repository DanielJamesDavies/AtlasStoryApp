// Packages

// Components
import { EditableContainer } from "../../../../../../../components/EditableContainer/EditableContainer";
import { DropdownContainer } from "../../../../../../../components/DropdownContainer/DropdownContainer";

// Logic
import { HeaderLogic } from "./HeaderLogic";

// Context

// Services

// Styles
import "./Header.css";

// Assets

export const Header = ({ relationship, changeRelationship }) => {
	const { isAuthorizedToEdit, headerRef, story, unit, secondCharacter, changeRelationshipType, saveRelationshipType, revertRelationshipType } =
		HeaderLogic({ relationship, changeRelationship });

	return (
		<div ref={headerRef} className='unit-page-subpage-relationships-relationship-header'>
			<div className='unit-page-subpage-relationships-relationship-header-title'>
				{unit?.data?.name} & {secondCharacter?.data?.name}
				{secondCharacter?.data?.name[secondCharacter?.data?.name.length - 1] === "s" ? "'" : "'s"} Relationship
			</div>
			<EditableContainer
				className='unit-page-subpage-relationships-relationship-header-type-container'
				isAuthorizedToEdit={isAuthorizedToEdit}
				onSave={saveRelationshipType}
				onRevert={revertRelationshipType}
			>
				<div className='unit-page-subpage-relationships-relationship-header-type'>
					<div
						className='unit-page-subpage-relationships-relationship-header-type-colour'
						style={
							story?.data?.characterRelationshipTypes?.find((e) => e._id === relationship.relationship_type)?.colour
								? {
										background: story?.data?.characterRelationshipTypes?.find((e) => e._id === relationship.relationship_type)
											?.colour,
								  }
								: {}
						}
					></div>
					<div className='unit-page-subpage-relationships-relationship-header-type-name'>
						{story?.data?.characterRelationshipTypes?.find((e) => e._id === relationship.relationship_type)?.name}
					</div>
				</div>
				<div className='unit-page-subpage-relationships-relationship-header-type'>
					<DropdownContainer
						value={story?.data?.characterRelationshipTypes.find((e) => e._id === relationship.relationship_type)?.name}
						onChange={changeRelationshipType}
						noBackground={true}
					>
						{story?.data?.characterRelationshipTypes.map((relationshipType, index) => (
							<div key={index}>{relationshipType?.name}</div>
						))}
					</DropdownContainer>
				</div>
			</EditableContainer>
		</div>
	);
};
