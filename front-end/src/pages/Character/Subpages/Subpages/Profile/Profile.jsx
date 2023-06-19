// Packages

// Components
import { CharacterProfileDescription } from "./Description/Description";
import { CharacterProfilePrimaryImage } from "./PrimaryImage/PrimaryImage";
import { CharacterProfileSummaryItems } from "./SummaryItems/SummaryItems";

// Logic

// Context

// Services

// Styles
import "./Profile.css";

// Assets

export const Profile = () => {
	return (
		<div className='character-subpage-profile'>
			<div className='character-subpage-profile-section-1'>
				<CharacterProfileDescription />
			</div>
			<div className='character-subpage-profile-section-2'>
				<CharacterProfilePrimaryImage />
				<CharacterProfileSummaryItems />
			</div>
		</div>
	);
};
