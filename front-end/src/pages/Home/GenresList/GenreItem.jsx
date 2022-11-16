// Packages
import { FaStar, FaBook, FaRegStar, FaTimes } from "react-icons/fa";

// Components
import { IconBtn } from "../../../components/IconBtn/IconBtn";

// Logic

// Context

// Services

// Styles
import "./GenreItem.css";

// Assets

export const GenreItem = ({ genre, isFavourited, favouriteGenre, unfavouriteGenre, user_id, deleteGenre }) => {
	return (
		<div className={isFavourited ? "home-genres-list-item home-genres-list-item-favourited" : "home-genres-list-item"}>
			<div>
				<div className='home-genres-list-item-title'>{genre?.name}</div>
				<div className='home-genres-list-item-info'>
					<div className='home-genres-list-item-stat'>
						<FaStar />
						<div className='home-genres-list-item-stat-value'>{genre?.usersFavourited}</div>
					</div>
					<div className='home-genres-list-item-stat'>
						<FaBook />
						<div className='home-genres-list-item-stat-value'>{genre?.storiesUsing}</div>
					</div>
				</div>
			</div>
			<div className='home-genres-list-item-favourite-btn-container'>
				<IconBtn
					icon={<FaRegStar />}
					iconHover={<FaStar />}
					iconName='star'
					seamless={true}
					size='m'
					onClick={() => favouriteGenre(genre._id)}
				/>
			</div>
			<div className='home-genres-list-item-unfavourite-btn-container'>
				<IconBtn
					icon={<FaStar />}
					iconHover={<FaRegStar />}
					iconName='star'
					seamless={true}
					size='m'
					onClick={() => unfavouriteGenre(genre._id)}
				/>
			</div>
			{genre?.owner !== user_id ? null : (
				<div className='home-genres-list-item-delete-btn-container'>
					<IconBtn icon={<FaTimes />} iconName='times' seamless={true} size='s' onClick={() => deleteGenre(genre._id)} />
				</div>
			)}
		</div>
	);
};
