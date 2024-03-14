// Packages

// Components
import { ObjectsListItem } from "./ObjectsListItem/ObjectsListItem";
import { ObjectsListPrimary } from "./ObjectsListPrimary/ObjectsListPrimary";
import { ObjectsListCreateObject } from "./ObjectsListCreateObject/ObjectsListCreateObject";
import { CarouselContainer } from "../../../components/CarouselContainer/CarouselContainer";
import { DragDropContainer } from "../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../components/DragDropItem/DragDropItem";
import { LoadingCircle } from "../../../components/LoadingCircle/LoadingCircle";
import { FirstAddButton } from "../../../components/FirstAddButton/FirstAddButton";

// Logic
import { ObjectsListLogic } from "./ObjectsListLogic";

// Context

// Services

// Styles
import "./ObjectsList.css";

// Assets

export const ObjectsList = () => {
	const { authorized_user_id, story, objects, objectsImages, isReorderingObjects, changeObjectsOrder, setIsDisplayingCreateObjectForm } =
		ObjectsListLogic();

	return (
		<div className='objects-list-container'>
			{!objects || objectsImages === false ? (
				<div className='objects-list-loading-container'>
					<LoadingCircle center={true} />
				</div>
			) : (
				<>
					<ObjectsListPrimary />
					<ObjectsListCreateObject />
					{story?.data?.objects?.length === 0 && story?.data?.members.findIndex((e) => e?.user_id === authorized_user_id) !== -1 ? (
						<div className='objects-list-add-first-container'>
							<FirstAddButton label='Create Object' onClick={() => setIsDisplayingCreateObjectForm(true)} />
						</div>
					) : (
						<CarouselContainer speed={0.7} buttonScroll={true}>
							<DragDropContainer
								className='objects-list'
								inlineItems={true}
								enableDragDrop={isReorderingObjects}
								onDropItem={changeObjectsOrder}
							>
								{story?.data?.objects.map((object_id, index) => (
									<DragDropItem key={index} index={index} className='lore-list-item-container'>
										<ObjectsListItem object={objects.find((e) => e._id === object_id)} />
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
