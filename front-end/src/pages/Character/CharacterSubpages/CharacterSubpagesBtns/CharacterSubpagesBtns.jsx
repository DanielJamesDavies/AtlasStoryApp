// Packages
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Components
import { IconBtn } from "../../../../components/IconBtn/IconBtn";

// Logic
import { CharacterSubpagesBtnsLogic } from "./CharacterSubpagesBtnsLogic";

// Context

// Services

// Styles
import "./CharacterSubpagesBtns.css";

// Assets

export const CharacterSubpagesBtns = () => {
	const { isAuthorizedToEdit, subpages, openSubpageID, setOpenSubpageID, subpagesBtnsRef, scrollSubpageBtns } = CharacterSubpagesBtnsLogic();

	return (
		<div className='character-subpages-btns-container'>
			<IconBtn icon={<FaChevronLeft />} seamless={true} onClick={() => scrollSubpageBtns(-1)} />
			<div
				ref={subpagesBtnsRef}
				className={isAuthorizedToEdit ? "character-subpages-btns character-subpages-btns-is-authorized" : "character-subpages-btns"}
			>
				{subpages
					.filter((e) => (isAuthorizedToEdit ? e.isEnabled : e.id !== "settings" && e.isEnabled))
					.map((subpage, index) => (
						<button
							key={index}
							className={
								subpage.id === openSubpageID ? "character-subpages-btn character-subpages-btn-active" : "character-subpages-btn"
							}
							onClick={() => setOpenSubpageID(subpage.id)}
						>
							{subpage.name}
						</button>
					))}
			</div>
			<IconBtn icon={<FaChevronRight />} seamless={true} onClick={() => scrollSubpageBtns(1)} />
		</div>
	);
};
