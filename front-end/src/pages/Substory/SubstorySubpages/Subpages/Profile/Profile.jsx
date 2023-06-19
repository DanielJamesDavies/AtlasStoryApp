// Packages

// Components
import { SubstoryProfileDescription } from "./Description/Description";
import { SubstoryProfilePrimaryImage } from "./PrimaryImage/PrimaryImage";
import { SubstoryProfileSummaryItems } from "./SummaryItems/SummaryItems";

// Logic

// Context

// Services

// Styles
import "./Profile.css";

// Assets

export const Profile = () => {
	return (
		<div className='substory-subpage-profile'>
			<div className='substory-subpage-profile-section-1'>
				<SubstoryProfileDescription />
			</div>
			<div className='substory-subpage-profile-section-2'>
				<SubstoryProfilePrimaryImage />
				<SubstoryProfileSummaryItems />
			</div>
		</div>
	);
};
