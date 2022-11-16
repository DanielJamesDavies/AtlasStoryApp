// Packages

// Components
import { PopUpContainer } from "../../../../components/PopUpContainer/PopUpContainer";
import { TextInput } from "../../../../components/TextInput/TextInput";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";
import { SuggestionsMessage } from "../../../../components/SuggestionsMessage/SuggestionsMessage";
import { URLPreviewMessage } from "../../../../components/URLPreviewMessage/URLPreviewMessage";
import { SubmitBtn } from "../../../../components/SubmitBtn/SubmitBtn";

// Logic
import { CharactersCreateGroupLogic } from "./CharactersCreateGroupLogic";

// Context

// Services

// Styles
import "./CharactersCreateGroup.css";

// Assets

export const CharactersCreateGroup = () => {
	const {
		story_uid,
		isDisplayingCreateGroupForm,
		closeCreateGroupForm,
		groupName,
		changeGroupName,
		groupUID,
		changeGroupUID,
		groupUIDSuggestions,
		errors,
		submitCreateGroup,
	} = CharactersCreateGroupLogic();

	return (
		<PopUpContainer
			className='characters-create-group-container'
			title='Create Group'
			isDisplaying={isDisplayingCreateGroupForm}
			onClosePopUp={closeCreateGroupForm}
		>
			<div className='characters-create-group-form'>
				<div className='characters-create-group-form-input-container'>
					<TextInput label='Name' value={groupName} onChange={changeGroupName} isDark={true} />
					<ErrorMessage errors={errors} attribute='name' />
				</div>
				<div className='characters-create-group-form-input-container'>
					<TextInput label='Unique Identifier (UID)' value={groupUID} onChange={changeGroupUID} isDark={true} />
					<ErrorMessage errors={errors} attribute='uid' />
					<SuggestionsMessage suggestions={groupUIDSuggestions} labelContext={"for UID"} />
					{groupUID.length === 0 ? null : (
						<URLPreviewMessage
							path={"s/" + story_uid + "/g/" + groupUID}
							label='With this UID, your group will be accessable on the following URL:'
						/>
					)}
				</div>
				<ErrorMessage errors={errors} />
				<div className='characters-create-group-form-submit-container'>
					<SubmitBtn label='Create Group' onSubmit={submitCreateGroup} />
				</div>
			</div>
		</PopUpContainer>
	);
};
