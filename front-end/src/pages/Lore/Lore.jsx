// Packages

// Components
import { LoreTitle } from "./LoreTitle/LoreTitle";
import { LoreList } from "./LoreList/LoreList";

// Logic

// Context

// Services

// Styles
import "./Lore.css";

// Assets

export const Lore = () => {
	return (
		<div className='lore'>
			<LoreTitle />
			<LoreList />
		</div>
	);
};
