// Packages

// Components
import { ObjectsListItem } from "./ObjectsListItem/ObjectsListItem";
import { ObjectsListPrimary } from "./ObjectsListPrimary/ObjectsListPrimary";
import { ObjectsListCreateObject } from "./ObjectsListCreateObject/ObjectsListCreateObject";
import { DragDropContainer } from "../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../components/DragDropItem/DragDropItem";
import { LoadingCircle } from "../../../components/LoadingCircle/LoadingCircle";

// Logic
import { ObjectsListLogic } from "./ObjectsListLogic";

// Context

// Services

// Styles
import "./ObjectsList.css";

// Assets

export const ObjectsList = () => {
	const { story, objects, isReorderingObjects, changeObjectsOrder } = ObjectsListLogic();

	return (
		<div className='objects-list-container'>
			{!objects ? (
				<div className='objects-list-loading-container'>
					<LoadingCircle center={true} />
				</div>
			) : (
				<>
					<ObjectsListPrimary />
					<ObjectsListCreateObject />
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
				</>
			)}
		</div>
	);
};
