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
		unitVersion,
		bigFiveTraits,
		showBigFive,
		hideBigFive,
		revertBigFive,
		saveBigFive,
		errors,
		bigFiveRef,
		onBigFiveContainerScroll,
		unitVersionItemCopying,
		copyVersionValue,
		pasteVersionValue
	} = BigFiveLogic();

	if (!isAuthorizedToEdit && unitVersion?.psychology?.isBigFiveVisible === false) return null;
	if (isAuthorizedToEdit && unitVersion?.psychology?.isBigFiveVisible === false)
		return (
			<div className='unit-page-subpage-psychology-big-five-show-container' onClick={showBigFive}>
				<div>Show Big Five Traits</div>
				<FaEye />
			</div>
		);
	return (
		<OpenableComponent className='unit-page-subpage-psychology-big-five-container' title='Big Five Personality Traits' onlyOnMobile={true}>
			<EditableContainer
				className='unit-page-subpage-psychology-big-five'
				isAuthorizedToEdit={isAuthorizedToEdit}
				onHide={hideBigFive}
				onRevert={revertBigFive}
				onSave={saveBigFive}
				onScroll={onBigFiveContainerScroll}
				onCopyVersionValue={copyVersionValue}
				onPasteVersionValue={JSON.stringify(unitVersionItemCopying?.item) !== JSON.stringify(["psychology", "bigFive"]) ? undefined : pasteVersionValue}
			>
				<div ref={bigFiveRef} className='unit-page-subpage-psychology-big-five-traits-container'>
					{bigFiveTraits.map((trait, index) => (
						<BigFiveTrait key={index} trait={trait} isEditing={false} />
					))}
				</div>
				<div ref={bigFiveRef} className='unit-page-subpage-psychology-big-five-traits-container'>
					<ErrorMessage errors={errors} />
					{bigFiveTraits.map((trait, index) => (
						<BigFiveTrait key={index} trait={trait} isEditing={true} />
					))}
				</div>
			</EditableContainer>
		</OpenableComponent>
	);
};
