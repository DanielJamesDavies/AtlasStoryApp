// Packages

// Components
import { EditableContainer } from "../../../../../../components/EditableContainer/EditableContainer";
import { ErrorMessage } from "../../../../../../components/ErrorMessage/ErrorMessage";
import { BigFiveTrait } from "./BigFiveTrait";

// Logic
import { BigFiveLogic } from "./BigFiveLogic";

// Context

// Services

// Styles
import "./BigFive.css";

// Assets

export const BigFive = () => {
	const { isAuthorizedToEdit, bigFiveTraits, revertBigFive, saveBigFive, errors, bigFiveRef, onBigFiveContainerScroll } = BigFiveLogic();

	return (
		<div className='character-subpage-big-five-container'>
			<div className='character-subpage-big-five-title'>Big Five Personality Traits</div>
			<EditableContainer
				className='character-subpage-big-five'
				isAuthorizedToEdit={isAuthorizedToEdit}
				onRevert={revertBigFive}
				onSave={saveBigFive}
				onScroll={onBigFiveContainerScroll}
			>
				<div ref={bigFiveRef} className='character-subpage-big-five-traits-container'>
					{bigFiveTraits.map((trait, index) => (
						<BigFiveTrait key={index} trait={trait} isEditing={false} />
					))}
				</div>
				<div ref={bigFiveRef} className='character-subpage-big-five-traits-container'>
					<ErrorMessage errors={errors} />
					{bigFiveTraits.map((trait, index) => (
						<BigFiveTrait key={index} trait={trait} isEditing={true} />
					))}
				</div>
			</EditableContainer>
		</div>
	);
};
