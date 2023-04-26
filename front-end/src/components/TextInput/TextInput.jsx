// Packages
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Components
import { AITools } from "../AIToolsMenu/AITools";

// Logic
import { TextInputLogic } from "./TextInputLogic";

// Context

// Services

// Styles
import "./TextInput.css";

// Assets

export const TextInput = (props) => {
	const {
		inputContainerRef,
		inputRef,
		inputWidthRef,
		inputClassName,
		inputStyle,
		DynamicIconComponent,
		selectAll,
		focusOnInput,
		onInputContainerFocus,
		onInputContainerBlur,
		isHidden,
		toggleIsHidden,
		onKeyDown,
		inputContainerStyles,
		focused,
	} = TextInputLogic(props);

	return (
		<div ref={inputContainerRef} className={inputClassName} onClick={focusOnInput} style={inputContainerStyles}>
			<div className='text-input-label'>
				{props.icon ? <DynamicIconComponent /> : null}
				<span onClick={selectAll}>{props.label}</span>
			</div>
			<div className='text-input'>
				<input
					ref={inputRef}
					className='text-input-input'
					value={props.value === undefined ? "" : props.value}
					onChange={props.onChange}
					onKeyDown={onKeyDown}
					type={props.type === undefined ? (!props?.hideValue ? "text" : isHidden ? "password" : "text") : props.type}
					autoComplete={props.autocomplete}
					onFocus={onInputContainerFocus}
					onBlur={onInputContainerBlur}
					style={inputStyle}
					onClick={(e) => e.stopPropagation()}
				/>

				<div ref={inputWidthRef} className='text-input-width-element'>
					{props?.value}
				</div>

				{!props?.hideValue ? null : (
					<button className='text-input-hide-value-btn' onClick={toggleIsHidden}>
						{isHidden ? <FaEye /> : <FaEyeSlash />}
					</button>
				)}
			</div>
			{!props?.aiTools ? null : (
				<div className='text-input-ai-tools-container'>
					<AITools type='text' context={{ text: props.value }} isDisplayingButtons={focused} />
				</div>
			)}
		</div>
	);
};
