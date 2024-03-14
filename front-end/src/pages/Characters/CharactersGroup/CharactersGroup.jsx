// Packages

// Components
import { CharactersGroupCharacterCards } from "./CharactersGroupCharacterCards/CharactersGroupCharacterCards";
import { CharactersCreateCharacter } from "./CharactersCreateCharacter/CharactersCreateCharacter";
import { ContentItem } from "../../../components/ContentItem/ContentItem";
import { FirstAddButton } from "../../../components/FirstAddButton/FirstAddButton";

// Logic
import { CharactersGroupLogic } from "./CharactersGroupLogic";

// Context

// Services

// Styles
import "./CharactersGroup.css";

// Assets

export const CharactersGroup = () => {
	const { authorized_user_id, story, group, openCreateCharacterForm } = CharactersGroupLogic();

	return (
		<div
			className={
				story?.data?.groups?.length === 0 &&
				story?.data?.members.findIndex((e) => e?.user_id === authorized_user_id && e?.type !== "viewer") !== -1
					? "characters-group-container characters-group-container-no-groups"
					: "characters-group-container"
			}
		>
			<ContentItem className='characters-group'>
				{story?.data?.groups?.length !== 0 &&
				group?.data?.characters?.length === 0 &&
				story?.data?.members.findIndex((e) => e?.user_id === authorized_user_id && e?.type !== "viewer") !== -1 ? (
					<div className='characters-group-add-first-character-container'>
						<FirstAddButton label='Create Character' onClick={openCreateCharacterForm} />
					</div>
				) : story?.data?.groups?.length === 0 ? null : (
					<CharactersGroupCharacterCards />
				)}
				<CharactersCreateCharacter />
			</ContentItem>
		</div>
	);
};
