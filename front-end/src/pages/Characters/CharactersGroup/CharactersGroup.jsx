// Packages
import { FaSort, FaUserPlus } from "react-icons/fa";

// Components
import { CharactersGroupCharacterCards } from "./CharactersGroupCharacterCards/CharactersGroupCharacterCards";
import { CharactersCreateCharacter } from "./CharactersCreateCharacter/CharactersCreateCharacter";
import { IconBtn } from "../../../components/IconBtn/IconBtn";
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
	const {
		isAuthorizedToEdit,
		authorized_user_id,
		story,
		group,
		navigateToGroup,
		openCreateCharacterForm,
		toggleIsReorderingCharacters,
		activeGroupColour,
		activeGroupColourTint,
	} = CharactersGroupLogic();

	return (
		<div
			className={
				story?.data?.groups?.length === 0 && story?.data?.members.findIndex((e) => e?.user_id === authorized_user_id) !== -1
					? "characters-group-container characters-group-container-no-groups"
					: "characters-group-container"
			}
			style={{
				"--characters-group-active-group-colour": !activeGroupColour
					? !story?.data?.colour
						? "#0044ff"
						: story?.data?.colour
					: activeGroupColour,
				"--characters-group-active-group-colour-tint": !activeGroupColourTint
					? !story?.data?.colour
						? "#0044ff"
						: story?.data?.colour
					: activeGroupColourTint,
			}}
		>
			<ContentItem className='characters-group'>
				<div className='characters-group-primary'>
					<div className='characters-group-primary-title'>{group?.data?.name}</div>
					<div
						className={
							isAuthorizedToEdit
								? "characters-group-primary-buttons-container characters-group-primary-buttons-container-authorized-to-edit"
								: "characters-group-primary-buttons-container"
						}
					>
						{!group?.uid ? null : (
							<button
								className='characters-group-primary-open-group-btn'
								onClick={navigateToGroup}
								onAuxClick={navigateToGroup}
								onMouseDown={(e) => e.preventDefault()}
							>
								Open Group
							</button>
						)}
						{!isAuthorizedToEdit ? null : (
							<div className='characters-group-primary-modify-btns-container'>
								<IconBtn
									className='characters-group-primary-modify-btn'
									seamless={true}
									icon={<FaUserPlus />}
									iconName='user-plus'
									onClick={openCreateCharacterForm}
									label='Create Character'
								/>
								<IconBtn
									className='characters-group-primary-modify-btn'
									seamless={true}
									icon={<FaSort />}
									iconName='sort'
									onClick={toggleIsReorderingCharacters}
									label='Reorder Characters'
								/>
							</div>
						)}
					</div>
				</div>
				{story?.data?.groups?.length !== 0 &&
				group?.data?.characters?.length === 0 &&
				story?.data?.members.findIndex((e) => e?.user_id === authorized_user_id) !== -1 ? (
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
