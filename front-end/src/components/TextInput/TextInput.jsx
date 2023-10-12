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
		onClickContainer,
		onInputContainerFocus,
		onInputContainerBlur,
		isHidden,
		toggleIsHidden,
		onKeyDown,
		inputContainerStyles,
		focused,
		selection,
		onMouseDownHiddenCharacter,
		onMouseEnterHiddenCharacter,
	} = TextInputLogic(props);

	return (
		<div ref={inputContainerRef} className={inputClassName} onClick={onClickContainer} style={inputContainerStyles}>
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
					type={props.type === undefined || (props.type === "password" && !isHidden) ? "text" : props.type}
					autoComplete={props.autocomplete}
					onFocus={onInputContainerFocus}
					onBlur={onInputContainerBlur}
					style={inputStyle}
					onClick={(e) => e.stopPropagation()}
				/>

				<div ref={inputWidthRef} className='text-input-width-element'>
					{props?.value}
				</div>

				<div className='text-input-hidden-characters'>
					{!props?.value
						? null
						: props?.value
								.toString()
								?.split("")
								.concat([""])
								.map((_, index) => (
									<div
										key={index}
										className='text-input-hidden-character-container'
										onMouseEnter={(e) => onMouseEnterHiddenCharacter(e, index)}
										onMouseDown={(e) => onMouseDownHiddenCharacter(e, index)}
									>
										<div
											key={index}
											className={
												selection[0] === -1 &&
												selection[1] === -1 &&
												props?.value.toString()?.split("").concat([""]).length - 1 === index &&
												focused
													? "text-input-hidden-character text-input-hidden-character-single-selected"
													: selection[0] === index && selection[1] === -1 && focused
													? "text-input-hidden-character text-input-hidden-character-single-selected"
													: selection[1] !== -1 &&
													  index >= Math.min(...selection) &&
													  index <= Math.max(...selection) &&
													  focused
													? "text-input-hidden-character text-input-hidden-character-selected"
													: "text-input-hidden-character"
											}
										/>
									</div>
								))}
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
