// Packages

// Components
import { ContentItem } from "../../../../../components/ContentItem/ContentItem";
import { ToggleInput } from "../../../../../components/ToggleInput/ToggleInput";
import { ErrorMessage } from "../../../../../components/ErrorMessage/ErrorMessage";

// Logic
import { IsPrivateLogic } from "./IsPrivateLogic";

// Context

// Services

// Styles
import "./IsPrivate.css";

// Assets

export const IsPrivate = () => {
	const { user, errors, toggleIsPrivate } = IsPrivateLogic();

	return (
		<ContentItem className='settings-item' size='s' hasBg={true}>
			<div className='settings-item-title'>Private Account</div>
			<ToggleInput
				className='user-settings-is-private-input'
				labels={["Public", "Private"]}
				value={user?.isPrivate}
				onToggle={toggleIsPrivate}
				enableEdit={true}
			/>
			<ErrorMessage errors={errors} />
		</ContentItem>
	);
};
