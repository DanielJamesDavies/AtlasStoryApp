// Packages

// Components
import { TextInput } from "../../../components/TextInput/TextInput";
import { ToggleInput } from "../../../components/ToggleInput/ToggleInput";
import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";
import { SubmitBtn } from "../../../components/SubmitBtn/SubmitBtn";

// Logic
import { CharactersCreateGroupLogic } from "./CharactersCreateGroupLogic";

// Context

// Services

// Styles
import "./CharactersCreateGroup.css";

// Assets

export const CharactersCreateGroup = () => {
	const { isDisplayingCreateGroupForm, closeCreateGroupForm, groupName, changeGroupName, groupURL, changeGroupURL, errors, submitCreateGroup } =
		CharactersCreateGroupLogic();

	if (!isDisplayingCreateGroupForm) return null;
	return (
		<div className='characters-create-group-container'>
			<div className='characters-create-group-form'>
				<div className='characters-create-group-form-title'>Create Group</div>
				<div className='characters-create-group-form-input-container'>
					<TextInput label='Name' value={groupName} onChange={changeGroupName} isDark={true} />
					<ErrorMessage errors={errors} attribute='name' />
				</div>
				<div className='characters-create-group-form-input-container'>
					<TextInput label='URL' value={groupURL} onChange={changeGroupURL} isDark={true} />
					<ErrorMessage errors={errors} attribute='url' />
				</div>
				<div className='characters-create-group-form-submit-container'>
					<SubmitBtn label='Create Group' onSubmit={submitCreateGroup} />
				</div>
			</div>
			<div className='characters-create-group-background' onClick={closeCreateGroupForm} />
		</div>
	);
};
