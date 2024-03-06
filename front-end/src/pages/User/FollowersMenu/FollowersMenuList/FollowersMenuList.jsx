// Packages
import { FaUserClock } from "react-icons/fa";

// Components

// Logic
import { FollowersMenuListLogic } from "./FollowersMenuListLogic";

// Context

// Services

// Styles
import "./FollowersMenuList.css";

// Assets

export const FollowersMenuList = () => {
	const {
		isAuthorizedToEdit,
		followersMenuSubpage,
		userFollowing,
		userFollowers,
		goToUser,
		unfollowUser,
		acceptUserFollow,
		denyUserFollow,
		cancelUserFollow,
	} = FollowersMenuListLogic();

	if (followersMenuSubpage === "following")
		return (
			<div className='user-followers-menu-list'>
				{!userFollowing
					? null
					: userFollowing
							?.filter((e) => e !== false && e?.userFollow?.status === "confirmed")
							?.map((userFollow, index) => (
								<div key={index} className='user-followers-menu-list-item' onClick={() => goToUser(userFollow?.user?.username)}>
									<div className='user-followers-menu-list-item-profile-picture'>
										{!userFollow?.profilePicture?.image ? null : <img src={userFollow?.profilePicture?.image} alt='' />}
									</div>
									<div className='user-followers-menu-list-item-names'>
										<div className='user-followers-menu-list-item-nickname'>{userFollow?.user?.data?.nickname}</div>
										<div className='user-followers-menu-list-item-username'>@{userFollow?.user?.username}</div>
									</div>
									{!isAuthorizedToEdit ? null : (
										<button
											className='user-followers-menu-list-item-unfollow-btn'
											onClick={(e) => unfollowUser(e, userFollow?.user?._id)}
										>
											Unfollow
										</button>
									)}
								</div>
							))}
			</div>
		);
	if (followersMenuSubpage === "followers")
		return (
			<div className='user-followers-menu-list'>
				{!userFollowers
					? null
					: userFollowers
							?.filter((e) => e !== false && e?.userFollow?.status === "confirmed")
							?.map((userFollow, index) => (
								<div key={index} className='user-followers-menu-list-item' onClick={() => goToUser(userFollow?.user?.username)}>
									<div className='user-followers-menu-list-item-profile-picture'>
										{!userFollow?.profilePicture?.image ? null : <img src={userFollow?.profilePicture?.image} alt='' />}
									</div>
									<div className='user-followers-menu-list-item-names'>
										<div className='user-followers-menu-list-item-nickname'>{userFollow?.user?.data?.nickname}</div>
										<div className='user-followers-menu-list-item-username'>@{userFollow?.user?.username}</div>
									</div>
								</div>
							))}
			</div>
		);
	if (followersMenuSubpage === "pending")
		return (
			<div className='user-followers-menu-list'>
				{!userFollowers
					? null
					: userFollowers
							?.filter((e) => e !== false && e?.userFollow?.status === "pending")
							?.map((userFollow, index) => (
								<div key={index} className='user-followers-menu-list-item' onClick={() => goToUser(userFollow?.user?.username)}>
									<div className='user-followers-menu-list-item-profile-picture'>
										{!userFollow?.profilePicture?.image ? null : <img src={userFollow?.profilePicture?.image} alt='' />}
									</div>
									<div className='user-followers-menu-list-item-names'>
										<div className='user-followers-menu-list-item-nickname'>{userFollow?.user?.data?.nickname}</div>
										<div className='user-followers-menu-list-item-username'>@{userFollow?.user?.username}</div>
									</div>
									{!isAuthorizedToEdit ? null : (
										<>
											<button
												className='user-followers-menu-list-item-accept-follow-btn'
												onClick={(e) => acceptUserFollow(e, userFollow?.user?._id)}
											>
												Accept
											</button>
											<button
												className='user-followers-menu-list-item-deny-follow-btn'
												onClick={(e) => denyUserFollow(e, userFollow?.user?._id)}
											>
												Deny
											</button>
										</>
									)}
								</div>
							))}
				{!userFollowing
					? null
					: userFollowing
							?.filter((e) => e !== false && e?.userFollow?.status === "pending")
							?.map((userFollow, index) => (
								<div key={index} className='user-followers-menu-list-item' onClick={() => goToUser(userFollow?.user?.username)}>
									<div className='user-followers-menu-list-item-profile-picture'>
										{!userFollow?.profilePicture?.image ? null : <img src={userFollow?.profilePicture?.image} alt='' />}
									</div>
									<div className='user-followers-menu-list-item-names'>
										<div className='user-followers-menu-list-item-nickname'>{userFollow?.user?.data?.nickname}</div>
										<div className='user-followers-menu-list-item-username'>@{userFollow?.user?.username}</div>
									</div>
									<div className='user-followers-menu-list-item-follow-request-symbol'>
										<FaUserClock />
									</div>
									{!isAuthorizedToEdit ? null : (
										<button
											className='user-followers-menu-list-item-cancel-follow-btn'
											onClick={(e) => cancelUserFollow(e, userFollow?.user?._id)}
										>
											Cancel Request
										</button>
									)}
								</div>
							))}
			</div>
		);
};
