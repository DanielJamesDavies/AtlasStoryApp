// Packages

// Components
import { LoreListItem } from "./LoreListItem/LoreListItem";
import { LoadingCircle } from "../../../components/LoadingCircle/LoadingCircle";

// Logic
import { LoreListLogic } from "./LoreListLogic";

// Context

// Services

// Styles
import "./LoreList.css";

// Assets

export const LoreList = () => {
	const { story, lore } = LoreListLogic();

	return (
		<div className='lore-list-container'>
			{!lore ? (
				<div className='lore-list-loading-container'>
					<LoadingCircle center={true} />
				</div>
			) : (
				<div className='lore-list'>
					{story?.data?.lore?.map((lore_item_id, index) => (
						<LoreListItem key={index} lore_item={lore.find((e) => e._id === lore_item_id)} />
					))}
				</div>
			)}
		</div>
	);
};
