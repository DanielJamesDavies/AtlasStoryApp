// Packages

// Components
import { WorldItem } from "./WorldItem/WorldItem";

// Logic
import { WorldItemsLogic } from "./WorldItemsLogic";

// Context

// Services

// Styles
import "./WorldItems.css";

// Assets

export const WorldItems = () => {
	const { items } = WorldItemsLogic();

	return (
		<div className='world-items'>
			{items.map((item, index) => (
				<WorldItem key={index} item={item} />
			))}
		</div>
	);
};
