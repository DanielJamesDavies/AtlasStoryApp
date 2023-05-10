// Packages

// Components
import { CharacterOverviewSummaryItems } from "./SummaryItems/SummaryItems";
import { CharacterOverviewDescription } from "./Description/Description";

// Logic
import { CharacterOverviewLogic } from "./OverviewLogic";

// Context

// Services

// Styles
import "./Overview.css";

// Assets
import stars from "../../../content/stars.png";

export const CharacterOverview = ({ innerRef }) => {
	const { characterOverviewBackground } = CharacterOverviewLogic();

	return (
		<div className='character-overview-container'>
			<div ref={innerRef} className='character-overview'>
				<div className='character-overview-content'>
					<CharacterOverviewSummaryItems />
					<CharacterOverviewDescription />
				</div>
				<div className='character-overview-background'>
					{!characterOverviewBackground ? null : <img src={characterOverviewBackground} alt='' />}
					<div className='character-overview-background-glow' />
					<img className='character-overview-background-stars' src={stars} alt='' />
				</div>
			</div>
		</div>
	);
};
