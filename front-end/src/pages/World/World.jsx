// Packages

// Components
import { WorldTitle } from "./WorldTitle/WorldTitle";
import { WorldItems } from "./WorldItems/WorldItems";

// Logic

// Context

// Services

// Styles
import "./World.css";

// Assets

export const World = () => {
	return (
		<div className='world'>
			<WorldTitle />
			<WorldItems />
		</div>
	);
};
