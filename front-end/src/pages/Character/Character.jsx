// Packages

// Components
import { CharacterPrimary } from "./CharacterPrimary/CharacterPrimary";
import { CharacterOverview } from "./CharacterOverview/CharacterOverview";
import { CharacterSectionSwitcher } from "./CharacterSectionSwitcher/CharacterSectionSwitcher";
import { CharacterSubpages } from "./CharacterSubpages/CharacterSubpages";

// Logic
import { CharacterLogic } from "./CharacterLogic";

// Context

// Services

// Styles
import "./Character.css";

// Assets

export const Character = () => {
	const { characterStyle, isOnOverviewSection, characterOverviewContainerRef, characterSubpagesContainerRef } = CharacterLogic();

	return (
		<div className='character-container' style={characterStyle}>
			<div className='character'>
				<CharacterPrimary />
				<div
					className={
						isOnOverviewSection
							? "character-content-container character-content-container-is-on-overview"
							: "character-content-container character-content-container-is-on-subpages"
					}
				>
					<CharacterOverview innerRef={characterOverviewContainerRef} />
					<CharacterSectionSwitcher />
					<CharacterSubpages innerRef={characterSubpagesContainerRef} />
				</div>
			</div>
		</div>
	);
};
