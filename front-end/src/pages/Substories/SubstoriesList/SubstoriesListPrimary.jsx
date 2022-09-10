// Packages
import { FaPlus, FaSort, FaBookOpen } from "react-icons/fa";

// Components
import { IconBtn } from "../../../components/IconBtn/IconBtn";

// Logic
import { SubstoriesListPrimaryLogic } from "./SubstoriesListPrimaryLogic";

// Context

// Services

// Styles
import "./SubstoriesListPrimary.css";

// Assets

export const SubstoriesListPrimary = () => {
	const { isAuthorizedToEdit, openCreateSubstoryForm, toggleIsReorderingSubstories } = SubstoriesListPrimaryLogic();

	return (
		<div className='substories-list-primary'>
			<div
				className={
					isAuthorizedToEdit
						? "substories-list-primary-buttons-container substories-list-primary-buttons-container-authorized-to-edit"
						: "substories-list-primary-buttons-container"
				}
			>
				{!isAuthorizedToEdit ? null : (
					<div className='substories-list-primary-modify-btns-container'>
						<IconBtn
							className='substories-list-primary-modify-btn'
							seamless={true}
							icon={<FaBookOpen />}
							iconName='book-open'
							iconSmall={<FaPlus />}
							onClick={openCreateSubstoryForm}
							label='Create Substory'
						/>
						<IconBtn
							className='substories-list-primary-modify-btn'
							seamless={true}
							icon={<FaSort />}
							iconName='sort'
							onClick={toggleIsReorderingSubstories}
							label='Reorder Substories'
						/>
					</div>
				)}
			</div>
		</div>
	);
};
