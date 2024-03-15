// Packages
import { FaChevronDown, FaTimes } from "react-icons/fa";

// Components
import { IconBtn } from "../IconBtn/IconBtn";
import { TextInput } from "../TextInput/TextInput";

// Logic
import { BtnListItemLogic } from "./BtnListItemLogic";

// Context

// Services

// Styles
import "./BtnListItem.css";

// Assets

export const BtnListItem = ({ className, size, value, index, isActive, hasFoundActive, hasBackground, onClick, onChange, onRemove }) => {
	const { isBtnListOpen, hasOnClick, onBtnListItemClick, onRemoveBtnClick } = BtnListItemLogic({ index, onClick, onRemove });

	return (
		<div
			tabIndex='1'
			className={
				"btn-list-item" +
				((hasFoundActive !== false ? isActive : index === 0) ? " btn-list-item-active" : "") +
				(hasOnClick ? " btn-list-item-clickable" : "") +
				(className ? " " + className : "") +
				(size ? " btn-list-item-size-" + size : "") +
				(isBtnListOpen === false ? " btn-list-item-list-closed" : "") +
				(hasBackground !== false ? " btn-list-item-list-has-background" : "")
			}
			onClick={onBtnListItemClick}
			onAuxClick={onClick}
		>
			{value === undefined ? (
				<div className='btn-list-item-value-placeholder loading-background'></div>
			) : onChange === undefined ? (
				<div className='btn-list-item-value'>{value}</div>
			) : (
				<TextInput className='btn-list-item-value' seamless={true} value={value} onChange={onChange} />
			)}
			<div className='btn-list-item-btns-container'>
				{onRemove === undefined ? null : (
					<IconBtn
						className='btn-list-item-btns-remove-btn'
						icon={<FaTimes />}
						iconName='times'
						size='s'
						seamless={true}
						onClick={onRemoveBtnClick}
					/>
				)}
			</div>
			<div className='btn-list-item-arrow-container'>
				<FaChevronDown />
			</div>
		</div>
	);
};
