// Packages

// Components

// Logic
import { ObjectsListItemLogic } from "./ObjectsListItemLogic";

// Context

// Services

// Styles
import "./ObjectsListItem.css";

// Assets

export const ObjectsListItem = ({ object }) => {
	const { objectsImages, onClick } = ObjectsListItemLogic({ object });

	return (
		<div
			className='objects-list-item'
			style={object?.data?.colour ? { "--objectColour": object?.data?.colour } : { "--objectColour": "#0044ff" }}
			onClick={onClick}
			onAuxClick={onClick}
		>
			<div className='objects-list-item-name'>{object?.data?.name}</div>
			<div className='objects-list-item-image-container'>
				<div className='objects-list-item-image'>
					{objectsImages === false ? null : !objectsImages.find((e) => JSON.stringify(e._id) === JSON.stringify(object?.data?.listImage))
							?.image ? null : (
						<>
							<img src={objectsImages.find((e) => JSON.stringify(e._id) === JSON.stringify(object?.data?.listImage))?.image} alt='' />
							<img src={objectsImages.find((e) => JSON.stringify(e._id) === JSON.stringify(object?.data?.listImage))?.image} alt='' />
						</>
					)}
				</div>
			</div>
		</div>
	);
};
