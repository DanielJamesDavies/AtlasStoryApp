// Packages

// Components
import { LoreListItem } from "./LoreListItem/LoreListItem";
import { LoreListPrimary } from "./LoreListPrimary/LoreListPrimary";
import { LoreListCreateLoreItem } from "./LoreListCreateLoreItem/LoreListCreateLoreItem";
import { CarouselContainer } from "../../../components/CarouselContainer/CarouselContainer";
import { DragDropContainer } from "../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../components/DragDropItem/DragDropItem";
import { LoadingCircle } from "../../../components/LoadingCircle/LoadingCircle";
import { FirstAddButton } from "../../../components/FirstAddButton/FirstAddButton";

// Logic
import { LoreListLogic } from "./LoreListLogic";

// Context

// Services

// Styles
import "./LoreList.css";

// Assets

export const LoreList = () => {
	const { authorized_user_id, story, lore, loreImages, isReorderingLore, changeLoreOrder, setIsDisplayingCreateLoreItemForm } = LoreListLogic();

	return (
		<div className='lore-list-container'>
			{!lore || loreImages === false ? (
				<div className='lore-list-loading-container'>
					<LoadingCircle center={true} />
				</div>
			) : (
				<>
					<LoreListPrimary />
					<LoreListCreateLoreItem />
					{story?.data?.lore?.length === 0 && story?.data?.members.findIndex((e) => e?.user_id === authorized_user_id) !== -1 ? (
						<div className='lore-list-add-first-container'>
							<FirstAddButton label='Create World Item' onClick={() => setIsDisplayingCreateLoreItemForm(true)} />
						</div>
					) : (
						<CarouselContainer speed={0.7} buttonScroll={true}>
							<DragDropContainer
								className='lore-list'
								inlineItems={true}
								enableDragDrop={isReorderingLore}
								onDropItem={changeLoreOrder}
							>
								{story?.data?.lore.map((lore_item_id, index) => (
									<DragDropItem key={index} index={index} className='lore-list-item-container'>
										<LoreListItem lore_item={lore.find((e) => e._id === lore_item_id)} />
									</DragDropItem>
								))}
							</DragDropContainer>
						</CarouselContainer>
					)}
				</>
			)}
		</div>
	);
};
