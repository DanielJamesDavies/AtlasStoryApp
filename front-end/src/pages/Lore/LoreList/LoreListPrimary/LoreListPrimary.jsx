// Packages
import { FaPlus, FaSort, FaBookOpen } from "react-icons/fa";

// Components
import { IconBtn } from "../../../../components/IconBtn/IconBtn";

// Logic
import { LoreListPrimaryLogic } from "./LoreListPrimaryLogic";

// Context

// Services

// Styles
import "./LoreListPrimary.css";

// Assets

export const LoreListPrimary = () => {
	const { isAuthorizedToEdit, openCreateLoreItemForm, toggleIsReorderingLore } = LoreListPrimaryLogic();

	return (
		<div className='lore-list-primary'>
			<div
				className={
					isAuthorizedToEdit
						? "lore-list-primary-buttons-container lore-list-primary-buttons-container-authorized-to-edit"
						: "lore-list-primary-buttons-container"
				}
			>
				{!isAuthorizedToEdit ? null : (
					<div className='lore-list-primary-modify-btns-container'>
						<IconBtn
							className='lore-list-primary-modify-btn'
							seamless={true}
							icon={<FaBookOpen />}
							iconName='book-open'
							iconSmall={<FaPlus />}
							onClick={openCreateLoreItemForm}
							label='Create World Item'
						/>
						<IconBtn
							className='lore-list-primary-modify-btn'
							seamless={true}
							icon={<FaSort />}
							iconName='sort'
							onClick={toggleIsReorderingLore}
							label='Reorder World Items'
						/>
					</div>
				)}
			</div>
		</div>
	);
};
