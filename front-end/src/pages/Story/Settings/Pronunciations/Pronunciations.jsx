// Packages
import { FaTimes, FaVolumeUp } from "react-icons/fa";

// Components
import { EditableContainer } from "../../../../components/EditableContainer/EditableContainer";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";
import { TextInput } from "../../../../components/TextInput/TextInput";
import { IconBtn } from "../../../../components/IconBtn/IconBtn";

// Logic
import { PronunciationsLogic } from "./PronunciationsLogic";

// Context

// Services

// Styles
import "./Pronunciations.css";

// Assets

export const Pronunciations = () => {
	const {
		isAuthorizedToEdit,
		story,
		addPronunciation,
		removePronunciation,
		changePronunciationFrom,
		changePronunciationTo,
		revertPronunciations,
		savePronunciations,
		errors,
		isLoadingPronounciation,
		hearPronunciation,
	} = PronunciationsLogic();

	return (
		<div>
			<EditableContainer
				className='story-settings-pronunciations-container story-settings-input-container'
				isAuthorizedToEdit={isAuthorizedToEdit}
				onAdd={addPronunciation}
				onRevert={revertPronunciations}
				onSave={savePronunciations}
			>
				<div>
					<div className='story-settings-pronunciations-list-container'>
						<div className='story-settings-pronunciations-list-header'>
							<div className='story-settings-pronunciations-item-value'>Written Word</div>
							<div className='story-settings-pronunciations-item-value'>Pronunciation</div>
						</div>
						<div className='story-settings-pronunciations-list'>
							{story?.data?.pronunciations?.map((pronunciation, index) => (
								<div key={index} className='story-settings-pronunciations-item-container'>
									<div className='story-settings-pronunciations-item-value'>{pronunciation?.from}</div>
									<div className='story-settings-pronunciations-item-value'>{pronunciation?.to}</div>
								</div>
							))}
						</div>
					</div>
				</div>
				<div>
					<ErrorMessage errors={errors} />
					<div>
						<div className='story-settings-pronunciations-list-container'>
							<div className='story-settings-pronunciations-list-header'>
								<div className='story-settings-pronunciations-item-value'>Written Word</div>
								<div className='story-settings-pronunciations-item-value'>Pronunciation</div>
							</div>
							<div className='story-settings-pronunciations-list'>
								{story?.data?.pronunciations?.map((pronunciation, index) => (
									<div key={index} className='story-settings-pronunciations-item-container'>
										<div className='story-settings-pronunciations-item-input-container'>
											<TextInput
												seamless={true}
												value={pronunciation?.from}
												label='Written Word'
												onChange={(e) => changePronunciationFrom(e, index)}
												backgroundColour='grey3'
											/>
										</div>
										<div className='story-settings-pronunciations-item-input-container'>
											<TextInput
												seamless={true}
												value={pronunciation?.to}
												label='Pronunciation'
												onChange={(e) => changePronunciationTo(e, index)}
												backgroundColour='grey3'
											/>
										</div>
										<div
											className={
												isLoadingPronounciation ? "story-settings-pronunciations-item-hear-btn-container-loading" : ""
											}
										>
											<IconBtn icon={<FaVolumeUp />} onClick={() => hearPronunciation(index)} />
										</div>
										<div>
											<IconBtn
												className='story-settings-pronunciations-item-remove-btn'
												icon={<FaTimes />}
												iconName='times'
												onClick={() => removePronunciation(index)}
											/>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</EditableContainer>
		</div>
	);
};
