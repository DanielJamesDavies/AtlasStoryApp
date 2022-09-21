// Packages
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Components
import { IconBtn } from "../../../../components/IconBtn/IconBtn";

// Logic
import { SubstorySubpagesBtnsLogic } from "./SubstorySubpagesBtnsLogic";

// Context

// Services

// Styles
import "./SubstorySubpagesBtns.css";

// Assets

export const SubstorySubpagesBtns = () => {
	const { isAuthorizedToEdit, subpages, openSubpageID, setOpenSubpageID, subpagesBtnsRef, scrollSubpageBtns } = SubstorySubpagesBtnsLogic();

	return (
		<div className='substory-subpages-btns-container'>
			<IconBtn icon={<FaChevronLeft />} seamless={true} onClick={() => scrollSubpageBtns(-1)} />
			<div
				ref={subpagesBtnsRef}
				className={isAuthorizedToEdit ? "substory-subpages-btns substory-subpages-btns-is-authorized" : "substory-subpages-btns"}
			>
				{subpages
					.filter((e) => (isAuthorizedToEdit ? e.isEnabled : e.id !== "settings" && e.isEnabled))
					.map((subpage, index) => (
						<button
							key={index}
							className={
								subpage.id === openSubpageID ? "substory-subpages-btn substory-subpages-btn-active" : "substory-subpages-btn"
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
