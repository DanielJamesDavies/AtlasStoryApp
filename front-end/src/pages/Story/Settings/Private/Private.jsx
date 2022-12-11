// Packages

// Components
import { ToggleInput } from "../../../../components/ToggleInput/ToggleInput";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { PrivateLogic } from "./PrivateLogic";

// Context

// Services

// Styles
import "./Private.css";

// Assets

export const Private = () => {
	const { errors, story, toggleIsStoryPrivate } = PrivateLogic();

	return (
		<>
			<ToggleInput
				className='story-settings-private-story-input'
				label='Private Story'
				value={story?.data?.isPrivate}
				onToggle={toggleIsStoryPrivate}
				enableEdit={true}
			/>
			<ErrorMessage errors={errors} />
		</>
	);
};
