// Packages
import { FaMouse } from "react-icons/fa";
import { BsShift } from "react-icons/bs";
import { MdSpaceBar } from "react-icons/md";

// Components

// Logic

// Context

// Services

// Styles
import "./ControlScheme.css";

// Assets

export const ControlScheme = ({ isDisplayingControlScheme }) => {
	const controls = [
		{ icon: <FaMouse />, label: "Hold Left to Rotate" },
		{ icon: <FaMouse />, label: "Scroll to Move Forward/Back" },
		{ key: "W", label: "Move Forward" },
		{ key: "S", label: "Move Backward" },
		{ key: "A", label: "Move Left" },
		{ key: "D", label: "Move Right" },
		{ key: "R", label: "Move Up" },
		{ icon: <MdSpaceBar />, iconSize: "l", label: "Move Up (Alternative)" },
		{ key: "F", label: "Move Down" },
		{ icon: <BsShift />, label: "Move Down (Alternative)" },
	];

	return (
		<div
			className={
				isDisplayingControlScheme
					? "locations-menu-control-scheme locations-menu-control-scheme-is-displaying"
					: "locations-menu-control-scheme"
			}
		>
			{controls.map((control, index) => (
				<div key={index} className='locations-menu-control-scheme-control'>
					{!control?.icon ? null : (
						<div
							className={
								control?.iconSize !== undefined
									? "locations-menu-control-scheme-control-icon locations-menu-control-scheme-control-icon-" + control.iconSize
									: "locations-menu-control-scheme-control-icon"
							}
						>
							{control?.icon}
						</div>
					)}
					{!control?.key ? null : <div className='locations-menu-control-scheme-control-key'>{control?.key}</div>}
					<div className='locations-menu-control-scheme-control-label'>{control?.label}</div>
				</div>
			))}
		</div>
	);
};
