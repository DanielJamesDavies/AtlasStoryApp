// Packages
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Components
import { IconBtn } from "../../../../components/IconBtn/IconBtn";
import { BtnListItem } from "../../../../components/BtnListItem/BtnListItem";

// Logic
import { LocationSubpagesBtnsLogic } from "./LocationSubpagesBtnsLogic";

// Context

// Services

// Styles
import "./LocationSubpagesBtns.css";

// Assets

export const LocationSubpagesBtns = () => {
	const { isAuthorizedToEdit, subpages, openSubpageID, onClickSubpageBtn, subpagesBtnsRef, scrollSubpageBtns } = LocationSubpagesBtnsLogic();

	return (
		<div className='location-subpages-btns-container'>
			<div className='location-subpages-btn-scroll-btn'>
				<IconBtn icon={<FaChevronLeft />} seamless={true} onClick={() => scrollSubpageBtns(-1)} />
			</div>
			<div
				ref={subpagesBtnsRef}
				className={isAuthorizedToEdit ? "location-subpages-btns location-subpages-btns-is-authorized" : "location-subpages-btns"}
			>
				{subpages
					.filter((e) =>
						isAuthorizedToEdit
							? e.isEnabled && e?.isSaved !== false
							: !["settings"].includes(e?.id) && e.isEnabled && e?.isSaved !== false
					)
					.map((subpage, index) => (
						<BtnListItem
							key={index}
							className='location-subpages-btn'
							size='s'
							value={subpage.name}
							isActive={subpage.id === openSubpageID}
							onClick={() => onClickSubpageBtn(subpage.id)}
						/>
					))}
			</div>
			<div className='location-subpages-btn-scroll-btn'>
				<IconBtn icon={<FaChevronRight />} seamless={true} onClick={() => scrollSubpageBtns(1)} />
			</div>
		</div>
	);
};
