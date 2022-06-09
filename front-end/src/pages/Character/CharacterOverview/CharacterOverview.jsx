// Packages

// Components
import { CharacterOverviewSummaryItems } from "./CharacterOverviewSummaryItems";
import { CharacterOverviewDescription } from "./CharacterOverviewDescription";

// Logic
import { CharacterOverviewLogic } from "./CharacterOverviewLogic";

// Context

// Services

// Styles
import "./CharacterOverview.css";

// Assets
import stars from "../../../content/stars.png";

export const CharacterOverview = ({ innerRef }) => {
	const { characterOverviewBackground, backgroundGlowStyle } = CharacterOverviewLogic();

	return (
		<div ref={innerRef} className='character-overview-container'>
			<div className='character-overview'>
				<div className='character-overview-content'>
					<CharacterOverviewSummaryItems />
					<CharacterOverviewDescription />
				</div>
				<div className='character-overview-background'>
					{!characterOverviewBackground ? null : <img src={characterOverviewBackground} alt='' />}
					<div className='character-overview-background-glow' style={backgroundGlowStyle} />
					<img className='character-overview-background-stars' src={stars} alt='' />
				</div>
			</div>
		</div>
	);
};
