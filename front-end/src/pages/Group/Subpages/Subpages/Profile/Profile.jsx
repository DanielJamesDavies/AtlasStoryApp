// Packages

// Components
import { GroupProfileDescription } from "./Description/Description";
import { GroupProfilePrimaryImage } from "./PrimaryImage/PrimaryImage";
import { GroupProfileSummaryItems } from "./SummaryItems/SummaryItems";

// Logic

// Context

// Services

// Styles
import "./Profile.css";

// Assets

export const Profile = () => {
	return (
		<div className='group-subpage-profile'>
			<div className='group-subpage-profile-section-1'>
				<GroupProfileDescription />
			</div>
			<div className='group-subpage-profile-section-2'>
				<GroupProfilePrimaryImage />
				<GroupProfileSummaryItems />
			</div>
		</div>
	);
};
