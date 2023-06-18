// Packages

// Components
import { PopUpContainer } from "../../../../components/PopUpContainer/PopUpContainer";
import { TextInput } from "../../../../components/TextInput/TextInput";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";
import { SuggestionsMessage } from "../../../../components/SuggestionsMessage/SuggestionsMessage";
import { URLPreviewMessage } from "../../../../components/URLPreviewMessage/URLPreviewMessage";
import { SubmitBtn } from "../../../../components/SubmitBtn/SubmitBtn";

// Logic
import { SubstoriesListCreateSubstoryLogic } from "./SubstoriesListCreateSubstoryLogic";

// Context

// Services

// Styles
import "./SubstoriesListCreateSubstory.css";

// Assets

export const SubstoriesListCreateSubstory = () => {
	const {
		story_uid,
		isDisplayingCreateSubstoryForm,
		closeCreateSubstoryForm,
		substoryTitle,
		changeSubstoryTitle,
		substoryUID,
		changeSubstoryUID,
		substoryUIDSuggestions,
		errors,
		submitCreateSubstory,
	} = SubstoriesListCreateSubstoryLogic();

	return (
		<PopUpContainer
			className='substories-create-substory-container'
			title='Create Plot'
			isDisplaying={isDisplayingCreateSubstoryForm}
			onClosePopUp={closeCreateSubstoryForm}
		>
			<div className='substories-create-substory-form'>
				<div className='substories-create-substory-form-input-container'>
					<TextInput label='Title' value={substoryTitle} onChange={changeSubstoryTitle} isDark={true} />
					<ErrorMessage errors={errors} attribute='name' />
				</div>
				<div className='substories-create-substory-form-input-container'>
					<TextInput label='Unique Identifier (UID)' value={substoryUID} onChange={changeSubstoryUID} isDark={true} />
					<ErrorMessage errors={errors} attribute='uid' />
					<SuggestionsMessage suggestions={substoryUIDSuggestions} labelContext={"for UID"} />
					{substoryUID.length === 0 ? null : (
						<URLPreviewMessage
							path={"s/" + story_uid + "/c/" + substoryUID}
							label='With this UID, your substory will be accessable on the following URL:'
						/>
					)}
					<ErrorMessage errors={errors} attribute='uid' />
				</div>
				<ErrorMessage errors={errors} />
				<div className='substories-create-substory-form-submit-container'>
					<SubmitBtn label='Create Plot' onSubmit={submitCreateSubstory} />
				</div>
			</div>
		</PopUpContainer>
	);
};
