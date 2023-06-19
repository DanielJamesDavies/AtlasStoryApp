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
			<div className='group-subpages-btn-scroll-btn'>
				<IconBtn icon={<FaChevronLeft />} seamless={true} onClick={() => scrollSubpageBtns(-1)} />
			</div>
			<div
				ref={subpagesBtnsRef}
				className={isAuthorizedToEdit ? "group-subpages-btns group-subpages-btns-is-authorized" : "group-subpages-btns"}
			>
				{subpages
					.filter((e) => (isAuthorizedToEdit ? e.isEnabled : !["profile", "settings"].includes(e?.id) && e.isEnabled))
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
			<div className='group-subpages-btn-scroll-btn'>
				<IconBtn icon={<FaChevronRight />} seamless={true} onClick={() => scrollSubpageBtns(1)} />
			</div>
		</div>
	);
};
