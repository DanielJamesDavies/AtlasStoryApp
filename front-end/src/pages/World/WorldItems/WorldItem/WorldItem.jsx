// Packages

// Components

// Logic
import { WorldItemLogic } from "./WorldItemLogic";

// Context

// Services

// Styles
import "./WorldItem.css";

// Assets

export const WorldItem = ({ item }) => {
	const { onClick, onMouseDown } = WorldItemLogic({ item });

	return (
		<div className='world-items-item-container' onClick={onClick} onAuxClick={onClick} onMouseDown={onMouseDown}>
			<div className='world-items-item'>
				<div className='world-items-item-front-folder'></div>
				<div className='world-items-item-back-folder'>
					<div className='world-items-item-title'>{item.title}</div>
				</div>
				<div className='world-items-item-content'>
					<div className='world-items-item-icon'>{item.icon}</div>
				</div>
			</div>
		</div>
	);
};
