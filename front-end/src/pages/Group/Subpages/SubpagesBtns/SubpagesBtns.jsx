// Packages
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Components
import { IconBtn } from "../../../../components/IconBtn/IconBtn";
import { BtnListItem } from "../../../../components/BtnListItem/BtnListItem";

// Logic
import { GroupSubpagesBtnsLogic } from "./SubpagesBtnsLogic";

// Context

// Services

// Styles
import "./SubpagesBtns.css";

// Assets

export const GroupSubpagesBtns = () => {
	const { isAuthorizedToEdit, subpages, openSubpageID, setOpenSubpageID, subpagesBtnsRef, scrollSubpageBtns } = GroupSubpagesBtnsLogic();

	return (
		<div className='group-subpages-btns-container'>
			<IconBtn icon={<FaChevronLeft />} seamless={true} onClick={() => scrollSubpageBtns(-1)} />
			<div
				ref={subpagesBtnsRef}
				className={isAuthorizedToEdit ? "group-subpages-btns group-subpages-btns-is-authorized" : "group-subpages-btns"}
			>
				{subpages
					.filter((e) => (isAuthorizedToEdit ? e.isEnabled : e.id !== "settings" && e.isEnabled))
					.map((subpage, index) => (
						<BtnListItem
							key={index}
							className='group-subpages-btn'
							size='s'
							value={subpage.name}
							isActive={subpage.id === openSubpageID}
							onClick={() => setOpenSubpageID(subpage.id)}
						/>
					))}
			</div>
			<IconBtn icon={<FaChevronRight />} seamless={true} onClick={() => scrollSubpageBtns(1)} />
		</div>
	);
};
