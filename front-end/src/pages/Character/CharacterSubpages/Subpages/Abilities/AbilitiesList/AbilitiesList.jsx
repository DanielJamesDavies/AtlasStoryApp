// Packages

// Components
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";

// Logic
import { AbilitiesListLogic } from "./AbilitiesListLogic";

// Context

// Services

// Styles
import "./AbilitiesList.css";

// Assets

export const AbilitiesList = ({ currAbility, switchAbility }) => {
	const { isAuthorizedToEdit, characterVersion, addAbility } = AbilitiesListLogic();

	return (
		<div className='character-subpage-abilities-list'>
			<EditableContainer isAuthorizedToEdit={isAuthorizedToEdit} onAdd={addAbility}>
				<div className='character-subpage-abilities-list-items'>
					{characterVersion?.abilities?.map((ability, index) => (
						<button
							key={index}
							className={
								ability._id === currAbility._id
									? "character-subpage-abilities-list-item character-subpage-abilities-list-item-active"
									: "character-subpage-abilities-list-item"
							}
							onClick={() => switchAbility(ability._id)}
						>
							<div>{ability?.name}</div>
						</button>
					))}
				</div>
				<div className='character-subpage-abilities-list-items'>
					{characterVersion?.abilities?.map((ability, index) => (
						<button
							key={index}
							className={
								ability._id === currAbility._id
									? "character-subpage-abilities-list-item character-subpage-abilities-list-item-active"
									: "character-subpage-abilities-list-item"
							}
							onClick={() => switchAbility(ability._id)}
						>
							<div>{ability?.name}</div>
						</button>
					))}
				</div>
			</EditableContainer>
		</div>
	);
};
