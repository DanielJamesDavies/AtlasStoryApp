// Packages
import { FaPlus, FaSort, FaBookOpen } from "react-icons/fa";

// Components
import { IconBtn } from "../../../../components/IconBtn/IconBtn";

// Logic
import { ObjectsListPrimaryLogic } from "./ObjectsListPrimaryLogic";

// Context

// Services

// Styles
import "./ObjectsListPrimary.css";

// Assets

export const ObjectsListPrimary = () => {
	const { isAuthorizedToEdit, openCreateObjectForm, toggleIsReorderingObjects } = ObjectsListPrimaryLogic();

	return (
		<div className='objects-list-primary'>
			<div
				className={
					isAuthorizedToEdit
						? "objects-list-primary-buttons-container objects-list-primary-buttons-container-authorized-to-edit"
						: "objects-list-primary-buttons-container"
				}
			>
				{!isAuthorizedToEdit ? null : (
					<div className='objects-list-primary-modify-btns-container'>
						<IconBtn
							className='objects-list-primary-modify-btn'
							seamless={true}
							icon={<FaBookOpen />}
							iconName='book-open'
							iconSmall={<FaPlus />}
							onClick={openCreateObjectForm}
							label='Create Object'
						/>
						<IconBtn
							className='objects-list-primary-modify-btn'
							seamless={true}
							icon={<FaSort />}
							iconName='sort'
							onClick={toggleIsReorderingObjects}
							label='Reorder Objects'
						/>
					</div>
				)}
			</div>
		</div>
	);
};
