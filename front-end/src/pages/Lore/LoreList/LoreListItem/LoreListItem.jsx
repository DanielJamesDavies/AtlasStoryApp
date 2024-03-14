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
	const { loreImages, onClick } = LoreListItemLogic({ lore_item });

	return (
		<div
			className='lore-list-item'
			style={lore_item?.data?.colour ? { "--lore_itemColour": lore_item?.data?.colour } : { "--lore_itemColour": "#0044ff" }}
			onClick={onClick}
			onAuxClick={onClick}
		>
			<div className='lore-list-item-name'>{lore_item?.data?.name}</div>
			<div className='lore-list-item-image-container'>
				<div className='lore-list-item-image'>
					{loreImages === false ? null : !loreImages.find((e) => JSON.stringify(e._id) === JSON.stringify(lore_item?.data?.listImage))
							?.image ? null : (
						<>
							<img src={loreImages.find((e) => JSON.stringify(e._id) === JSON.stringify(lore_item?.data?.listImage))?.image} alt='' />
							<img src={loreImages.find((e) => JSON.stringify(e._id) === JSON.stringify(lore_item?.data?.listImage))?.image} alt='' />
						</>
					)}
				</div>
			</div>
		</div>
	);
};
