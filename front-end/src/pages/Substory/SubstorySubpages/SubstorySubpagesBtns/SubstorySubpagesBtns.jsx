// Packages
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Components
import { IconBtn } from "../../../../components/IconBtn/IconBtn";
import { BtnListItem } from "../../../../components/BtnListItem/BtnListItem";

// Logic
import { SubstorySubpagesBtnsLogic } from "./SubstorySubpagesBtnsLogic";

// Context

// Services

// Styles
import "./SubstorySubpagesBtns.css";

// Assets

export const SubstorySubpagesBtns = () => {
	const { isAuthorizedToEdit, subpages, openSubpageID, onClickSubpageBtn, subpagesBtnsRef, scrollSubpageBtns } = SubstorySubpagesBtnsLogic();

	return (
		<div className='substory-subpages-btns-container'>
			<div className='substory-subpages-btn-scroll-btn'>
				<IconBtn icon={<FaChevronLeft />} seamless={true} onClick={() => scrollSubpageBtns(-1)} />
			</div>
			<div
				ref={subpagesBtnsRef}
				className={isAuthorizedToEdit ? "substory-subpages-btns substory-subpages-btns-is-authorized" : "substory-subpages-btns"}
			>
				{subpages
					.filter((e) => (isAuthorizedToEdit ? e.isEnabled : e.id !== "settings" && e.isEnabled))
					.map((subpage, index) => (
						<BtnListItem
							key={index}
							className='substory-subpages-btn'
							size='s'
							value={subpage.name}
							isActive={subpage.id === openSubpageID}
							onClick={() => onClickSubpageBtn(subpage.id)}
						/>
					))}
			</div>
			<div className='substory-subpages-btn-scroll-btn'>
				<IconBtn icon={<FaChevronRight />} seamless={true} onClick={() => scrollSubpageBtns(1)} />
			</div>
		</div>
	);
};
