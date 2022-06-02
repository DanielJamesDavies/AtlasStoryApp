// Packages

// Components

// Logic
import { MultiLineTextInputLogic } from "./MultiLineTextInputLogic";

// Context

// Services

// Styles
import "./MultiLineTextInput.css";

// Assets

export const MultiLineTextInput = (props) => {
	const {
		inputContainerRef,
		inputRef,
		inputHeightRef,
		inputClassName,
		DynamicIconComponent,
		selectAll,
		onClick,
		onInputContainerFocus,
		onInputContainerBlur,
		onKeyDownTextArea,
	} = MultiLineTextInputLogic(props);

	return (
		<div ref={inputContainerRef} className={inputClassName} onClick={onClick}>
			<div className='multi-line-text-input'>
				<div className='multi-line-text-input-label'>
					{props.icon ? <DynamicIconComponent /> : null}
					<span onClick={selectAll}>{props.label}</span>
				</div>

				<textarea
					ref={inputRef}
					value={props.value === undefined ? "" : props.value}
					onChange={props.onChange}
					autoComplete={props.autocomplete}
					onFocus={onInputContainerFocus}
					onBlur={onInputContainerBlur}
					onKeyDown={onKeyDownTextArea}
				/>

				<div className='multi-line-text-input-height-element'>
					<div ref={inputHeightRef}>
						{props.value === undefined
							? ""
							: Array.isArray(props.value)
							? props.value.map((paragraph, index) => {
									return <p key={index}>{paragraph}</p>;
							  })
							: props.value.split("\n").map((paragraph, index) => {
									return <p key={index}>{paragraph}</p>;
							  })}
					</div>
				</div>
			</div>
		</div>
	);
};
