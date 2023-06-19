// Packages

// Components
import { CharacterPrimary } from "./Primary/Primary";
import { CharacterOverview } from "./Overview/Overview";
import { CharacterSectionSwitcher } from "./SectionSwitcher/SectionSwitcher";
import { CharacterSubpages } from "./Subpages/Subpages";
import { LoadingCircle } from "../../components/LoadingCircle/LoadingCircle";

// Logic
import { CharacterLogic } from "./CharacterLogic";

// Context

// Services

// Styles
import "./Character.css";

// Assets

export const Character = () => {
	const {
		isAuthorizedToEdit,
		character,
		characterOverviewBackground,
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
			className={
				isAuthorizedToEdit
					? "character-container character-container-is-authorized"
					: isOnOverviewSection
					? "character-container character-container-is-on-overview"
					: "character-container character-container-is-on-subpages"
			}
			style={characterStyle ? characterStyle : {}}
		>
			<div
				className={
					character && characterStyle && characterOverviewBackground
						? "character-loading-container character-loading-container-hidden"
						: "character-loading-container"
				}
			>
				<LoadingCircle size='l' />
			</div>
			<div className={character && characterStyle && characterOverviewBackground ? "character" : "character character-hidden"}>
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
