// Packages

// Components

// Logic
import { FollowersMenuButtonsLogic } from "./FollowersMenuButtonsLogic";

// Context

// Services

// Styles
import "./FollowersMenuButtons.css";

// Assets

export const FollowersMenuButtons = () => {
	const { isAuthorizedToEdit, followersMenuSubpage, openFollowersPage, openFollowingPage, openPendingPage } = FollowersMenuButtonsLogic();

	return (
		<div className='user-followers-menu-subpage-buttons'>
			<button
				className={
					"user-followers-menu-subpage-btn" + (followersMenuSubpage === "following" ? " user-followers-menu-subpage-btn-active" : "")
				}
				onClick={openFollowingPage}
			>
				Following
			</button>
			<button
				className={
					"user-followers-menu-subpage-btn" + (followersMenuSubpage === "followers" ? " user-followers-menu-subpage-btn-active" : "")
				}
				onClick={openFollowersPage}
			>
				Followers
			</button>
			{!isAuthorizedToEdit ? (
				<button className={"user-followers-menu-subpage-btn user-followers-menu-subpage-btn-hidden"}>Pending</button>
			) : (
				<button
					className={
						"user-followers-menu-subpage-btn" + (followersMenuSubpage === "pending" ? " user-followers-menu-subpage-btn-active" : "")
					}
					onClick={openPendingPage}
				>
					Pending
				</button>
			)}
		</div>
	);
};
