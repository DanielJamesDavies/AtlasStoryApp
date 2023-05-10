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
import { OpenableComponent } from "../../../../../../components/OpenableComponent/OpenableComponent";

// Assets

export const BigFive = () => {
	const { isAuthorizedToEdit, bigFiveTraits, revertBigFive, saveBigFive, errors, bigFiveRef, onBigFiveContainerScroll } = BigFiveLogic();

	return (
		<OpenableComponent className='character-subpage-psychology-big-five-container' title='Big Five Personality Traits' onlyOnMobile={true}>
			<EditableContainer
				className='character-subpage-psychology-big-five'
				isAuthorizedToEdit={isAuthorizedToEdit}
				onRevert={revertBigFive}
				onSave={saveBigFive}
				onScroll={onBigFiveContainerScroll}
			>
				<div ref={bigFiveRef} className='character-subpage-psychology-big-five-traits-container'>
					{bigFiveTraits.map((trait, index) => (
						<BigFiveTrait key={index} trait={trait} isEditing={false} />
					))}
				</div>
				<div ref={bigFiveRef} className='character-subpage-psychology-big-five-traits-container'>
					<ErrorMessage errors={errors} />
					{bigFiveTraits.map((trait, index) => (
						<BigFiveTrait key={index} trait={trait} isEditing={true} />
					))}
				</div>
			</EditableContainer>
		</OpenableComponent>
	);
};
