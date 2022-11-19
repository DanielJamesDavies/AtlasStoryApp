// Packages

// Components

// Logic
import { UserItemLogic } from "./UserItemLogic";

// Context

// Services

// Styles
import "./UserItem.css";

// Assets

export const UserItem = ({ user, className, size }) => {
	const { userItemClassName, onClick, onMouseDown } = UserItemLogic({ user, className, size });

	if (!user) return <div className={size ? "user-item-placeholder user-item-size-" + size : "user-item-placeholder"} />;
	return (
		<div tabIndex='1' className={userItemClassName} onClick={onClick} onAuxClick={onClick} onMouseDown={onMouseDown}>
			<div className='user-item-profile-picture'>
				{!user?.data?.profilePicture?.image ? null : <img src={user.data.profilePicture.image} alt='' />}
			</div>
			<div className='user-item-names-container'>
				<div className='user-item-nickname'>{user?.data?.nickname}</div>
				{!user?.username ? null : <div className='user-item-username'>@{user?.username}</div>}
			</div>
		</div>
	);
};
