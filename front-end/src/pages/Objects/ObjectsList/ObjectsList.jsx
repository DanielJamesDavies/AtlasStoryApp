// Packages

// Components
import { ObjectsListItem } from "./ObjectsListItem/ObjectsListItem";
import { LoadingCircle } from "../../../components/LoadingCircle/LoadingCircle";

// Logic
import { ObjectsListLogic } from "./ObjectsListLogic";

// Context

// Services

// Styles
import "./ObjectsList.css";

// Assets

export const ObjectsList = () => {
	const { story, objects } = ObjectsListLogic();

	return (
		<div className='objects-list-container'>
			{!objects ? (
				<div className='objects-list-loading-container'>
					<LoadingCircle center={true} />
				</div>
			) : (
				<div className='objects-list'>
					{story?.data?.objects?.map((object_id, index) => (
						<ObjectsListItem key={index} object={objects.find((e) => e._id === object_id)} />
					))}
				</div>
			)}
		</div>
	);
};
