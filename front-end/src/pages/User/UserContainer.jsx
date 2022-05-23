// Packages

// Components
import { User } from "./User";

// Logic

// Context
import UserProvider from "./UserContext";

// Services

// Styles

// Assets

export const UserContainer = ({ user_username }) => {
	return (
		<UserProvider user_username={user_username}>
			<User />
		</UserProvider>
	);
};
