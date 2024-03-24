// Packages

// Components

// Logic
import { MultiLineTextInputLogic } from "./MultiLineTextInputLogic";

// Context

// Services

// Styles
import "./MultiLineTextInput.css";

// Assets

export const MultiLineTextInput = ({ className, icon, value, label, autocomplete, isSaved, isDark, seamless, isLightText, onChange }) => {
	const {
		inputRef,
		DynamicIconComponent,
		selectAll,
		onClick,
		onInputContainerFocus,
		onInputContainerBlur,
		onKeyDownTextArea,
		focused,
		inputContainerStyles,
	} = MultiLineTextInputLogic({ className, icon, value, isSaved, isDark, seamless, isLightText, onChange });

	return (
		<div
			className={
				"multi-line-text-input-container" +
				(className ? " " + className : "") +
				(focused ? " multi-line-text-input-container-focused" : "") +
				(value === undefined || value === "" ? " multi-line-text-input-container-empty" : "") +
				(isSaved === false && !focused ? " multi-line-text-input-container-unsaved" : "") +
				(isDark ? " multi-line-text-input-container-dark" : "") +
				(seamless ? " multi-line-text-input-container-seamless" : "") +
				(isLightText ? " multi-line-text-input-container-light-text" : "")
			}
			onClick={onClick}
			style={inputContainerStyles}
		>
			<div className='multi-line-text-input'>
				<div className='multi-line-text-input-label'>
					{icon ? <DynamicIconComponent /> : null}
					<span onClick={selectAll}>{label}</span>
				</div>

				<div className='multi-line-text-input-height-element'>
					<div>
						{value === undefined
							? ""
							: Array.isArray(value)
							? value.map((paragraph, index) => {
									return <p key={index}>{paragraph}</p>;
							  })
							: value.split("\n").map((paragraph, index) => {
									return <p key={index}>{paragraph}</p>;
							  })}
					</div>
				</div>

				<textarea
					ref={inputRef}
					value={value === undefined ? [""] : value}
					onChange={onChange}
					autoComplete={autocomplete}
					onFocus={onInputContainerFocus}
					onBlur={onInputContainerBlur}
					onKeyDown={onKeyDownTextArea}
				/>
			</div>
		</div>
	);
};
