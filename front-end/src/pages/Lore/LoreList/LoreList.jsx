// Packages

// Components
import { LoreListItem } from "./LoreListItem/LoreListItem";
import { LoreListPrimary } from "./LoreListPrimary/LoreListPrimary";
import { LoreListCreateLoreItem } from "./LoreListCreateLoreItem/LoreListCreateLoreItem";
import { DragDropContainer } from "../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../components/DragDropItem/DragDropItem";
import { LoadingCircle } from "../../../components/LoadingCircle/LoadingCircle";

// Logic
import { LoreListLogic } from "./LoreListLogic";

// Context

// Services

// Styles
import "./LoreList.css";

// Assets

export const LoreList = () => {
	const { story, lore, isReorderingLore, changeLoreOrder } = LoreListLogic();

	return (
		<div className='lore-list-container'>
			{!lore ? (
				<div className='lore-list-loading-container'>
					<LoadingCircle center={true} />
				</div>
			) : (
				<>
					<LoreListPrimary />
					<LoreListCreateLoreItem />
					<DragDropContainer className='lore-list' inlineItems={true} enableDragDrop={isReorderingLore} onDropItem={changeLoreOrder}>
						{story?.data?.lore.map((lore_item_id, index) => (
							<DragDropItem key={index} index={index} className='lore-list-item-container'>
								<LoreListItem lore_item={lore.find((e) => e._id === lore_item_id)} />
							</DragDropItem>
						))}
					</DragDropContainer>
				</>
			)}
		</div>
	);
};
