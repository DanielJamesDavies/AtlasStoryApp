// Packages

// Components
import { ObjectsTitle } from "./ObjectsTitle/ObjectsTitle";
import { ObjectsList } from "./ObjectsList/ObjectsList";

// Logic

// Context

// Services

// Styles
import "./Objects.css";

// Assets

export const Objects = () => {
	return (
		<div className='objects'>
			<ObjectsTitle />
			<ObjectsList />
		</div>
	);
};
