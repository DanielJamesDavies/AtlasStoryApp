// Packages
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Components
import { IconBtn } from "../../../../components/IconBtn/IconBtn";
import { BtnListItem } from "../../../../components/BtnListItem/BtnListItem";

// Logic
import { CharacterSubpagesBtnsLogic } from "./SubpagesBtnsLogic";

// Context

// Services

// Styles
import "./SubpagesBtns.css";

// Assets

export const CharacterSubpagesBtns = () => {
	const { isAuthorizedToEdit, subpages, openSubpageID, setOpenSubpageID, subpagesBtnsRef, scrollSubpageBtns } = CharacterSubpagesBtnsLogic();

	return (
		<div className='character-subpages-btns-container'>
			<div className='character-subpages-btn-scroll-btn'>
				<IconBtn icon={<FaChevronLeft />} seamless={true} onClick={() => scrollSubpageBtns(-1)} />
			</div>
			<div
				ref={subpagesBtnsRef}
				className={isAuthorizedToEdit ? "character-subpages-btns character-subpages-btns-is-authorized" : "character-subpages-btns"}
			>
				{subpages
					.filter((e) => (isAuthorizedToEdit ? e.isEnabled : !["profile", "settings"].includes(e?.id) && e.isEnabled))
					.map((subpage, index) => (
						<BtnListItem
							key={index}
							className='character-subpages-btn'
							size='s'
							value={subpage.name}
							isActive={subpage.id === openSubpageID}
							onClick={() => setOpenSubpageID(subpage.id)}
						/>
					))}
			</div>
			<div className='character-subpages-btn-scroll-btn'>
				<IconBtn icon={<FaChevronRight />} seamless={true} onClick={() => scrollSubpageBtns(1)} />
			</div>
		</div>
	);
};
