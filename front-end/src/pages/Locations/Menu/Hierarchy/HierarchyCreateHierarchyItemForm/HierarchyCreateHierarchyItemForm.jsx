// Packages

// Components
import { PopUpContainer } from "../../../../../components/PopUpContainer/PopUpContainer";
import { TextInput } from "../../../../../components/TextInput/TextInput";
import { DropdownContainer } from "../../../../../components/DropdownContainer/DropdownContainer";
import { SubmitBtn } from "../../../../../components/SubmitBtn/SubmitBtn";

// Logic
import { HierarchyCreateHierarchyItemFormLogic } from "./HierarchyCreateHierarchyItemFormLogic";

// Context

// Services

// Styles
import "./HierarchyCreateHierarchyItemForm.css";

// Assets

export const HierarchyCreateHierarchyItemForm = () => {
	const {
		isDisplayingCreateHierarchyItemForm,
		closeCreateHierarchyItemForm,
		itemName,
		changeItemName,
		locationTypes,
		itemType,
		changeItemType,
		parentOptions,
		itemParent,
		changeItemParent,
		submitCreateHierarchyItem,
	} = HierarchyCreateHierarchyItemFormLogic();

	return (
		<PopUpContainer
			className='locations-hierarchy-create-hierarchy-item-container'
			title='Create Location'
			isDisplaying={isDisplayingCreateHierarchyItemForm}
			onClosePopUp={closeCreateHierarchyItemForm}
		>
			<div className='locations-hierarchy-create-hierarchy-item-form'>
				<div className='locations-hierarchy-create-hierarchy-item-form-input-container'>
					<TextInput label='Name' value={itemName} onChange={changeItemName} isDark={true} />
				</div>

				<div className='locations-hierarchy-create-hierarchy-item-form-input-container'>
					<div className='locations-hierarchy-create-hierarchy-item-form-subtitle'>Location Type</div>
					<DropdownContainer value={locationTypes.find((e) => e.type === itemType)?.name} onChange={changeItemType} noBackground={true}>
						{locationTypes.map((locationType, index) => (
							<div key={index}>{locationType.name}</div>
						))}
					</DropdownContainer>
				</div>

				<div className='locations-hierarchy-create-hierarchy-item-form-input-container'>
					<div className='locations-hierarchy-create-hierarchy-item-form-subtitle'>Location Parent</div>
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

				<div className='locations-hierarchy-create-hierarchy-item-form-submit-container'>
					<SubmitBtn label='Create Location' onSubmit={submitCreateHierarchyItem} />
				</div>
			</div>
		</PopUpContainer>
	);
};
