// Packages
import { FaTrash, FaUndoAlt } from "react-icons/fa";

// Components
import { IconBtn } from "../IconBtn/IconBtn";

// Logic
import { ConfirmDeleteLogic } from "./ConfirmDeleteLogic";

// Context

// Services

// Styles
import "./ConfirmDelete.css";

// Assets

export const ConfirmDelete = ({ state, labelContext, onDelete, className, seamless, isAuthorizedToEdit }) => {
	const { confirmDeleteContainerClassName, isConfirming, setIsConfirming } = ConfirmDeleteLogic({ state, className, seamless });

	if (!isAuthorizedToEdit) return null;
	return (
		<div className={confirmDeleteContainerClassName}>
			{!isConfirming ? (
				<>
					<div className='confirm-delete-hidden-container'>
						<div className='confirm-delete-label'>Are you sure you would like to delete {labelContext}?</div>
						<IconBtn
							className='confirm-delete-btn'
							seamless={true}
							icon={<FaTrash />}
							iconName='trash'
							onClick={() => setIsConfirming(true)}
						/>
					</div>
					<IconBtn
						className='confirm-delete-btn'
						seamless={true}
						icon={<FaTrash />}
						iconName='trash'
						onClick={() => setIsConfirming(true)}
					/>
				</>
			) : (
				<>
					<div className='confirm-delete-label'>Are you sure you would like to delete {labelContext}?</div>
					<IconBtn
						className='confirm-delete-btn confirm-delete-btn-delete'
						seamless={true}
						icon={<FaTrash />}
						iconName='trash'
						onClick={onDelete}
					/>
					<IconBtn className='confirm-delete-btn' seamless={true} icon={<FaUndoAlt />} onClick={() => setIsConfirming(false)} />
				</>
			)}
		</div>
	);
};
