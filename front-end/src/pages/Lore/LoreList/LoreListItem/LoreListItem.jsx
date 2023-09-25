// Packages

// Components

// Logic
import { LoreListItemLogic } from "./LoreListItemLogic";

// Context

// Services

// Styles
import "./LoreListItem.css";

// Assets

export const LoreListItem = ({ lore_item, lore_itemImage }) => {
	const { onClick } = LoreListItemLogic({ lore_item });

	return (
		<div
			className='lore-list-item'
			style={lore_item?.data?.colour ? { "--lore_itemColour": lore_item?.data?.colour } : { "--lore_itemColour": "#0044ff" }}
			onClick={onClick}
			onAuxClick={onClick}
		>
			<div className='lore-list-item-image-container'>
				<div className='lore-list-item-image'>{!lore_itemImage ? null : <img src={lore_itemImage} alt='' />}</div>
			</div>
			<div className='lore-list-item-name'>{lore_item?.data?.name}</div>
		</div>
	);
};
