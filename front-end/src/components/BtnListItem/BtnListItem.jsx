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
	const { btnListItemClassName, onBtnListItemClick, onRemoveBtnClick } = BtnListItemLogic({
		className,
		size,
		index,
		isActive,
		hasFoundActive,
		hasBackground,
		onClick,
		onRemove,
	});

	return (
		<div tabIndex='1' className={btnListItemClassName} onClick={onBtnListItemClick} onAuxClick={onClick}>
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
