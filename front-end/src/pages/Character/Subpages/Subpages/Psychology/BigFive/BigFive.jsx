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
import { FaEye } from "react-icons/fa";

// Assets

export const BigFive = () => {
	const {
		isAuthorizedToEdit,
		characterVersion,
		bigFiveTraits,
		showBigFive,
		hideBigFive,
		revertBigFive,
		saveBigFive,
		errors,
		bigFiveRef,
		onBigFiveContainerScroll,
	} = BigFiveLogic();

	if (!isAuthorizedToEdit && characterVersion?.psychology?.isBigFiveVisible === false) return null;
	if (isAuthorizedToEdit && characterVersion?.psychology?.isBigFiveVisible === false)
		return (
			<div className='character-subpage-psychology-big-five-show-container' onClick={showBigFive}>
				<div>Show Big Five Traits</div>
				<FaEye />
			</div>
		);
	return (
		<OpenableComponent className='character-subpage-psychology-big-five-container' title='Big Five Personality Traits' onlyOnMobile={true}>
			<EditableContainer
				className='character-subpage-psychology-big-five'
				isAuthorizedToEdit={isAuthorizedToEdit}
				onHide={hideBigFive}
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
