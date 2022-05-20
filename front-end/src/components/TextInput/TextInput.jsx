// Packages
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Components

// Logic
import { TextInputLogic } from "./TextInputLogic";

// Context

// Services

// Styles
import "./TextInput.css";

// Assets

export const TextInput = (props) => {
	const { inputContainerRef, inputRef, focused, setFocused, inputClassName, DynamicIconComponent, selectAll, isHidden, toggleIsHidden } =
		TextInputLogic(props);

	return (
		<div ref={inputContainerRef} className={inputClassName(props, focused)}>
			<div className='text-input'>
				<div className='text-input-label'>
					{props.icon ? <DynamicIconComponent /> : null}
					<span onClick={selectAll}>{props.label}</span>
				</div>

				<input
					ref={inputRef}
					value={props.value === undefined ? "" : props.value}
					onChange={props.onChange}
					id={props.id ? props.id : "input"}
					type={props.type === undefined ? (!props?.hideValue ? "text" : isHidden ? "password" : "text") : props.type}
					autoComplete={props.autocomplete}
				/>
			</div>

			{!props?.hideValue ? null : (
				<button className='text-input-hide-value-btn' onClick={toggleIsHidden}>
					{isHidden ? <FaEye /> : <FaEyeSlash />}
				</button>
			)}
		</div>
	);
};
