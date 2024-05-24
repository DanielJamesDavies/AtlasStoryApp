// Packages

// Components
import { PopUpContainer } from "../../../components/PopUpContainer/PopUpContainer";
import { TextInput } from "../../../components/TextInput/TextInput";
import { DropdownContainer } from "../../../components/DropdownContainer/DropdownContainer";
import { SubmitBtn } from "../../../components/SubmitBtn/SubmitBtn";
import { SuggestionsMessage } from "../../../components/SuggestionsMessage/SuggestionsMessage";
import { URLPreviewMessage } from "../../../components/URLPreviewMessage/URLPreviewMessage";
import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";

// Logic
import { CreateLocationFormLogic } from "./CreateLocationFormLogic";

// Context

// Services

// Styles
import "./CreateLocationForm.css";

// Assets

export const CreateLocationForm = () => {
	const {
		story_uid,
		isDisplayingCreateLocationForm,
		closeCreateHierarchyItemForm,
		itemName,
		changeItemName,
		itemUid,
		changeItemUid,
		locationTypes,
		specificLocationTypes,
		itemType,
		changeItemType,
		parentOptions,
		itemParent,
		changeItemParent,
		submitCreateHierarchyItem,
		errors,
		itemUIDSuggestions,
		onClickUidSuggestion,
	} = CreateLocationFormLogic();

	return (
		<PopUpContainer
			className='locations-create-location-container'
			title='Create Location'
			isDisplaying={isDisplayingCreateLocationForm}
			onClosePopUp={closeCreateHierarchyItemForm}
		>
			<div className='locations-create-location-form'>
				<div className='locations-create-location-form-input-container'>
					<TextInput label='Name' value={itemName} onChange={changeItemName} isDark={true} />
				</div>
				<div className='locations-create-location-form-input-container'>
					<TextInput label='UID' value={itemUid} onChange={changeItemUid} isDark={true} />
					<SuggestionsMessage suggestions={itemUIDSuggestions} labelContext={"for UID"} onClick={onClickUidSuggestion} />
					{itemUid.length === 0 ? null : (
						<URLPreviewMessage
							path={"s/" + story_uid + "/l/" + itemUid}
							label='With this UID, your location will be accessable on the following URL:'
						/>
					)}
					<ErrorMessage attribute='uid' errors={errors} />
				</div>

				<div className='locations-create-location-form-input-container'>
					<div className='locations-create-location-form-subtitle'>Location Type</div>
					<DropdownContainer
						value={
							locationTypes.find((e) => e.type === itemType)?.name ||
							specificLocationTypes.find((e) => e.specificType === itemType)?.name
						}
						onChange={changeItemType}
						noBackground={true}
					>
						{[...locationTypes.concat(specificLocationTypes)].reverse().map((locationType, index) => (
							<div key={index}>{locationType.name}</div>
						))}
					</DropdownContainer>
				</div>

				<div className='locations-create-location-form-input-container'>
					<div className='locations-create-location-form-subtitle'>Location Parent</div>
					<DropdownContainer
						value={parentOptions.find((e) => e._id === itemParent)?.data?.name}
						onChange={changeItemParent}
						noBackground={true}
					>
						{parentOptions.map((parentOption, index) => (
							<div key={index}>{parentOption?.data?.name}</div>
						))}
					</DropdownContainer>
				</div>

				<ErrorMessage errors={errors} />

				<div className='locations-create-location-form-submit-container'>
					<SubmitBtn label='Create Location' onSubmit={submitCreateHierarchyItem} />
				</div>
			</div>
		</PopUpContainer>
	);
};
