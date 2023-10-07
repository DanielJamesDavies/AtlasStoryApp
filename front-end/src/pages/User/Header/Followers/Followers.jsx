// Packages

// Components

// Logic
import { FollowersLogic } from "./FollowersLogic";

// Context

// Services

// Styles
import "./Followers.css";

// Assets

export const Followers = () => {
	const { user, userFollowing, userFollowers, openFollowing, openFollowers } = FollowersLogic();

	if (!user?._id || userFollowing === false || userFollowers === false) return null;
	return (
		<div className='user-header-followers-buttons-container'>
			<button className='user-header-followers-btn' onClick={openFollowing}>
				<span>{userFollowing?.length === undefined ? 0 : userFollowing?.filter((e) => e?.userFollow?.status !== "pending")?.length}</span>{" "}
				Following
			</button>
			<button className='user-header-followers-btn' onClick={openFollowers}>
				<span>{userFollowers?.length === undefined ? 0 : userFollowers?.filter((e) => e?.userFollow?.status !== "pending")?.length}</span>{" "}
				Followers
			</button>
		</div>
	);
};
