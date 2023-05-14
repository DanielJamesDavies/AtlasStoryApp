// Packages

// Components
import { Group } from "./Group";

// Logic

// Context
import GroupProvider from "./GroupContext";

// Services

// Styles

// Assets

export const GroupContainer = ({ story_uid, group_uid }) => {
	return (
		<GroupProvider story_uid={story_uid} group_uid={group_uid}>
			<Group />
		</GroupProvider>
	);
};
