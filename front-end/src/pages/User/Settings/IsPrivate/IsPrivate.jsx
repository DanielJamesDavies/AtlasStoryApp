// Packages

// Components
import { ToggleInput } from "../../../../components/ToggleInput/ToggleInput";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";

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
		<>
			<ToggleInput
				className='user-settings-is-private-input'
				label='Private'
				value={user?.isPrivate}
				onToggle={toggleIsPrivate}
				enableEdit={true}
			/>
			<ErrorMessage errors={errors} />
		</>
	);
};
