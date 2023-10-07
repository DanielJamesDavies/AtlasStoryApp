// Packages

// Components
import { PopUpContainer } from "../../../components/PopUpContainer/PopUpContainer";
import { FollowersMenuButtons } from "./FollowersMenuButtons/FollowersMenuButtons";
import { FollowersMenuList } from "./FollowersMenuList/FollowersMenuList";

// Logic
import { FollowersMenuLogic } from "./FollowersMenuLogic";

// Context

// Services

// Styles
import "./FollowersMenu.css";

// Assets

export const FollowersMenu = () => {
	const { isDisplayingFollowersMenu, closeFollowersMenu } = FollowersMenuLogic();

	return (
		<PopUpContainer
			className='user-followers-menu-container'
			isDisplaying={isDisplayingFollowersMenu}
			onClosePopUp={closeFollowersMenu}
			nullOnHidden={true}
			hidePrimary={true}
		>
			<FollowersMenuButtons />
			<FollowersMenuList />
		</PopUpContainer>
	);
};
