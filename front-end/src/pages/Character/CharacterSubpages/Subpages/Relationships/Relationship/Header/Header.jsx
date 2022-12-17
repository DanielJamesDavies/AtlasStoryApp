// Packages

// Components

// Logic
import { HeaderLogic } from "./HeaderLogic";

// Context

// Services

// Styles
import "./Header.css";

// Assets

export const Header = ({ relationship }) => {
	const { headerRef, story, character, secondCharacter } = HeaderLogic();

	return (
		<div ref={headerRef} className='character-subpage-relationships-relationship-header'>
			<div className='character-subpage-relationships-relationship-header-title'>
				{character?.data?.name} & {secondCharacter?.data?.name}
				{secondCharacter?.data?.name[secondCharacter?.data?.name.length - 1] === "s" ? "'" : "'s"} Relationship
			</div>
			<div className='character-subpage-relationships-relationship-header-type'>
				<div
					className='character-subpage-relationships-relationship-header-type-colour'
					style={
						story?.data?.characterRelationshipTypes?.find((e) => e._id === relationship.relationship_type)?.colour
							? { background: story?.data?.characterRelationshipTypes?.find((e) => e._id === relationship.relationship_type)?.colour }
							: {}
					}
				></div>
				<div className='character-subpage-relationships-relationship-header-type-name'>
					{story?.data?.characterRelationshipTypes?.find((e) => e._id === relationship.relationship_type)?.name}
				</div>
			</div>
		</div>
	);
};
