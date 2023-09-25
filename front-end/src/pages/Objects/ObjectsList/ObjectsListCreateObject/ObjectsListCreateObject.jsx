// Packages

// Components
import { PopUpContainer } from "../../../../components/PopUpContainer/PopUpContainer";
import { TextInput } from "../../../../components/TextInput/TextInput";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";
import { SuggestionsMessage } from "../../../../components/SuggestionsMessage/SuggestionsMessage";
import { URLPreviewMessage } from "../../../../components/URLPreviewMessage/URLPreviewMessage";
import { SubmitBtn } from "../../../../components/SubmitBtn/SubmitBtn";

// Logic
import { ObjectsListCreateObjectLogic } from "./ObjectsListCreateObjectLogic";

// Context

// Services

// Styles
import "./ObjectsListCreateObject.css";

// Assets

export const ObjectsListCreateObject = () => {
	const {
		story_uid,
		isDisplayingCreateObjectForm,
		closeCreateObjectForm,
		objectName,
		changeObjectName,
		objectUID,
		changeObjectUID,
		objectUIDSuggestions,
		errors,
		submitCreateObject,
	} = ObjectsListCreateObjectLogic();

	return (
		<PopUpContainer
			className='objects-create-object-container'
			title='Create Object'
			isDisplaying={isDisplayingCreateObjectForm}
			onClosePopUp={closeCreateObjectForm}
		>
			<div className='objects-create-object-form'>
				<div className='objects-create-object-form-input-container'>
					<TextInput label='Name' value={objectName} onChange={changeObjectName} isDark={true} />
					<ErrorMessage errors={errors} attribute='name' />
				</div>
				<div className='objects-create-object-form-input-container'>
					<TextInput label='Unique Identifier (UID)' value={objectUID} onChange={changeObjectUID} isDark={true} />
					<ErrorMessage errors={errors} attribute='uid' />
					<SuggestionsMessage suggestions={objectUIDSuggestions} labelContext={"for UID"} />
					{objectUID.length === 0 ? null : (
						<URLPreviewMessage
							path={"s/" + story_uid + "/c/" + objectUID}
							label='With this UID, your object will be accessable on the following URL:'
						/>
					)}
					<ErrorMessage errors={errors} attribute='uid' />
				</div>
				<ErrorMessage errors={errors} />
				<div className='objects-create-object-form-submit-container'>
					<SubmitBtn label='Create Object' onSubmit={submitCreateObject} />
				</div>
			</div>
		</PopUpContainer>
	);
};
