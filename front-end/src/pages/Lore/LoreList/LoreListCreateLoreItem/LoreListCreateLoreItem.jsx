// Packages

// Components
import { PopUpContainer } from "../../../../components/PopUpContainer/PopUpContainer";
import { TextInput } from "../../../../components/TextInput/TextInput";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";
import { SuggestionsMessage } from "../../../../components/SuggestionsMessage/SuggestionsMessage";
import { URLPreviewMessage } from "../../../../components/URLPreviewMessage/URLPreviewMessage";
import { SubmitBtn } from "../../../../components/SubmitBtn/SubmitBtn";

// Logic
import { LoreListCreateLoreItemLogic } from "./LoreListCreateLoreItemLogic";

// Context

// Services

// Styles
import "./LoreListCreateLoreItem.css";

// Assets

export const LoreListCreateLoreItem = () => {
	const {
		story_uid,
		isDisplayingCreateLoreItemForm,
		closeCreateLoreItemForm,
		loreItemName,
		changeLoreItemName,
		loreItemUID,
		changeLoreItemUID,
		loreItemUIDSuggestions,
		errors,
		submitCreateLoreItem,
	} = LoreListCreateLoreItemLogic();

	return (
		<PopUpContainer
			className='lore-create-lore-item-container'
			title='Create World Item'
			isDisplaying={isDisplayingCreateLoreItemForm}
			onClosePopUp={closeCreateLoreItemForm}
		>
			<div className='lore-create-lore-item-form'>
				<div className='lore-create-lore-item-form-input-container'>
					<TextInput label='Name' value={loreItemName} onChange={changeLoreItemName} isDark={true} />
					<ErrorMessage errors={errors} attribute='name' />
				</div>
				<div className='lore-create-lore-item-form-input-container'>
					<TextInput label='Unique Identifier (UID)' value={loreItemUID} onChange={changeLoreItemUID} isDark={true} />
					<ErrorMessage errors={errors} attribute='uid' />
					<SuggestionsMessage suggestions={loreItemUIDSuggestions} labelContext={"for UID"} />
					{loreItemUID.length === 0 ? null : (
						<URLPreviewMessage
							path={"s/" + story_uid + "/c/" + loreItemUID}
							label='With this UID, your loreItem will be accessable on the following URL:'
						/>
					)}
					<ErrorMessage errors={errors} attribute='uid' />
				</div>
				<ErrorMessage errors={errors} />
				<div className='lore-create-lore-item-form-submit-container'>
					<SubmitBtn label='Create World Item' onSubmit={() => submitCreateLoreItem()} />
				</div>
			</div>
		</PopUpContainer>
	);
};
