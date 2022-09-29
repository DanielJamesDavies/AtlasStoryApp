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
	const {
		characterStyle,
		characterPrimaryRef,
		isOnOverviewSection,
		characterContainerRef,
		characterOverviewContainerRef,
		characterSubpagesContainerRef,
	} = CharacterLogic();

	return (
		<div
			ref={characterContainerRef}
			className={characterStyle ? "character-container" : "character-container character-container-hidden"}
			style={characterStyle ? characterStyle : {}}
		>
			<div className='character'>
				<CharacterPrimary characterPrimaryRef={characterPrimaryRef} />
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
