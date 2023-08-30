// Packages

// Components
import { EditableContainer } from "../../../../components/EditableContainer/EditableContainer";
import { TextInput } from "../../../../components/TextInput/TextInput";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { LocationPrimaryTitleLogic } from "./LocationPrimaryTitleLogic";

// Context

// Services

// Styles
import "./LocationPrimaryTitle.css";

// Assets

export const LocationPrimaryTitle = ({ locationPrimaryTitleRef, primaryStoryStyles }) => {
	const { isAuthorizedToEdit, story, location, changeTitle, revertTitle, saveTitle, errors } = LocationPrimaryTitleLogic();

	return (
		<EditableContainer
			className='location-primary-title-container'
			isAuthorizedToEdit={isAuthorizedToEdit}
			onRevert={revertTitle}
			onSave={saveTitle}
			absolutePositionEditBtns={true}
			isLight={primaryStoryStyles["--text-colour-primary"] === "#fff"}
		>
			{!location?.data?.isStoryTitleInTitle ? (
				<div ref={locationPrimaryTitleRef} className='location-primary-title'>
					{location?.data?.name}
				</div>
			) : (
				<div ref={locationPrimaryTitleRef} className='location-primary-title'>
					{story?.data?.name + ": " + location?.data?.name}
				</div>
			)}
			<div ref={locationPrimaryTitleRef}>
				<TextInput
					className='location-primary-title'
					seamless={true}
					value={location?.data?.name}
					onChange={changeTitle}
					autoResize={true}
				/>
				<ErrorMessage errors={errors} />
			</div>
		</EditableContainer>
	);
};
